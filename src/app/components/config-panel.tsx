import { useState } from "react";
import { X, Info } from "lucide-react";
import { AgentProfile, Skill, Layer, Provider, PROFILES, AVAILABLE_SKILLS, AVAILABLE_LAYERS, PROVIDERS } from "../types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown } from "lucide-react";

interface ConfigPanelProps {
  profile: AgentProfile | null;
  setProfile: (profile: AgentProfile | null) => void;
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
  provider: Provider | null;
  setProvider: (provider: Provider | null) => void;
}

export function ConfigPanel({ 
  profile, 
  setProfile, 
  skills, 
  setSkills, 
  layers, 
  setLayers, 
  provider, 
  setProvider 
}: ConfigPanelProps) {
  const [skillOpen, setSkillOpen] = useState(false);
  const [layerOpen, setLayerOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [layerFilter, setLayerFilter] = useState<string>("all");

  const addSkill = (skill: Skill) => {
    if (!skills.find(s => s.id === skill.id)) {
      setSkills([...skills, skill]);
    }
    setSkillOpen(false);
  };

  const removeSkill = (skillId: string) => {
    setSkills(skills.filter(s => s.id !== skillId));
  };

  const addLayer = (layer: Layer) => {
    if (!layers.find(l => l.id === layer.id)) {
      setLayers([...layers, layer]);
    }
    setLayerOpen(false);
  };

  const removeLayer = (layerId: string) => {
    setLayers(layers.filter(l => l.id !== layerId));
  };

  const filteredSkills = skillFilter === "all" 
    ? AVAILABLE_SKILLS 
    : AVAILABLE_SKILLS.filter(s => s.category === skillFilter);

  const filteredLayers = layerFilter === "all" 
    ? AVAILABLE_LAYERS 
    : AVAILABLE_LAYERS.filter(l => l.type === layerFilter);

  const skillCategories = ["all", ...Array.from(new Set(AVAILABLE_SKILLS.map(s => s.category)))];
  const layerTypes = ["all", ...Array.from(new Set(AVAILABLE_LAYERS.map(l => l.type)))];

  return (
    <div className="space-y-4">
      {/* Base Profile */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Base Profile
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {PROFILES.map(p => (
              <button
                key={p.id}
                onClick={() => setProfile(p)}
                className={`text-left p-3 rounded-lg border-2 transition-all ${
                  profile?.id === p.id 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                title={p.description}
              >
                <div className="font-medium text-sm">{p.name}</div>
                <div className="text-xs text-gray-500 mt-1">{p.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Skill */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Add Skill
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Popover open={skillOpen} onOpenChange={setSkillOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Select skills...
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search skills..." />
                <CommandList>
                  <CommandEmpty>No skill found.</CommandEmpty>
                  <CommandGroup>
                    {filteredSkills.map(skill => (
                      <CommandItem
                        key={skill.id}
                        onSelect={() => addSkill(skill)}
                        disabled={skills.some(s => s.id === skill.id)}
                        className="flex items-start justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{skill.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                skill.category === 'action' 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }`}
                            >
                              {skill.category}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{skill.description}</div>
                        </div>
                        {skills.some(s => s.id === skill.id) && (
                          <span className="ml-2 text-xs text-gray-500">Added</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge 
                  key={skill.id} 
                  variant="secondary"
                  className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 pr-1 cursor-help"
                  title={`${skill.name} - ${skill.description}`}
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-1 hover:bg-cyan-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {skills.length === 0 && (
            <p className="text-sm text-gray-500 italic">No skills added yet</p>
          )}
        </CardContent>
      </Card>

      {/* Add Layer */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Add Layer
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Popover open={layerOpen} onOpenChange={setLayerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Select layers...
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search layers..." />
                <CommandList>
                  <CommandEmpty>No layer found.</CommandEmpty>
                  <CommandGroup>
                    {filteredLayers.map(layer => (
                      <CommandItem
                        key={layer.id}
                        onSelect={() => addLayer(layer)}
                        disabled={layers.some(l => l.id === layer.id)}
                        className="flex items-start justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{layer.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                layer.type === 'reasoning' 
                                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                                  : layer.type === 'personality'
                                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                                  : layer.type === 'context'
                                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {layer.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{layer.description}</div>
                        </div>
                        {layers.some(l => l.id === layer.id) && (
                          <span className="ml-2 text-xs text-gray-500">Added</span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {layers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {layers.map(layer => (
                <Badge 
                  key={layer.id} 
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 pr-1 cursor-help"
                  title={`${layer.name} - ${layer.description}`}
                >
                  {layer.name}
                  <button
                    onClick={() => removeLayer(layer.id)}
                    className="ml-1 hover:bg-purple-300 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {layers.length === 0 && (
            <p className="text-sm text-gray-500 italic">No layers added yet</p>
          )}
        </CardContent>
      </Card>

      {/* Provider */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Provider
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {PROVIDERS.map(p => (
              <button
                key={p.id}
                onClick={() => setProvider(p)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  provider?.id === p.id 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="font-medium text-sm">{p.name}</div>
                <div className="text-xs text-gray-500 mt-1">{p.badge}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}