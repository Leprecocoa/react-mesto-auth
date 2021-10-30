import { useState } from "react";
import Header from "./Header";
import UserNav from "./UserNav";

function HeaderWithUserMenu(props) {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => setShowMenu(!showMenu);
  return (
    <div className="header-menu">
      <div className="header-menu__user-nav header-menu__user-nav_type_mobile">
        {showMenu ? <UserNav /> : null}
      </div>
      <Header>
        <div>
          <div className="header-menu__user-nav header-menu__user-nav_type_desktop">
            <UserNav />
          </div>
          <button className="header-menu__button" onClick={handleShowMenu}>
            <span
              className={`header-menu__button-icon ${
                showMenu
                  ? "header-menu__button-icon_state_active"
                  : "header-menu__button-icon_state_unactive"
              }`}
            ></span>
          </button>
        </div>
      </Header>
    </div>
  );
}

export default HeaderWithUserMenu;
