import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { endpoints } from '../../config/config';

export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
}

const initialState: authDataType = {
  message: null,
  loading: false,
  token: null,
};

export const homeAction = createAsyncThunk(
  'homeAction',
  async (
    { username, password }: { username: string; password: string },
    { getState,fulfillWithValue,rejectWithValue},
  ) => {
    const data = {
      username,
      password,
    };
    const response = await api.post(endpoints.LOGIN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);

export const getUserDetails = createAsyncThunk(
  'homeAction',
  async (
    _,
    { getState,fulfillWithValue,rejectWithValue},
  ) => {
    const data = {
    };
    const response = await api.post(endpoints.LOGIN, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response) {
      if (response.data) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    }
  },
);

// export const getUserDetails = createAsyncThunk(
//   'getUserDetails',
//   async({name,password}:{name:string,password:string},_) => {

//   }
// )

// getUserDetails({name:"praful",password:"sksk"})

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    actionLogout: state => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(homeAction.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(homeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.message = null;
    });
    builder.addCase(homeAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
  },
});

export const { actionLogout } = homeSlice.actions;

export default homeSlice.reducer;
