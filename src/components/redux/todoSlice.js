import { createSlice } from '@reduxjs/toolkit';

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
		}
	}
});

// export action
export const { addTodo } = todoSlice.actions;

// export reducer
export default todoSlice.reducer;
