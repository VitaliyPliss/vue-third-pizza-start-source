<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="(size, index) in sizes"
          :key="size.id"
          :class="['diameter__input', `diameter__input--${size.title}`]"
        >
          <input
            type="radio"
            name="diameter"
            :value="choosedSize"
            class="visually-hidden"
            :checked="index === 0"
            @input="emit('choosedSize', size)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  choosedSize: {
    type: Object,
    required: true,
    default: null,
  },
  sizes: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(["choosedSize"]);
</script>

<style lang="scss" scoped></style>
