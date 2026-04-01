// src/components/agent/ProviderSelector.tsx
import { Grid, Typography } from '@mui/material';
import type { Provider } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../utils/helpers';
import Person4Icon from '@mui/icons-material/Person4';

interface ProviderSelectorProps {
  providers: Provider[];
  selectedProvider: string;
  onSelect: (providerId: string) => void;
}

export function ProviderSelector({ providers, selectedProvider, onSelect }: ProviderSelectorProps) {
  return (
    <Card padding="medium">
      <Typography variant="h6" className="font-bold mb-4">
        4. Select Provider
      </Typography>
      
      <Grid container spacing={2}>
        {providers.map((provider) => (
          <Grid item xs={6} sm={3} key={provider.id}>
            <Button
              variant={selectedProvider === provider.id ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => onSelect(provider.id)}
              className={cn(
                'h-auto py-4 flex-col',
                selectedProvider === provider.id
                  ? 'bg-primary-600'
                  : 'border-gray-300 hover:border-primary-500'
              )}
            >
              <span className="text-2xl mb-1">{provider.icon || <Person4Icon />}</span>
              <Typography variant="subtitle2" className="font-semibold">
                {provider.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {provider.description}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}