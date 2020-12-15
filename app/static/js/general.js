//hide/show navigation---------------------------------------------------------------
var nav = document.querySelector(".nav__container");
var navOpen = document.querySelector(".nav__open");
document.addEventListener("click", (e) => {
  if (e.target == nav) {
    hideNav();
  }
});

document.querySelector(".nav>span").addEventListener("click", (e) => {
  hideNav();
});

navOpen.addEventListener("click", (e) => {
  showNav();
});

function hideNav() {
  nav.style.display = "none";
  navOpen.style.display = "block";
}
function showNav() {
  nav.style.display = "block";
  navOpen.style.display = "none";
}

export function ready() {
  //logout
  let logoutBtn = document.querySelector("#logout");
  if (logoutBtn)
    logoutBtn.addEventListener("click", () => {
      let token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location.href = "/login";
      }
    });

  var navItems = document.getElementsByClassName("nav__link");
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", (e) => {
      hideNav();
    });
  }
}
