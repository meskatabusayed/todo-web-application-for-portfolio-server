/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { Schema } from "mongoose";
import { TCounterTodo } from "./counter.interface";
import { model } from "mongoose";

const counterSchema = new Schema<TCounterTodo>({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const CounterModel = model<TCounterTodo>('Counter', counterSchema);