export enum LoadingStatus {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  failed = 'failed',
}

export type User = {
  name: string | null;
  email: string | null;
  token: string | null;
};
