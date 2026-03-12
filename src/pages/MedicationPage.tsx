import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pill, Clock, Check } from "lucide-react";
import { Button } from "../components/ui/button";

interface Med {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

const initialMeds: Med[] = [
  { id: 1, name: "Metformin", dosage: "500mg", time: "8:00 AM", taken: true },
  { id: 2, name: "Lisinopril", dosage: "10mg", time: "8:00 AM", taken: true },
  { id: 3, name: "Aspirin", dosage: "81mg", time: "1:00 PM", taken: false },
  { id: 4, name: "Atorvastatin", dosage: "20mg", time: "8:00 PM", taken: false },
  { id: 5, name: "Vitamin D", dosage: "1000 IU", time: "8:00 PM", taken: false },
];

const MedicationPage = () => {
  const [meds, setMeds] = useState<Med[]>(initialMeds);

  const toggle = (id: number) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const taken = meds.filter(m => m.taken).length;
  const total = meds.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="container flex items-center h-16 gap-3">
          <Link to="/elderly">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Medications</h1>
            <p className="text-sm text-muted-foreground">Today's Schedule</p>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Progress */}
        <div className="bg-card rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-foreground text-lg">Daily Progress</p>
            <p className="text-2xl font-extrabold text-primary">{taken}/{total}</p>
          </div>
          <div className="w-full bg-accent rounded-full h-4">
            <div
              className="h-4 rounded-full bg-secondary transition-all duration-500"
              style={{ width: `${(taken / total) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {taken === total ? "All medications taken! Great job! 🎉" : `${total - taken} remaining`}
          </p>
        </div>

        {/* Medication List */}
        <div className="space-y-3">
          {meds.map(m => (
            <button
              key={m.id}
              onClick={() => toggle(m.id)}
              className={`w-full text-left rounded-2xl border p-5 flex items-center gap-4 transition-all ${
                m.taken
                  ? "bg-secondary/10 border-secondary/30"
                  : "bg-card hover:border-primary/30"
              }`}
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                m.taken ? "bg-secondary" : "bg-accent"
              }`}>
                {m.taken ? (
                  <Check className="h-6 w-6 text-secondary-foreground" />
                ) : (
                  <Pill className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-lg font-bold ${m.taken ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {m.name}
                </p>
                <p className="text-muted-foreground">{m.dosage}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">{m.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MedicationPage;
