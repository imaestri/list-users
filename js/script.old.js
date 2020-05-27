
let userCount = 0;
let totalAge = 0;
let ageAvg = 0;
let totalGenderM = 0;
let totalGenderF = 0;

let mainInput = document.getElementById("mainInput");
let cardUsers = document.getElementById("cardUsers");
let cardStatistics = document.getElementById("cardStatistics");
let btnFunction = document.getElementById("buttonSearch");

let allUsers = [];
let userAdd = [];


window.addEventListener("load", () => {
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

  // console.log(allUsers);
}

function render() {
  waitBtnInput();
  inputMain();
  renderList();
  addListStatistics();
  renderListStatistics();
  // buttonMain();
}

function waitBtnInput() {
  setTimeout(() => {
    document.getElementById("waitMessage").textContent = "";

    const userHTML = `
    
    <div class = 'container'>
      <div>
        <button class="button is-small is-success" id="buttonSearch">Search</button>
      </div>
    </div>
  `;

    btnFunction.innerHTML = userHTML;
  }, 1000);
}

function inputMain() {
  mainInput.addEventListener("input", () => {
    userAdd = allUsers
      .filter(
        (users) =>
          users.name.toLowerCase().indexOf(mainInput.value.toLowerCase()) !== -1
      )
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    userCount = userAdd.length;


    renderList();
    renderListStatistics();
    addListStatistics();
  });
}

// function buttonMain() {
//   mainInput.addEventListener("keyup", (e) =>{
//     if(e.key === 'Enter'){
      
//     }
//   })
// }

function renderList() {
  let usersListHTML = `
    <div>
    <h2>${userCount} usuário(s) encontrado(s)</h2>
    <br>
    </div>
  `;

  userAdd.forEach((users) => {
    const { name, picture, age, gender } = users;

    let userListHTML = `
      <div class = "cardUsers">
        <div>
          <img src="${picture}" alt="${name}">
          <ul>
            <li> ${name} </li>
            <li> ${age} </li>
          </ul>
        </div>
      </div>
    `;

    usersListHTML += userListHTML;
  });


  cardUsers.innerHTML = usersListHTML;
}

function addListStatistics(users) {
  totalAge = userAdd.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  // console.log(totalAge);

  ageAvg = userAdd.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0) / userCount;

  // console.log(totalAVG);

  totalGenderM = userAdd.filter((users) => {
    return users.gender === "male";
  }).length;

  totalGenderF = userAdd.filter((users) => {
    return users.gender === "female";
  }).length;

  // console.log(totalGenderM);
  // console.log(totalGenderF);

  
}

function renderListStatistics() {
  

  cardStatistics.innerHTML = `
  <div class = "cardStatistics">
    <div>          
      <ul>
        <li> Soma das idades: ${totalAge}</li>
        <li> Média das idades: ${new Intl.NumberFormat().format(ageAvg)} </li>
        <li> Sexo masculino: ${totalGenderM} </li>
        <li> Sexo feminino: ${totalGenderF} </li>
      </ul>
    </div>
  </div>
`;
}
