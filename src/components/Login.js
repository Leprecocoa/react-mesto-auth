import { useState } from "react";

function Login(props) {
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!data.password || !data.email) {
      return;
    }
    props.onLogin(data.password, data.email);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form form"
        action="#"
        name="loginForm"
        onSubmit={handleSubmit}
      >
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={data.password}
          onChange={handleChange}
        />
        <button className="form__submit page__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
