<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="emit('updated', data, value - 1)"
      :disabled="value === min"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @input="handleInput"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="{ 'counter__button--orange': value > min }"
      @click="emit('updated', data, value + 1)"
      :disabled="value === max"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
import { toRef } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => {},
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  min: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
    default: 3,
  },
});

const { data, min, max } = props;
const value = toRef(props, "value");
const emit = defineEmits(["updated"]);

const handleInput = (event) => {
  let currentValue = Number(event.target.value);

  if (currentValue < min || !currentValue) {
    currentValue = min;
  } else if (currentValue > max) {
    currentValue = max;
  }

  event.target.value = currentValue;
  emit("updated", data, currentValue);
};
</script>
