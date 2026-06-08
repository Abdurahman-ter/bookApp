import { AbstractView } from "../../../commons/view.js";
import onChange from "on-change";
import { Header } from "../../../components/header/header.js";
import { Favorites } from "../../../components/header/favorites/favorites.js";

export class FavoritView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Избранные");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
    this.app.innerHTML = "";
    const main = document.createElement("div");
    main.append(new Favorites(this.appState).render());
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const head = new Header(this.appState).render();
    this.app.prepend(head);
  }
}
