<template>
  <div class="content__constructor">
    <app-drop @drop="emit('drop', $event)">
      <div
        :class="[
          'pizza',
          `pizza--foundation--${pizzaData.dough.title}-${pizzaData.sauce.title}`,
        ]"
      >
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, index) in pizzaData.ingredients"
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
</template>

<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { defineProps } from "vue";

const props = defineProps({
  pizzaData: {
    type: Object,
    required: true,
    default: null,
  },
});

const emit = defineEmits(["drop"]);
</script>

<style></style>
