<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="(sauce, index) in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="choosedSauce"
        :checked="index === 0"
        @input="emit('choosedSauce', sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  choosedSauce: {
    type: Object,
    required: true,
    default: null,
  },
  sauces: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(["choosedSauce"]);
</script>

<style lang="scss" scoped></style>
