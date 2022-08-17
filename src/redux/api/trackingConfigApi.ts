import type { GetTrackingConfigResultType, UpdateTrackingConfigQueryArgs } from './apiTypes';
import { dashcoreApi } from './dashcoreApi';

export const trackingConfigApi = dashcoreApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getTrackingConfig: builder.query<GetTrackingConfigResultType, void>({
      query: () => `/trackingconfig`,
      providesTags: ['TrackingConfig'],
    }),
    updateTrackingConfig: builder.mutation<void, UpdateTrackingConfigQueryArgs>({
      query: (queryArgs) => ({
        url: '/trackingconfig',
        method: 'PUT',
        body: queryArgs,
      }),
      invalidatesTags: ['TrackingConfig'],
    }),
  }),
});

export const { useGetTrackingConfigQuery, useUpdateTrackingConfigMutation } = trackingConfigApi;
