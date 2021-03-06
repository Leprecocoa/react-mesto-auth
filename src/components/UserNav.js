import { NavLink } from "react-router-dom";

function UserNav(props) {
  return (
    <nav className="header-menu__nav header-menu__nav_type_mobile">
      <p className="header-menu__user-email">{props.userData.email}</p>
      <NavLink
        to="/sign-in"
        className="header-menu__link_type_exit header-menu__link page__button"
        onClick={props.onLogout}
      >
        Выйти
      </NavLink>
    </nav>
  );
}

export default UserNav;
