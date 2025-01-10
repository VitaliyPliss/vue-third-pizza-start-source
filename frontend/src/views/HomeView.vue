<template>
  <main class="content">
    <form @submit.prevent="addToCart" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <dough-selector />
        <size-selector />
        <ingredients-selector>
          <sauces-selector />
        </ingredients-selector>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="pizzaStore.getPizzaData.name"
            />
          </label>

          <pizzaConstructor
            :pizzaData="pizzaStore.getPizzaData"
            @drop="pizzaStore.addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{ calculatePrice }} ₽</p>
            <div class="footer__submit">
              <button
                type="submit"
                class="button"
                :disabled="!hasSelectedIngredients"
              >
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePizzaStore } from "@/stores/pizza";
import { useCartStore } from "@/stores/cart";

import doughSelector from "@/modules/constructor/doughSelector.vue";
import saucesSelector from "@/modules/constructor/saucesSelector.vue";
import sizeSelector from "@/modules/constructor/sizeSelector.vue";
import ingredientsSelector from "@/modules/constructor/ingredientsSelector.vue";
import pizzaConstructor from "@/modules/constructor/pizzaConstructor.vue";

const router = useRouter();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const editingPizzaId = ref(null);

onMounted(() => {
  const editPizzaId = router.currentRoute.value.query.editPizza;
  if (editPizzaId) {
    const pizzaToEdit = cartStore.getPizzas.find(
      (p) => p.id === Number(editPizzaId)
    );
    if (pizzaToEdit) {
      editingPizzaId.value = Number(editPizzaId);
      pizzaStore.loadPizzaForEdit(pizzaToEdit);
    }
  } else {
    pizzaStore.initializePizzaData();
  }
});

const calculatePrice = computed(() => {
  const { dough, sauce, size, ingredients } = pizzaStore.getPizzaData;
  if (!dough || !sauce || !size) return 0;

  const basePrice = dough.price + sauce.price;
  const sizeMultiplier = size.multiplier;
  const ingredientsPrice = ingredients.reduce(
    (sum, ing) => sum + ing.counter * 50,
    0
  );

  return Math.round((basePrice + ingredientsPrice) * sizeMultiplier);
});

const hasSelectedIngredients = computed(() => {
  return pizzaStore.getPizzaData.ingredients.some(
    (ingredient) => ingredient.counter > 0
  );
});

const addToCart = () => {
  const pizza = {
    ...pizzaStore.getPizzaData,
    price: calculatePrice.value,
  };

  if (editingPizzaId.value) {
    cartStore.editPizza(editingPizzaId.value, pizza);
  } else {
    cartStore.addPizza(pizza);
  }

  router.push({ name: "cart" });
};
</script>
