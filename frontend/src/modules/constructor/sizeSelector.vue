<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in pizzaStore.getSizes"
          :key="size.id"
          :class="['diameter__input', `diameter__input--${size.title}`]"
        >
          <input
            type="radio"
            name="diameter"
            :value="size"
            class="visually-hidden"
            :checked="pizzaStore.getPizzaData.size?.id === size.id"
            @input="pizzaStore.updateSize(size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePizzaStore } from "@/stores/pizza";

const pizzaStore = usePizzaStore();
</script>
