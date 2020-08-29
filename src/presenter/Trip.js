import {RENDER_POSITION} from "../const.js";
import {renderElement} from "../utils/render.js";
import {replace} from "../utils/replace.js";

import MainInfoView from "../view/main-info.js";
import TripControlsView from "../view/trip-controls.js";
import TripFilterView from "../view/filter-controls.js";
import SortControlsView from "../view/sort-controls.js";
import DaysContainerView from "../view/days-container.js";
import TripDayItem from "../view/day-item.js";
import TripDayEventView from "../view/day-event.js";
import EventEditFormView from "../view/event-edit";

const pageHeaderElement = document.querySelector(`.page-header`);
const headerMainInfoContainer = pageHeaderElement.querySelector(`.trip-main`);
const tripControlsContainer = pageHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripViewControlsTitles = tripControlsContainer.querySelectorAll(`h2`);

const tripMainElement = document.querySelector(`.page-body__page-main`);
const tripEventsContainer = tripMainElement.querySelector(`.trip-events`);

export default class TripPresenter {
  constructor(loadData) {
    this._loadData = loadData;

    this._mainInfoView = new MainInfoView();
    this._tripControlsView = new TripControlsView();
    this._tripFilterView = new TripFilterView();
    this._sortControlsView = new SortControlsView();
    this._daysContainerView = new DaysContainerView();
    this._tripDayItem = new TripDayItem();
  }

  _renderMainInfoView() {
    renderElement(headerMainInfoContainer, this._mainInfoView.getElement(), RENDER_POSITION.AFTERBEGIN);
  }

  _renderTripControlsView() {
    renderElement(tripViewControlsTitles[0], this._tripControlsView.getElement(), RENDER_POSITION.AFTEREND);
  }

  _renderTripFilterView() {
    renderElement(tripViewControlsTitles[1], this._tripFilterView.getElement(), RENDER_POSITION.AFTEREND);
  }

  _renderSortControlsView() {
    renderElement(tripEventsContainer, this._sortControlsView.getElement(), RENDER_POSITION.BEFOREEND);
  }

  _renderDaysContainerView() {
    renderElement(tripEventsContainer, this._daysContainerView.getElement(), RENDER_POSITION.BEFOREEND);
  }

  _renderTripDayItem() {
    this._tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);
    renderElement(this._tripDaysContainer, this._tripDayItem.getElement(), RENDER_POSITION.BEFOREEND);
  }

  _renderTripEvent(tripEventsList, event) {
    const tripDayEventView = new TripDayEventView(event);
    const eventEditFormView = new EventEditFormView(event);

    const replaceEditToEvent = () => {
      replace(tripDayEventView, eventEditFormView);
    };

    tripDayEventView.setRollupButtonClickHandler(() => {
      replace(eventEditFormView, tripDayEventView);
    });

    eventEditFormView.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToEvent();
    });

    renderElement(tripEventsList, tripDayEventView.getElement(), RENDER_POSITION.BEFOREEND);
  }

  init() {
    this._renderMainInfoView();
    this._renderTripControlsView();
    this._renderTripFilterView();
    this._renderSortControlsView();
    this._renderDaysContainerView();

    this._renderTripDayItem();

    const tripEventsList = this._tripDaysContainer.querySelector(`.trip-events__list`);

    for (let i = 0; i < this._loadData.length; i++) {
      this._renderTripEvent(tripEventsList, this._loadData[i]);
    }
  }
}
