// src/components/agent/AgentPreview.tsx
import { Typography, Box, Chip } from '@mui/material';
import type { AgentState, AgentData } from '../../types';
import { Card } from '../ui/Card';
import { cn } from '../../utils/helpers';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Person4Icon from '@mui/icons-material/Person4';
import BoltIcon from '@mui/icons-material/Bolt';

interface AgentPreviewProps {
    state: AgentState;
    data: AgentData | null;
}

export function AgentPreview({ state, data }: AgentPreviewProps) {
    const profile = data?.agentProfiles.find(p => p.id === state.profileId);
    const skills = data?.skills.filter(s => state.skillIds.includes(s.id)) || [];
    const layers = data?.layers.filter(l => state.layerIds.includes(l.id)) || [];
    const provider = data?.providers?.find(p => p.id === state.provider);

    if (!profile) {
        return (
            <Card padding="large" className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
                <Box className="text-center py-12">
                    <Box className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-200 flex items-center justify-center">
                        <span className="text-4xl opacity-50">{<Person4Icon />}</span>
                    </Box>
                    <Typography variant="h6" className="text-gray-700 mb-2">
                        No Agent Configured
                    </Typography>
                    <Typography className="text-gray-500">
                        Select a profile and add skills to see your agent come to life
                    </Typography>
                </Box>
            </Card>
        );
    }

    return (
        <Card padding="none" className="overflow-hidden">
            {/* Header */}
            <Box className={cn('bg-gradient-to-r p-6 text-white', profile.color || 'from-primary-500 to-purple-600')}>
                <Box className="flex items-start justify-between">
                    <Box className="flex items-center gap-4">
                        <Box className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg">
                            {profile.icon || <SmartToyIcon />}
                        </Box>
                        <Box>
                            <Typography variant="h5" className="font-bold">
                                {state.name || 'Untitled Agent'}
                            </Typography>
                            <Typography className="text-white/80">{profile.name}</Typography>
                        </Box>
                    </Box>
                    <Box className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" />
                </Box>
            </Box>

            {/* Body */}
            <Box className="p-6 space-y-6">
                {/* Description */}
                <Box>
                    <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold">
                        Description
                    </Typography>
                    <Typography className="text-gray-700 mt-1">{profile.description}</Typography>
                </Box>

                {/* Skills */}
                {skills.length > 0 && (
                    <Box>
                        <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold">
                            Skills
                        </Typography>
                        <Box className="flex flex-wrap gap-2 mt-2">
                            {skills.map(skill => (
                                <Chip
                                    key={skill.id}
                                    label={`${skill.icon || <BoltIcon />} ${skill.name}`}
                                    color="primary"
                                    size="small"
                                    className="rounded-full"
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Layers */}
                {layers.length > 0 && (
                    <Box>
                        <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold">
                            Personality
                        </Typography>
                        <Box className="flex flex-wrap gap-2 mt-2">
                            {layers.map(layer => (
                                <Chip
                                    key={layer.id}
                                    label={`${layer.icon || <TipsAndUpdatesIcon />} ${layer.name}`}
                                    color="secondary"
                                    size="small"
                                    className="rounded-full"
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Provider */}
                {provider && (
                    <Box className="pt-4 border-t border-gray-100">
                        <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold">
                            Powered By
                        </Typography>
                        <Box className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mt-2">
                            <span className="text-2xl">{provider.icon || <Person4Icon />}</span>
                            <Box>
                                <Typography variant="subtitle2" className="font-semibold">
                                    {provider.name}
                                </Typography>
                                <Typography variant="caption" className="text-gray-500">
                                    {provider.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Card>
    );
}