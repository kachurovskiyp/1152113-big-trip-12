import {createMainInfoTamplate} from "./view/main-info.js";
import {createTripViewControls} from "./view/trip-controls.js";
import {createTripFilterControls} from "./view/filter-controls.js";
import {createTripEventsSortControls} from "./view/sort-controls.js";
import {createTripDaysContainer} from "./view/days-container.js";
import {createTripDayItem} from "./view/day-item.js";
import {creatrTripDayEvent} from "./view/day-event.js";

const EVENTS_COUNT = 3;

const pageHeaderElement = document.querySelector(`.page-header`);
const headerMainInfoContainer = pageHeaderElement.querySelector(`.trip-main`);
const tripControlsContainer = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripViewControlsTitles = tripControlsContainer.querySelectorAll(`h2`);

const tripMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsContainer = tripMainElement.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerMainInfoContainer, createMainInfoTamplate(), `afterbegin`);
render(tripViewControlsTitles[0], createTripViewControls(), `afterend`);
render(tripViewControlsTitles[1], createTripFilterControls(), `afterend`);

render(tripEventsContainer, createTripEventsSortControls(), `beforeend`);
render(tripEventsContainer, createTripDaysContainer(), `beforeend`);

const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

render(tripDaysContainer, createTripDayItem(), `beforeend`);

const tripEventsList = tripDaysContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsList, creatrTripDayEvent(), `beforeend`);
}
