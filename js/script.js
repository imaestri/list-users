// declarando as variáveis globais
let userCount = 0;
let totalAge = 0;
let ageAvg = 0;
let countGenderM = 0;
let countGenderF = 0;
let mainInput = null;
let cardUsers = null;
let cardStatistics = null;
// let btnFunction = null;

let allUsers = [];
let userAdd = [];

window.addEventListener("load", () => {
  mainInput = document.getElementById("mainInput");
  cardUsers = document.getElementById("cardUsers");
  cardStatistics = document.getElementById("cardStatistics");
//   btnFunction = document.getElementById("buttonSearch");

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
  renderlistUsers();
}

function waitForm() {
  setTimeout(() => {
    document.getElementById("loadingMessage").textContent = "";
  }, 5000);

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

      userCount = userAdd.length;

    // console.log(userAdd);
   
    // console.log(userCount);

    renderlistUsers();
    renderListStatistics()
    addListStatistics();
  });
  
}


function addListStatistics() {
  totalAge = userAdd.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  // console.log(totalAge);

  ageAvg = userAdd.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0) / userCount;
  // console.log(ageAvg);

  countGenderM = userAdd.filter((users) => {
    return users.gender === "male";
  }).length;

  countGenderF = userAdd.filter((users) => {
    return users.gender === "female";
  }).length;

  // console.log(totalGenderM);
  // console.log(totalGenderF);
  renderListStatistics();
}



function renderlistUsers() {
  let usersListHTML = `
    <div>
    <p id="count-users" >${userCount} usuário(s) encontrado(s)</p>
    <br>
    </div>
  `;

  userAdd.forEach((users) => {
    const { name, picture, age } = users;

    let userListHTML = `
      <div class = "cardUsers">
      
        <div>
          <img src="${picture}" alt="${name}">
          <ul>
            <li> ${name}, ${age}. </li>
          </ul>
        </div>
      </div>
    `;

    usersListHTML += userListHTML;
  });

  cardUsers.innerHTML = usersListHTML;
}

function renderListStatistics(){
          cardStatistics.innerHTML = `
          <div class = "cardStatistics">
            <div>  
            <div>
              <p id="users-statistics" > Estatísticas </p>
              <br>
            </div>        
              <ul>
                <li> Soma das idades: ${totalAge}</li>
                <li> Média das idades: ${new Intl.NumberFormat().format(ageAvg)} </li>
                <li> Sexo masculino: ${countGenderM} </li>
                <li> Sexo feminino: ${countGenderF} </li>
              </ul>
            </div>
          </div>
        `;
        }
        