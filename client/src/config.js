// export enum CatBreed {
//   Abyssinian = 'Abyssinian',
//   AmericanBobtail = 'American Bobtail',
//   AmericanCurl = 'American Curl',
//   Balinese = 'Balinese',
//   Bengal = 'Bengal',
//   Burmese = 'Burmese',
//   Chausie = 'Chausie',
//   CornishRex = 'Cornish Rex',
// }

export const CAT_BREED = {
  Abyssinian: 'Abyssinian',
  AmericanBobtail: 'AmericanBobtail',
  AmericanCurl: 'AmericanCurl',
  Balinese: 'Balinese',
  Bengal: 'Bengal',
  Burmese: 'Burmese',
  Chausie: 'Chausie',
  CornishRex: 'CornishRex',
};

// export enum DogBreed {
//   Affenpinscher = 'Affenpinscher',
//   AfghanHound = 'Afghan Hound',
//   Aidi = 'Aidi',
//   AiredaleTerrier = 'Airedale Terrier',
//   Akbash = 'Akbash',
//   Akita = 'Akita',
//   AlanoEspañol = 'Alano Español',
//   AlaskanKleeKai = 'Alaskan Klee Kai',
//   AlaskanMalamute = 'Alaskan Malamute',
//   AlpineDachsbracke = 'Alpine Dachsbracke',
//   AmericanBulldog = 'American Bulldog',
//   AmericanCockerSpaniel = 'American Cocker Spaniel',
//   AmericanEnglishCoonhound = 'American English Coonhound',
//   AmericanEskimoDog = 'American Eskimo Dog',
//   AmericanFoxhound = 'American Foxhound',
//   AmericanHairlessTerrier = 'American Hairless Terrier',
//   AmericanPitBullTerrier = 'American Pit Bull Terrier',
//   AmericanStaffordshireTerrier = 'American Staffordshire Terrier',
//   AmericanWaterSpaniel = 'American Water Spaniel',
// }

export const DOG_BREED = {
  Affenpinscher: 'Affenpinscher',
  AfghanHound: 'Afghan Hound',
  Aidi: 'Aidi',
  AiredaleTerrier: 'Airedale Terrier',
  Akbash: 'Akbash',
  Akita: 'Akita',
  AlanoEspañol: 'Alano Español',
  AlaskanKleeKai: 'Alaskan Klee Kai',
  AlaskanMalamute: 'Alaskan Malamute',
  AlpineDachsbracke: 'Alpine Dachsbracke',
  AmericanBulldog: 'American Bulldog',
  AmericanCockerSpaniel: 'American Cocker Spaniel',
  AmericanEnglishCoonhound: 'American English Coonhound',
  AmericanEskimoDog: 'American Eskimo Dog',
  AmericanFoxhound: 'American Foxhound',
  AmericanHairlessTerrier: 'American Hairless Terrier',
  AmericanPitBullTerrier: 'American Pit Bull Terrier',
  AmericanStaffordshireTerrier: 'American Staffordshire Terrier',
  AmericanWaterSpaniel: 'American Water Spaniel',
};



// export enum BirdBreed {
//   Parakeet = 'Parakeet',
//   Budgerigar = 'Budgerigar',
//   Cockatiel = 'Cockatiel',
//   Chicken = 'Chicken',
//   Conure = 'Conure',
//   AfricanGreyParrot = 'African Grey Parrot',
//   Lovebird = 'Lovebird',
//   Other = 'Other',
//   Macaw = 'Macaw',
//   Cockatoo = 'Cockatoo',
//   SunConure = 'Sun Conure',
//   Parrot = 'Parrot',
//   Parrotlet = 'Parrotlet',
//   Amazon = 'Amazon',
//   BlueAndYellowMacaw = 'Blue-and-yellow Macaw',
//   Caique = 'Caique',
//   UmbrellaCockatoo = 'Umbrella Cockatoo',
//   SenegalParrot = 'Senegal Parrot',
//   IndianRingneck = 'Indian Ringneck',
//   AfricanPiedHornbill = 'African Pied Hornbill',
//   Accentor = 'Accentor',
//   Finch = 'Finch',
// }

export const BIRD_BREED = {
  Parakeet: 'Parakeet',
  Budgerigar: 'Budgerigar',
  Cockatiel: 'Cockatiel',
  Chicken: 'Chicken',
  Conure: 'Conure',
  AfricanGreyParrot: 'African Grey Parrot',
  Lovebird: 'Lovebird',
  Other: 'Other',
  Macaw: 'Macaw',
  Cockatoo: 'Cockatoo',
  SunConure: 'Sun Conure',
  Parrot: 'Parrot',
  Parrotlet: 'Parrotlet',
  Amazon: 'Amazon',
  BlueAndYellowMacaw: 'Blue-and-yellow Macaw',
  Caique: 'Caique',
  UmbrellaCockatoo: 'Umbrella Cockatoo',
  SenegalParrot: 'Senegal Parrot',
  IndianRingneck: 'Indian Ringneck',
  AfricanPiedHornbill: 'African Pied Hornbill',
  Accentor: 'Accentor',
  Finch: 'Finch',
};


// export interface ApplicationCoordinates {
//   lat: number
//   lng: number
// }

// export interface Application {
//   kind: AnimalKind
//   breed: Breed
//   color: Color
//   size: Size
//   coordinates: ApplicationCoordinates
//   special: string[]
//   sex: Sex
// }

// export enum Size {
//   Small = 'small',
//   Medium = 'medium',
//   Large = 'large',
// }

export const PET_SIZE = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
};

export const ANIMAL_KIND = {
  Cat: 'cat',
  Dog: 'dog',
  Bird: 'bird',
};

// export enum Color {
//   White = 'white',
//   Black = 'black',
//   Grey = 'grey',
//   Brown = 'brown',
//   Tricolor = 'tricolor',
//   Bicolor = 'bicolor',
//

export const COLOR = {
  white: 'white',
  black: 'black',
  grey: 'grey',
  brown: 'brown',
  tricolor: 'tricolor',
  bitcolor: 'bitcolor',
};

// export enum Sex {
//   Male = 'male',
//   Female = 'female'
// }

export const SEX = {
  male: 'male',
  female: 'female',
};
