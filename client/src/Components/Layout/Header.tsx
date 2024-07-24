import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { IoCart } from "react-icons/io5";
import { logout } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state: RootState) => state.user);
  const { userInfo } = userLogin;

  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  const itemCount = cartItems.reduce(
    (acc: any, item: any) => acc + item.qty,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Navbar className="nav" fluid rounded>
      <Navbar.Brand>
        <img
          style={{ cursor: "pointer", width: 100, height: 75 }}
          src="palomalogo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
          onClick={() => navigate("/")}
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
            href="/dresses"
            active={location.pathname === "/dresses"}
          >
            Dresses
          </Navbar.Link>
          <Navbar.Link
            className="nav-link"
            href="/shoes"
            active={location.pathname === "/shoes"}
          >
            Shoes
          </Navbar.Link>
          <Navbar.Link
            className="nav-link"
            href="/accessories"
            active={location.pathname === "/accessories"}
          >
            Accessories
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
      {userInfo ? (
        <>
          <Button outline gradientMonochrome="pink" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button
          gradientMonochrome="pink"
          outline
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}

      <Navbar.Toggle />
      <div className="cart-icon-container" onClick={() => navigate("/cart")}>
        <IoCart style={{ cursor: "pointer" }} size={40} />
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </div>
    </Navbar>
  );
}
