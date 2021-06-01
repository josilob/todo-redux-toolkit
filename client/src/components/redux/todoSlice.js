import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const res = await fetch('http://localhost:7000/todos');
		if (res.ok) {
			const todos = await res.json();
			return { todos };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const res = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: payload.title })
		});
		if (res.ok) {
			const todo = await res.json();
			return { todo };
		}
	}
);

const todoSlice = createSlice({
	name: 'todos',
	initialState: [
		{ id: 1, title: 'todo 1', completed: false },
		{ id: 2, title: 'todo 2', completed: false },
		{ id: 3, title: 'todo 3', completed: true }
	],
	reducers: {
		addTodo: (state, action) => {
			const newTodo = {
				id: Date.now(),
				title: action.payload.title,
				completed: false
			};
			state.push(newTodo);
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		}
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		}
	}
});

// export actions
export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

// export reducer
export default todoSlice.reducer;
