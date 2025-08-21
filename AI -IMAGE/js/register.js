 document.getElementById("registerForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const user = {
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value,
        image: ""
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", true);

      window.location.href = "index2.html";
    });