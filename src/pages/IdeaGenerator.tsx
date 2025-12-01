import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Lightbulb,
  Sparkles,
  Wand2,
  Copy,
  Heart,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const sampleIdeas = [
  {
    title: "EcoTrack - Carbon Footprint Calculator",
    description:
      "A mobile app that tracks your daily activities and calculates your carbon footprint. Uses AI to suggest personalized eco-friendly alternatives and gamifies sustainability with achievements and challenges.",
    tags: ["Sustainability", "AI", "Mobile"],
    difficulty: "Medium",
  },
  {
    title: "StudyBuddy AI",
    description:
      "An AI-powered study companion that creates personalized flashcards from your notes, generates practice questions, and adapts to your learning pace using spaced repetition algorithms.",
    tags: ["EdTech", "AI", "Learning"],
    difficulty: "Hard",
  },
  {
    title: "LocalEats Discovery",
    description:
      "A platform connecting food enthusiasts with hidden gem restaurants and home cooks in their area. Features include AR menu previews, dietary preference matching, and community reviews.",
    tags: ["Food", "AR", "Community"],
    difficulty: "Medium",
  },
];

export default function IdeaGenerator() {
  const [theme, setTheme] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState<typeof sampleIdeas>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState<number[]>([]);

  const handleGenerate = async () => {
    if (!theme.trim()) {
      toast({
        title: "Please enter a theme",
        description: "Enter a theme, domain, or keyword to generate ideas",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setGeneratedIdeas(sampleIdeas);
    setIsGenerating(false);
    toast({
      title: "Ideas Generated!",
      description: "Here are some project ideas based on your theme",
    });
  };

  const handleImprove = async () => {
    if (!userIdea.trim()) {
      toast({
        title: "Please enter your idea",
        description: "Write your idea first and we'll help improve it",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Idea Improved!",
      description: "Your idea has been enhanced with AI suggestions",
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const toggleSave = (index: number) => {
    setSavedIdeas((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold font-display flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            AI Idea Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate unique hackathon project ideas or improve your existing concepts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generate New Ideas */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold font-display">Generate New Ideas</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter a theme, domain, or keyword to spark inspiration
            </p>
            <Input
              placeholder="e.g., Healthcare, Climate, Education, Gaming..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-secondary/50"
            />
            <div className="flex flex-wrap gap-2">
              {["AI/ML", "Web3", "Health", "Climate", "Education"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTheme(tag)}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Ideas
                </>
              )}
            </Button>
          </div>

          {/* Improve Your Idea */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold font-display">Improve Your Idea</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Describe your idea and let AI enhance it with suggestions
            </p>
            <Textarea
              placeholder="Describe your hackathon idea here..."
              value={userIdea}
              onChange={(e) => setUserIdea(e.target.value)}
              className="min-h-[120px] bg-secondary/50 resize-none"
            />
            <Button
              onClick={handleImprove}
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Enhance Idea
            </Button>
          </div>
        </div>

        {/* Generated Ideas */}
        {generatedIdeas.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-display">Generated Ideas</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {generatedIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-card p-5 space-y-4 transition-all hover:border-primary/30 hover:shadow-lg animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{idea.title}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        idea.difficulty === "Hard"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {idea.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {idea.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(idea.description)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSave(index)}
                      className={savedIdeas.includes(index) ? "text-red-500" : ""}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          savedIdeas.includes(index) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <Button variant="ghost" size="sm" className="ml-auto text-primary">
                      Explore <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
