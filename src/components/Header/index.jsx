import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import { useWatchLater } from "../../context/WatchLaterContext";
import "./index.css";

const Header = () => {
  const { watchLater } = useWatchLater();
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  return (
    <header className="header">
      <nav className="header-inner page-container">
        <Link className="logo" to="/">
          NXTFLIX
        </Link>

        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link nav-link--watch-later" to="/watch-later">
            Watch Later
            {watchLater.length > 0 && (
              <span className="nav-badge">{watchLater.length}</span>
            )}
          </Link>

          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
