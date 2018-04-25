import * as React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { style } from "typestyle";
import { loginRequest } from "../actions/auth";
import { AppState } from "../reducers";
import Input from "../components/Shared/Input";
import Button from "../components/Shared/Button";

const styleContainer = style({
  backgroundColor: "#fff",
  minWidth: "300px",
  maxWidth: "600px",
  padding: "40px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  margin: "200px auto",
  $nest: {
    h3: {
      fontWeight: 600,
      textAlign: "center",
      marginBottom: "30px"
    }
  }
});

interface Props {
  loginRequest: typeof loginRequest;
}

export default connect(({ auth }: AppState) => ({ auth }), { loginRequest })(
  (props: Props) => (
    <div className={styleContainer}>
      <h3>LOGIN</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email, password }) => props.loginRequest(email, password)}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                label="EMAIL"
                name="email"
                type="text"
                value={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.email && errors.email}
              />

              <Input
                label="PASSWORD"
                name="password"
                type="password"
                value={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <Button type="submit">LOGIN</Button>
            </form>
          );
        }}
      />
    </div>
  )
);
