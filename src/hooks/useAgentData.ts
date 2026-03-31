// src/hooks/useAgentData.ts
import { useState, useEffect, useCallback } from 'react';
import { AgentData } from '../types';

interface UseAgentDataReturn {
  data: AgentData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAgentData(): UseAgentDataReturn {
  const [data, setData] = useState<AgentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate network delay for testing loading states
      const delay = Math.floor(Math.random() * 2000) + 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      const response = await fetch('/data.json');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData: AgentData = await response.json();
      setData(jsonData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch agent data';
      console.error('Error fetching agent data:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}