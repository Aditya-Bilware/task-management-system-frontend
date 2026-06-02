import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeesService,
  getEmployeesStatsService,
} from "../../services/users/employeeService";
import { minDelay } from "../../utils/minDelay";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployee",

  async (_, thunkAPI) => {
    try {
      const start = new Date();
      const res = await getEmployeesService();
      await minDelay(start);
      return res.employees;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch employees",
      );
    }
  },
);

export const fetchEmployeesStats = createAsyncThunk(
  "employees",

  async (_, thunkAPI) => {
    try {
      const start = new Date();

      const state = thunkAPI.getState();

      const filters = state.employee.filters;

      const res = await getEmployeesStatsService(filters);

      await minDelay(start);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to fetch employee stats",
      );
    }
  },
);

const initialState = {
  employees: [],
  employeesLoading: false,
  employeesError: null,

  employeesStats: [],
  pagination: {},
  initialLoading: true,
  employeesStatsLoading: false,
  loadingType: null,
  employeesStatsError: null,

  filters: {
    page: 1,
    limit: 9,
    search: "",
  },
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },

    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },

    setLoadingType: (state, action) => {
      state.loadingType = action.payload;
    },
    resetEmployeeFilters: (state) => {
      state.filters = {
        page: 1,
        limit: 9,
        search: "",
      };
      state.initialLoading = true;
      state.employeesStats = [];
      state.pagination = {};
      state.loadingType = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.employeesLoading = true;
        state.employeesError = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employeesLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.employeesLoading = false;
        state.employeesError = action.payload;
      })
      .addCase(fetchEmployeesStats.pending, (state) => {
        state.employeesStatsLoading = true;
        if (state.loadingType === "page") {
          state.initialLoading = true;
        }
        state.employeesStatsError = null;
      })
      .addCase(fetchEmployeesStats.fulfilled, (state, action) => {
        state.initialLoading = false;
        state.employeesStatsLoading = false;
        state.loadingType = null;
        state.employeesStats = action.payload.employees;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEmployeesStats.rejected, (state, action) => {
        state.initialLoading = false;
        state.employeesStatsLoading = false;
        state.employeesStatsError = action.payload;
      });
  },
});

export const { setPage, setSearch, setLoadingType, resetEmployeeFilters } =
  employeeSlice.actions;

export default employeeSlice.reducer;
