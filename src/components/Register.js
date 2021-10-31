import { useState } from "react";

function Register(props) {
  const [data, setData] = useState({ password: "", email: "" });
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(data.password, data.email);
  };
  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form
        className="register__form form"
        action="#"
        name="registerForm"
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
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
