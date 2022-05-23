import { useDispatch } from 'react-redux';
import axios from "axios";
import { Pizza, SearchPizzaParams} from "./types"
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    "pizza/fetchPizzasStatus",
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(`https://626d16545267c14d5677d9c2.mockapi.io/items`, {
            params: pickBy({
                page: currentPage,
                limit: 4,
                category,
                sortBy,
                order,
                search,
            }, identity)
        })
        return data;
    })