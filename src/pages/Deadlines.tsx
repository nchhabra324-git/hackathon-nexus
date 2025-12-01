import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  ExternalLink,
  Trash2,
  Bell,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Deadline {
  id: string;
  name: string;
  date: string;
  location?: string;
  url?: string;
  reminderSet: boolean;
}

const initialDeadlines: Deadline[] = [
  {
    id: "1",
    name: "HackMIT 2024",
    date: "2024-02-15T23:59:00",
    location: "MIT, Cambridge MA",
    url: "https://hackmit.org",
    reminderSet: true,
  },
  {
    id: "2",
    name: "TreeHacks",
    date: "2024-02-22T18:00:00",
    location: "Stanford University",
    url: "https://treehacks.com",
    reminderSet: false,
  },
  {
    id: "3",
    name: "HackNYU",
    date: "2024-03-01T12:00:00",
    location: "New York University",
    url: "https://hacknyu.org",
    reminderSet: false,
  },
  {
    id: "4",
    name: "CalHacks",
    date: "2024-03-15T09:00:00",
    location: "UC Berkeley",
    reminderSet: false,
  },
];

function getTimeRemaining(deadline: string) {
  const now = new Date().getTime();
  const target = new Date(deadline).getTime();
  const diff = target - now;

  if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { expired: false, days, hours, minutes, seconds };
}

export default function Deadlines() {
  const [deadlines, setDeadlines] = useState<Deadline[]>(initialDeadlines);
  const [timeRemaining, setTimeRemaining] = useState<Record<string, ReturnType<typeof getTimeRemaining>>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDeadline, setNewDeadline] = useState({
    name: "",
    date: "",
    location: "",
    url: "",
  });

  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeRemaining: Record<string, ReturnType<typeof getTimeRemaining>> = {};
      deadlines.forEach((d) => {
        newTimeRemaining[d.id] = getTimeRemaining(d.date);
      });
      setTimeRemaining(newTimeRemaining);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [deadlines]);

  const handleAddDeadline = () => {
    if (!newDeadline.name || !newDeadline.date) {
      toast({
        title: "Missing information",
        description: "Please enter a name and date",
        variant: "destructive",
      });
      return;
    }

    const deadline: Deadline = {
      id: Date.now().toString(),
      name: newDeadline.name,
      date: newDeadline.date,
      location: newDeadline.location || undefined,
      url: newDeadline.url || undefined,
      reminderSet: false,
    };

    setDeadlines((prev) => [...prev, deadline].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewDeadline({ name: "", date: "", location: "", url: "" });
    setIsDialogOpen(false);
    toast({ title: "Deadline added!" });
  };

  const handleDelete = (id: string) => {
    setDeadlines((prev) => prev.filter((d) => d.id !== id));
    toast({ title: "Deadline removed" });
  };

  const toggleReminder = (id: string) => {
    setDeadlines((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, reminderSet: !d.reminderSet } : d
      )
    );
    const deadline = deadlines.find((d) => d.id === id);
    toast({
      title: deadline?.reminderSet ? "Reminder removed" : "Reminder set!",
      description: deadline?.reminderSet
        ? undefined
        : "You'll be notified before the deadline",
    });
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold font-display flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              Deadline Planner
            </h1>
            <p className="text-muted-foreground text-lg">
              Never miss a hackathon deadline with live countdowns
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Add Deadline
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Deadline</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Hackathon Name</Label>
                  <Input
                    placeholder="e.g., HackMIT 2024"
                    value={newDeadline.name}
                    onChange={(e) => setNewDeadline({ ...newDeadline, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deadline Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={newDeadline.date}
                    onChange={(e) => setNewDeadline({ ...newDeadline, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location (Optional)</Label>
                  <Input
                    placeholder="e.g., MIT, Cambridge MA"
                    value={newDeadline.location}
                    onChange={(e) => setNewDeadline({ ...newDeadline, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website URL (Optional)</Label>
                  <Input
                    placeholder="https://..."
                    value={newDeadline.url}
                    onChange={(e) => setNewDeadline({ ...newDeadline, url: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddDeadline} className="w-full">
                  Add Deadline
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Deadlines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deadlines.map((deadline, index) => {
            const time = timeRemaining[deadline.id] || { expired: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
            const isUrgent = time.days < 3 && !time.expired;

            return (
              <div
                key={deadline.id}
                className={`group rounded-xl border bg-card p-6 space-y-4 transition-all hover:shadow-lg animate-slide-up ${
                  isUrgent ? "border-destructive/50" : "border-border hover:border-primary/30"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold font-display">{deadline.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(deadline.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReminder(deadline.id)}
                      className={deadline.reminderSet ? "text-primary" : "text-muted-foreground"}
                    >
                      <Bell className={`h-4 w-4 ${deadline.reminderSet ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(deadline.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Countdown */}
                {!time.expired ? (
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { value: time.days, label: "Days" },
                      { value: time.hours, label: "Hours" },
                      { value: time.minutes, label: "Min" },
                      { value: time.seconds, label: "Sec" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`rounded-lg p-3 text-center ${
                          isUrgent ? "bg-destructive/10" : "bg-secondary"
                        }`}
                      >
                        <p className={`text-2xl font-bold font-display ${isUrgent ? "text-destructive" : ""}`}>
                          {item.value.toString().padStart(2, "0")}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted p-4 text-center">
                    <p className="text-muted-foreground">Deadline passed</p>
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  {deadline.location && (
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {deadline.location}
                    </span>
                  )}
                  {deadline.url && (
                    <a
                      href={deadline.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
