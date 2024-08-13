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
          :choosed-ingredients="choosedIngredients"
          v-model:choosedSauce="choosedSauce"
        >
          <sauces-selector
            :sauces="sauces"
            @choosed-sauce="updateChoosedSauce"
            :choosedSauce="choosedSauce"
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

          <div class="content__constructor">
            <app-drop @drop="addIngredient($event)">
              <div
                :class="[
                  'pizza',
                  `pizza--foundation--${choosedSize.title}--${pizzaData.dough.title}`,
                ]"
              >
                <div class="pizza__wrapper">
                  <div
                    v-for="(ingredient, index) in choosedIngredients"
                    :key="index"
                    :class="[
                      'pizza__filling',
                      `pizza__filling--${ingredient.title}`,
                      ingredient.counter === 2 && 'pizza__filling--second',
                      ingredient.counter === 3 && 'pizza__filling--third',
                    ]"
                  ></div>
                </div>
              </div>
            </app-drop>
          </div>

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
import AppDrop from "@/common/components/AppDrop.vue";

import doughSelector from "@/modules/constructor/doughSelector.vue";
import ingredientsSelector from "@/modules/constructor/ingredientsSelector.vue";
import saucesSelector from "@/modules/constructor/saucesSelector.vue";
import sizeSelector from "@/modules/constructor/sizeSelector.vue";

import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";

import doughConstants from "@/common/data/doughSizes.js";
import ingredientsConstants from "@/common/data/ingredients.js";
import saucesConstants from "@/common/data/sauces.js";
import sizesConstants from "@/common/data/sizes.js";

import { ref, reactive, computed } from "vue";

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
const ingredients = normalizePizzaData(ingredientsJSON, ingredientsConstants);
const sauces = normalizePizzaData(saucesJSON, saucesConstants);
const sizes = normalizePizzaData(sizesJSON, sizesConstants);

let choosedDough = reactive(dough[0]);
const choosedIngredients = reactive([]);
let choosedSauce = reactive(sauces[0]);
let choosedSize = reactive(sizes[0]);

const pizzaData = reactive({
  dough: dough[0],
  ingredients: [],
  sauces: sauces[0],
  sizes: sizes[0],
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
  const ingredientExists = choosedIngredients.some(
    (ingredient) => ingredient.title === title
  );

  if (ingredientExists) {
    const existingIngredientIndex = choosedIngredients.findIndex(
      (ingredient) => ingredient.title === title
    );
    choosedIngredients[existingIngredientIndex].counter = counter;
    return;
  }

  choosedIngredients.push({
    title,
    counter,
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
