<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <slot />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in pizzaStore.getIngredients"
              :key="ingredient.key"
              class="ingredients__item"
            >
              <app-drag
                :transfer-data="{
                  ...ingredient,
                  counter:
                    pizzaStore.getIngredientCount(ingredient.title) +
                    +!(
                      pizzaStore.getIngredientCount(ingredient.title) ===
                      MAX_INGREDIENT_VALUE
                    ),
                }"
              >
                <span :class="['filling', `filling--${ingredient.title}`]">{{
                  ingredient.name
                }}</span>
              </app-drag>
              <app-counter
                class="ingredients__counter"
                :data="ingredient"
                :value="pizzaStore.getIngredientCount(ingredient.title)"
                :min="MIN_INGREDIENT_VALUE"
                :max="MAX_INGREDIENT_VALUE"
                @updated="onCounterUpdate"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePizzaStore } from "@/stores/pizza";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";
import { MIN_INGREDIENT_VALUE, MAX_INGREDIENT_VALUE } from "@/common/constants";

const pizzaStore = usePizzaStore();

const onCounterUpdate = ({ title }, counter) => {
  pizzaStore.addIngredient({ title, counter });
};
</script>
