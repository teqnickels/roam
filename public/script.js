(function(){

//LOGIN MODAL
  const loginModal = document.querySelector(".login")
  const modal = document.getElementsByClassName('modal')[0];
  const close = document.getElementsByClassName("close")[0];

  console.log('the login button', modal)
  const displayModal = function() {
    return modal.style.display = "block";
  }

  const hideModal = function() {
    return modal.style.display = "none";
  }

  const clickAnywhereClose = function(event) {
    if (event.target == modal) {
      return modal.style.display = "none";
    }
  }

  loginModal.addEventListener("click", displayModal);
  close.addEventListener('click', hideModal)
  window.addEventListener('click', clickAnywhereClose)

//END OF MODAL
})();
