import { Alert, TextField } from "@mui/material";
import { useField } from "formik";

export const FormikInput = ({ label, isPassword, isSubmitting, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <TextField
        placeholder={label}
        disabled={isSubmitting}
        type={isPassword ? "password" : "text"}
        {...field}
        fullWidth
        size="small"
        // isValid={meta.touched && !meta.error}
      />
      {meta.touched && meta.error ? (
        <Alert severity="error">{meta.error}</Alert>
      ) : null}
    </>
  );
};
