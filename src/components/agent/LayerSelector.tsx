// src/components/agent/LayerSelector.tsx
import { Grid, Typography, Box, Chip } from '@mui/material';
import type { Layer } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../utils/helpers';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

interface LayerSelectorProps {
  layers: Layer[];
  selectedLayerIds: string[];
  onAdd: (layerId: string) => void;
  onRemove: (layerId: string) => void;
}

export function LayerSelector({ layers, selectedLayerIds, onAdd, onRemove }: LayerSelectorProps) {
  const selectedLayers = layers.filter(l => selectedLayerIds.includes(l.id));
  const availableLayers = layers.filter(l => !selectedLayerIds.includes(l.id));

  return (
    <Card padding="medium">
      <Typography variant="h6" className="font-bold mb-4">
        3. Set Personality
      </Typography>

      {/* Selected Layers */}
      {selectedLayers.length > 0 && (
        <Box className="mb-4">
          <Typography variant="body2" className="text-gray-500 mb-2">
            Selected Layers (click × to remove)
          </Typography>
          <Box className="flex flex-wrap gap-2">
            {selectedLayers.map(layer => (
              <Chip
                key={layer.id}
                label={`${layer.icon || <TipsAndUpdatesIcon />} ${layer.name}`}
                onDelete={() => onRemove(layer.id)}
                color="secondary"
                className="rounded-full"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Layers Grid */}
      <Grid container spacing={2}>
        {availableLayers.map((layer) => (
          <Grid item xs={6} sm={4} key={layer.id}>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              onClick={() => onAdd(layer.id)}
              className={cn(
                'justify-start',
                'border-gray-300 hover:border-secondary-500 hover:bg-secondary-50'
              )}
            >
              {layer.icon || <TipsAndUpdatesIcon />} {layer.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}