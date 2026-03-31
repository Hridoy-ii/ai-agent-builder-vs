// src/components/ui/Chip.tsx
import { Chip as MUIChip } from '@mui/material';
import type { ChipProps as MUIChipProps } from '@mui/material';
import { cn } from '../../utils/helpers';

interface ChipProps extends MUIChipProps {
    label: string;
    onDelete?: () => void;
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
    iconName?: string;
}

export function Chip({ label, onDelete, color = 'primary', iconName, ...props }: ChipProps) {
    return (
        <MUIChip
            label={iconName ? `${iconName} ${label}` : label}
            onDelete={onDelete}
            color={color}
            className={cn('rounded-full font-medium', onDelete && 'hover:bg-red-100')}
            {...props}
        />
    );
}