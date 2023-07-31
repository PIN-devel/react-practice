import { atom } from "jotai";
import { CategoriesType } from "../types";

export const categoriesAtom = atom<CategoriesType>({});

const categoriesReducer = (
  prev: CategoriesType,
  action: { type: string; target?: any }
) => {
  switch (action.type) {
    case "reset": {
      const newCategories: CategoriesType = {};
      Object.keys(prev).forEach((key) => {
        newCategories[key] = false;
      });
      return newCategories;
    }

    case "toggle": {
      return { ...prev, [action.target!]: !prev[action.target!] };
    }

    case "add": {
      return { ...prev, ...action.target };
    }

    default:
      throw new Error("Invalid Action");
  }
};

export const categoriesReducerAtom = atom(
  (get) => get(categoriesAtom),
  (get, set, action: { type: string; target?: any }) =>
    set(categoriesAtom, categoriesReducer(get(categoriesAtom), action))
);
