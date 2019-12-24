
export function csv (items:Array<any>|string){
  if(typeof items == 'string'){
    return items;
  }
  return items.join(',');
}

export function cleanQuery (query?:{[param:string]:string|boolean|string[]|number|null|undefined}){
  const cleanQuery: {[param:string]:string|boolean|number} = {};
  if(!query){
    return cleanQuery;
  }
  for(const field of Object.keys(query)){
    if( typeof query[field] != 'undefined' &&
        query[field]!==null &&
        (!Array.isArray(query[field])||(query[field] as Array<any>).length)){
      // @ts-ignore
      cleanQuery[field] = Array.isArray(query[field])
        ? (query[field] as Array<any>).join(',')
        : query[field];
    }
  }
  return cleanQuery;
}