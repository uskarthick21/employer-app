import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SortState {
    field: string | null;
    order: "asc" | "desc";
}

const initialState: SortState = {
    field: null,
    order: "asc",
};

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSortField: (state, action: PayloadAction<{ field: string; order: "asc" | "desc" }>) => {
            state.field = action.payload.field;
            state.order = action.payload.order;
        },
    },
});

export const { setSortField } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
