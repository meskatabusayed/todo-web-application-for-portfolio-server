/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

import { CounterModel } from "./counter.model";


const generateId = async (payload : string , idValue : string , session: any ) => {
  const counter = await CounterModel.findOneAndUpdate(
    { name: payload },
    { $inc: { seq: 1 } },
    { new: true, upsert: true , session }
  );

  const number = counter.seq.toString().padStart(4, '0');
  return `${payload}-${idValue }-${number}`;
};

export default generateId;