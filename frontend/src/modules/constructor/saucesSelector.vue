<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="(sauce, index) in pizzaStore.getSauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce"
        :checked="pizzaStore.getPizzaData.sauce?.id === sauce.id"
        @input="pizzaStore.updateSauce(sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { usePizzaStore } from "@/stores/pizza";

const pizzaStore = usePizzaStore();
</script>
