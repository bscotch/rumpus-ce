import { default as RumpusCE, DelegationOptions } from '../../RumpusCE.js';
import { cleanQuery, csv } from '../../utility.js';
import type {
  AliasSearch,
  AliasDownload as AliasData,
} from '../../../types/aliases.js';
import { Alias } from '../classes/Alias.js';

/** Search Levelhead aliases. */
export async function getLevelheadAliases(
  this: RumpusCE,
  userIds: string | string[],
  query?: AliasSearch,
  options?: DelegationOptions,
) {
  const res = await this.get<AliasData[]>(`/api/levelhead/aliases`, {
    ...options,
    query: cleanQuery({ ...query, userIds: csv(userIds) }),
  });
  if (res.status == 200) {
    const aliases = res.data.map((alias) => new Alias(this, alias));
    return aliases;
  } else {
    throw new Error(`Alias search failed with status ${res.status}`);
  }
}
