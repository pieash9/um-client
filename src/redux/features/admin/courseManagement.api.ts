import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['semester'],
    }),
  }),
});

export const { useAddRegisteredSemesterMutation } = courseManagementApi;
