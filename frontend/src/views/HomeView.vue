<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector
          :dough="dough"
          @choosed-dough="updateChoosedDough"
          :choosedDough="pizzaData.dough"
        />

        <size-selector
          :sizes="sizes"
          @choosed-size="updateChoosedSize"
          :choosedSize="pizzaData.size"
        />

        <ingredients-selector
          :ingredients="ingredients"
          :sauces="sauces"
          @add-ingredient="addIngredient"
          :choosed-ingredients="pizzaData.ingredients"
        >
          <sauces-selector
            :sauces="sauces"
            @choosed-sauce="updateChoosedSauce"
            :choosedSauce="pizzaData.sauce"
        /></ingredients-selector>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizzaConstructor
            :pizzaData="pizzaData"
            @drop="addIngredient($event)"
          />

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import doughSelector from "@/modules/constructor/doughSelector.vue";
import saucesSelector from "@/modules/constructor/saucesSelector.vue";
import sizeSelector from "@/modules/constructor/sizeSelector.vue";
import ingredientsSelector from "@/modules/constructor/ingredientsSelector.vue";
import pizzaConstructor from "@/modules/constructor/pizzaConstructor.vue";

import doughJSON from "@/mocks/dough.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import ingredientsJSON from "@/mocks/ingredients.json";

import doughConstants from "@/common/data/doughSizes.js";
import saucesConstants from "@/common/data/sauces.js";
import sizesConstants from "@/common/data/sizes.js";
import ingredientsConstants from "@/common/data/ingredients.js";

import { reactive } from "vue";

const emit = defineEmits(["drop"]);

const normalizePizzaData = (JSON, constants) => {
  return JSON.map((item) => {
    return {
      ...item,
      title: constants[item.id],
    };
  });
};

const dough = normalizePizzaData(doughJSON, doughConstants);
const sauces = normalizePizzaData(saucesJSON, saucesConstants);
const sizes = normalizePizzaData(sizesJSON, sizesConstants);
const ingredients = normalizePizzaData(ingredientsJSON, ingredientsConstants);

const pizzaData = reactive({
  dough: dough[0],
  sauce: sauces[0],
  size: sizes[0],
  ingredients: [],
});

const updateChoosedDough = (newDough) => {
  pizzaData.dough = newDough;
};

const updateChoosedSauce = (newSauce) => {
  pizzaData.sauce = newSauce;
};

const updateChoosedSize = (newSize) => {
  pizzaData.size = newSize;
};

const addIngredient = ({ title, counter }) => {
  const ingredientExists = pizzaData.ingredients.some(
    (ingredient) => ingredient.title === title
  );

  if (ingredientExists) {
    const existingIngredientIndex = pizzaData.ingredients.findIndex(
      (ingredient) => ingredient.title === title
    );
    pizzaData.ingredients[existingIngredientIndex].counter = counter;

    if (counter === 0) {
      pizzaData.ingredients.splice(existingIngredientIndex, 1);
    }

    return;
  }

  pizzaData.ingredients.push({
    title,
    counter,
  });
};
</script>
