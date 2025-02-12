import { apiSlice } from "../api/apiSlice";

export const vehicleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createVehicle: builder.mutation({
            query: (data) => ({
                url: 'member/create-vehicle',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Vehicle"]
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
                url: 'member/upload-images',
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
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ["VehicleDocs"],
        }),
    })
})

export const { useCreateVehicleMutation, useGetAllVehicleInfoQuery, useGetByIdVehicleInfoQuery, useEditVehicleInfoMutation, useCreateVehicleDocMutation, useGetByIdVehicleDocQuery, useDeleteVehicleDocMutation } = vehicleApi;