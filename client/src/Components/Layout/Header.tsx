import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  return (
    <Navbar className="nav" fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          style={{ width: 100, height: 75 }}
          src="palomalogo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Paloma
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Collapse>
          <Navbar.Link href="/" active={location.pathname === "/"}>
            Shop
          </Navbar.Link>
          <Navbar.Link href="/about" active={location.pathname === "/about"}>
            About
          </Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
        </Navbar.Collapse>
      </div>
      <Button
        gradientDuoTone="purpleToPink"
        outline
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Navbar.Toggle />
    </Navbar>
  );
}
