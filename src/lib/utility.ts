
export function csv (items:Array<any>|string){
  if(typeof items == 'string'){
    return items;
  }
  return items.join(',');
}

type ImageType = 'webp'|'png';

export function avatarUrl (avatarId:string,pixels?:number,imgType:ImageType='png'){
  const width = Math.max(Math.min(pixels || 128,512),16);
  return `https://img.bscotch.net/fit-in/${width}x${width}/avatars/${avatarId}.${imgType}`;
}

interface AvatarItemBase {
  avatarId: string,
  avatarUrl(pixels?:number,imgType?:ImageType): string
}

/** Add an avatar-URL-generating `avatarUrl()` method to an object that has an `avatarId` field. */
export function attachAvatarUrlToItem <item extends AvatarItemBase> (item:item){
  item.avatarUrl = (pixels?:number,imgType:ImageType='png')=>avatarUrl(item.avatarId,pixels,imgType);
  return item;
}

/** Add avatar-URL-generating `avatarUrl()` methods to an objects that have an `avatarId` field. */
export function attachAvatarUrlToArrayItems <item extends AvatarItemBase> (items:item[]){
  for(const item of items){
    attachAvatarUrlToItem(item);
  }
  return items;
}

/** For an HTTP query object, convert all array values into CSVs. */
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

export function capitalize (string:string){
  if(!string || typeof string != 'string'){
    return '';
  }
  return `${string[0].toLocaleUpperCase()}${string.slice(1)}`;
}
