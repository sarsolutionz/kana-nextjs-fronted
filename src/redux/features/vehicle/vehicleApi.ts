import { format, parseISO } from "date-fns";
import { apiSlice } from "../api/apiSlice";

export const vehicleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createVehicle: builder.mutation({
      query: (data) => ({
        url: "member/create-vehicle",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    getAllVehicleInfo: builder.query({
      query: () => ({
        url: "member/all-vehicle-info",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Vehicle"],
    }),
    getByIdVehicleInfo: builder.query({
      query: (id) => ({
        url: `member/vehicle?vehicle_id=${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Vehicle"],
    }),
    editVehicleInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `member/update-vehicle?vehicle_id=${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    createVehicleDoc: builder.mutation({
      query: (formData) => ({
        url: "member/upload-images",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["VehicleDocs"],
    }),
    getByIdVehicleDoc: builder.query({
      query: (id) => ({
        url: `member/vehicle/images?user_id=${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["VehicleDocs"],
    }),
    deleteVehicleDoc: builder.mutation({
      query: (payload) => ({
        url: `member/delete-images?user_id=${payload.id}`,
        method: "DELETE",
        body: {
          image_ids: payload.image_ids,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["VehicleDocs"],
    }),
    createNotification: builder.mutation({
      query: (payload) => ({
        url: `member/create-notifications/`,
        method: "POST",
        body: {
          vehicle_ids: payload.vehicle_ids,
          notifications: payload.notifications,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Notfication"],
    }),
    deleteVehicleById: builder.mutation({
      query: (id) => ({
        url: `member/delete-vehicle?vehicle_id=${id}`,
        method: "POST",
        credentials: "include" as const,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    editNotificationById: builder.mutation({
      query: (payload) => ({
        url: `member/update-notification?notification_id=${payload.notification_id}`,
        method: "POST",
        body: payload.notifications,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Notfication"],
    }),
    getAllNotificationByFilter: builder.query({
      query: (paramsObj?: { read?: boolean; accepted?: boolean; user?: string; date?: string }) => {
        const params = new URLSearchParams();

        if (paramsObj?.read !== undefined) params.append('is_read', String(paramsObj.read));
        if (paramsObj?.accepted !== undefined) params.append('is_accepted', String(paramsObj.accepted));
        if (paramsObj?.user) params.append('username', paramsObj.user);
        if (paramsObj?.date) params.append('date', format(parseISO(paramsObj.date), "yyyy-MM-dd"));

        return {
          url: `member/get-all-notifications?${params.toString()}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
      providesTags: ["Notfication"],
    }),
  }),
});

export const {
  useCreateVehicleMutation,
  useGetAllVehicleInfoQuery,
  useGetByIdVehicleInfoQuery,
  useEditVehicleInfoMutation,
  useCreateVehicleDocMutation,
  useGetByIdVehicleDocQuery,
  useDeleteVehicleDocMutation,
  useCreateNotificationMutation,
  useDeleteVehicleByIdMutation,
  useEditNotificationByIdMutation,
  useGetAllNotificationByFilterQuery,
} = vehicleApi;
