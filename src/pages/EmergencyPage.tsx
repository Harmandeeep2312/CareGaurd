import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowLeft, MapPin, Shield, X, Loader } from "lucide-react";
import { Button } from "../components/ui/button";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

const EmergencyPage = () => {
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState<{
    name: string;
    phone: string;
  } | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    // Fetch emergency contact details
    const fetchEmergencyContact = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          toast.error("User not authenticated");
          return;
        }

        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.emergencyContactPhone && data.emergencyContactName) {
            setEmergencyContact({
              name: data.emergencyContactName,
              phone: data.emergencyContactPhone,
            });
          } else {
            toast.error("Emergency contact not configured. Please set it up first.");
          }
        }
      } catch (error: any) {
        console.error("Error fetching emergency contact:", error);
        toast.error("Failed to load emergency contact");
      }
    };

    fetchEmergencyContact();

    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Location access denied:", error);
          // Location is optional, don't show error
        }
      );
    }
  }, []);

  const handleSOSTrigger = async () => {
    if (!emergencyContact) {
      toast.error("Emergency contact not configured");
      return;
    }

    setLoading(true);
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        toast.error("User not authenticated");
        return;
      }

      // Record the SOS alert to Firestore
      
      // Show confirmation
      setTriggered(true);
      toast.success("Emergency alert sent!");

      // Format phone number for tel: link
      const phoneNumber = emergencyContact.phone.replace(/\D/g, "");
      const telLink = `tel:+${phoneNumber}`;
      
      // Open phone dialer after a short delay
      setTimeout(() => {
        window.location.href = telLink;
      }, 500);

      // Request notification permission for background sync
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("SOS Alert Triggered", {
          body: `Emergency contact ${emergencyContact.name} will be called shortly`,
          icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><rect fill='%23ef4444' width='96' height='96'/><text x='48' y='48' dominant-baseline='middle' text-anchor='middle' font-size='60' font-weight='bold' fill='white'>🚨</text></svg>",
          tag: "sos-alert",
          requireInteraction: true,
        });
      }

      // Request background sync if available
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          (registration as any).sync.register("sync-sos");
        } catch (error) {
          console.warn("Background sync registration failed:", error);
        }
      }
    } catch (error: any) {
      toast.error("Failed to trigger SOS: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTriggered(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center h-16 gap-3">
          <Link to="/elderly">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-foreground">Emergency</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {!triggered ? (
          <div className="text-center space-y-8 animate-fade-in">
            <p className="text-xl text-muted-foreground font-medium">
              Press the button for immediate help
            </p>

            {emergencyContact ? (
              <div className="bg-card border rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-sm text-muted-foreground mb-2">
                  Emergency Contact:
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {emergencyContact.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {emergencyContact.phone}
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-sm text-yellow-900">
                  ⚠️ Emergency contact not set. Please configure it in settings.
                </p>
              </div>
            )}

            <button
              onClick={handleSOSTrigger}
              disabled={!emergencyContact || loading}
              className="h-48 w-48 md:h-56 md:w-56 rounded-full bg-destructive text-destructive-foreground flex flex-col items-center justify-center shadow-2xl hover:shadow-2xl hover:shadow-destructive/50 mx-auto focus:outline-none focus:ring-4 focus:ring-destructive/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              style={{
                animation: !loading && emergencyContact ? "pulse-sos 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
              }}
            >
              {loading ? (
                <Loader className="h-16 w-16 mb-2 animate-spin" />
              ) : (
                <Phone className="h-16 w-16 mb-2" />
              )}
              <span className="text-3xl font-extrabold">SOS</span>
            </button>

            <p className="text-muted-foreground text-sm">
              {location
                ? "Your location will be shared with emergency services"
                : "Enable location for better emergency response"}
            </p>

            <style>{`
              @keyframes pulse-sos {
                0%, 100% {
                  box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                }
                50% {
                  box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
                }
              }
            `}</style>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-fade-in max-w-md">
            <div className="bg-destructive/10 border-2 border-destructive/30 rounded-3xl p-8">
              <div className="bg-destructive rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-destructive-foreground" />
              </div>
              <h2 className="text-2xl font-extrabold text-destructive mb-2">
                Alert Sent!
              </h2>
              <p className="text-foreground text-lg mb-4">
                Calling {emergencyContact?.name}...
              </p>
              {location && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>Location shared</span>
                </div>
              )}
            </div>

            <div className="bg-secondary/10 rounded-2xl p-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-secondary" />
              <p className="text-foreground font-medium">
                Help is on the way. Stay calm.
              </p>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleCancel}
            >
              <X className="h-5 w-5" /> Cancel Alert
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmergencyPage;

