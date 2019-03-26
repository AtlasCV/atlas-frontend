import * as React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { style } from "typestyle";
import { loginRequest, clearError } from "../actions/auth";
import { AppState } from "../reducers";
import Input from "../components/Shared/Input";
import Button from "../components/Shared/Button";
import { AuthState } from "../reducers/auth";
import Navbar from "../components/Navbar";

const styleContainer = style({
  backgroundColor: "#fff",
  minWidth: "300px",
  maxWidth: "600px",
  padding: "40px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  margin: "200px auto",
  $nest: {
    h1: {
      fontWeight: 600,
      textAlign: "center",
      marginBottom: "30px"
    }
  }
});

type Props = {
  loginRequest: typeof loginRequest;
  clearError: typeof clearError;
  auth: AuthState;
};

class Login extends React.Component<Props> {
  componentDidMount() {
    this.props.clearError();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className={styleContainer}>
          <h1>LOGIN</h1>
          {this.props.auth.error ? (
            <p>Your login was incorrect. Please try again.</p>
          ) : null}
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={this.handleSubmit}
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
                <div>
                  <form onSubmit={handleSubmit}>
                    <Input
                      label="EMAIL"
                      name="email"
                      type="text"
                      value={values.email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      error={(touched.email && errors.email) || ""}
                    />

                    <Input
                      label="PASSWORD"
                      name="password"
                      type="password"
                      value={values.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      error={(touched.password && errors.password) || ""}
                    />
                    <Button type="submit">LOGIN</Button>
                  </form>
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }

  handleSubmit = ({ email, password }: { email: string; password: string }) => {
    this.props.loginRequest(email, password);
  };
}

export default connect(
  ({ auth }: AppState) => ({ auth }),
  { loginRequest, clearError }
)(Login);
