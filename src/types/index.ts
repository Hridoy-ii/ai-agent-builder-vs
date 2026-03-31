// src/types/index.ts
export interface AgentProfile {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
}

export interface Layer {
  id: string;
  name: string;
  type: string;
  description: string;
  icon?: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
}

export interface AgentData {
  agentProfiles: AgentProfile[];
  skills: Skill[];
  layers: Layer[];
  providers?: Provider[];
}

export interface SavedAgent {
  id: string;
  name: string;
  profileId: string;
  skillIds: string[];
  layerIds: string[];
  provider?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentState {
  name: string;
  profileId: string;
  skillIds: string[];
  layerIds: string[];
  provider: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface AppContextType {
  agentState: AgentState;
  savedAgents: SavedAgent[];
  loading: boolean;
  error: string | null;
  sessionTime: number;
  setName: (name: string) => void;
  setProfile: (profileId: string) => void;
  addSkill: (skillId: string) => void;
  removeSkill: (skillId: string) => void;
  addLayer: (layerId: string) => void;
  removeLayer: (layerId: string) => void;
  setProvider: (provider: string) => void;
  saveAgent: () => SavedAgent | null;
  loadAgent: (agent: SavedAgent) => void;
  deleteAgent: (agentId: string) => void;
  clearAllAgents: () => void;
  reset: () => void;
  canSave: boolean;
}