import { DivComponent } from "../../../commons/div-component";
import "./favorites.css";

export class Favorites extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.innerHTML = "";
    const favoritesGrid = document.createElement("div");
    favoritesGrid.classList.add("favorites__grid");

    for (const card of this.appState.favorites) {
      const favoritesCard = document.createElement("div");
      favoritesCard.classList.add("favorites__card");
      favoritesCard.innerHTML = `
        <div class="card__image">
           <img src="https://covers.openlibrary.org/b/olid/${card.cover_edition_key}-M.jpg" alt="обложка" />
        </div>
        <div class="card__info">
            <div class="card__tag">
                ${card.subject ? card.subject[0] : "Undefined"}
            </div>
            <div class="card__name">
                ${card.title}
            </div>
            <div class="card__auther">
                ${card.author_name ? card.author_name[0] : "Undefined"}
            </div>
            <div class="card__footer">
                <button class="button__add button__active">
                    <img src="/static/favorites.svg" />
                </button>
            </div>
        </div>
        `;

      const buttonEl = favoritesCard.querySelector(".button__add");

      buttonEl.addEventListener("click", () => {
        buttonEl.classList.remove("button__active");
        const index = this.appState.favorites.findIndex(
          (book) => book.key == card.key,
        );
        this.appState.favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(this.appState.favorites));
      });

      favoritesGrid.append(favoritesCard);
    }
    this.el.append(favoritesGrid);

    return this.el;
  }
}
