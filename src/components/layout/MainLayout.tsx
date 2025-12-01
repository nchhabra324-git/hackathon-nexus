import { Sidebar } from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-lg">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">HackFlow</span>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background pt-14">
            <nav className="p-4 space-y-2">
              {[
                { label: "Dashboard", path: "/" },
                { label: "Idea Generator", path: "/ideas" },
                { label: "Task Board", path: "/tasks" },
                { label: "Deadlines", path: "/deadlines" },
                { label: "Resources", path: "/resources" },
                { label: "Focus Mode", path: "/focus" },
                { label: "AI Mentor", path: "/mentor" },
              ].map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-lg font-medium text-foreground hover:bg-secondary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Content */}
        <main className="pt-14 px-4 pb-8">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={cn("ml-64 min-h-screen transition-all duration-300")}>
        {children}
      </main>
    </div>
  );
}
