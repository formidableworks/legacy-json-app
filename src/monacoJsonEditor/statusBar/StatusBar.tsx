import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { editor as EditorApi } from 'monaco-editor/esm/vs/editor/editor.api';
import { IssuesIndicator } from './IssuesIndicator';
import { KeyboardShortcuts } from './KeyboardShortcuts';

interface StyleProps {
  editorIsFocused: boolean;
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: theme.spacing(1),
    borderBottomLeftRadius: theme.spacing(1),
    borderColor: (props) =>
      props.editorIsFocused ? theme.palette.primary.main : theme.palette.divider,
  },
}));

interface Props {
  editorIsFocused: boolean;
  markers: EditorApi.IMarker[];
  onMarkerClick: (marker: EditorApi.IMarker) => void;
}
export function StatusBar(props: Props): JSX.Element {
  const { editorIsFocused, markers, onMarkerClick } = props;
  const classes = useStyles({ editorIsFocused });
  return (
    <div className={classes.statusBar}>
      <KeyboardShortcuts />
      <IssuesIndicator markers={markers} onMarkerClick={onMarkerClick} />
    </div>
  );
}
