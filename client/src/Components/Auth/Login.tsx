import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="container flex max-w-md flex-col gap-4">
      <div className="content">
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
        <Link style={{ fontSize: "14px", marginLeft: "18px" }} to="/register">
          Don't have a paloma account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>
            Register here
          </span>
        </Link>
      </div>
      <Button gradientDuoTone="purpleToPink" type="submit">
        Login
      </Button>
      <div className="blur-left"></div>
      <div className="blur-right"></div>
    </form>
  );
};

export default Login;
