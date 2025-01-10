import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import ingredientsJSON from "@/mocks/ingredients.json";

import doughConstants from "@/common/data/doughSizes.js";
import saucesConstants from "@/common/data/sauces.js";
import sizesConstants from "@/common/data/sizes.js";
import ingredientsConstants from "@/common/data/ingredients.js";
import { MIN_INGREDIENT_VALUE, MAX_INGREDIENT_VALUE } from "@/common/constants";

const normalizePizzaData = (JSON, constants) => {
    return JSON.map((item) => ({
        ...item,
        title: constants[item.id],
    }));
};

export const usePizzaStore = defineStore('pizza', {
    state: () => ({
        dough: normalizePizzaData(doughJSON, doughConstants),
        sauces: normalizePizzaData(saucesJSON, saucesConstants),
        sizes: normalizePizzaData(sizesJSON, sizesConstants),
        ingredients: normalizePizzaData(ingredientsJSON, ingredientsConstants),
        pizzaData: {
            dough: null,
            sauce: null,
            size: null,
            ingredients: [],
            name: ''
        }
    }),

    actions: {
        initializePizzaData() {
            this.pizzaData.dough = this.dough[0];
            this.pizzaData.sauce = this.sauces[0];
            this.pizzaData.size = this.sizes[0];
            this.pizzaData.ingredients = [];
            this.pizzaData.name = '';
        },

        updateDough(newDough) {
            this.pizzaData.dough = newDough;
        },

        updateSauce(newSauce) {
            this.pizzaData.sauce = newSauce;
        },

        updateSize(newSize) {
            this.pizzaData.size = newSize;
        },

        updatePizzaName(name) {
            this.pizzaData.name = name;
        },

        addIngredient({ title, counter }) {
            if (counter > MAX_INGREDIENT_VALUE) {
                return;
            }

            const ingredientExists = this.pizzaData.ingredients.some(
                (ingredient) => ingredient.title === title
            );

            if (ingredientExists) {
                const existingIngredientIndex = this.pizzaData.ingredients.findIndex(
                    (ingredient) => ingredient.title === title
                );

                if (counter === 0) {
                    this.pizzaData.ingredients.splice(existingIngredientIndex, 1);
                } else {
                    this.pizzaData.ingredients[existingIngredientIndex].counter = counter;
                }
                return;
            }

            if (counter >= MIN_INGREDIENT_VALUE) {
                this.pizzaData.ingredients.push({
                    title,
                    counter,
                });
            }
        },

        loadPizzaForEdit(pizza) {
            this.pizzaData.name = pizza.name;
            this.pizzaData.dough = pizza.dough;
            this.pizzaData.sauce = pizza.sauce;
            this.pizzaData.size = pizza.size;
            this.pizzaData.ingredients = [...pizza.ingredients];
        }
    },

    getters: {
        getPizzaData: (state) => state.pizzaData,
        getDough: (state) => state.dough,
        getSauces: (state) => state.sauces,
        getSizes: (state) => state.sizes,
        getIngredients: (state) => state.ingredients,
        getIngredientCount: (state) => (title) => {
            const ingredient = state.pizzaData.ingredients.find(
                (ingredient) => ingredient.title === title
            );
            return ingredient?.counter ?? 0;
        }
    }
});
