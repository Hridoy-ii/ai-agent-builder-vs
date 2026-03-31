// src/components/layout/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem } from '@mui/material';
import { formatTime } from '../../utils/helpers';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sessionTime: number;
}

export function Navbar({ activeTab, setActiveTab, sessionTime }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const tabs = [
    { id: 'builder', label: 'Builder' },
    { id: 'saved', label: 'Saved' },
    { id: 'templates', label: 'Templates' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className="px-4 py-2">
      {tabs.map(tab => (
        <ListItem button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileOpen(false); }}>
          <Typography className={activeTab === tab.id ? 'text-primary-600 font-semibold' : 'text-gray-600'}>
            {tab.label}
          </Typography>
        </ListItem>
      ))}
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={1} className="bg-white/80 backdrop-blur-lg">
      <Toolbar>
        <Box className="flex items-center gap-3 flex-1">
          <Box className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-xl">🤖</span>
          </Box>
          <Box>
            <Typography variant="h6" className="font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Nexus AI
            </Typography>
            <Typography variant="caption" className="text-gray-500 -mt-1">
              Agent Builder
            </Typography>
          </Box>
        </Box>

        {/* Desktop Navigation */}
        <Box className="hidden md:flex items-center gap-2">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        {/* Right Side */}
        <Box className="flex items-center gap-4">
          <Box className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
            <span className="text-sm text-gray-500">⏱️</span>
            <Typography variant="caption" className="font-mono text-gray-600">
              {formatTime(sessionTime)}
            </Typography>
          </Box>
          <Box className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
            JD
          </Box>
          <IconButton className="md:hidden" onClick={handleDrawerToggle}>
            <span>☰</span>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} className="md:hidden">
        {drawer}
      </Drawer>
    </AppBar>
  );
}