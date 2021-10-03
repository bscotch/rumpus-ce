export interface DelegationKeyDownload {
  passId: string;
  userId: string;
  name: string;
  permissions: (string | { url: string; methods: string[] })[];
}
