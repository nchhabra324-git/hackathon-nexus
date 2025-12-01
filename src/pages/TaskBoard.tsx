import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  KanbanSquare,
  Plus,
  GripVertical,
  MoreHorizontal,
  Calendar,
  Tag,
  Trash2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-muted-foreground",
    tasks: [
      { id: "1", title: "Research APIs for project", priority: "high" },
      { id: "2", title: "Design wireframes", priority: "medium" },
      { id: "3", title: "Set up development environment", priority: "low" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-accent",
    tasks: [
      { id: "4", title: "Build authentication system", priority: "high" },
      { id: "5", title: "Create database schema", priority: "medium" },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    color: "bg-green-500",
    tasks: [
      { id: "6", title: "Project ideation", priority: "high" },
      { id: "7", title: "Team formation", priority: "low" },
    ],
  },
];

export default function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingToColumn, setAddingToColumn] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; columnId: string } | null>(null);

  const handleAddTask = (columnId: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      priority: "medium",
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
    setNewTaskTitle("");
    setAddingToColumn(null);
    toast({ title: "Task added!" });
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
    toast({ title: "Task deleted" });
  };

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask || draggedTask.columnId === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    setColumns((prev) => {
      const newColumns = prev.map((col) => {
        if (col.id === draggedTask.columnId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== draggedTask.task.id),
          };
        }
        if (col.id === targetColumnId) {
          return { ...col, tasks: [...col.tasks, draggedTask.task] };
        }
        return col;
      });
      return newColumns;
    });

    toast({ title: `Task moved to ${columns.find((c) => c.id === targetColumnId)?.title}` });
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold font-display flex items-center gap-3">
            <KanbanSquare className="h-8 w-8 text-primary" />
            Task Board
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize your hackathon tasks with drag-and-drop simplicity
          </p>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="rounded-xl border border-border bg-card/50 p-4 space-y-4"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${column.color}`} />
                  <h3 className="font-semibold">{column.title}</h3>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                    {column.tasks.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAddingToColumn(column.id)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Add Task Input */}
              {addingToColumn === column.id && (
                <div className="space-y-2 animate-scale-in">
                  <Input
                    placeholder="Task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTask(column.id)}
                    autoFocus
                    className="bg-secondary"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddTask(column.id)}
                      className="flex-1"
                    >
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAddingToColumn(null);
                        setNewTaskTitle("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Tasks */}
              <div className="space-y-2 min-h-[200px]">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="group rounded-lg border border-border bg-card p-3 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-sm">{task.title}</p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Tag className="mr-2 h-4 w-4" />
                            Change Priority
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Set Due Date
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteTask(column.id, task.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
