import data from '../../imports/data.json';

export interface AgentProfile {
  id: string;
  name: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface Layer {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  badge: string;
}

export interface Agent {
  id: string;
  name: string;
  profile: AgentProfile;
  skills: Skill[];
  layers: Layer[];
  provider: Provider;
  createdAt: string;
}

interface DataJSON {
  agentProfiles: AgentProfile[];
  skills: Skill[];
  layers: Layer[];
}

// Import data from JSON with type safety
const typedData = data as DataJSON;

export const PROFILES: AgentProfile[] = typedData.agentProfiles;
export const AVAILABLE_SKILLS: Skill[] = typedData.skills;
export const AVAILABLE_LAYERS: Layer[] = typedData.layers;

export const PROVIDERS: Provider[] = [
  { id: "chatgpt", name: "ChatGPT", badge: "GPT-4" },
  { id: "claude", name: "Claude", badge: "Sonnet" },
  { id: "gemini", name: "Gemini", badge: "Pro" },
  { id: "llama", name: "Llama", badge: "3.1" },
];