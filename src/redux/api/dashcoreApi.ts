import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashcoreApi = createApi({
  reducerPath: 'dashcoreApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['DeliveryConfig', 'TrackingConfig'],
  endpoints: () => ({
    // following code-splitting pattern described here:
    // https://redux-toolkit.js.org/rtk-query/usage/code-splitting
  }),
});
