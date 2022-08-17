import React from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  originalValue: string;
  modifiedValue: string | undefined;
  onConfirm: () => void;
}
export function ConfirmDialog(props: Props): JSX.Element {
  const { isOpen, onClose, originalValue, modifiedValue, onConfirm } = props;
  const ariaLabel = 'confirm-dialog-title';
  const ariaDesc = 'confirm-dialog-description';

  const handleConfirm = () => {
    onClose();
    onConfirm();
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDesc}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id={ariaLabel}>Review and confirm changes</DialogTitle>
      <DialogContent>
        <DiffEditor
          original={originalValue}
          modified={modifiedValue}
          options={{ readOnly: true }}
          language="json"
          height="25rem"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
