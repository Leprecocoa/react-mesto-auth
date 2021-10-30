function Register(props) {
  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form form" action="#" name="registerForm">
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <button className="form__submit page__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
