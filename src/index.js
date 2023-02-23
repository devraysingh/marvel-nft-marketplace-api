//import "./styles.css";
// import axios from "axios";
// import md5 from "md5";

const publicKey = "bb8f26fe56676fa5a1b363eabd4ac42f";
const privateKey = "14d1e1efb2039dcaacd39d64ee6275587e4b6ad0";
const timestamp = new Date().getTime();
const hash = md5(timestamp + privateKey + publicKey);

let characters = [];
let ids = ["1016181", "1009368", "1009652"];

const promoContainer = document.querySelector(".promo__container");
const saleContainer = document.querySelector(".sale__container");

axios
  .get("https://gateway.marvel.com/v1/public/characters", {
    params: {
      ts: timestamp,
      apikey: publicKey,
      hash: hash
    }
  })
  .then((response) => {
    //console.log(response.data.data.results);
    characters = response.data.data.results;
    createCard();
    //return characters.comics.item.resourceURI;
  })
  .then((response) => {
    axios.get(response + hash).then((res) => console.log(res));
  })
  .catch((error) => {
   // console.log(error);
  });

// axios
//   .get("https://gateway.marvel.com/v1/public/characters", params {
//     params)
//   .then((response) => {
//     return characters.comics.items.resourceURI;
//   })
//      .then((response) => {
//      .get(response + hash){

// }
//      })
// }
// )

function createCard() {
  characters.forEach((character) => {
    //console.log("hello world");
    const card = document.createElement("div");
    const nameContainer = document.createElement("div");
    const nameText = document.createElement("p");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const price = document.createElement("p");
    const buyBtn = document.createElement("button");
    const des = document.createElement("des");

    nameText.innerText = character.name;
    const src = character.thumbnail.path + "." + character.thumbnail.extension;
    console.log(src);
    img.src = src;
    img.alt = nameText.innerText + " card";
    price.innerText = Math.floor(Math.random() * 10) + 0.99;
    buyBtn.innerText = "Buy";

    //adding classes
    card.classList.add("card__bg");
    nameContainer.classList.add("card__name");
    nameText.classList.add("card__name__text");
    img.classList.add("card__img");
    imgContainer.classList.add("card__img__box");
    buyBtn.classList.add("card__btn");
    price.classList.add("card__price");
    des.classList.add("card__des");
    des.appendChild(price);
    des.appendChild(buyBtn);

    nameContainer.appendChild(nameText);
    nameContainer.appendChild(des);
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    card.appendChild(nameContainer);

    saleContainer.appendChild(card);
  });
}

ids.forEach((id) => {
  axios
    .get(
      `http://gateway.marvel.com/v1/public/characters?id=${id}&ts=1677168023&apikey=bb8f26fe56676fa5a1b363eabd4ac42f&hash=5a8d772d0da3954f7d0c77e2ea638df6`
    )
    .then((res) => {
      console.log("idsssss" , res);
    })
    .catch((error) => {
       console.log("erorrrr" ,error);
    });
});
