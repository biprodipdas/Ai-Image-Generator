 document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.email === email && user.password === password) {
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "index2.html";
      } else {
        alert("Invalid credentials!");
      }
    });