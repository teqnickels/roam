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

  // loginButton.addEventListener('click', displayLoginModal);

  // close.addEventListener('click', hideLoginModal);
  window.addEventListener('click', clickAnywhereClose);
  
//UPDATE PROFILE
const updateProfileSaveButton = document.querySelector('.save-profile-button')

// const inputs = document.getElementsByClassName('update-profile-field').value
// inputs.oninput = function () {
//   console.log(event.target)
// };


const getChangesFromFields = function(event) {
  console.log('GET CHANGES BEING CALLED')
  event.preventDefault()
  const updatedFields = document.querySelectorAll('.update-profile-field');
  console.log('THESE ARE UPDATE FIELDS',updatedFields)
  const firstName = document.querySelector('.first-name-input').value
  const lastName = document.querySelector('.last-name-input').value
  const email = document.querySelector('.email-input').value
  const city = document.querySelector('.city-input').value
  let updates = { firstName, lastName, email, city }

  console.log('THIS IS UPDATES OBJECT---->', updates)

  const url = '/save-updated-profile' 
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify(updates)
      })
      .then(function(response){
        return response.json
      })
}

updateProfileSaveButton.addEventListener('click', getChangesFromFields)
// }());
