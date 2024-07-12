import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { IoCart } from "react-icons/io5";

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
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Navbar.Collapse>
          <Navbar.Link
            className="nav-link"
            href="/"
            active={location.pathname === "/"}
          >
            Shop
          </Navbar.Link>
          <Navbar.Link
            className="nav-link"
            href="/about"
            active={location.pathname === "/about"}
          >
            About
          </Navbar.Link>
          <Navbar.Link
            className="nav-link"
            href="/about"
            active={location.pathname === "/dresses"}
          >
            Dresses
          </Navbar.Link>
          <Navbar.Link
            className="nav-link"
            href="/about"
            active={location.pathname === "/shoes"}
          >
            Shoes
          </Navbar.Link>
          <Navbar.Link
            className="nav-link"
            href="/about"
            active={location.pathname === "/accessories"}
          >
            Accessories
          </Navbar.Link>
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
      <div>
        <IoCart size={40} />
      </div>
    </Navbar>
  );
}
