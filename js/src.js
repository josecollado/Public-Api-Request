const userUrl = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = $('#gallery');
const searchContainer = $('.search-container');


  
function fetchAPI(url){
  return fetch(url)
    .then((resp) => resp.json())
    .then((data) => createCards(data.results))
    .catch(error => console.log(error))
}

Promise.all([fetchAPI(userUrl)]);

function createCards(data){
  data.map((employee, index) =>{
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = `<div class="card-img-container">  
                        <img class="card-img" src='${employee.picture.large}' alt="profile picture">
                    </div>
                        <div class="card-info-container"> 
                        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p> 
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                    </div>`;
    gallery.append(cardDiv);
    $('.card').click(function(event) {
      modalCards(employee, index);    });
  });


  function modalCards(employee, index){
    const modalContainer = document.createElement('div');
    const birthdayDate = new Date(employee.dob.date)
    modalContainer.className = 'modal-container';
    modalContainer.innerHTML = ` <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                      <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                      <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                      <p class="modal-text">${employee.email}</p>
                      <p class="modal-text cap">${employee.location.city}</p>
                      <hr>
                      <p class="modal-text">${employee.phone}</p>
                      <p class="modal-text">${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                      <p class="modal-text">Birthday: ${birthdayDate.toLocaleDateString('en-US')}</p>
                  </div>
                   <div class="modal-btn-container">
                  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                  <button type="button" id="modal-next" class="modal-next btn">Next</button>
              </div>`;
    gallery.after(modalContainer); 
    $('.modal-close-btn').click(function(event) {
      $('.modal-container').remove();
    }); 
  }

}







