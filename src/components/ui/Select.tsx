// src/components/ui/Select.tsx
import { FormControl, InputLabel, Select as MUISelect, MenuItem } from '@mui/material';
import type { SelectProps } from '@mui/material';
import { cn } from '../../utils/helpers';

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

interface CustomSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'error'> {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function Select({ label, options, value, onChange, error, className, ...props }: CustomSelectProps) {
    return (
        <FormControl fullWidth error={!!error} className={cn('rounded-xl', className)}>
            {label && <InputLabel className="text-gray-600">{label}</InputLabel>}
            <MUISelect
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value as string)}
                className="rounded-xl"
                {...props}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </MenuItem>
                ))}
            </MUISelect>
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </FormControl>
    );
}