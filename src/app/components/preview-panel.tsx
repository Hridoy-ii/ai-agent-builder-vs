import { Bot, Sparkles } from "lucide-react";
import { AgentProfile, Skill, Layer, Provider } from "../types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PreviewPanelProps {
  profile: AgentProfile | null;
  skills: Skill[];
  layers: Layer[];
  provider: Provider | null;
  agentName: string;
  setAgentName: (name: string) => void;
  onSave: () => void;
}

export function PreviewPanel({ 
  profile, 
  skills, 
  layers, 
  provider, 
  agentName,
  setAgentName,
  onSave 
}: PreviewPanelProps) {
  const canSave = profile && agentName.trim().length > 0;

  return (
    <Card className="shadow-md border-2 border-indigo-100">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-cyan-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">Agent Preview</CardTitle>
            <p className="text-sm text-gray-500">Real-time configuration preview</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Profile */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Profile</h3>
          {profile ? (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-800">{profile.name}</p>
              <p className="text-sm text-gray-600 mt-1">{profile.description}</p>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-400 italic">No profile selected</p>
            </div>
          )}
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Skills {skills.length > 0 && <span className="text-indigo-600">({skills.length})</span>}
          </h3>
          {skills.length > 0 ? (
            <div className="space-y-2">
              {skills.map(skill => (
                <div 
                  key={skill.id}
                  className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-cyan-900">{skill.name}</span>
                    <Badge 
                      className={`text-xs ${
                        skill.category === 'action' 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {skill.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{skill.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-400 italic">No skills added yet</p>
            </div>
          )}
        </div>

        {/* Layers */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Layers {layers.length > 0 && <span className="text-indigo-600">({layers.length})</span>}
          </h3>
          {layers.length > 0 ? (
            <div className="space-y-2">
              {layers.map(layer => (
                <div 
                  key={layer.id}
                  className="p-3 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-purple-900">{layer.name}</span>
                    <Badge 
                      className={`text-xs ${
                        layer.type === 'reasoning' 
                          ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                          : layer.type === 'personality'
                          ? 'bg-pink-500 hover:bg-pink-600 text-white'
                          : layer.type === 'context'
                          ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {layer.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{layer.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-400 italic">No layers added yet</p>
            </div>
          )}
        </div>

        {/* Provider */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Provider</h3>
          {provider ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">{provider.name}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{provider.badge}</span>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-400 italic">No provider selected</p>
            </div>
          )}
        </div>

        {/* Save Section */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Save Agent</h3>
          <div className="space-y-3">
            <Input
              placeholder="Enter agent name..."
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="border-gray-300"
            />
            <Button variant={"ghost"}
              onClick={onSave} 
              disabled={!canSave}
              className="w-full  disabled:bg-gray-300"
            >
              Save Agent
            </Button>
            {!profile && (
              <p className="text-xs text-red-500">Please select a profile to continue</p>
            )}
            {profile && !agentName.trim() && (
              <p className="text-xs text-red-500">Please enter an agent name</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}