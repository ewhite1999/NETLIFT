import React from "react";
import Form from "../../components/Form";
import logo from "../../static/imgs/logo.png";
import { NavLink as Link } from "react-router-dom";
import {loginUser} from "../../actions/userActions";
import { useDispatch} from "react-redux";


const LoginPage = () => {
  const dispatch = useDispatch();
  const inputs = [{ text: "username" }, { text: "password" }];
  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(e));
    
  };
  
  return (
    <div className="mx-auto bg-nl-darkblue min-h-screen container pt-16 px-8">
      <div className="space-y-20">
        <img
          className=" container object-cover h-28 w-80 rounded-full mx-auto"
          src={logo}
        />
        <Form text="Login" inputs={inputs} handleSubmit={login} />
      </div>
      <Link to="/register" className="text-slate-50 mx-auto w-fit block mt-4">
        Don&apos;t have an account?
      </Link>
    </div>
  );
};

export default LoginPage;
