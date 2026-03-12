import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowLeft, MapPin, Shield, X } from "lucide-react";
import { Button } from "../components/ui/button";

const EmergencyPage = () => {
  const [triggered, setTriggered] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center h-16 gap-3">
          <Link to="/elderly">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="text-lg font-bold text-foreground">Emergency</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {!triggered ? (
          <div className="text-center space-y-8 animate-fade-in">
            <p className="text-xl text-muted-foreground font-medium">Press the button for immediate help</p>
            <button
              onClick={() => setTriggered(true)}
              className="h-48 w-48 md:h-56 md:w-56 rounded-full bg-destructive text-destructive-foreground flex flex-col items-center justify-center shadow-2xl animate-pulse-sos mx-auto focus:outline-none focus:ring-4 focus:ring-destructive/50"
            >
              <Phone className="h-16 w-16 mb-2" />
              <span className="text-3xl font-extrabold">SOS</span>
            </button>
            <p className="text-muted-foreground">This will alert your caregivers and share your location</p>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-fade-in max-w-md">
            <div className="bg-destructive/10 border-2 border-destructive/30 rounded-3xl p-8">
              <div className="bg-destructive rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-destructive-foreground" />
              </div>
              <h2 className="text-2xl font-extrabold text-destructive mb-2">Alert Sent!</h2>
              <p className="text-foreground text-lg mb-4">Your caregivers have been notified.</p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>GPS location shared</span>
              </div>
            </div>
            <div className="bg-secondary/10 rounded-2xl p-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-secondary" />
              <p className="text-foreground font-medium">Help is on the way. Stay calm.</p>
            </div>
            <Button
              variant="outline"
              size="xl"
              className="w-full"
              onClick={() => setTriggered(false)}
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
