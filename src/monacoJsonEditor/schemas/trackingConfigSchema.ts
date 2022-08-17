import { JSONSchema7 } from 'json-schema';

export const trackingConfigJsonSchema: JSONSchema7 = {
  title: 'tracking config',
  description: 'All informational data required to track a delivery.',
  type: 'object',
  properties: {
    trackingId: { description: 'An identifier unique to each unit.', type: 'number' },
    trackingTech: {
      description: 'Active tracking technology applied to unit.',
      type: 'string',
      enum: ['gps', 'beacon'],
    },
    beaconId: {
      description: 'The beacons lookup id.',
      type: 'number',
    },
  },
  if: {
    properties: {
      trackingTech: { const: 'beacon' },
    },
    required: ['trackingTech'],
  },
  then: { required: ['beaconId'] },
  required: ['trackingId'],
};
