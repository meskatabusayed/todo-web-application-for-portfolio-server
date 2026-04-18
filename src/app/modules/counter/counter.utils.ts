/* eslint-disable prettier/prettier */

import { CounterModel } from "./counter.model";


const generateId = async (payload : string , idValue : string) => {
  const counter = await CounterModel.findOneAndUpdate(
    { name: payload },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const number = counter.seq.toString().padStart(4, '0');
  return `mas-${idValue }-${number}`;
};

export default generateId;