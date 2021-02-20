import React from 'react';
import { ReactComponent as Cat } from '../../pets/cat.svg';
import { ReactComponent as Dog } from '../../pets/dog.svg';
import { PET_SIZE, ANIMAL_KIND, COLOR } from '../../config';

const DOG_SIZES = {
  [PET_SIZE.Small]: '30%',
  [PET_SIZE.Medium]: '40%',
  [PET_SIZE.Large]: '50%',
};

const CAT_SIZES = {
  [PET_SIZE.Small]: '30%',
  [PET_SIZE.Medium]: '35%',
  [PET_SIZE.Large]: '40%',
};

const BIRD_SIZES = {
  [PET_SIZE.Small]: '30%',
  [PET_SIZE.Medium]: '50%',
  [PET_SIZE.Large]: '70%',
};

const COLOR_MAP = {
  [COLOR.black]: '#000',
  [COLOR.white]: '#fff',
  [COLOR.brown]: '#654321',
  [COLOR.grey]: '#565656',
};

const defaultBlackColorHex = '#000';

export const PetVector = ({ kind, size, color }) => {
  const currentColor = COLOR_MAP[color] || defaultBlackColorHex;
  console.log(color); 
  if (kind === ANIMAL_KIND.Cat) {
    return (
      <div style={{ width: CAT_SIZES[size], fill: currentColor }}>
        <Cat />
      </div>
    );
  }

  if (kind === ANIMAL_KIND.Dog) {
    return (
      <div style={{ width: DOG_SIZES[size], fill: currentColor }}>
        <Dog />
      </div>
    );
  }

  return (
    <div style={{ width: BIRD_SIZES[size], fill: currentColor }}>
      {/* <Dog /> */}
      Bird
    </div>
  );
};
