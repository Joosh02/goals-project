import { FaUserAstronaut } from "react-icons/fa";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      // clear the token from local storage
      localStorage.removeItem("token");

      // dispatch the logout and reset actions
      dispatch(logout());
      dispatch(reset());

      // navigate to the login page
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="./assets/logo.png" alt="logo" />
        <Link to="/">ClearTask</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <GoSignOut />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/">
                <GoSignIn />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUserAstronaut />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
