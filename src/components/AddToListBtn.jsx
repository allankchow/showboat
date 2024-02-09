import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const AddToListBtn = ({size}) => {

    return (
        <div className="addToListBtn">
            <FontAwesomeIcon icon={faSquarePlus} size={size} />
        </div>
    )
}

export default AddToListBtn;