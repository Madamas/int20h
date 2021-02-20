import { model, Schema } from 'mongoose'

import { InverseIndexDoc } from '@interfaces/model/inverseIndex'

const inverseIndexSchema: Schema = new Schema(
    {},
    {
        timestamps: true,
        strict: false
    }
)

export default model<InverseIndexDoc>('InverseIndex', inverseIndexSchema)
