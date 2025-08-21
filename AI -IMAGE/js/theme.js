const html = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}
