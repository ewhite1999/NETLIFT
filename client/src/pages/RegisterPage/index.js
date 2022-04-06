import React from "react";
import Form from "../../components/Form";
import logo from "../../static/imgs/logo.png";
import { NavLink as Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions/userActions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  // TODO: remove this
  // eslint-disable-next-line no-undef
  // console.log(process.env.API_URL);

  const inputs = [
    { text: "email", message: "Must be an email" },
    {
      text: "username",
      message: "Must be between five and twenty characters",
      pattern: ".{5,20}",
    },
    {
      text: "password",
      message:
        "The password must contain a between 8 and thirty characters, at least one letter, one number and one special character.",
      pattern:
        "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}",
    },
    {
      text: "confirm password",
      message: "The passwords must match",
    },
  ];

  const register = (e) => {
    // TODO submit data to server and log person in
    e.preventDefault();
    const confirmPass = e.target["confirm password"];
    const pass = e.target.password;
    if (confirmPass.value !== pass.value) {
      confirmPass.value = "";
      confirmPass.focus();
    }
    else{
      dispatch(registerUser(e));

    }
  };
  return (
    <div className="mx-auto bg-nl-darkblue min-h-screen container px-8 pt-16">
      <div className="space-y-20">
        <img
          className=" container object-cover h-28 w-80 rounded-full mx-auto"
          src={logo}
        />
        <Form text="Register" inputs={inputs} handleSubmit={register} />
      </div>
      <Link to="/login" className="text-slate-50 mx-auto w-fit block mt-4">
        Already registered?
      </Link>
    </div>
  );
};

export default RegisterPage;
