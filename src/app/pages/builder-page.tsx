import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Sparkles, Database, Layers3, Zap } from "lucide-react";
import { AgentProfile, Skill, Layer, Provider, PROFILES, AVAILABLE_SKILLS, AVAILABLE_LAYERS } from "../types/agent";
import { agentStorage } from "../utils/storage";
import { ConfigPanel } from "../components/config-panel";
import { PreviewPanel } from "../components/preview-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";


export function BuilderPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AgentProfile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [agentName, setAgentName] = useState("");

  const handleSave = () => {
    if (!profile || !agentName.trim()) {
      toast.error("Please complete all required fields");
      return;
    }

    const agent = {
      id: Date.now().toString(),
      name: agentName.trim(),
      profile,
      skills,
      layers,
      provider: provider || { id: "default", name: "Default", badge: "v1" },
      createdAt: new Date().toISOString(),
    };

    agentStorage.save(agent);
    toast.success("Agent saved successfully!", {
      description: `"${agentName}" has been added to your saved agents.`,
    });

    // Reset form
    setProfile(null);
    setSkills([]);
    setLayers([]);
    setProvider(null);
    setAgentName("");

    // Navigate to saved page after a short delay
    setTimeout(() => navigate("/saved"), 1000);
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 nebula-bg rounded-xl text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-6 w-6" />
          <h1 className="text-2xl font-semibold">Nebula Ai Agent Builder</h1>
        </div>
        <p className="text-indigo-50">
          Design and configure your custom AI agents with ease. Select a profile, add skills and layers, then save for later use.
        </p>
      </div>

      {/* Stats Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Database className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{PROFILES.length}</p>
              <p className="text-sm text-gray-500">Agent Profiles</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Zap className="h-5 w-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{AVAILABLE_SKILLS.length}</p>
              <p className="text-sm text-gray-500">Skills Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Layers3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{AVAILABLE_LAYERS.length}</p>
              <p className="text-sm text-gray-500">Layers Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <ConfigPanel
              profile={profile}
              setProfile={setProfile}
              skills={skills}
              setSkills={setSkills}
              layers={layers}
              setLayers={setLayers}
              provider={provider}
              setProvider={setProvider}
            />
          </div>
          <div className="col-span-3">
            <PreviewPanel
              profile={profile}
              skills={skills}
              layers={layers}
              provider={provider}
              agentName={agentName}
              setAgentName={setAgentName}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout with Tabs */}
      <div className="lg:hidden">
        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="config" className="mt-0">
            <ConfigPanel
              profile={profile}
              setProfile={setProfile}
              skills={skills}
              setSkills={setSkills}
              layers={layers}
              setLayers={setLayers}
              provider={provider}
              setProvider={setProvider}
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-0">
            <PreviewPanel
              profile={profile}
              skills={skills}
              layers={layers}
              provider={provider}
              agentName={agentName}
              setAgentName={setAgentName}
              onSave={handleSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}