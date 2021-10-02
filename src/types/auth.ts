export interface DelegationKey {
  _id: string;
  userId: string;
  name: string;
  permissions: { url: string; methods: string[] }[];
}
