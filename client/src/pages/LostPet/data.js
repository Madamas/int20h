import { PET_SIZE, ANIMAL_KIND, COLOR } from '../../config';


export const colorOptions = [
  // {
  //   value: COLOR.bitcolor,
  //   text: 'bitcolor',
  // },
  // {
  //   value: COLOR.tricolor,
  //   text: 'tricolor',
  // },
  {
    value: COLOR.black,
    text: 'black',
  },
  {
    value: COLOR.white,
    text: 'white',
  },
  {
    value: COLOR.brown,
    text: 'brown',
  },
  {
    value: COLOR.grey,
    text: 'grey',
  },
]

export const sizeOptions = [
  {
    value: PET_SIZE.Large,
    text: 'Large',
  },
  {
    value: PET_SIZE.Medium,
    text: 'Medium',
  },
  {
    value: PET_SIZE.Small,
    text: 'Small',
  },
];

export const kindOptions = [
  {
    value: ANIMAL_KIND.Bird,
    text: 'Bird',
  },
  {
    value: ANIMAL_KIND.Cat,
    text: 'Cat',
  },
  {
    value: ANIMAL_KIND.Dog,
    text: 'Dog',
  },
];

export const LINE_SIZES = {
  [ANIMAL_KIND.Dog]: {
    [PET_SIZE.Small]: '28%',
    [PET_SIZE.Medium]: '36%',
    [PET_SIZE.Large]: '46%',
  },
  [ANIMAL_KIND.Cat]: {
    [PET_SIZE.Small]: '20%',
    [PET_SIZE.Medium]: '24%',
    [PET_SIZE.Large]: '27%',
  },
  [ANIMAL_KIND.Bird]: {
    [PET_SIZE.Small]: '26%',
    [PET_SIZE.Medium]: '40%',
    [PET_SIZE.Large]: '56%',
  },
};
