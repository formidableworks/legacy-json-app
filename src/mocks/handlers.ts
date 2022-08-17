import { rest } from 'msw';
import {
  GetDeliveryConfigResultType,
  GetTrackingConfigResultType,
  UpdateDeliveryConfigQueryArgs,
  UpdateTrackingConfigQueryArgs,
} from '../redux/api/apiTypes';

let deliveryConfig: GetDeliveryConfigResultType = {
  value: `          {
  "signature_required": "yes indeed", "customer_id": "1235339", "service_tier": "invalid enum val",
  "address": {
    "addressee": "Stringer Bell",
    "premise_identifier": "Barksdale towers",
  },
  "handling_tags": [
    "fragile",
    "fragile"
  ],
  "dimensions": {
    "width": -1,
    "height": 4,
    "depth": 1001
  }
}
`,
};

let trackingConfig: GetTrackingConfigResultType = {
  value: `{
 "trackingId": 963258865235698523414741635649366
}
`,
};

export const handlers = [
  rest.get('/deliveryconfig', (req, res, ctx) => res(ctx.status(200), ctx.json(deliveryConfig))),

  rest.put<UpdateDeliveryConfigQueryArgs>('/deliveryconfig', (req, res, ctx) => {
    const { value } = req.body;
    deliveryConfig = { value };
    return res(ctx.status(200));
  }),

  rest.get('/trackingconfig', (req, res, ctx) => res(ctx.status(200), ctx.json(trackingConfig))),

  rest.put<UpdateTrackingConfigQueryArgs>('/trackingconfig', (req, res, ctx) => {
    const { value } = req.body;
    trackingConfig = { value };
    return res(ctx.status(200));
  }),
];
