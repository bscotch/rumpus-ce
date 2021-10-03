import type RumpusCE from '../../RumpusCE.js';

export class Base<Data extends { _id: string }> {
  constructor(protected client: RumpusCE, protected data: Data) {}

  get _id() {
    return this.data._id;
  }

  toJSON() {
    return {
      ...this.data,
    };
  }
}
