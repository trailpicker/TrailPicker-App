"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  DEFAULT_USER_PREFERENCES,
  type DisplayPreferences,
} from "@/lib/user-preferences";

const DisplayContext = createContext<DisplayPreferences>(DEFAULT_USER_PREFERENCES);

export function DisplayPreferencesProvider({
  preferences,
  children,
}: {
  preferences: DisplayPreferences;
  children: ReactNode;
}) {
  return <DisplayContext.Provider value={preferences}>{children}</DisplayContext.Provider>;
}

export function useDisplayPreferences() {
  return useContext(DisplayContext);
}
