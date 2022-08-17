import React from 'react';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import { Button } from '@material-ui/core';

export function KeyboardShortcuts(): JSX.Element {
  return (
    <Button startIcon={<KeyboardIcon />} size="small">
      Keyboard shortcuts
    </Button>
  );
}
