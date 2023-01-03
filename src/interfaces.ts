
// InterFace for a Meal

export type LOCALE_TYPE =
  | "en_US"
  | "en_GB"
  | "da_DK"
  | "nb_NO"
  | "sv_SE"
  | "fi_FI"
  | "de_DE"
  | "nl_NL";


export interface IMeal {
  id: number;
  name: string;
  comment?: string;
  image?: string;
  order: number;
  type: number;
  locale: LOCALE_TYPE;
  macroSplit: number;
  totals: {
    protein: number;
    carbohydrate: number;
    fat: number;
    weight: number;
    kcal: number;
  };
  meals: {
    id: number;
    name: string;
    comment: string;
    image: string;
    order: number;
    type: number;
    locale: LOCALE_TYPE;
    totals: {
      protein: number;
      carbohydrate: number;
      fat: number;
      weight: number;
      kcal: number;
    };
    recipe: number;
    cooking_time: number;
    recipe_meta: {
      lactose: boolean;
      gluten: boolean;
      nuts: boolean;
      eggs: boolean;
      pig: boolean;
      shellfish: boolean;
      fish: boolean;
      is_vegetarian: boolean;
      is_vegan: boolean;
      is_pescetarian: boolean;
    };
    recipe_types: number[];
    ideal_kcals: number;
    contains_alternatives: boolean;
    products: {
      id: number;
      isLenusIngredient: boolean;
      product: {
        id: number;
        name: string;
        brand: string;
        kcal: number;
        kj: number;
        fat: number;
        protein: number;
        carbohydrates: number;
        weights: {
          id: number;
          name: string;
          weight: number;
          locale: LOCALE_TYPE;
        }[];
        locale: LOCALE_TYPE;
        recommended: boolean;
        meta: {
          lactose: boolean;
          gluten: boolean;
          nuts: boolean;
          eggs: boolean;
          pig: boolean;
          shellfish: boolean;
          fish: boolean;
          notVegetarian: boolean;
          notVegan: boolean;
          notPescetarian: boolean;
        };
      };
      order: number;
      totalWeight: number;
      weight: {
        id: number;
        name: string;
        weight: number;
        locale: LOCALE_TYPE;
      };
      weightUnits: number;
      weights: {
        id: number;
        name: string;
        weight: number;
        locale: LOCALE_TYPE;
      }[];
    }[];
    desired_kcals: number;
    macro_split: number;
  }[];
  contains_alternatives: boolean;
  desired_kcals: number;
  ideal_totals: {
    kcal: number;
    protein: number;
    carbohydrate: number;
    fat: number;
  };
  percent_weight: number;
  last: boolean;
  avg_totals: {
    kcal: number;
    protein: number;
    carbohydrate: number;
    fat: number;
  };
  planId: number;
}
