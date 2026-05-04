/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
import { IUser, UserModelType } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser , UserModelType>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: 0,
    },

    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: "Role must be either 'user' or 'admin'",
      },
      default: 'user',
    },

    passwordChangedAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
});


//custom ID check
userSchema.statics.isUserExistByCustomID = async function (id: string) {
  return await this.findOne({ id }).select("+password");
};

//isActive check
userSchema.statics.isUserDeActive = async function (id: string) {
  const user = await this.findOne({ id });

  if (!user) return false;

  return user.isActive === false;
};

//delete
userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await this.findOne({ id });

  if (!user) return false;

  return user.isDeleted === true;
};

//password Match
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp
) {
  if (!passwordChangedTimestamp) return false;

  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimestamp;
};

export const UserModel = model<IUser , UserModelType>('User', userSchema);
