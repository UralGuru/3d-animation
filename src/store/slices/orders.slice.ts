import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NewsService from '../../services/orders.service';
import {
    ApiQueryParamsOrders,
    FoundItemOrder,
    FrontObject,
} from '../../constants/types';

const ORDERS_STATE: FrontObject = {
    foundItems: [],
    totalCount: 0,
};
export const getOrdersThunk = createAsyncThunk(
    'orders/getOrders',
    async function (_, { rejectWithValue, getState }) {
        try {
            const { search } = getState() as { search: ApiQueryParamsOrders };
            const response = await NewsService.getNews(search);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const newsSlice = createSlice({
    name: 'orders',
    initialState: ORDERS_STATE,
    reducers: {
        addOrder: (state, action: PayloadAction<FoundItemOrder>) => {
            state.foundItems.push(action.payload);
            state.totalCount += 1;
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            state.foundItems = state.foundItems.filter(
                order => order.id !== action.payload,
            );
            state.totalCount -= 1;
        },
        updateOrder: (state, action: PayloadAction<FoundItemOrder>) => {
            const index = state.foundItems.findIndex(
                order => order.id === action.payload.id,
            );
            if (index !== -1) {
                state.foundItems[index] = action.payload;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.foundItems = action.payload.foundItems;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(getOrdersThunk.pending, (state, action) => {
                state.foundItems = [];
                state.totalCount = 0;
            })
            .addCase(getOrdersThunk.rejected, (state, action) => {});
    },
});

export const { addOrder, removeOrder, updateOrder } = newsSlice.actions;
export default newsSlice.reducer;
