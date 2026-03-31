// src/components/layout/Footer.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export function Footer() {
  return (
    <Box className="bg-white border-t border-gray-200 mt-16">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Box className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography className="text-sm text-gray-500">
            © 2026 Nexus AI Builder. Crafted with care.
          </Typography>
          <Box className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              GitHub
            </Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}