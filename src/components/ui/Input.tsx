// src/components/ui/Input.tsx
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { cn } from '../../utils/helpers';

type InputProps = TextFieldProps & {
    label?: string;
    error?: string;
};

export function Input({ label, error, className, ...props }: InputProps) {
    return (
        <TextField
            label={label}
            error={!!error}
            helperText={error}
            fullWidth
            className={cn('rounded-xl', className)}
            InputProps={{
                className: 'rounded-xl',
            }}
            InputLabelProps={{
                className: 'text-gray-600',
            }}
            {...props}
        />
    );
}