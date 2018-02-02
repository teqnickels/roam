(function () {
  const buttons = {
    loginButton: document.querySelector('.login-button'),
    closeModalButton: document.querySelector('.close')
  }

  const loginModal = document.querySelector('.login-modal');
  const modalActions = {
    displayLoginModal: () => {
      return loginModal.style.display = 'block';
    },
    hideLoginModal: () => {
      return loginModal.style.display = 'none';
    },  
    clickAnywhereClose: (event) => {
      if (event.target == loginModal) {
        return loginModal.style.display = 'none';
      }
    }
  }

  const helpers = {
    editProfilePath: window.location.pathname.split('/'),
    isPropertyInUserProfileChanges: (obj) => {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) 
          return false;
        }
      }
  }

  if(helpers.editProfilePath[1] === 'splash') {
    buttons.loginButton.addEventListener('click', modalActions.displayLoginModal);
    buttons.closeModalButton.addEventListener('click', modalActions.hideLoginModal);
    window.addEventListener('click', modalActions.clickAnywhereClose);
  }

  if (helpers.editProfilePath[3] === 'edit-profile') {
    var originalInputValues = {
      firstName: document.querySelector('.first-name-input').getAttribute('data-original'),
      lastName: document.querySelector('.last-name-input').getAttribute('data-original'),
      email: document.querySelector('.email-input').getAttribute('data-original'),
      city: document.querySelector('.city-input').getAttribute('data-original'), 
    }
    var buttonsOnEditProfilePage = {
      updateProfileSaveButton : document.querySelector('.save-profile-button')
    }
  }
    
  const getChangesFromFields = function(event) {
    event.preventDefault()
    var updatedProfileValues = {
      firstName: document.querySelector('.first-name-input').value,
      lastName: document.querySelector('.last-name-input').value, 
      email: document.querySelector('.email-input').value, 
      id: document.querySelector('.first-name-input').getAttribute('data-user-id'), 
      city: document.querySelector('.city-input').value
    }
    getDirtyValues(updatedProfileValues)
  }

const getDirtyValues = function(updatedProfileValues) {
  var userProfileChanges = {}
  userProfileChanges.id = updatedProfileValues.id

  if(updatedProfileValues.firstName !== originalInputValues.firstName) {
    userProfileChanges.first_name = updatedProfileValues.firstName
  }


  if(updatedProfileValues.lastName !== originalInputValues.lastName) {
    userProfileChanges.last_name = updatedProfileValues.lastName
  }

  if(updatedProfileValues.email !== originalInputValues.email) {
    userProfileChanges.email = updatedProfileValues.email
  }

  if(updatedProfileValues.city !== originalInputValues.city) {
    userProfileChanges.city = updatedProfileValues.city
  }

  if (!helpers.isPropertyInUserProfileChanges(userProfileChanges)) {
    fetchProfileUpdate(userProfileChanges)
  } else {
    return 'No Changes Have Been Made'
  }
 }

  if (helpers.editProfilePath[3] === 'edit-profile') {
    buttonsOnEditProfilePage.updateProfileSaveButton.addEventListener('click', getChangesFromFields)
  }
  
  function fetchProfileUpdate(obj) {
    
    const url = '/save-updated-profile'
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(obj)
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        if (response.redirect) {
          window.location.pathname = response.redirect
        }
        if (response.error) {
          updateProfileForm.innerHTML(response.error)
        }
      })
    // }

  //GENERATE TABLE FOR CITIES PAGE
  // if (helpers.editProfilePath[1] === 'splash') {
  //   const citiesDiv = document.getElementsByClassName('.cities-list')[0]
  // }

  // function tableCreate(list) {
  //   var citiesDiv = document.getElementsByClassName('cities')[0];
  //   var table = document.createElement('table');
  //   table.style.width = '75%';
  //   table.setAttribute('border', '1');
  //   var tableBody = document.createElement('tbody');
  //   var tr = document.createElement('tr');
  //   list.forEach(function(city) {
  //     var td = document.createElement('td');
  //     tr.appendChild(td)
  //     if(city[i] % 7 == 0) {
  //      tr = document.createElement('tr');
  //     }
  //   })
  //   tableBody.appendChild(tr);
  //   table.appendChild(tableBody);
  //   citiesDiv.appendChild(table)




    // for (var i = 0; i < 7; i++) {
    //   var tr = document.createElement('tr');
    //   for (var j = 0; j < 2; j++) {
    //     if (i == 2 && j == 1) {
    //       break
    //     } else {
    //       var td = document.createElement('td');
    //       td.appendChild(document.createTextNode('\u0020'))
    //       i == 1 && j == 1
    //         ? td.setAttribute('rowSpan', '2')
    //         : null;
    //       tr.appendChild(td)
    //     }
    //   }
    //   tableBody.appendChild(tr);
    // }
    // table.appendChild(tableBody);
    // body.appendChild(table)
  }

// create a table 
// loop through list and for each create td
// append td to row 
// create a tr every seven td's in list, if 7 % indexOf(list[i]) == 0 create row

// tr append tr to table append table to div every seven items, create a new tr
// until i == list.length

})();

