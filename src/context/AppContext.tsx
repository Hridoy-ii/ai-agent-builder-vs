// src/context/AppContext.tsx
import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { AgentState, SavedAgent, AppContextType, Toast } from '../types';
import { generateId } from '../utils/helpers';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSessionTimer } from '../hooks/useSessionTimer';

const initialState: AgentState = {
  name: '',
  profileId: '',
  skillIds: [],
  layerIds: [],
  provider: '',
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PROFILE'; payload: string }
  | { type: 'ADD_SKILL'; payload: string }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'ADD_LAYER'; payload: string }
  | { type: 'REMOVE_LAYER'; payload: string }
  | { type: 'SET_PROVIDER'; payload: string }
  | { type: 'LOAD_AGENT'; payload: AgentState }
  | { type: 'RESET' };

function agentReducer(state: AgentState, action: Action): AgentState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PROFILE':
      return { ...state, profileId: action.payload };
    case 'ADD_SKILL':
      return state.skillIds.includes(action.payload)
        ? state
        : { ...state, skillIds: [...state.skillIds, action.payload] };
    case 'REMOVE_SKILL':
      return { ...state, skillIds: state.skillIds.filter(id => id !== action.payload) };
    case 'ADD_LAYER':
      return state.layerIds.includes(action.payload)
        ? state
        : { ...state, layerIds: [...state.layerIds, action.payload] };
    case 'REMOVE_LAYER':
      return { ...state, layerIds: state.layerIds.filter(id => id !== action.payload) };
    case 'SET_PROVIDER':
      return { ...state, provider: action.payload };
    case 'LOAD_AGENT':
      return { ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(agentReducer, initialState);
  const [savedAgents, setSavedAgents] = useLocalStorage<SavedAgent[]>('savedAgents', []);
  const { seconds: sessionTime } = useSessionTimer();
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  // Analytics heartbeat
  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        state.name
          ? `[Analytics Heartbeat] User is working on agent named: "${state.name}"`
          : '[Analytics Heartbeat] User is working on an unnamed agent draft...'
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [state.name]);

  const setName = useCallback((name: string) => {
    dispatch({ type: 'SET_NAME', payload: name });
  }, []);

  const setProfile = useCallback((profileId: string) => {
    dispatch({ type: 'SET_PROFILE', payload: profileId });
  }, []);

  const addSkill = useCallback((skillId: string) => {
    dispatch({ type: 'ADD_SKILL', payload: skillId });
  }, []);

  const removeSkill = useCallback((skillId: string) => {
    dispatch({ type: 'REMOVE_SKILL', payload: skillId });
  }, []);

  const addLayer = useCallback((layerId: string) => {
    dispatch({ type: 'ADD_LAYER', payload: layerId });
  }, []);

  const removeLayer = useCallback((layerId: string) => {
    dispatch({ type: 'REMOVE_LAYER', payload: layerId });
  }, []);

  const setProvider = useCallback((provider: string) => {
    dispatch({ type: 'SET_PROVIDER', payload: provider });
  }, []);

  const saveAgent = useCallback((): SavedAgent | null => {
    if (!state.name.trim() || !state.profileId) {
      return null;
    }

    const newAgent: SavedAgent = {
      id: generateId(),
      name: state.name,
      profileId: state.profileId,
      skillIds: [...state.skillIds],
      layerIds: [...state.layerIds],
      provider: state.provider,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSavedAgents(prev => [newAgent, ...prev]);
    return newAgent;
  }, [state, setSavedAgents]);

  const loadAgent = useCallback((agent: SavedAgent) => {
    dispatch({
      type: 'LOAD_AGENT',
      payload: {
        name: agent.name,
        profileId: agent.profileId,
        skillIds: agent.skillIds,
        layerIds: agent.layerIds,
        provider: agent.provider || '',
      },
    });
  }, []);

  const deleteAgent = useCallback((agentId: string) => {
    setSavedAgents(prev => prev.filter(agent => agent.id !== agentId));
  }, [setSavedAgents]);

  const clearAllAgents = useCallback(() => {
    setSavedAgents([]);
  }, [setSavedAgents]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const canSave = state.name.trim().length > 0 && state.profileId.length > 0;

  return (
    <AppContext.Provider
      value={{
        agentState: state,
        savedAgents,
        loading: false,
        error: null,
        sessionTime,
        setName,
        setProfile,
        addSkill,
        removeSkill,
        addLayer,
        removeLayer,
        setProvider,
        saveAgent,
        loadAgent,
        deleteAgent,
        clearAllAgents,
        reset,
        canSave,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}