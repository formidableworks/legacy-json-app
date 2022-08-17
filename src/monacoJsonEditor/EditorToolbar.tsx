import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    gap: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

interface Props {
  onSave: () => void;
  onFormat: () => void;
}
export function EditorToolbar(props: Props): JSX.Element {
  const { onSave, onFormat } = props;
  const classes = useStyles();
  return (
    <div className={classes.toolBar}>
      <Button onClick={onFormat} startIcon={<FlashOnIcon />} variant="outlined" size="small">
        Format
      </Button>
      <Button onClick={onSave} startIcon={<SaveIcon />} variant="outlined" size="small">
        Save
      </Button>
    </div>
  );
}
