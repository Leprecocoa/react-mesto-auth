function InfoTooltip(props) {
  return (
    <div className="popup-registerinfo popup">
      <div className="popup__container">
        <button
          className="popup__close page__button popup__close_type_profile"
          type="button"
          onClick={props.onClose}
        ></button>
        {false ? (
          <div className="popup__register-status">
            <div className="popup__register-image popup__register-image_status_sucess"></div>
            <p className="popup__register-text">
              Вы успешно зарегистрировались!
            </p>
          </div>
        ) : (
          <div className="popup__register-status">
            <div className="popup__register-image popup__register-image_status_unsucess"></div>
            <p className="popup__register-text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
