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
let userAdd = [];
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
}

function render() {
  waitForm();
  getInput();
}

function waitForm() {
  setTimeout(() => {
    document.getElementById("loadingMessage").textContent = "";
  }, 1000);
}


function getInput() {
  mainInput.addEventListener("input", (e) => {
    userAdd = allUsers
      .filter(
        (users) =>
          users.name.toLowerCase().indexOf(mainInput.value.toLowerCase()) !== -1
      )
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    // console.log(userAdd);
    // userCount = userAdd.length;
    // console.log(userCount);
  });
}