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
            })
        })
    })
})

export const { useCreateVehicleMutation, useGetAllVehicleInfoQuery, useGetByIdVehicleInfoQuery } = vehicleApi;