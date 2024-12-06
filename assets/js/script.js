const filterInput = document.querySelector(".filter-input");
const cardsContainer = document.querySelector(".cards-container");
const userCards = document.querySelectorAll('.user-card__item'); 
let data;
async function init (){
  data = await fetch("https://dummyjson.com/users").then(response => response.json());
  render(data.users);
}

function render(users){
  cardsContainer.innerHTML = '';
  for (const user of users) {
    cardsContainer.innerHTML += `
   <div class="user-card__item user-age">
    <div class="user-card__item-wrapper">
      <img src="${user.image}">
      <div class="user-card__info">
        <h4><span>${user.firstName}</span><span>${user.lastName}</span></h4>
        <p>${user.username}</p>
      </div>
      <div class="contacts">
        <p class="mail"><span><i class="fa-regular fa-envelope"></i> Email:</span>${user.email}</p>
        <p class="phone"><span><i class="fa-solid fa-square-phone"></i> Telefon:</span>${user.phone}</p>
        <p class="adress"><span><i class="fa-solid fa-location-dot"></i> Adres:</span>${user.address.address} ${user.address.city} / ${user.address.state}</p>
        <p class="departmant"><span><i class="fa-solid fa-building"></i> Şirket adı ve departmanı:</span>${user.company.name} / ${user.company.department}</p>
      </div>
    </div>
  </div>
    `
  }
  differentAge();
}

function differentAge() {
  for (const userCard of userCards) {
    const userAge = Number(userCard.dataset.age); 
    if (userAge > 18 && userAge <= 25) {
      userCard.classList.add('genc');
    } else if (userAge > 25 && userAge <= 40) {
      userCard.classList.add('orta');
    } else if (userAge > 40) {
      userCard.classList.add('yasli');
    }
  }
}


function filterUser() {
  const inputValue = filterInput.value.toLowerCase().trim(); 
  const searchUser = data.users.filter((user) =>
    user.firstName.toLowerCase().includes(inputValue)
  );
  render(searchUser);
}

filterInput.addEventListener('input', filterUser); 
init();