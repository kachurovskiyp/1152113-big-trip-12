import {getTripPoint} from "./mock/generate-trip-point.js";
import TripPresenter from "./presenter/Trip.js";

const loadData = getTripPoint(5);
const tripPresenter = new TripPresenter(loadData);
tripPresenter.init();

