import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
        const response = await fetch('https://dummyjson.com/users?limit=20&skip=0');
        const data = await response.json();
        return data.users;
});

interface InitialStateInterface {
  usersCollection: any;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | undefined;
}

const initialState: InitialStateInterface = {
  usersCollection: [],
  status: 'idle',
  error: undefined,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.usersCollection = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        (state.status = 'rejected'), (state.error = action.error.message);
      });
  },
});

export default userSlice.reducer;
