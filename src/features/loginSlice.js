import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
  name: "staf",
  initialState: {
    value: {
      tok: localStorage.getItem("tok") ?? "",
      log: localStorage.getItem("log") ?? "",
      id: localStorage.getItem("id") ?? "",
      role: localStorage.getItem("role") ?? "",
      stafId: localStorage.getItem("stafId") ?? ""
    }
  },
  reducers: {
    setToken: (state, action) => {
      state.value.tok = action.payload;
      localStorage.setItem("tok", action.payload);
    },
    setLogReg: (state, action) => {
      state.value.log = action.payload;
      localStorage.setItem("log", action.payload);
    },
    setId: (state, action) => {
      state.value.id = action.payload;
      localStorage.setItem("id", action.payload);
    },
    setRole: (state, action) => {
      state.value.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
    setStafId: (state, action) => {
      state.value.stafId = action.payload;
      localStorage.setItem("stafId", action.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const { setToken, setLogReg, setId, setRole, setStafId } =
  logSlice.actions;

export default logSlice.reducer;
