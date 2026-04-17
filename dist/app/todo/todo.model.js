'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TodoModel = void 0;
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
const mongoose_1 = require('mongoose');
const todoSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
exports.TodoModel = (0, mongoose_1.model)('Todo', todoSchema);
