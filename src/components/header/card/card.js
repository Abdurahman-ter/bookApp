import { DivComponent } from "../../../commons/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render() {
    this.el.innerHTML = "";
    const existToFavorites = this.appState.favorites.find(
      (b) => b.key == this.cardState.key,
    );

    this.el.classList.add("card");
    this.el.innerHTML = `
        <div class="card__image">
           <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="обложка" />
        </div>
        <div class="card__info">
            <div class="card__tag">
                ${this.cardState.subject ? this.cardState.subject[0] : "Undefined"}
            </div>
            <div class="card__name">
                ${this.cardState.title}
            </div>
            <div class="card__auther">
                ${this.cardState.author_name ? this.cardState.author_name[0] : "Undefined"}
            </div>
            <div class="card__footer">
                <button class="button__add ${existToFavorites ? "button__active" : ""}">
                    ${
                      existToFavorites
                        ? '<img src="/static/favorites.svg" />'
                        : '<img src="/static/favorites-whait.svg" />'
                    }
                </button>
            </div>
        </div>
        `;

    this.el.querySelector(".button__add").addEventListener("click", () => {
      if (this.appState.favorites.some((b) => b.key === this.cardState.key)) {
        const index = this.appState.favorites.findIndex(
          (book) => book.key == this.cardState.key,
        );
        this.appState.favorites.splice(index, 1);
        this.el
          .querySelector(".button__add")
          .classList.remove("button__active");
        return;
      }
      this.appState.favorites.push(this.cardState);
      this.el.querySelector(".button__add").classList.add("button__active");
    });

    return this.el;
  }
}
