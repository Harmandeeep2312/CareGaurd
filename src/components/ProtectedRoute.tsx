import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import type { ReactNode } from "react";


interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {

  const [loading,setLoading] = useState(true);
  const [authorized,setAuthorized] = useState(false);

  useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth, async (user)=>{

      if(!user){
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()){
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const role = docSnap.data().role;

      if(allowedRoles.includes(role)){
        setAuthorized(true);
      }

      setLoading(false);

    });

    return ()=>unsubscribe();

  },[allowedRoles]);

  if(loading){
    return <div>Loading...</div>;
  }

  if(!authorized){
    return <Navigate to="/login" />;
  }

  return children;
}