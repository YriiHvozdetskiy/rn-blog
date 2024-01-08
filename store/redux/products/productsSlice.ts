import {apiSlice} from "@/store/redux/apiSlice";

// injectEndpoints - дозволяє розширити apiSlice іншими endpoint
export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: () => 'products',
         providesTags: ['Products'],
      }),
      // Additional product-related endpoints...
   }),
   // щоб не було повторних запитів, коли ми інжектимо цей slice в інші slice
   overrideExisting: false,
});

export const {useGetProductsQuery} = productsApiSlice;
