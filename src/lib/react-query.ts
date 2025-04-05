import type { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<
  FnType extends (...args: unknown[]) => Promise<unknown>,
> = Awaited<ReturnType<FnType>>;

/*
  biome-ignore lint/suspicious/noExplicitAny:
  A generic type that constructs the query configuration based on the provided function type.
  Omits 'queryKey' and 'queryFn' to prevent their usage within the query function.
  */
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  /*
  biome-ignore lint/suspicious/noExplicitAny:
  A generic type that constructs the query configuration based on the provided function type.
  Omits 'queryKey' and 'queryFn' to prevent their usage within the mutation function.
*/
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
