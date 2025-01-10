<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(item, index) in pizzaStore.getDough"
          :key="item.id"
          :class="['dough__input', `dough__input--${item.title}`]"
        >
          <input
            type="radio"
            name="dought"
            :value="item"
            class="visually-hidden"
            :checked="pizzaStore.getPizzaData.dough?.id === item.id"
            @input="pizzaStore.updateDough(item)"
          />
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePizzaStore } from "@/stores/pizza";

const pizzaStore = usePizzaStore();
</script>
