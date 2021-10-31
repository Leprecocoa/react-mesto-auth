import { useEffect, useState } from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import { auth } from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(null);
    setSelectedCard(null);
  }
  function handleUpdateUser(newUser) {
    api
      .sendProfileInfo(newUser)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(newAvatar) {
    api
      .editAvatar(newAvatar.avatar)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(newCard) {
    api
      .sendCards(newCard)
      .then((newPlace) => {
        setCards([newPlace, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .sendLikes(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLikes(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((el) => {
            return el._id !== card._id;
          })
        );
      })
      .catch((err) => console.log(err));
  }
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          history.push("/login");
          setInfoTooltipPopupOpen("success");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipPopupOpen("error");
      });
  }
  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/");
          setUserData({ email: email });
        }
      })
      .catch((err) => console.log(err));
  }
  function handleCheckToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setUserData({ email: res.data.email });
        })
        .catch((err) => console.log(err));
    }
  }
  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  useEffect(() => {
    if (loggedIn === true) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
    handleCheckToken();
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Switch>
              <Route path="/sign-up">
                <Header>
                  <NavLink
                    to="/sign-in"
                    className="header-menu__link page__button"
                  >
                    Войти
                  </NavLink>
                </Header>
                <Register onRegister={handleRegister} />
              </Route>
              <Route path="/sign-in">
                <Header>
                  <NavLink
                    to="/sign-up"
                    className="header-menu__link page__button"
                  >
                    Регистрация
                  </NavLink>
                </Header>
                <Login onLogin={handleLogin} />
              </Route>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                userData={userData}
                onLogout={handleLogout}
              />
              <Route path="*">
                <Redirect to="sign-in" />
              </Route>
            </Switch>
            {/* Popup profile */}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            {/* Popup edit profile avatar */}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            {/* Add card popup */}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            {/* Delete card popup */}
            <PopupWithForm
              name="deletecard"
              title="Вы уверены?"
              buttonText="Да"
            ></PopupWithForm>
            {/* Image popup */}
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            {/* InfoTooltip popup */}
            <InfoTooltip
              onClose={closeAllPopups}
              isOpen={isInfoTooltipPopupOpen}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
