import { createContext, useContext } from "react";

export type FieldState = {
  invalid: boolean;
  required: boolean;
  inside: boolean;
};

export const FieldStateContext = createContext<FieldState>({
  invalid: false,
  required: false,
  inside: false,
});

export function useFieldState(): FieldState {
  return useContext(FieldStateContext);
}
