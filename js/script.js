// declarando as variáveis globais

let userCount = 0;
let totalAge = 0;
let ageAvg = 0;
let countGenderM = 0;
let countGenderF = 0;
let mainInput = null;
let cardUsers = null;
let cardStatistics = null;
let btnFunction = null;

let allUsers = [];
let allStatisticsUser = [];

window.addEventListener("load", () => {  
  mainInput = document.getElementById("mainInput");
  cardUsers = document.getElementById("cardUsers");
  cardStatistics = document.getElementById("cardStatistics");
  btnFunction = document.getElementById("buttonSearch");
  
  render();
  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  allUsers = json.results.map((users) => {
    const { name, picture, dob, gender } = users;
    return {
      name: `${name.first} ${name.last}`,
      picture: picture.thumbnail,
      age: dob.age,
      gender: gender,
    };
  });
  console.log(allUsers);
}

function render() {}
