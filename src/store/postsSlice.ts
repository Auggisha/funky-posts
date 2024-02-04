import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        savePostsList: (state, action) => {
            state.posts = action.payload;
        }
    }
});

export const { savePostsList } = postsSlice.actions;
export default postsSlice.reducer;
