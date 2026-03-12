import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "../components/ui/sonner";
import { Toaster } from "../components/ui/toaster";
import { TooltipProvider } from "../components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import ElderlyDashboard from "./pages/ElderlyDashboard";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import EmergencyPage from "./pages/EmergencyPage";
import MedicationPage from "./pages/MedicationPage";
import ChildrenMonitorPage from "./pages/ChildrenMonitorPage";
import CareInsightPage from "./pages/CareInsightPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/elderly" element={<ElderlyDashboard />} />
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/medication" element={<MedicationPage />} />
          <Route path="/children" element={<ChildrenMonitorPage />} />
          <Route path="/careinsight" element={<CareInsightPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
