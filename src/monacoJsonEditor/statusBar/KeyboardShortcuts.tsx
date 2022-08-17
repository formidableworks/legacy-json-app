import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import Button from '@material-ui/core/Button';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) => ({
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    gap: theme.spacing(1),
  },
  label: {
    marginRight: theme.spacing(1),
  },
  plusChip: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

export function KeyboardShortcuts(): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'keyboard-shortcuts-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        color="primary"
        onClick={handleClick}
        size="small"
        startIcon={<KeyboardIcon />}
      >
        Keyboard shortcuts
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <div className={classes.contentRoot}>
          <div>
            <span className={classes.label}>Auto complete:</span>
            <Chip variant="outlined" size="small" label="ctrl" />
            <span className={classes.plusChip}>+</span>
            <Chip variant="outlined" size="small" label="space" />
          </div>
          <div>
            <span className={classes.label}>Copy:</span>
            <Chip component="span" variant="outlined" size="small" label="ctrl" />
            <span className={classes.plusChip}>+</span>
            <Chip component="span" variant="outlined" size="small" label="c" />
          </div>
          <div>
            <span className={classes.label}>Paste:</span>
            <Chip component="span" variant="outlined" size="small" label="ctrl" />
            <span className={classes.plusChip}>+</span>
            <Chip component="span" variant="outlined" size="small" label="v" />
          </div>
          <div>
            <span className={classes.label}>Format:</span>
            <Chip component="span" variant="outlined" size="small" label="ctrl" />
            <span className={classes.plusChip}>+</span>
            <Chip component="span" variant="outlined" size="small" label="shift" />
            <span className={classes.plusChip}>+</span>
            <Chip component="span" variant="outlined" size="small" label="i" />
          </div>
          <div>
            <span className={classes.label}>Command palette:</span>
            <Chip component="span" variant="outlined" size="small" label="f1" />
          </div>
        </div>
      </Popover>
    </div>
  );
}
