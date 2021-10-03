import { Base } from './Base.js';
import { AliasDownload } from '../../../types/aliases.js';
import { avatarUrl } from '../../utility.js';
export class Alias extends Base<AliasDownload> {
  get userId() {
    return this.data.userId;
  }

  get alias() {
    return this.data.alias;
  }

  get name() {
    return this.alias;
  }

  get context() {
    return this.data.context;
  }

  get avatarId() {
    return this.data.avatarId;
  }

  /** Generate an image URL for the avatar associated with this Alias. */
  createAvatarUrl(pixels?: number) {
    return avatarUrl(this.avatarId, pixels);
  }
}
