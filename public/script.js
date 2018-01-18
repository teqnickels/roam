// (function () {
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

  if(loginButton) {
    loginButton.addEventListener('click', displayLoginModal);
  }

  if(close) {
    close.addEventListener('click', hideLoginModal);
  }
  window.addEventListener('click', clickAnywhereClose);
  
//UPDATE PROFILE
const updateProfileForm = document.querySelector('.edit-profile')
const updateProfileSaveButton = document.querySelector('.save-profile-button')

const getChangesFromFields = function(event) {
  event.preventDefault()
  const updatedFields = document.querySelectorAll('.update-profile-field');
  const firstName = document.querySelector('.first-name-input').value
  const firstNameElement = document.querySelector('.first-name-input')
  const id = firstNameElement.getAttribute('data-user-id')
  const lastName = document.querySelector('.last-name-input').value
  const email = document.querySelector('.email-input').value
  const city = document.querySelector('.city-input').value
  let updates = { firstName, lastName, email, city, id }

  const url = '/save-updated-profile' 
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify(updates)
      })
      .then(function(response){
        return response.json()
      }).then(function(response) {
        if(response.redirect) {
          window.location.pathname = response.redirect
        }
        if(response.error) {
          updateProfileForm.innerHTML(response.error)
        }
      })
}
if(updateProfileSaveButton) {
  updateProfileSaveButton.addEventListener('click', getChangesFromFields)
}
// }());
