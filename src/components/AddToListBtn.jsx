import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const AddToListBtn = ({ movieItemObj, isInMyList, handleClick }) => {

    const handleAddToList = () => {
        handleClick(true, movieItemObj);
    }

    const handleRemovFromList = () => {
        handleClick(false, movieItemObj);
    }

    return (
        <>
            {isInMyList 
                ? (
                    <button className="addToListBtn" onClick={handleRemovFromList}>
                        <FontAwesomeIcon icon={faSquareMinus} />
                    </button>
                    ) 
                : (
                    <button className="addToListBtn" onClick={handleAddToList}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </button>
                )
            }
        </>
    )
}

export default AddToListBtn;