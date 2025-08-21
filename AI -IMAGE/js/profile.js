document.addEventListener("DOMContentLoaded", () => {
  const authSection = document.getElementById("authSection");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (isLoggedIn && user) {
    authSection.innerHTML = `
      <a href="profile.html" class="flex items-center space-x-2">
        <img src="${user.image || 'https://via.placeholder.com/40'}" 
             alt="Profile" class="w-8 h-8 rounded-full border">
        <span class="text-sm font-size:15px font-semibold">${user.name}</span>
      </a>
    `;
  } else {
    authSection.innerHTML = `
      <a href="login.html" class="text-indigo-600  px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Login</a>
      <a href="register.html" class="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Register</a>
    `;
  }
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}