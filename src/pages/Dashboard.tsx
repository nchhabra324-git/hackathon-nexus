import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import {
  CheckCircle2,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Lightbulb,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const recentTasks = [
  { id: 1, title: "Design system setup", status: "completed", priority: "high" },
  { id: 2, title: "API integration", status: "in-progress", priority: "high" },
  { id: 3, title: "User authentication", status: "todo", priority: "medium" },
  { id: 4, title: "Dashboard UI", status: "in-progress", priority: "medium" },
];

const upcomingDeadlines = [
  { id: 1, name: "HackMIT", date: "2024-02-15", daysLeft: 12 },
  { id: 2, name: "TreeHacks", date: "2024-02-22", daysLeft: 19 },
  { id: 3, name: "HackNYU", date: "2024-03-01", daysLeft: 27 },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold font-display">
            Welcome back, <span className="text-gradient">Hacker</span> 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your productivity overview for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={CheckCircle2}
            label="Tasks Completed"
            value={12}
            trend={{ value: 15, positive: true }}
          />
          <StatCard
            icon={Clock}
            label="Focus Hours"
            value="6.5h"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            icon={Flame}
            label="Day Streak"
            value={7}
            trend={{ value: 3, positive: true }}
          />
          <StatCard
            icon={Target}
            label="Weekly Goal"
            value="85%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tasks */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold font-display">Recent Tasks</h2>
              <Link to="/tasks">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 transition-all hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                          ? "bg-accent"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <span className="font-medium">{task.title}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold font-display">Deadlines</h2>
              <Link to="/deadlines">
                <Button variant="ghost" size="sm" className="text-primary">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{deadline.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {deadline.daysLeft} days
                    </span>
                  </div>
                  <Progress
                    value={Math.max(0, 100 - deadline.daysLeft * 3)}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/ideas" className="group">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Generate Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered project suggestions
                </p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link to="/focus" className="group">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="rounded-lg bg-accent/10 p-3 group-hover:bg-accent/20 transition-colors">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Start Focus Session</h3>
                <p className="text-sm text-muted-foreground">
                  Deep work with Pomodoro timer
                </p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </Link>

          <Link to="/mentor" className="group">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="rounded-lg bg-purple-500/10 p-3 group-hover:bg-purple-500/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Ask AI Mentor</h3>
                <p className="text-sm text-muted-foreground">
                  Get feedback on your ideas
                </p>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
