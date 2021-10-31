function InfoTooltip(props) {
  return (
    <div
      className={`popup-registerinfo popup ${
        props.isOpen !== null && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close page__button popup__close_type_profile"
          type="button"
          onClick={props.onClose}
        ></button>
        {props.isOpen === "success" ? (
          <div className="popup__register-status">
            <div className="popup__register-image popup__register-image_status_sucess"></div>
            <p className="popup__register-text">
              Вы успешно зарегистрировались!
            </p>
          </div>
        ) : null}
        {props.isOpen === "error" ? (
          <div className="popup__register-status">
            <div className="popup__register-image popup__register-image_status_unsucess"></div>
            <p className="popup__register-text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default InfoTooltip;
