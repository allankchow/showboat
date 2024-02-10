import { useDispatch } from 'react-redux';
import { addToList, removeFromList } from '../features/myList/myListSlice';

// Custom hook
const useMyListHandler = () => {
  const dispatch = useDispatch();

  // This function dispatches the redux actions to add or remove movie from the list
  const handleMyListClick = (addToMyList, movieObj) => {
    addToMyList ? dispatch(addToList(movieObj)) : dispatch(removeFromList(movieObj));
  };

  return { handleMyListClick };
};

export default useMyListHandler;