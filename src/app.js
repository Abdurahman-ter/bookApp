import { MainView } from "./vues/main/main";
import { FavoritView } from "./vues/main/favorit/favorit";

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavoritView },
  ];

  appState = {
    favorites: [],
  };

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }
    const view = this.routes.find((r) => r.path == location.hash).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
