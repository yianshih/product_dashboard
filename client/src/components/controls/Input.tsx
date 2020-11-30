import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props:any) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      {...other}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
