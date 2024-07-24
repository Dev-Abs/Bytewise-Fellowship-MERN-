import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        { id: "1", title: "First Task"},
    ],
    };

    // what is slice? , what is createSlice?
    // slice is a function that creates a slice object that contains the initial state and reducers
    // createSlice is a function that creates a slice object that contains the initial state and reducers
    // what is nanoid?
    // nanoid is a function that generates a unique id
    // what is initialState?
    // initialState is an object that contains the initial state of the slice


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state, action)=>{
            const newTask = {
                id: nanoid(),
                title: action.payload.title,
            };
            state.tasks.push(newTask);
        },
        deleteTask: (state, action)=>{
            const { id } = action.payload;
            state.tasks = state.tasks.filter((task)=> task.id !== id);
        }
    }
})

export const { addTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;