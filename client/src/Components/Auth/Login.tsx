import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { login } from "../../redux/slices/userSlice";
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { MdInfo } from "react-icons/md";
import OAuth from "./OAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state: RootState) => state.user);
  const { userInfo, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(login.fulfilled(userInfo));
      navigate("/");
    }
  }, [dispatch, userInfo]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <form
      onSubmit={submitHandler}
      className="login-container flex max-w-md flex-col gap-4"
    >
      <div className="content">
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
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
      <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
        {loading ? (
          <Button isProcessing gradientDuoTone="purpleToPink">
            Loading...
          </Button>
        ) : (
          "Login"
        )}
      </Button>
      <OAuth />
      {error && (
        <Alert color="failure" icon={MdInfo}>
          <span>{error}</span>
        </Alert>
      )}
      <div className="blur-left"></div>
      <div className="blur-right"></div>
    </form>
  );
};

export default Login;
