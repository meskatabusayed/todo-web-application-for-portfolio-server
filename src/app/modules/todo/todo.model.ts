/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { model, Schema } from 'mongoose';
import { TTodo } from './todo.interface';

const todoSchema = new Schema<TTodo>(
  {
    id: {
      type: String,
      required: [true, 'Todo ID is required'],
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    description: {
      type: String,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },

    status: {
      type: String,
      enum: {
        values: ['pending', 'completed'],
        message: "Status must be either 'pending' or 'completed'",
      },
      default: 'pending',
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

export const TodoModel = model<TTodo>('Todo', todoSchema);
