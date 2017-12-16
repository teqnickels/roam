(function(){

//LOGIN MODAL
  const loginButton = document.querySelector(".login-button")
  const signupButton = document.querySelector(".signup-button")

  const loginModal = document.querySelector('.login-modal');
  const signupModal = document.querySelector('.signup-modal');

  const close = document.querySelector(".close");
  const closeSignUpModal = document.querySelector(".close-signup-modal")

  const displayLoginModal = function() {
    return loginModal.style.display = "block";
  }

  const displaySignUpModal = function() {
    return signupModal.style.display = "block";
  }

  const hideModal = function() {
    return loginModal.style.display = "none";
  }

  const hideSignUpModal = function() {
    return signupModal.style.display = "none"
  }

  const clickAnywhereClose = function(event) {
    if (event.target == loginModal) {
      return loginModal.style.display = "none";
    }
    if (event.target == signupModal) {
      return signupModal.style.display = "none";
    }
  }

  loginButton.addEventListener("click", displayLoginModal);
  signupButton.addEventListener("click", displaySignUpModal);

  close.addEventListener('click', hideModal)
  closeSignUpModal.addEventListener('click', hideSignUpModal)
  window.addEventListener('click', clickAnywhereClose)

//END OF MODAL
})();
