import Dashboard from "./views/Dashboard.js";
import Login from "./views/Login.js";
import Notes from "./views/Notes.js";
import NoteView from "./views/NoteView.js";
import Profile from "./views/Profile.js";

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
    { path: "/login", view: Login },
    { path: "/notes", restrict: true, view: Notes },
    { path: "/notes/:id", restrict: true, view: NoteView },
    { path: "/profile", restrict: true, view: Profile },
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
  if (!match.route.restrict || (match.route.restrict && token)) {
    const view = new match.route.view(getParams(match));
    await view.getHtml(url, token, (res) => {
      document.querySelector("#app").innerHTML = res;
      view.getJs(url, token);
    });
  } else {
    document.querySelector("#app").innerHTML = "Restricted";
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
