import {getRandomInteger} from "../utils/random-integer.js";
import {POINT_TYPE, POINT_CITY, POINT_DESCRIPTION, POINT_OFFERS} from "../const.js";

const getPointType = () => {
  const typeNumber = getRandomInteger(0, 9);
  return POINT_TYPE[typeNumber];
};

const getPointCity = () => {
  const cityNumber = getRandomInteger(0, 5);
  return POINT_CITY[cityNumber];
};

const getPointDescription = () => {
  const descriptionSentences = POINT_DESCRIPTION.split(`.`);

  descriptionSentences.sort(() => {
    return Math.random() - 0.5;
  });

  return descriptionSentences.slice(getRandomInteger(0, 4)).join(`.`);
};

const getOffersList = (arrayLength) => {
  return new Set(new Array(arrayLength).fill(``).map(() => POINT_OFFERS[getRandomInteger(0, 6)]));
};

const getPhotos = () => {
  const photos = [];
  const limiter = getRandomInteger(0, 2);
  for (let i = 0; i < limiter; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

export const getTripPoint = (count) => {
  return new Array(count).fill(``).map(() => ({
    type: getPointType(),
    target: getPointCity(),
    description: getPointDescription(),
    time: {
      start: 1596695400000,
      end: 1596699000000
    },
    price: getRandomInteger(10, 200),
    offers: getOffersList(getRandomInteger(0, 5)),
    photos: getPhotos()
  })
  );
};
