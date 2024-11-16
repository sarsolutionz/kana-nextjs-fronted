import { apiSlice } from "../api/apiSlice";

export const vehicleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createVehicle: builder.mutation({
            query: (data) => ({
                url: 'member/create-vehicle',
                method: "POST",
                body: data,
            }),
        }),
    })
})

export const { useCreateVehicleMutation } = vehicleApi;