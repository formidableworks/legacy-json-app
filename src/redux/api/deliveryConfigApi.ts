import type { GetDeliveryConfigResultType, UpdateDeliveryConfigQueryArgs } from './apiTypes';
import { dashcoreApi } from './dashcoreApi';

export const deliveryConfigApi = dashcoreApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getDeliveryConfig: builder.query<GetDeliveryConfigResultType, void>({
      query: () => `${process.env.PUBLIC_URL}/deliveryconfig`,
      providesTags: ['DeliveryConfig'],
    }),
    updateDeliveryConfig: builder.mutation<void, UpdateDeliveryConfigQueryArgs>({
      query: (queryArgs) => ({
        url: `${process.env.PUBLIC_URL}/deliveryconfig`,
        method: 'PUT',
        body: queryArgs,
      }),
      invalidatesTags: ['DeliveryConfig'],
    }),
  }),
});

export const { useGetDeliveryConfigQuery, useUpdateDeliveryConfigMutation } = deliveryConfigApi;
