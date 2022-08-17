import { JSONSchema7 } from 'json-schema';

export const deliveryConfigJsonSchema: JSONSchema7 = {
  title: 'delivery config',

  description: 'All informational data required to complete a delivery.',
  type: 'object',
  properties: {
    customer_id: { type: 'string', description: 'An identifier unique to each customer.' },
    service_tier: {
      type: 'string',
      enum: ['next day', 'same day', 'priority one'],
      description: 'Level of Dashcore delivery service.',
    },
    signature_required: { type: 'boolean' },
    address: {
      type: 'object',
      description: 'Expected location of customer.',
      properties: {
        addressee: { type: 'string', description: 'Item recipient' },
        premise_identifier: { type: 'string', description: 'street-level property identifier' },
        street: {
          type: 'string',
          description:
            'a public road in a city, town, or village, typically with houses and buildings on one or both sides.',
        },
        locality: {
          type: 'string',
          description:
            'locality is a necessary part of the  postal address if there is more than one street of the same name in the given post town.',
        },
        post_town: { type: 'string', description: 'postal town' },
        postcode: {
          type: 'string',
          pattern: '^[A-Z0-9_-]+$',
          description:
            'The UK postcode consists of five to seven alphanumeric characters which was created by Royal Mail. A full postcode designates an area with multiple addresses or a single delivery point.',
        },
      },
      required: ['addressee', 'premise_identifier', 'postcode'],
    },
    handling_tags: {
      description: 'Tags for the product',
      type: 'array',
      items: {
        type: 'string',
      },
      minItems: 1,
      uniqueItems: true,
    },
    dimensions: {
      type: 'object',
      description: 'dimension of item to be delivered.',
      properties: {
        width: { type: 'number', minimum: 1, maximum: 7 },
        height: { type: 'number', minimum: 1, maximum: 7 },
        depth: { type: 'number', minimum: 1, maximum: 7 },
      },
    },
  },
  required: ['customer_id', 'address', 'service_tier'],
};
