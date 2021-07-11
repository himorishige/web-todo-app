import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'src/app/store';
import { ApiResponseType, Task } from 'src/types';

const tasksAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export interface TasksState {
  tasks: Task[] | null;
  status: 'idle' | 'loading' | 'failed';
  message?: string;
}

// APIエンドポイント
const URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Taskを全件取得する
export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async (_, { rejectWithValue }) => {
    const response = await axios.get<ApiResponseType<Task[]>>(URL).catch((error) => {
      rejectWithValue(error);
      throw error;
    });
    return response.data;
  },
);

// Taskを1件登録する
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (param: Pick<Task, 'title' | 'priority' | 'isCompleted'>, { rejectWithValue }) => {
    const response = await axios.post<ApiResponseType<Task>>(`${URL}`, param).catch((error) => {
      rejectWithValue(error);
      throw error;
    });
    return response.data;
  },
);

// Taskを1件更新する
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (param: Partial<Task>, { rejectWithValue }) => {
    const response = await axios
      .patch<ApiResponseType<Task>>(`${URL}/${param.id}`, param)
      .catch((error) => {
        rejectWithValue(error);
        throw error;
      });
    return response.data;
  },
);

// Taskを1件削除する
export const removeTask = createAsyncThunk(
  'task/removeTask',
  async (id: string, { rejectWithValue }) => {
    const response = await axios.delete<ApiResponseType<Task>>(`${URL}/${id}`).catch((error) => {
      rejectWithValue(error);
      throw error;
    });
    return response.data;
  },
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState({
    status: 'idle',
    message: '',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<ApiResponseType<Task>>) => {
        state.status = 'idle';
        tasksAdapter.addOne(state, action.payload.data);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.message = action.error.message;
        }
      })
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<ApiResponseType<Task[]>>) => {
        state.status = 'idle';
        tasksAdapter.setAll(state, action.payload.data);
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.message = action.error.message;
        }
      })
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ApiResponseType<Task>>) => {
        state.status = 'idle';
        const { id, ...updateData } = action.payload.data;
        tasksAdapter.updateOne(state, {
          id: id,
          changes: { ...updateData },
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.message = action.error.message;
        }
      })
      .addCase(removeTask.pending, (state) => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<ApiResponseType<Task>>) => {
        state.status = 'idle';
        tasksAdapter.removeOne(state, action.payload.data.id);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error?.message) {
          state.message = action.error.message;
        }
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectTasks = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export default tasksSlice.reducer;