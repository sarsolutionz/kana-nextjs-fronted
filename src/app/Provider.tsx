"use client"
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
