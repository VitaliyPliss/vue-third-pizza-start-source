<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!cartStore.getPizzas.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
            v-for="pizza in cartStore.getPizzas"
            :key="pizza.id"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <img
                src="@/assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name || "Пицца без названия" }}</h2>
                <ul>
                  <li>{{ pizza.size.name }}, {{ pizza.dough.name }}</li>
                  <li>Соус: {{ pizza.sauce.name }}</li>
                  <li v-if="pizza.ingredients.length">
                    Начинка: {{ getIngredientNames(pizza.ingredients) }}
                  </li>
                </ul>
              </div>
            </div>

            <app-counter
              class="cart-list__counter"
              :data="pizza"
              :value="pizza.quantity"
              :min="0"
              :max="MAX_PIZZA_VALUE"
              @updated="
                (_, quantity) =>
                  cartStore.updatePizzaQuantity(pizza.id, quantity)
              "
            />

            <div class="cart-list__price">
              <b>{{ pizza.price * pizza.quantity }} ₽</b>
            </div>

            <div class="cart-list__button">
              <router-link
                :to="{ name: 'home', query: { editPizza: pizza.id } }"
                class="cart-list__edit"
              >
                Изменить
              </router-link>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="item in cartStore.getMisc"
              :key="item.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="getImageUrl(item.image)"
                  width="39"
                  height="60"
                  :alt="item.name"
                />
                <span>{{ item.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <app-counter
                  class="additional-list__counter"
                  :data="item"
                  :value="item.quantity"
                  :min="0"
                  :max="10"
                  @updated="
                    (_, quantity) =>
                      cartStore.updateMiscQuantity(item.id, quantity)
                  "
                />

                <div class="additional-list__price">
                  <b>× {{ item.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                name="test"
                class="select"
                v-model="addressType"
                @change="handleAddressTypeChange"
              >
                <option value="self-pickup">Заберу сам</option>
                <option value="new-address">Новый адрес</option>
                <option value="saved-address">Сохраненный адрес</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                type="tel"
                name="tel"
                maxlength="16"
                placeholder="+7 999 999-99-99"
                v-model="cartStore.getUserData.phone"
                @input="(e) => cartStore.updateUserPhone(e.target.value)"
                :class="{
                  'is-invalid':
                    cartStore.getUserData.phone && !cartStore.isValidPhone(),
                }"
              />
            </label>

            <div
              class="cart-form__address"
              v-if="addressType === 'new-address'"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    type="text"
                    name="street"
                    v-model="cartStore.getUserData.address.street"
                    @input="(e) => updateAddress({ street: e.target.value })"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    type="text"
                    name="building"
                    v-model="cartStore.getUserData.address.building"
                    @input="(e) => updateAddress({ building: e.target.value })"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    type="text"
                    name="flat"
                    v-model="cartStore.getUserData.address.flat"
                    @input="(e) => updateAddress({ flat: e.target.value })"
                  />
                </label>
              </div>

              <div class="cart-form__input">
                <label class="input">
                  <span>Комментарий</span>
                  <input
                    type="text"
                    name="comment"
                    v-model="cartStore.getUserData.address.comment"
                    @input="(e) => updateAddress({ comment: e.target.value })"
                  />
                </label>
              </div>

              <div class="cart-form__input">
                <button
                  type="button"
                  class="button"
                  :disabled="!canSaveAddress"
                  @click="saveNewAddress"
                >
                  Сохранить адрес
                </button>
              </div>
            </div>

            <div
              class="cart-form__address"
              v-if="addressType === 'saved-address'"
            >
              <span class="cart-form__label">Сохраненный адрес:</span>
              <div class="cart-form__input">
                <select
                  class="select"
                  v-model="cartStore.getUserData.address.savedAddressId"
                  @change="
                    (e) => cartStore.setDeliveryAddress(Number(e.target.value))
                  "
                >
                  <option value="" disabled>Выберите адрес</option>
                  <option
                    v-for="address in profileStore.addresses"
                    :key="address.id"
                    :value="address.id"
                  >
                    {{ address.name }} ({{ address.street }},
                    {{ address.house }}, кв. {{ address.flat }})
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="cart__price">
            <b>Итого: {{ cartStore.getTotalPrice }} ₽</b>
          </div>
        </div>
      </div>
    </main>

    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'home' }"
          class="button button--border button--arrow"
        >
          Хочу еще одну
        </router-link>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          :disabled="
            !cartStore.getUserData.phone ||
            !cartStore.isValidPhone() ||
            cartStore.getPizzas.length === 0
          "
          @click="sendForm"
        >
          Оформить заказ
        </button>
      </div>
    </section>
    <success-order-modal v-model="showSuccessModal" @close="sendForm" />
  </form>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";
import { usePizzaStore } from "@/stores/pizza";
import { MAX_PIZZA_VALUE } from "@/common/constants";
import AppCounter from "@/common/components/AppCounter.vue";
import SuccessOrderModal from "@/common/components/SuccessOrderModal.vue";

const showSuccessModal = ref(false);

const cartStore = useCartStore();
const profileStore = useProfileStore();
const pizzaStore = usePizzaStore();
const addressType = ref("self-pickup");

const getImageUrl = (name) => {
  return new URL(`../assets/img/${name}.svg`, import.meta.url).href;
};

const handleAddressTypeChange = () => {
  cartStore.clearUserAddress();
};

const updateAddress = (data) => {
  cartStore.updateUserAddress(data);
};

const canSaveAddress = computed(() => {
  const { street, building } = cartStore.getUserData.address;
  return street && building;
});

const saveNewAddress = () => {
  const { street, building, flat, comment } = cartStore.getUserData.address;
  const newAddressId = profileStore.addNewAddress({
    street,
    building,
    flat,
    comment,
  });
  addressType.value = "saved-address";
  cartStore.setDeliveryAddress(newAddressId);
};

const getIngredientNames = (ingredients) => {
  return ingredients
    .map((ing) => {
      const ingredient = pizzaStore.ingredients.find(
        (i) => i.title === ing.title
      );
      return ingredient ? ingredient.name : ing.title;
    })
    .join(", ");
};

const sendForm = (e) => {
  e.preventDefault();
  showSuccessModal.value = !showSuccessModal.value;

  if (showSuccessModal.value) {
    cartStore.clearCart();
    cartStore.clearMisc();
  }
};

onMounted(() => {
  cartStore.initializeMisc();
});
</script>

<style></style>
