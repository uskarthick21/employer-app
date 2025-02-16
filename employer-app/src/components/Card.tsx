import { useState } from "react";
import { Employee } from "../utility/types";
import ModalPopup from "./ModalPopup";
import EmployeeDetail from "./EmployeeDetail";
import { setEmployeeDetail } from "../redux/slice/employee/employeeDetailSlice";
import { useDispatch } from "react-redux";
import useDebounceResize from "../hooks/useDebounceResize";

interface CardProps {
  employee: Employee;
}

const Card = ({ employee }: CardProps) => {
  const dispatch = useDispatch();
  const { id, avatar, firstName, lastName, contactNo, address } = employee;
  const [imgSrc, setImgSrc] = useState(avatar);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isActived, setIsActived] = useState(false);
  const defaultAvatar = "/default-avatar.png";
  const isMobile = useDebounceResize(300);

  const handleCardClick = (employee: Employee) => {
    setModalOpen(true);
    setIsActived(true);
    dispatch(setEmployeeDetail(employee));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsActived(false);
  };

  const modal = (
    <ModalPopup onClose={handleCloseModal}>
      <EmployeeDetail />
    </ModalPopup>
  );

  return (
    <>
      <div
        className={`card ${isActived ? "card-active" : ""}`}
        onClick={() => handleCardClick(employee)}
      >
        {!isMobile && <p className="emp-id first-col">{id}</p>}

        <div className="emp-img-name  second-col">
          <div className="emp-img">
            <img
              src={imgSrc}
              alt={`${firstName} ${lastName}`}
              onError={(e) => {
                setImgSrc(defaultAvatar);
                e.currentTarget.onerror = null;
              }}
              className="emp-avatar"
            />
          </div>
          <h2 className="emp-title ">{`${firstName} ${lastName}`}</h2>
          {isMobile && <p className="emp-id first-col">{id}</p>}
        </div>

        <p className="emp-contact third-col"> {contactNo}</p>
        <p className="emp-address fourth-col"> {address}</p>
      </div>

      {isModalOpen && modal}
    </>
  );
};

export default Card;
