import Abstract from "./abstract.js";

export default class DaysContainerView extends Abstract {
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}
