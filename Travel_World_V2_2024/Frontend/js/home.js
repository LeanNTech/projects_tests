const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if (!username || username === "") {
  window.location.href = 'index.html';
} else {
  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.textContent = `¡Bienvenido, ${username}!`;
}

const logout = () => {
  window.location.href = 'index.html'; 
};