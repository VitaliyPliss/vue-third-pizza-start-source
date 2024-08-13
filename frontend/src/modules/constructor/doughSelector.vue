<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="(item, index) in dough"
          :key="item.id"
          :class="['dough__input', `dough__input--${item.title}`]"
        >
          <input
            type="radio"
            name="dought"
            :value="choosedDough"
            class="visually-hidden"
            :checked="index === 0"
            @input="emit('choosedDough', { ...item })"
          />
          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  choosedDough: {
    type: Object,
    required: true,
  },
  dough: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(["choosedDough"]);
</script>

<style lang="scss" scoped></style>
