import { makeStyles, Theme } from '@material-ui/core/styles';
import Editor, { OnMount, loader } from '@monaco-editor/react';
import { editor as EditorApi } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useEffect, useRef, useState } from 'react';
import { monacoJsonConf, SchemaMatcher, schemaMatcher } from './configureMonaco';
import { ConfirmDialog } from './ConfirmDialog';
import { EditorToolbar } from './EditorToolbar';
import { StatusBar } from './statusBar/StatusBar';

loader.config({ paths: { vs: `${process.env.PUBLIC_URL}/monaco_files/vs` } });

interface StyleProps {
  isFocused: boolean;
}
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  editorWrapper: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: (props) => (props.isFocused ? theme.palette.primary.main : theme.palette.divider),
  },
}));

interface Props {
  value: string | undefined;
  onSubmit: (value: string) => void;
  heightInRem: number;
  editorPath: SchemaMatcher;
}
export function MonacoJsonEditor(props: Props): JSX.Element {
  const { value, onSubmit, editorPath, heightInRem } = props;
  const editorRef = useRef<EditorApi.IStandaloneCodeEditor | null>(null);
  const [editorValue, setEditorValue] = useState<string | undefined>(value);
  const [isFocused, setFocused] = useState(false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editorMarkers, setEditorMarkers] = useState<EditorApi.IMarker[]>([]);
  const classes = useStyles({ isFocused });

  // only update internal prop-derived-state when prop changes.
  // todo: find a better pattern.
  useEffect(() => setEditorValue(value), [value]);

  const editorOnMount: OnMount = (editor, monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions(monacoJsonConf);
    editorRef.current = editor;
    editor.getModel()?.updateOptions({ tabSize: 2 });
    editor.onDidFocusEditorText(() => setFocused(true));
    editor.onDidBlurEditorText(() => setFocused(false));
  };
  const handleFormat = () => {
    editorRef.current?.trigger('external toolbar', 'editor.action.formatDocument', undefined);
  };
  const handleSave = () => {
    setConfirmDialogOpen(true);
  };
  const handleMarkerClick = (marker: EditorApi.IMarker) => {
    editorRef.current?.setSelection({
      startLineNumber: marker.startLineNumber,
      endLineNumber: marker.endLineNumber,
      startColumn: marker.startColumn,
      endColumn: marker.endColumn,
    });
  };

  return (
    <div>
      <EditorToolbar onSave={handleSave} onFormat={handleFormat} />
      <div className={classes.editorWrapper}>
        <Editor
          onMount={editorOnMount}
          height={`${heightInRem}rem`}
          defaultLanguage="json"
          value={editorValue}
          onChange={(val) => setEditorValue(val)}
          path={schemaMatcher[editorPath]}
          onValidate={(markers) => setEditorMarkers(markers)}
        />
      </div>
      <StatusBar
        editorIsFocused={isFocused}
        markers={editorMarkers}
        onMarkerClick={handleMarkerClick}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        originalValue={value ?? ''}
        modifiedValue={editorValue}
        onConfirm={() => onSubmit(editorValue ?? '')}
      />
    </div>
  );
}
