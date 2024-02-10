import { configureStore } from '@reduxjs/toolkit';
import myListReducer from '../features/myList/myListSlice';


const store = configureStore({
    reducer: {
        myList: myListReducer
    }
});

export { store };