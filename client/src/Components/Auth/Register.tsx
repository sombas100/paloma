import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { register } from "../../redux/slices/userSlice";
import { MdInfo } from "react-icons/md";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state: RootState) => state.user);
  const { userInfo, loading, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    dispatch(register({ name: email.split("@")[0], email, password }));
  };
  return (
    <form
      onSubmit={submitHandler}
      className="login-container flex max-w-md flex-col gap-4"
    >
      <div className="content">
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your name" />
        </div>
        <TextInput
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="content">
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          required
          value={email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password" value="Repeat password" />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          shadow
        />
      </div>
      {passwordMismatch && (
        <Alert icon={MdInfo} color="failure">
          <span>Passwords do not match</span>
        </Alert>
      )}
      {error && (
        <Alert icon={MdInfo} color="failure">
          <span>{error}</span>
        </Alert>
      )}
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
        <Link style={{ fontSize: "14px", marginLeft: "18px" }} to="/login">
          Already have a paloma account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>Login here</span>
        </Link>
      </div>
      <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
      <div className="blur-left"></div>
      <div className="blur-right"></div>
    </form>
  );
};

export default Register;
