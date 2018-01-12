(function () {
  const loginButton = document.querySelector('.login-button');
  const loginModal = document.querySelector('.login-modal');
  const close = document.querySelector('.close');

  const displayLoginModal = function () {
    return loginModal.style.display = 'block';
  };

  const hideLoginModal = function () {
    return loginModal.style.display = 'none';
  };

  const clickAnywhereClose = function (event) {
    if (event.target == loginModal) {
      return loginModal.style.display = 'none';
    }
  };

  loginButton.addEventListener('click', displayLoginModal);

  close.addEventListener('click', hideLoginModal);
  window.addEventListener('click', clickAnywhereClose);
}());
