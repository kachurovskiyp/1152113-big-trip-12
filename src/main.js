import MainInfoView from "./view/main-info.js";
import TripControlsView from "./view/trip-controls.js";
import TripFilterView from "./view/filter-controls.js";
import SortControlsView from "./view/sort-controls.js";
import DaysContainerView from "./view/days-container.js";
import TripDayItem from "./view/day-item.js";
import TripDayEventView from "./view/day-event.js";
import EventEditFormView from "./view/event-edit";

import {getTripPoint} from "./mock/generate-trip-point.js";
import {RENDER_POSITION} from "./const.js";
import {renderElement} from "./utils/render.js";

const pageHeaderElement = document.querySelector(`.page-header`);
const headerMainInfoContainer = pageHeaderElement.querySelector(`.trip-main`);
const tripControlsContainer = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripViewControlsTitles = tripControlsContainer.querySelectorAll(`h2`);

const tripMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsContainer = tripMainElement.querySelector(`.trip-events`);

const renderTripEvent = (tripEventsList, event) => {
  const eventComponent = new TripDayEventView(event);
  const eventEditComponent = new EventEditFormView(event);

  const replaceEventToEdit = () => {
    tripEventsList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    tripEventsList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEdit();
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
  });

  renderElement(tripEventsList, eventComponent.getElement(), RENDER_POSITION.BEFOREEND);
};

const loadData = getTripPoint(5);

renderElement(headerMainInfoContainer, new MainInfoView().getElement(), RENDER_POSITION.AFTERBEGIN);
renderElement(tripViewControlsTitles[0], new TripControlsView().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripViewControlsTitles[1], new TripFilterView().getElement(), RENDER_POSITION.AFTEREND);

renderElement(tripEventsContainer, new SortControlsView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(tripEventsContainer, new DaysContainerView().getElement(), RENDER_POSITION.BEFOREEND);

const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

renderElement(tripDaysContainer, new TripDayItem().getElement(), RENDER_POSITION.BEFOREEND);

const tripEventsList = tripDaysContainer.querySelector(`.trip-events__list`);


for (let i = 0; i < loadData.length; i++) {
  renderTripEvent(tripEventsList, loadData[i]);
}
