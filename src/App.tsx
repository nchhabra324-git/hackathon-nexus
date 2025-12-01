import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import IdeaGenerator from "./pages/IdeaGenerator";
import TaskBoard from "./pages/TaskBoard";
import Deadlines from "./pages/Deadlines";
import Resources from "./pages/Resources";
import FocusMode from "./pages/FocusMode";
import AIMentor from "./pages/AIMentor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ideas" element={<IdeaGenerator />} />
            <Route path="/tasks" element={<TaskBoard />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/focus" element={<FocusMode />} />
            <Route path="/mentor" element={<AIMentor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
