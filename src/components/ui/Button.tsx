// src/components/ui/Button.tsx
import React from 'react';
import { Button as MUIButton } from '@mui/material';
import type { ButtonProps as MUIButtonProps } from '@mui/material';
import { cn } from '../../utils/helpers';

interface ButtonProps extends MUIButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <MUIButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || isLoading}
      className={cn('rounded-xl font-medium', className)}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <span className="animate-spin">⏳</span>
        </span>
      )}
      {children}
    </MUIButton>
  );
}