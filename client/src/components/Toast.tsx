import React, { useState } from "react";
import { Alert, AlertTitle, Color } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

interface Props {
  open: boolean;
  toastHandleClose: () => void;
  severity: Color;
  title: string;
  message: string;
}

const Toast: React.FC<Props> = ({
  open,
  toastHandleClose,
  severity,
  title,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={toastHandleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={toastHandleClose} severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
