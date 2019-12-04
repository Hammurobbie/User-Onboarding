import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import axios from "axios";

const validate = ({ name, email, password }) => {
  const errors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must be longer than 2 characters";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (email.length < 2) {
    errors.email = "Email must be longer than 2 characters";
  }
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 5) {
    errors.password = "Password must be longer than 5 characters";
  }
  return errors;
};

function FormComp() {
  const [user, setUser] = useState([]);

  const handleSubmit = (values, tools) => {
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log(response);
        setUser(response.data.name);
        tools.resetForm();
      })
      .catch()
      .finally(() => {
        tools.setSubmitting(false);
      });
  };

  return (
    <div>
      <Formik
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={{ name: "", email: "", password: "" }}
        render={props => {
          return (
            <div className="form">
              <h1>Let Me Sell Your Data</h1>
              <Form>
                <div className="inputDiv">
                  <ErrorMessage name="name" component="div" className="error" />
                  <Field
                    className="field"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="inputDiv">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                  <Field
                    className="field"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="inputDiv">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                  <Field
                    className="field"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <select className="field drop" type="select" name="Why">
                  <option value="" label="Why are you donating your data?" />
                  <option value="red" label="My data sucks" />
                  <option
                    value="blue"
                    label="My data is hot. Gotta throw the dogs off my trail"
                  />
                  <option
                    value="green"
                    label="You're too stupid to figure out how to sell my data"
                  />
                </select>
                <label>
                  Terms of Service
                  <Field className="field" type="checkbox" name="terms" />
                </label>
                <button type="submit" disabled={props.isSubmitting}>
                  {props.isSubmitting ? "submitting" : "Submit"}
                </button>
              </Form>
            </div>
          );
        }}
      />
      <div className="thanksDiv">
        <h2>Special Thanks To:</h2>
        <h3>{user}</h3>
      </div>
    </div>
  );
}

export default FormComp;
