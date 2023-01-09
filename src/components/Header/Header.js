import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { logout } from "../../services/apiService";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { isAuthenticate, refresh_token } = useSelector(
    (state) => state.user.account
  );
  const { email } = useSelector((state) => state.user.account.userInfo);

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleRegister = () => {
    navigate(`/register`);
  };

  const handleLogout = async () => {
    let res = await logout(email, refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/");
    } else {
      toast.error(res.EM);
    }
  };

  const handleLanguge = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Bui Tien Dinh
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticate === false ? (
              <>
                <button className="btn-signin" onClick={handleLogin}>
                  {t("login")}
                </button>
                <button className="btn-signup" onClick={handleRegister}>
                  {t("register")}
                </button>
              </>
            ) : (
              <>
                <NavDropdown title={t("setting")} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    {t("profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    {t("logout")}
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={t("title")} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleLanguge("en")}>
                    Englist
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLanguge("vi")}>
                    Tiếng Việt
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
