import Dashboard from "./views/Dashboard.js";
import Login from "./views/Login.js";
import Registration from "./views/Registration.js";
import Notes from "./views/Notes.js";
import NoteView from "./views/NoteView.js";
import NoteAdd from "./views/NoteAdd.js";
import NoteUpdate from "./views/NoteUpdate.js";
import Profile from "./views/Profile.js";
import ProfileUpdate from "./views/ProfileUpdate.js";

// import Cookies from './cookie.js'
const url = "http://localhost:3000/api";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/login", restrict: false, view: Login },
    { path: "/registration", restrict: false, view: Registration },
    { path: "/notes", restrict: true, view: Notes },
    { path: "/notes/:id", restrict: true, view: NoteView },
    { path: "/add-note", restrict: true, view: NoteAdd },
    { path: "/update-note/:id", restrict: true, view: NoteUpdate },
    { path: "/profile", restrict: true, view: Profile },
    { path: "/update-user", restrict: true, view: ProfileUpdate },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  let token = localStorage.getItem("token");
  if ((match.route.restrict && token) || (!match.route.restrict && !token)) {
    // document.getElementById("err").innerHTML = "";
    const view = new match.route.view(getParams(match));
    await view.getHtml(url, token, (res) => {
      let app = document.querySelector("#app");
      app.replaceChild(res, app.firstChild);
      view.getJs(url, token);
    });
  } else if (!match.route.restrict && token) {
    window.location.href = "/notes";
  } else if (match.route.restrict && !token) {
    document.querySelector("#err").innerHTML =
      "You need to be logged in to acces this site.";
    window.location.href = "/login";
  }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
