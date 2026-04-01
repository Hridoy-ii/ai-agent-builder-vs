// src/components/agent/ProfileSelector.tsx
import { Grid, Typography, Box } from '@mui/material';
import type { AgentProfile } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../utils/helpers';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface ProfileSelectorProps {
    profiles: AgentProfile[];
    selectedProfile: string;
    onSelect: (profileId: string) => void;
}

export function ProfileSelector({ profiles, selectedProfile, onSelect }: ProfileSelectorProps) {
    return (
        <Card padding="medium">
            <Box className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="font-bold">
                    1. Choose Profile
                </Typography>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Required</span>
            </Box>

            <Grid container spacing={2}>
                {profiles.map((profile) => (
                    <Grid item xs={12} sm={6} key={profile.id}>
                        <Button
                            variant={selectedProfile === profile.id ? 'contained' : 'outlined'}
                            fullWidth
                            onClick={() => onSelect(profile.id)}
                            className={cn(
                                'h-auto py-4 justify-start text-left',
                                selectedProfile === profile.id
                                    ? 'bg-primary-600'
                                    : 'border-gray-300 hover:border-primary-500'
                            )}
                        >
                            <Box>
                                <Typography variant="subtitle1" className="font-semibold">
                                    {profile.icon || <ManageAccountsIcon />} {profile.name}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500 mt-1">
                                    {profile.description}
                                </Typography>
                            </Box>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Card>
    );
}