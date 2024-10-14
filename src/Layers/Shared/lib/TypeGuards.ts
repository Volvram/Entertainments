import { FetchBaseQueryErrorType } from '@/Layers/Shared/Types/Shared.types.ts';

export const isFetchBaseQueryErrorTypeGuard = (error: any): error is FetchBaseQueryErrorType => {
  return error && 'status' in error && 'data' in error;
};
