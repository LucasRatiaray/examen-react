"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

export type MachineType = "rocket" | "satellite" | "plane" | "iss" | "other";

export type Observation = {
  id: string;
  machineName: string;
  type: MachineType;
  date: string;
  location: string;
  notes?: string;
};

type State = {
  observations: Observation[];
  isLoaded: boolean;
};

type Action =
  | { type: "ADD"; payload: Observation }
  | { type: "DELETE"; payload: string }
  | { type: "LOAD"; payload: Observation[] }
  | { type: "READY" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        observations: action.payload,
        isLoaded: true,
      };
    case "READY":
      return {
        ...state,
        isLoaded: true,
      };
    case "ADD":
      return {
        ...state,
        observations: [...state.observations, action.payload],
      };
    case "DELETE":
      return {
        ...state,
        observations: state.observations.filter(
          (obs) => obs.id !== action.payload,
        ),
      };
    default:
      return state;
  }
}

const JournalContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    observations: [],
    isLoaded: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("birdmachine-journal");
    if (saved) {
      try {
        dispatch({ type: "LOAD", payload: JSON.parse(saved) });
      } catch (e) {
        console.error("Erreur localStorage", e);
        dispatch({ type: "READY" });
      }
    } else {
      dispatch({ type: "READY" });
    }
  }, []);

  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem(
        "birdmachine-journal",
        JSON.stringify(state.observations),
      );
    }
  }, [state.observations, state.isLoaded]);

  return (
    <JournalContext.Provider value={{ state, dispatch }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) throw new Error("useJournal doit être utilisé à l'intérieur d'un JournalProvider");
  return context;
}
