import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "staf",
  initialState: {
    value: {
      tok: "",
      log: "",
      id: ""
    }
  },
  reducers: {
    setToken: (state, action) => {
      state.value.tok = action.payload;
    },
    setLogReg: (state, action) => {
      state.value.log = action.payload;
    },
    setId: (state, action) => {
      state.value.id = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setToken, setLogReg, setId } = logSlice.actions;

export default logSlice.reducer;
