import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { MonacoJsonEditor } from './monacoJsonEditor/MonacoJsonEditor';
import {
  useGetDeliveryConfigQuery,
  useUpdateDeliveryConfigMutation,
} from './redux/api/deliveryConfigApi';

const useStyles = makeStyles((theme: Theme) => ({
  appRoot: {
    margin: theme.spacing(1),
  },
}));

export function App(): JSX.Element {
  const classes = useStyles();
  const { jsonString } = useGetDeliveryConfigQuery(undefined, {
    selectFromResult: (result) => ({ jsonString: result.data?.value, ...result }),
  });

  const [updateTrigger] = useUpdateDeliveryConfigMutation();
  return (
    <div className={classes.appRoot}>
      <Typography variant="h4">Legacy json app</Typography>
      <br />
      <MonacoJsonEditor
        value={jsonString}
        onSubmit={(val) => updateTrigger({ value: val })}
        heightInRem={14}
        editorPath="DELIVERY_CONFIG"
      />
    </div>
  );
}
