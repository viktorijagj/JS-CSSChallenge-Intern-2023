window.onload = function () {
  displayDefaultCards();
};

/////////////////////////////////////////////////  Fetch data from json
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("cards", JSON.stringify(data));
  });

// Access to html elements

let layout = document.querySelector(".layout-placeholder");
let loadMorebtn = document.querySelector(".load-more-btn");

// Numbers of card displayed when the page loads
let defaultCards = 4;
// Number of cards displyed when the btn is clicked
let loadCards = 4;

/////////////////////////////////////////////////  Load the default cards
const displayDefaultCards = () => {
  let cards = JSON.parse(localStorage.getItem("cards"));
  let displayCards = "";
  let count = 0;

  for (let card of cards) {
    if (count < defaultCards) {
      displayCards += `<div class="card">
            <div class="card-header flex">
            <div class="user flex">
            <img class="user-img" src="${card.profile_image}" alt="card pic"/>
            <div class="user-info">
            <h1 class="user-name">${card.name}</h1>
            <p class="post-date">${card.date}</p>
            </div>
            </div>
            <img src="../icons/${card.source_type}.svg" class="logo"/>
            </div>
            <img class="card-img" src=${card.image} /> 
            <p class="card-descr">${card.caption}</p>
            <hr>
            <div class="likes flex">
            <img id="heart" src="../icons/heart.svg" class="like-img" onclick="addRemoveLikes(this)"/>
            <p class="like-numb">${card.likes}</p>
            </div>
            </div>`;
    }
    count++;
  }
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  cardContainer.classList.add("grid");
  layout.insertBefore(cardContainer, loadMorebtn);
  cardContainer.innerHTML = displayCards;
};
///////////////////////////////////////////////// Load the next cards
const loadMoreCards = () => {
  let cards = JSON.parse(localStorage.getItem("cards"));
  let currentCards = document.querySelectorAll(".card").length;

  let displayCards = "";
  let count = 0;
  for (let card of cards) {
    if (count >= currentCards && count < loadCards + currentCards) {
      displayCards += `<div class="card">
            <div class="card-header flex">
            <div class="user flex">
            <img class="user-img" src="${card.profile_image}" alt="card pic"/>
            <div class="user-info">
            <h1 class="user-name">${card.name}</h1>
            <p class="post-date">${card.date}</p>
            </div>
            </div>
            <img src="../icons/${card.source_type}.svg" class="logo"/>
            </div>
            <img class="card-img" src=${card.image} />
            <p class="card-descr">${card.caption}</p>
            <hr>
            <div class="likes flex">
            <img id="heart" src="../icons/heart.svg" class="like-img" onclick="addRemoveLikes(this)"/>
            <p class="like-numb">${card.likes}</p>
            </div>
            </div>`;
    }
    count++;
  }
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  cardContainer.classList.add("grid");
  layout.insertBefore(cardContainer, loadMorebtn);
  cardContainer.innerHTML = displayCards;

  if (document.querySelectorAll(".card").length == cards.length) {
    loadMorebtn.style.display = "none";
  }
};

///////////////////////////////////////////////// Collecting likes
const addRemoveLikes = (e) => {
  let likes = document.querySelectorAll(".like-img");
  for (const like of likes) {
    like.addEventListener("click", function onclick(event) {
      if (event.target.classList.contains("liked")) {
        event.target.classList.remove("liked");
        let numberCount = Number(e.nextElementSibling.innerText) - 1;
        e.nextElementSibling.innerText = numberCount;
      } else {
        event.target.classList.add("liked");
        let numberCount = Number(e.nextElementSibling.innerText) + 1;
        e.nextElementSibling.innerText = numberCount;
      }
    });
  }
};
/////////////////////////////////////////////////  Change column display

const changeColumns = () => {
  let columnNumbSelected = document.getElementById("numberOfColumns").value;

  document.querySelectorAll(".card-container").forEach((item) => {
    if (columnNumbSelected === "1") {
      item.style.gridTemplateColumns = "500px";
    } else if (columnNumbSelected === "2") {
      item.style.gridTemplateColumns = "500px 500px";
    } else if (columnNumbSelected === "3") {
      item.style.gridTemplateColumns = "repeat(3,1fr)";
    } else if (columnNumbSelected === "4") {
      item.style.gridTemplateColumns = "repeat(4,1fr)";
    } else if (columnNumbSelected === "5") {
      item.style.gridTemplateColumns = "repeat(5,1fr)";
    } else if (columnNumbSelected === "dynamic") {
      item.style.gridTemplateColumns =
        "repeat( auto-fill, minmax(300px, 1fr) )";
    }
  });
};

///////////////////////////////////////////////// Change card background

let inputColor = document.getElementById("cardBackgroundColor");
inputColor.addEventListener("keydown", function (e) {
  if (e.key === "Enter");
  changeCardColor(e);
});

const changeCardColor = (e) => {
  let text = e.target.value;
  document.querySelectorAll(".card").forEach((card) => {
    card.style.backgroundColor = text;
  });
};
/////////////////////////////////////////////////  Change the margin/gap
let inputGap = document.getElementById("cardSpaceBetween");
inputGap.addEventListener("keydown", function (e) {
  if (e.key === "Enter");
  changeCardGap(e);
});
const changeCardGap = (e) => {
  let gap = e.target.value;
  document.querySelectorAll(".card-container").forEach((item) => {
    item.style.gap = gap;
  });
};

// Dark mode
const showSelectedValue = (e) => {
     console.log(e.target)
    if (e.target.checked && e.target.value ==="darkTheme") {
        let cards = document.querySelectorAll(".card");
        window.localStorage.setItem("style", e.target.value);
        for(const card of cards) {
            card.classList.add(e.target.value);
        }
    }
         else if(e.target.value ==="lightTheme") {
            let cards = document.querySelectorAll(".card");
            for(const card of cards) {
                card.classList.add(e.target.value);
            }
       
}
}

let radioBtns = document.querySelectorAll('input[name="theme"]');
for (const radioBtn of radioBtns) {
        radioBtn.addEventListener('change',showSelectedValue);
    }


