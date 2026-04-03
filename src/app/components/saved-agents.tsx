import { Agent } from "../types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Trash2, Upload, Bot } from "lucide-react";

interface SavedAgentsProps {
  agents: Agent[];
  onLoad: (agent: Agent) => void;
  onDelete: (id: string) => void;
}

export function SavedAgents({ agents, onLoad, onDelete }: SavedAgentsProps) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-16">
        <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No agents saved yet</h3>
        <p className="text-gray-500">Create your first agent to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map(agent => (
        <Card key={agent.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-5 w-5 text-indigo-600" />
              {agent.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Profile:</span>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="font-medium">{agent.profile.name}</span>
                  <p className="text-xs text-gray-500 mt-1">{agent.profile.description}</p>
                </div>
              </div>
              
              {agent.skills.length > 0 && (
                <div>
                  <span className="text-gray-500 block mb-1">
                    Skills ({agent.skills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {agent.skills.map(skill => (
                      <Badge 
                        key={skill.id}
                        className="bg-cyan-500 text-white text-xs"
                        title={skill.description}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {agent.layers.length > 0 && (
                <div>
                  <span className="text-gray-500 block mb-1">
                    Layers ({agent.layers.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {agent.layers.map(layer => (
                      <Badge 
                        key={layer.id}
                        variant="outline"
                        className="border-purple-500 text-purple-700 text-xs"
                        title={layer.description}
                      >
                        {layer.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <span className="text-gray-500 block mb-1">Provider:</span>
                <Badge className="bg-indigo-600 text-white">
                  {agent.provider.name} {agent.provider.badge}
                </Badge>
              </div>
              
              <div className="text-xs text-gray-400">
                Created: {new Date(agent.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="pt-4 border-t flex gap-2">
              <Button 
                onClick={() => onLoad(agent)}
                variant="default"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Load
              </Button>
              <Button 
                onClick={() => onDelete(agent.id)}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}