import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="root">
            <div className="page">
              <Switch>
                <Route path="/sign-up"></Route>
                <Route path="/sign-in">
                  <Header>
                    <NavLink
                      to="/sign-up"
                      className="header__link page__button"
                    >
                      Регистрация
                    </NavLink>
                  </Header>
                  <Login />
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
                />
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
            </div>
          </div>
        </CurrentUserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;