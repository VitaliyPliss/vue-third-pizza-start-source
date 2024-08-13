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
              v-for="ingredient in ingredients"
              :key="ingredient.key"
              class="ingredients__item"
            >
              <app-drag
                :transfer-data="{
                  ...ingredient,
                  counter:
                    // если кол-во не больше MAX_COUNTER_VALUE, то увеличиваем на 1
                    getValue(ingredient.title) +
                    +!(getValue(ingredient.title) === MAX_COUNTER_VALUE),
                }"
              >
                <span :class="['filling', `filling--${ingredient.title}`]">{{
                  ingredient.name
                }}</span>
              </app-drag>
              <div class="counter counter--orange ingredients__counter">
                <button
                  type="button"
                  class="counter__button counter__button--minus"
                  @click="onCounterClick(ingredient.title, 'minus')"
                  :disabled="getValue(ingredient.title) === MIN_COUNTER_VALUE"
                >
                  <span class="visually-hidden">Меньше</span>
                </button>
                <input
                  type="text"
                  name="counter"
                  class="counter__input"
                  :value="getValue(ingredient.title) ?? 0"
                />
                <button
                  type="button"
                  class="counter__button counter__button--plus"
                  @click="onCounterClick(ingredient.title, 'plus')"
                  :disabled="getValue(ingredient.title) === MAX_COUNTER_VALUE"
                >
                  <span class="visually-hidden">Больше</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppDrag from "@/common/components/AppDrag.vue";
import { MIN_COUNTER_VALUE, MAX_COUNTER_VALUE } from "@/common/constants";

const props = defineProps({
  sauces: {
    type: Array,
    required: true,
    default: () => [],
  },
  ingredients: {
    type: Array,
    required: true,
    default: () => [],
  },
  choosedIngredients: {
    type: Array,
    default: () => [],
  },
});

const { choosedIngredients } = props;
const emit = defineEmits(["addIngredient"]);

const getValue = (title) => {
  const ingredient = choosedIngredients.find(
    (ingredient) => ingredient.title === title
  );
  return ingredient?.counter ?? 0;
};

const onCounterClick = (title, counter) => {
  const currentIngredientValue = getValue(title);

  if (counter === "plus") {
    emit("addIngredient", { title, counter: currentIngredientValue + 1 });
  } else if (counter === "minus") {
    emit("addIngredient", { title, counter: currentIngredientValue - 1 });
  }
};
</script>

<style lang="scss" scoped></style>
,
