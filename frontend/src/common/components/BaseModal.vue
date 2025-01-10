<template>
  <div v-if="modelValue" class="modal">
    <div class="modal__overlay" @click="close"></div>
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>
