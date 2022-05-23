import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { Pizza, PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
    items: [],
    endOfList: false,
    status: Status.LOADING, // LOADING, SUCCESS, ERROR
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload;
        },
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            if (action.payload.length < 4) {
                state.endOfList = true;
            } else {
                state.endOfList = false;
            }
            state.items.push(...action.payload);
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
        });
    }
})

export const {setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
