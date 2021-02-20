import { PET_SIZE, ANIMAL_KIND, COLOR } from '../../config';


export const colorOptions = [
  {
    value: COLOR.black,
    text: 'Чорний',
  },
  {
    value: COLOR.white,
    text: 'Білий',
  },
  {
    value: COLOR.brown,
    text: 'Коричневий',
  },
  {
    value: COLOR.grey,
    text: 'Сірий',
  },
]

export const sizeOptions = [
  {
    value: PET_SIZE.Large,
    text: 'Великий',
  },
  {
    value: PET_SIZE.Medium,
    text: 'Середній',
  },
  {
    value: PET_SIZE.Small,
    text: 'Малий',
  },
];

export const kindOptions = [
  {
    value: ANIMAL_KIND.Bird,
    text: 'Птах',
  },
  {
    value: ANIMAL_KIND.Cat,
    text: 'Кішка',
  },
  {
    value: ANIMAL_KIND.Dog,
    text: 'Собака',
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
