function Login(props) {
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form form" action="#" name="loginForm">
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
        <button
          className="form__submit page__button"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
