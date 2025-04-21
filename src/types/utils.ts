export type AtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Required<Pick<T, Keys>> & Partial<Omit<T, Keys>>
  : never;

// export type AtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
//   {
//     [K in Keys]: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
//   }[Keys];

// export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
//   T,
//   Exclude<keyof T, Keys>
// > &
//   {
//     [K in Keys]: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
//   }[Keys];
