import { useState } from "react";
import { AVAILABLE_SKILLS, AVAILABLE_LAYERS, Skill, Layer } from "../types/agent";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Search, Filter, TrendingUp } from "lucide-react";

export function LibraryBrowser() {
  const [skillSearch, setSkillSearch] = useState("");
  const [layerSearch, setLayerSearch] = useState("");
  const [skillCategory, setSkillCategory] = useState<string>("all");
  const [layerType, setLayerType] = useState<string>("all");

  const skillCategories = ["all", ...Array.from(new Set(AVAILABLE_SKILLS.map(s => s.category)))];
  const layerTypes = ["all", ...Array.from(new Set(AVAILABLE_LAYERS.map(l => l.type)))];

  // Calculate category counts
  const skillCategoryCounts = AVAILABLE_SKILLS.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const layerTypeCounts = AVAILABLE_LAYERS.reduce((acc, layer) => {
    acc[layer.type] = (acc[layer.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredSkills = AVAILABLE_SKILLS.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
                         skill.description.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesCategory = skillCategory === "all" || skill.category === skillCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredLayers = AVAILABLE_LAYERS.filter(layer => {
    const matchesSearch = layer.name.toLowerCase().includes(layerSearch.toLowerCase()) ||
                         layer.description.toLowerCase().includes(layerSearch.toLowerCase());
    const matchesType = layerType === "all" || layer.type === layerType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 lg:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Library</h1>
        <p className="text-gray-600">
          Explore all available skills and layers for your AI agents
        </p>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="skills">Skills ({AVAILABLE_SKILLS.length})</TabsTrigger>
          <TabsTrigger value="layers">Layers ({AVAILABLE_LAYERS.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4">
          {/* Category Summary */}
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.entries(skillCategoryCounts).map(([category, count]) => (
              <Badge 
                key={category}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  skillCategory === category 
                    ? 'bg-cyan-100 border-cyan-500 text-cyan-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSkillCategory(category)}
              >
                {category}: {count}
              </Badge>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search skills..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Filter className="h-5 w-5 text-gray-400 self-center" />
              <select
                value={skillCategory}
                onChange={(e) => setSkillCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                {skillCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map(skill => (
              <Card key={skill.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <Badge 
                      className={`text-xs ${
                        skill.category === 'action' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {skill.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No skills found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="layers" className="space-y-4">
          {/* Type Summary */}
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.entries(layerTypeCounts).map(([type, count]) => (
              <Badge 
                key={type}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  layerType === type 
                    ? 'bg-cyan-100 border-cyan-500 text-cyan-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setLayerType(type)}
              >
                {type}: {count}
              </Badge>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search layers..."
                value={layerSearch}
                onChange={(e) => setLayerSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Filter className="h-5 w-5 text-gray-400 self-center" />
              <select
                value={layerType}
                onChange={(e) => setLayerType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                {layerTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Layers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLayers.map(layer => (
              <Card key={layer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{layer.name}</CardTitle>
                    <Badge 
                      className={`text-xs ${
                        layer.type === 'reasoning' 
                          ? 'bg-purple-500 text-white' 
                          : layer.type === 'personality'
                          ? 'bg-pink-500 text-white'
                          : layer.type === 'context'
                          ? 'bg-indigo-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {layer.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{layer.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLayers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No layers found matching your criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}