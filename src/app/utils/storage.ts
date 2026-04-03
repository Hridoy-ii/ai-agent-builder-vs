import { Agent } from '../types/agent';

const STORAGE_KEY = 'ai-agent-builder-agents';

export const agentStorage = {
  getAll(): Agent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(agent: Agent): void {
    const agents = this.getAll();
    agents.push(agent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  },

  delete(id: string): void {
    const agents = this.getAll().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  },

  getById(id: string): Agent | undefined {
    return this.getAll().find(a => a.id === id);
  }
};
