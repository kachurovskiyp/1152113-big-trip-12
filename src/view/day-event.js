import {getTimeString} from "../utils/time-string.js";
import {createElement} from "../utils/create-element.js";

const getOfferList = (offers) => {
  return Array.from(offers).map((offer) => `<li class="event__offer">
  <span class="event__offer-title">${offer.name}</span>
  &plus;
  &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`).join(``);
};

const createTripDayEvent = (tripPoint) => {
  const {type, target, price, time} = tripPoint;

  const timeDiff = (time.end - time.start) / 60000;
  let timeDiffString = `${timeDiff}M`;

  const timeStart = new Date(time.start);
  const timeEnd = new Date(time.end);

  if (timeDiff >= 60) {
    if (timeDiff % 60 === 0) {
      timeDiffString = `${timeDiff / 60}H 00M`;
    } else {
      timeDiffString = `${Math.floor(timeDiff / 60)}H ${timeDiff - ((Math.floor(timeDiff / 60)) * 60)}M`;
    }
  }

  return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase() === `check` ? `check-in` : type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${target}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getTimeString(timeStart, `datetime`)}">${getTimeString(timeStart, `time`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getTimeString(timeEnd, `datetime`)}">${getTimeString(timeEnd, `time`)}</time>
          </p>
          <p class="event__duration">${timeDiffString}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOfferList(tripPoint.offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

export default class TripDayEventView {
  constructor(tripPoint) {
    this._element = null;
    this._tripPoint = tripPoint;
  }

  getTemplate() {
    return createTripDayEvent(this._tripPoint);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
