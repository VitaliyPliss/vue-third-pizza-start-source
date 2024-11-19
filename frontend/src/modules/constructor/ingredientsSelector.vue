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
              <app-counter
                class="ingredients__counter"
                :data="ingredient"
                :value="getValue(ingredient.title)"
                :min="MIN_COUNTER_VALUE"
                :max="MAX_COUNTER_VALUE"
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
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";

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
    required: true,
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

const onCounterUpdate = ({ title }, counter) => {
  emit("addIngredient", { title, counter });
};
</script>
