export type FetchBaseQueryErrorType = {
  status: number;
  data: {
    success?: boolean;
    error?: string;
    message?: string;
    type?: string | null;
  };
};
