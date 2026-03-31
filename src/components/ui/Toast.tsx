// src/components/ui/Toast.tsx
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import type { Toast as ToastType } from '../../types';
import { useEffect } from 'react';

interface ToastProps {
    toast: ToastType;
    onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const severityMap: Record<ToastType['type'], AlertColor> = {
        success: 'success',
        error: 'error',
        info: 'info',
    };

    return (
        <Snackbar
            open={true}
            onClose={() => onClose(toast.id)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={() => onClose(toast.id)} severity={severityMap[toast.type]} variant="filled">
                {toast.message}
            </Alert>
        </Snackbar>
    );
}