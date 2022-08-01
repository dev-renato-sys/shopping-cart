import { Alert, Snackbar } from "@mui/material";
import React from "react";

export const Notification = (props) => {
  const { notification, setNotification } = props;

  const handleClose = (event, reason) => {
    setNotification({
      ...notification,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={notification.type}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
