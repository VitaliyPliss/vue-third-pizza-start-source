<template>
  <base-modal :modelValue="modelValue">
    <div class="popup">
      <a href="#" class="close" @click.prevent="close">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div class="popup__title">
        <h2 class="title">Спасибо за заказ</h2>
      </div>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <div class="popup__button">
        <a href="#" class="button" @click.prevent="close">Отлично, я жду!</a>
      </div>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "./BaseModal.vue";

export default {
  name: "SuccessOrderModal",
  components: {
    BaseModal,
  },
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
