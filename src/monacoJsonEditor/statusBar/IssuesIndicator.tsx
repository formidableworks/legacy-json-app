import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
} from '@material-ui/core';
import { editor as editorApi, MarkerSeverity } from 'monaco-editor/esm/vs/editor/editor.api';
import { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import NotesIcon from '@material-ui/icons/Notes';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  success: { color: theme.palette.success.main },
  info: { color: theme.palette.info.main },
  warning: { color: theme.palette.warning.main },
  error: { color: theme.palette.error.main },
  ListItemIcon: { minWidth: 36 },
}));

interface Props {
  markers: editorApi.IMarker[];
  onMarkerClick: (marker: editorApi.IMarker) => void;
}
export function IssuesIndicator(props: Props): JSX.Element {
  const { markers, onMarkerClick } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'issues-popover' : undefined;
  return (
    <div>
      <Button
        onClick={handleClick}
        aria-describedby={id}
        variant="text"
        startIcon={
          markers.length > 0 ? (
            <ErrorIcon className={classes.warning} />
          ) : (
            <CheckCircleIcon className={classes.success} />
          )
        }
        disabled={!(markers.length > 0)}
        size="small"
      >
        {`${markers.length} ${markers.length === 1 ? 'issue' : 'issues'}`}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List dense>
          {markers.map((marker) => (
            <ListItem
              button
              onClick={() => {
                handleClose();
                onMarkerClick(marker);
              }}
              key={`${marker.message}${marker.startColumn}${marker.startLineNumber}`}
            >
              <ListItemIcon className={classes.ListItemIcon}>
                {marker.severity === MarkerSeverity.Hint && (
                  <Tooltip title="Severity: Hint">
                    <NotesIcon />
                  </Tooltip>
                )}
                {marker.severity === MarkerSeverity.Info && (
                  <Tooltip title="Severity: Info">
                    <InfoIcon className={classes.info} />
                  </Tooltip>
                )}
                {marker.severity === MarkerSeverity.Warning && (
                  <Tooltip title="Severity: Warning">
                    <WarningIcon className={classes.warning} />
                  </Tooltip>
                )}
                {marker.severity === MarkerSeverity.Error && (
                  <Tooltip title="Severity: Error">
                    <ErrorIcon className={classes.error} />
                  </Tooltip>
                )}
              </ListItemIcon>
              <ListItemText
                primary={`Ln ${marker.startLineNumber}, Col ${marker.startColumn}`}
                secondary={marker.message}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}
