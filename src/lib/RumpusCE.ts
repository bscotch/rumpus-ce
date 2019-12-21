
export default class RumpusCE {
  constructor( private _delegationKey:string ){}

  get delegationKey(){
    return this._delegationKey;
  }

  fail(){
    const x = '3';
    console.log(x);
    throw new Error("HMMMM");
  }
}
