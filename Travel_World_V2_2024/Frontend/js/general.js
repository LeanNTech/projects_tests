// DB //
let destinos = [];
let opiniones = [];

window.addEventListener("DOMContentLoaded", async () => {
  await cargarData();
  mostrarDestinos();
  mostrarOpiniones();
});

const users = [
  {
    id: 0,
    email: "Manaos@gmail.com",
    username: "Manaos",
    password: "123manaos321",
  },
];

// Función para cargar destinos/opiniones y asignarlas a la variable global
const cargarData = async () => {
  const res = await fetch("https://simons89.github.io/fakeApi/destinos.json");
  const data = await res.json();
  destinos = data.destinos;
  opiniones = data.opiniones;
};

// Función para mostrar las tarjetas de los destinos
const mostrarDestinos = () => {
  const contenedorDestinos = document.querySelector("#contenedor-destinos");
  contenedorDestinos.innerHTML = "";

  destinos.forEach((destino) => {
    const destinoHTML = `
      <div class="col">
        <div class="card shadow-sm" style="border: .8em solid white; cursor: pointer;" data-bs-toggle="modal"
          data-bs-target="#opinionModal" onclick="mostrarOpinionesDestino(${destino.id})">
          <img src="${destino.img}" style="height: 255px;" class="card-img-top">
          <div class="card-body px-1">
            <h5 class="card-title" style="color: #3d3e48;">${destino.destino}</h5>
            <div style="display: flex; justify-content: space-between; margin-top: 1em; align-items: center;">
              <h6 class="card-subtitle mt-1 text-body-secondary"> USD $${destino.precio}</h6>
              <div style="display: flex; align-items: center;">
                <i class="bi bi-chat-dots-fill fs-5" style="color: #3d3e48;"></i>
                <p class="card-text ms-2">${destino.opiniones.length} opiniones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    contenedorDestinos.innerHTML += destinoHTML;
  });
};

// Función para mostrar las opiniones
const mostrarOpiniones = () => {
  const contenedorOpiniones = document.querySelector("#contenedor-opiniones");
  contenedorOpiniones.innerHTML = "";

  opiniones.forEach((opinion) => {
    let opinionHTML = `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <span style="display: flex; align-items: center;">
              <img src="${opinion.img}" class="rounded-circle object-fit-cover " style="height: 2.3rem; width: 2.3rem;"
                class="avatar-xxl rounded-circle" alt="Foto de perfil">
              <h5 class="card-title mt-2 ms-2">${opinion.nombre}</h5>
            </span>
            <p class="card-text mt-3">${opinion.opinion}</p>
          </div>
        </div>
      </div>
    `;
    contenedorOpiniones.innerHTML += opinionHTML;
  });
};

// Muestra las opiniones del index
const mostrarOpinionesDestino = (idDestino) => {
  let modalTitle = document.querySelector(".modal-title");
  let modalBody = document.querySelector(".modal-body");
  const destinoEncontrado = getDestino(idDestino);

  modalTitle.textContent = destinoEncontrado.destino;
  modalBody.innerHTML = "";

  destinoEncontrado.opiniones.forEach((opinion) => {
    let opinionHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${opinion.nombre}</h5>
          <p class="card-text">${opinion.opinion}</p>
        </div>
      </div>
    `;
    modalBody.innerHTML += opinionHTML;
  });
};

// Funciones para obtener y modificar los arreglos que usamos como BD - Getters & Setters
const getDestino = (id) => {
  return destinos.find((destino) => destino.id === id);
};

const getUsers = () => {
  return users;
};

const setUsers = (user) => {
  users.push(user);
};

// Función para validar el formulario de registro
function submitRegisterForm(event) {
  event.preventDefault();
  document.getElementById("errorMessages").innerHTML = "";

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("passwordConfirm").value;

  const errorMessages = document.getElementById("errorMessages");

  if (!username || !email || !password || !confirmPassword) {
    errorMessages.innerHTML = "<p>Todos los campos son obligatorios.</p>";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMessages.innerHTML = "<p>Formato de Email incorrecto.</p>";
    return;
  }

  if (password.length < 7) {
    errorMessages.innerHTML =
      "<p>La contraseña debe tener al menos 7 caracteres.</p>";
    return;
  }

  if (password !== confirmPassword) {
    errorMessages.innerHTML = "<p>Las contraseñas no coinciden.</p>";
    return;
  }

  agregarUsuario(email, username, password);
}

// Función para agregar un usuario a la BD
const agregarUsuario = (email, username, password) => {
  const errors = [];
  let usersData = getUsers();

  const id = usersData.length + 1;
  const found = usersData.some((user) => user.username === username);

  if (!found) {
    setUsers({ id, email, username, password });
    window.location.href = `home.html?username=${username}`;
  } else {
    errors.push(`El usuario ${username} ya se encuentra registrado`);
    const errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
  }
  return errors;
};

function submitLoginForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    const errorMessage = document.getElementById("errorMessages");
    errorMessage.textContent =
      "Por favor, ingresa un nombre de usuario y una contraseña.";
    return;
  }

  login(username, password);
}

const login = (username, password) => {
  let usersData = getUsers();
  const user = usersData.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    window.location.href = `home.html?username=${username}`;
  } else {
    const errorMessage = document.getElementById("errorMessages");
    errorMessage.textContent = "Nombre de usuario o contraseña incorrectos";
  }
};
