import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { endpoints } from '../../config/config';
import { store } from '../store';

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

export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    { username, password }: { username: string; password: string },
    { getState, rejectWithValue, fulfillWithValue },
    
  ) => {
    const data = {
      username,
      password,
    };
    const homeToken = store.getState().HomeReducer.token
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

export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
    actionLogout: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.message = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
  },
});

export const { actionLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
