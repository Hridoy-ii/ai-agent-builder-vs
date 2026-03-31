// src/components/ui/Card.tsx
import React from 'react';
import { Paper } from '@mui/material';
import type { PaperProps } from '@mui/material';
import { cn } from '../../utils/helpers';

interface CardProps extends PaperProps {
    children: React.ReactNode;
    padding?: 'none' | 'small' | 'medium' | 'large';
    hover?: boolean;
}

export function Card({
    children,
    className,
    padding = 'medium',
    hover = false,
    ...props
}: CardProps) {
    const paddingStyles = {
        none: '',
        small: 'p-4',
        medium: 'p-6',
        large: 'p-8',
    };

    return (
        <Paper
            elevation={hover ? 3 : 1}
            className={cn(
                'rounded-2xl',
                paddingStyles[padding],
                hover && 'transition-shadow duration-200 hover:shadow-lg',
                className
            )}
            {...props}
        >
            {children}
        </Paper>
    );
}