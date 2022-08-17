import { deliveryConfigJsonSchema } from './schemas/deliveryConfigSchema';
import { trackingConfigJsonSchema } from './schemas/trackingConfigSchema';

export const schemaMatcher = {
  DELIVERY_CONFIG: 'delivery_config.json',
  TRACKING_CONFIG: 'tracking_config.json',
};
export type SchemaMatcher = keyof typeof schemaMatcher;

export const monacoJsonConf = {
  validate: true,
  schemas: [
    {
      uri: 'http://legacyjsonapp/delivery_config.json', // serves as an internal id, url does nothing.
      fileMatch: [schemaMatcher.DELIVERY_CONFIG],
      schema: deliveryConfigJsonSchema,
    },
    {
      uri: 'http://legacyjsonapp/tracking_config.json',
      fileMatch: [schemaMatcher.TRACKING_CONFIG],
      schema: trackingConfigJsonSchema,
    },
  ],
};
