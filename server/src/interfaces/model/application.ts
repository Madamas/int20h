import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export enum Kind {
    Cat = 'cat',
    Dog = 'dog',
    Bird = 'bird',
}

export enum CatBreed {
    Abyssinian = 'Abyssinian',
    AmericanBobtail = 'American Bobtail',
    AmericanCurl = 'American Curl',
    Balinese = 'Balinese',
    Bengal = 'Bengal',
    Burmese = 'Burmese',
    Chausie = 'Chausie',
    CornishRex = 'Cornish Rex',
}

export enum DogBreed {
    Affenpinscher = 'Affenpinscher',
    AfghanHound = 'Afghan Hound',
    Aidi = 'Aidi',
    AiredaleTerrier = 'Airedale Terrier',
    Akbash = 'Akbash',
    Akita = 'Akita',
    AlanoEspañol = 'Alano Español',
    AlaskanKleeKai = 'Alaskan Klee Kai',
    AlaskanMalamute = 'Alaskan Malamute',
    AlpineDachsbracke = 'Alpine Dachsbracke',
    AmericanBulldog = 'American Bulldog',
    AmericanCockerSpaniel = 'American Cocker Spaniel',
    AmericanEnglishCoonhound = 'American English Coonhound',
    AmericanEskimoDog = 'American Eskimo Dog',
    AmericanFoxhound = 'American Foxhound',
    AmericanHairlessTerrier = 'American Hairless Terrier',
    AmericanPitBullTerrier = 'American Pit Bull Terrier',
    AmericanStaffordshireTerrier = 'American Staffordshire Terrier',
    AmericanWaterSpaniel = 'American Water Spaniel',
}

export enum BirdBreed {
    Parakeet = 'Parakeet',
    Budgerigar = 'Budgerigar',
    Cockatiel = 'Cockatiel',
    Chicken = 'Chicken',
    Conure = 'Conure',
    AfricanGreyParrot = 'African Grey Parrot',
    Lovebird = 'Lovebird',
    Other = 'Other',
    Macaw = 'Macaw',
    Cockatoo = 'Cockatoo',
    SunConure = 'Sun Conure',
    Parrot = 'Parrot',
    Parrotlet = 'Parrotlet',
    Amazon = 'Amazon',
    BlueAndYellowMacaw = 'Blue-and-yellow Macaw',
    Caique = 'Caique',
    UmbrellaCockatoo = 'Umbrella Cockatoo',
    SenegalParrot = 'Senegal Parrot',
    IndianRingneck = 'Indian Ringneck',
    AfricanPiedHornbill = 'African Pied Hornbill',
    Accentor = 'Accentor',
    Finch = 'Finch',
}

export type Breed = CatBreed | DogBreed | BirdBreed

export enum Color {
    White = 'white',
    Black = 'black',
    Grey = 'grey',
    Brown = 'brown',
    Tricolor = 'tricolor',
    Bicolor = 'bicolor',
}

export enum Size {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export enum Sex {
    Male = 'male',
    Female = 'female'
}

export enum GeoType {
    Point = 'Point',
    LineString = 'LineString'
}
export interface ApplicationCoordinates {
    type: GeoType
    coordinates: [number, number]
}

export enum ApplicationType {
    Lost = 'lost',
    Found = 'found'
}

export interface Application {
    type: ApplicationType
    kind: Kind
    breed?: Breed
    color?: Color
    size?: Size
    geo: ApplicationCoordinates
    special: string[]
    sex?: Sex
    userId?: ObjectId
    userTgId?: number
    tgUsername?: string
    image?: string
}

export interface ApplicationDoc extends Application, Document { }
