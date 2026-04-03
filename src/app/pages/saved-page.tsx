import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Agent } from "../types/agent";
import { agentStorage } from "../utils/storage";
import { SavedAgents } from "../components/saved-agents";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export function SavedPage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for better UX
    setTimeout(() => {
      const loadedAgents = agentStorage.getAll();
      setAgents(loadedAgents);
      setLoading(false);
    }, 300);
  }, []);

  const handleLoad = (agent: Agent) => {
    toast.success("Agent loaded!", {
      description: `"${agent.name}" is ready to use.`,
    });
    navigate("/");
  };

  const handleDeleteClick = (id: string) => {
    setAgentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!agentToDelete) return;
    
    const agent = agents.find(a => a.id === agentToDelete);
    agentStorage.delete(agentToDelete);
    setAgents(agents.filter(a => a.id !== agentToDelete));
    toast.success("Agent deleted", {
      description: agent ? `"${agent.name}" has been removed.` : "Agent removed successfully.",
    });
    
    setDeleteDialogOpen(false);
    setAgentToDelete(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Saved Agents</h1>
          <p className="text-gray-500 mt-1">Manage and load your AI agent configurations</p>
        </div>
        <Link to="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>
      <SavedAgents agents={agents} onLoad={handleLoad} onDelete={handleDeleteClick} />
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this agent. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}