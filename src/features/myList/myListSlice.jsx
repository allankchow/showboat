import { createSlice } from "@reduxjs/toolkit";
import { APP_STORAGE_NAME } from "../../globals/globalVariables"; 

const getMyListFromLocalStorage = () => {
    const myList = localStorage.getItem(APP_STORAGE_NAME);
    if (myList !== null) {
        return {
            items: JSON.parse(myList)
        }
    }

    return {
        items: []
    }
}

function getIndex(item, arr){
    return arr.findIndex(arrItem => arrItem.id === item.id);
}

const myListFromLocalStorage = getMyListFromLocalStorage();
const initialState = {
    items: myListFromLocalStorage.items
}

export const myListSlice = createSlice({
    name: "myList",
    initialState,
    reducers: {
        addToList: (state, action) => {
            const newMyList = [...state.items, action.payload];
            localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(newMyList));

            state.items = newMyList;
        },
        removeFromList: (state, action) => {
            const myListCopy = state.items;
            myListCopy.splice(getIndex(action.payload, state.items), 1);
            localStorage.setItem(APP_STORAGE_NAME, JSON.stringify(myListCopy));

            state.items = myListCopy;
        }
    }
})


export const { addToList, removeFromList } = myListSlice.actions;

export default myListSlice.reducer;