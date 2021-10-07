import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "7px",
  boxShadow: "0 0 12px  rgba(255, 255, 255, 0.37)",
};

const ModalComp = () => {
  const dispatch = useDispatch();
  const handleClose = () =>
    dispatch({
      type: "CHECKOUT_MODAL_CLOSE",
      payload: { isOpen: false, userId: null },
    });
  const modalState = useSelector((state) => state.checkoutReducer);

  return (
    <div>
      <Modal
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={modalState.checkoutModalState.isOpen}
      >
        <Fade in={modalState.checkoutModalState.isOpen}>
          <Box sx={style}>
            <h3
              style={{
                textAlign: "center",
                fontFamily: "Georama,sans-serif",
              }}
            >
              Checkout Details
            </h3>
            <div className="modal__header" style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Email",
                      "Phone Number",
                      "Address",
                      "City",
                      "State",
                      "Zip Code",
                    ].map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalState.checkoutHistory
                    .filter(
                      (item) =>
                        item._id === modalState.checkoutModalState.userId
                    )
                    .map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.userName}</td>
                          <td>{item.userEmail}</td>
                          <td>{item.userPhone}</td>
                          <td>{item.userAddress}</td>
                          <td>{item.userCity}</td>
                          <td>{item.userState}</td>
                          <td>{item.userZip}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComp;
