import { Application, Breed, Color, Sex, Size } from '@interfaces/model/application'

export interface ApplicationRequest extends Omit<
    Application,
    'userId' | 'userTgId' | 'tgUsername' | 'type' | 'geo' | 'image' | 'breed' | 'color' | 'size' | 'sex'
    > {
    coordinates: number[]
    breed: Breed
    color: Color
    size: Size
    sex: Sex
}