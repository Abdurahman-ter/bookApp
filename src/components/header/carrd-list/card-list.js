import { DivComponent } from "../../../commons/div-component";
import { Card } from "../card/card";
import "./card-list.css"

export class CardList extends DivComponent {
    constructor(appState, state) {
        super()
        this.appState = appState;
        this.state = state;
    }

    render() {
        this.el.innerHTML = ""
        const cardGrid = document.createElement("div")
        cardGrid.classList.add("card__grid")
        this.el.innerHTML = `
        <div class="card__cover">
            <div class="card__title">
                Найдено книг – ${this.state.numFound}
            </div>
            <div class="card__togle un-visible">
                Loading...
            </div>
        </div>
        `

        if(this.state.loading === true) {
            this.el.querySelector(".card__togle").classList.remove("un-visible");
            this.el.querySelector(".card__title").classList.add("un-visible")
        } else {
            this.el.querySelector(".card__title").classList.remove("un-visible");
            this.el.querySelector(".card__togle").classList.add("un-visible")
        }

        for (const card of this.state.list) {
            cardGrid.append(new Card(this.appState, card).render())
        }

        this.el.append(cardGrid)
        return this.el
    }
}