import logoPath from "../images/header-logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип." className="header__logo" />
      {props.children}
    </header>
  );
}

export default Header;
