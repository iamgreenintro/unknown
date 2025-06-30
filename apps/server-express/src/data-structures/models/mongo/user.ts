import mongoose, { Schema } from 'mongoose';

interface IUserSchema {
  username: string;
  password: string;
  salt: string;
}

const UserMongoSchema: Schema = new Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: [true, '`username` is required'],
    unique: true,
    minLength: [5, '`username` must be 5 characters or longer.'],
    maxLength: [28, '`username` must be 28 characters or longer.'],
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: [true, '`password` is required.'],
    // Validate lengths from Node.js Scrypt encryption:
    minLength: [128, 'encrypted `password` must be 128 characters long.'],
    maxLength: [128, 'encrypted `password` must be 128 characters long.'],
  },
  salt: {
    type: mongoose.SchemaTypes.String,
    required: [true, '`salt` is required'],
  },
});

export const UserModel = mongoose.model<IUserSchema>('User', UserMongoSchema);
