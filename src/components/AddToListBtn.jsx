import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const AddToListBtn = () => {

    return (
        <div className="addToListBtn">
            <FontAwesomeIcon icon={faSquarePlus} />
        </div>
    )
}

export default AddToListBtn;