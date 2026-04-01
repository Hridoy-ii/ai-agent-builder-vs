// src/components/agent/SavedAgents.tsx
import { Grid, Typography, Box, Chip } from '@mui/material';
import type { SavedAgent, AgentData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/helpers';
import { cn } from '../../utils/helpers';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface SavedAgentsProps {
  agents: SavedAgent[];
  data: AgentData | null;
  onLoad: (agent: SavedAgent) => void;
  onDelete: (agentId: string) => void;
  onClearAll: () => void;
}

export function SavedAgents({ agents, data, onLoad, onDelete, onClearAll }: SavedAgentsProps) {
  if (agents.length === 0) {
    return (
      <Card padding="large" className="text-center">
        <Box className="text-6xl mb-4">{<ViewInArIcon />}</Box>
        <Typography variant="h6" className="text-gray-900 mb-2">
          No saved agents yet
        </Typography>
        <Typography className="text-gray-500">
          Create your first agent to get started
        </Typography>
      </Card>
    );
  }

  return (
    <Box>
      <Box className="flex items-center justify-between mb-6">
        <Typography variant="h5" className="font-bold">
          Saved Agents
        </Typography>
        <Box className="flex items-center gap-4">
          <Typography className="text-sm text-gray-500">
            {agents.length} agent{agents.length !== 1 ? 's' : ''}
          </Typography>
          <Button variant="outlined" color="error" size="small" onClick={onClearAll}>
            Clear All
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {agents.map((agent) => {
          const profile = data?.agentProfiles.find(p => p.id === agent.profileId);
          const provider = data?.providers?.find(p => p.id === agent.provider);

          return (
            <Grid item xs={12} sm={6} md={4} key={agent.id}>
              <Card padding="medium" hover className="h-full flex flex-col">
                <Box className="flex items-start justify-between mb-3">
                  <Box className="flex items-center gap-3">
                    <Box
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md',
                        profile?.color || 'bg-gradient-to-br from-primary-500 to-purple-600'
                      )}
                    >
                      {profile?.icon || <SmartToyIcon />}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="font-bold">
                        {agent.name}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {profile?.name || 'Unknown'}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip label={formatDate(agent.createdAt)} size="small" className="bg-gray-100" />
                </Box>

                <Box className="space-y-2 mb-4 flex-1">
                  <Box className="flex items-center gap-2 text-xs text-gray-600">
                    <Typography className="w-16">Skills:</Typography>
                    <Typography className="font-medium">{agent.skillIds.length}</Typography>
                  </Box>
                  <Box className="flex items-center gap-2 text-xs text-gray-600">
                    <Typography className="w-16">Layers:</Typography>
                    <Typography className="font-medium">{agent.layerIds.length}</Typography>
                  </Box>
                  <Box className="flex items-center gap-2 text-xs text-gray-600">
                    <Typography className="w-16">Provider:</Typography>
                    <Typography className="font-medium">{provider?.name || 'None'}</Typography>
                  </Box>
                </Box>

                <Box className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button variant="contained" size="small" onClick={() => onLoad(agent)} className="flex-1">
                    Load
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => onDelete(agent.id)}>
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}