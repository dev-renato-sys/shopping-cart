// import logo from "./logo.svg";
// import "./App.css";
import { Button, Card, CardContent, FormHelperText, Grid } from "@mui/material";
import { FormikInput } from "components/Input";
import { useAuth } from "context/auth";
import { Form, Formik } from "formik";
import React from "react";

function LoginPage() {
  const { Login } = useAuth();

  const validation = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
    ) {
      errors.username = "Invalid email address.";
    }

    if (values.password.length < 6) {
      errors.password = "Your password must be at least 6 characters long.";
    }
    return errors;
  };

  const handleSubmitForm = (values, { setSubmitting }) => {
    return Login({ username: values.username, pass: values.password });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", padding: 20 }}
      >
        <Card style={{ maxWidth: "60vh" }}>
          <CardContent>
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={validation}
              onSubmit={handleSubmitForm}
            >
              {({ submitForm, isSubmitting }) => (
                <>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        Welcome
                      </Grid>
                      <Grid item xs={12}>
                        <FormHelperText>
                          You should use for login:{" "}
                          <b>renato_yumi@hotmail.com</b> and password:{" "}
                          <b>123456</b>.
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <FormikInput
                          name="username"
                          size="small"
                          label="Username"
                          fullWidth
                          isSubmitting={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikInput
                          size="small"
                          name="password"
                          label="Password"
                          type="password"
                          fullWidth
                          isPassword={true}
                          isSubmitting={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justifyContent="flex-end">
                          <Button
                            disabled={isSubmitting}
                            onClick={submitForm}
                            variant="contained"
                          >
                            {isSubmitting ? "Loggin" : "Login"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default LoginPage;
