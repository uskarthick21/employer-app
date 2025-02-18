import { describe, it, expect } from "vitest";
import { sortReducer, setSortField, SortState } from "../../../redux/slice/sort/sortSlice";

// ✅ Mock Data
const initialState: SortState = {
    field: null,
    order: "asc",
};

describe("Sort Slice", () => {

    it("return the initial state when no action is provided", () => {
        const state = sortReducer(undefined, { type: undefined });
        expect(state).toEqual(initialState);
    });

    it("handle setSortField action with ascending order", () => {
        const action = setSortField({ field: "firstName", order: "asc" });
        const state = sortReducer(initialState, action);

        expect(state.field).toBe("firstName");
        expect(state.order).toBe("asc");
    });

    it("handle setSortField action with descending order", () => {
        const action = setSortField({ field: "age", order: "desc" });
        const state = sortReducer(initialState, action);

        expect(state.field).toBe("age");
        expect(state.order).toBe("desc");
    });

    it("not mutate the existing state", () => {
        const prevState = { field: "id", order: "asc" };
        const action = setSortField({ field: "contactNo", order: "desc" });

        const newState = sortReducer(prevState, action);

        expect(newState).not.toBe(prevState);
        expect(newState.field).toBe("contactNo");
        expect(newState.order).toBe("desc");
    });
});
