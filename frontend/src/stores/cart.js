import { defineStore } from "pinia";
import { MIN_INGREDIENT_VALUE, MISC_MAX_COUNTER, MAX_PIZZA_VALUE } from "@/common/constants";
import miscJSON from "@/mocks/misc.json";

export const useCartStore = defineStore('cart', {
    state: () => ({
        pizzas: [],
        misc: [],
        userData: {
            phone: '',
            address: {
                street: '',
                building: '',
                flat: '',
                comment: '',
                savedAddressId: null
            }
        }
    }),

    getters: {
        getTotalPrice: (state) => {
            const pizzasTotal = state.pizzas.reduce((sum, pizza) => {
                return sum + pizza.price * pizza.quantity;
            }, 0);

            const miscTotal = state.misc.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);

            return pizzasTotal + miscTotal;
        },
        getPizzas: (state) => state.pizzas,
        getMisc: (state) => state.misc,
        getUserData: (state) => state.userData
    },

    actions: {
        initializeMisc() {
            this.misc = miscJSON.map(item => ({
                ...item,
                quantity: 0
            }));
        },

        addPizza(pizza) {
            const existingPizza = this.pizzas.find(p =>
                p.name === pizza.name &&
                p.dough.id === pizza.dough.id &&
                p.sauce.id === pizza.sauce.id &&
                p.size.id === pizza.size.id &&
                JSON.stringify(p.ingredients) === JSON.stringify(pizza.ingredients)
            );

            if (existingPizza) {
                if (existingPizza.quantity < MAX_PIZZA_VALUE) {
                    existingPizza.quantity++;
                }
            } else {
                this.pizzas.push({
                    ...pizza,
                    quantity: 1,
                    id: Date.now()
                });
            }
        },

        updatePizzaQuantity(pizzaId, quantity) {
            const pizza = this.pizzas.find(p => p.id === pizzaId);
            if (pizza) {
                if (quantity >= 0 && quantity <= MAX_PIZZA_VALUE) {
                    pizza.quantity = quantity;
                }
                if (quantity === 0) {
                    this.removePizza(pizzaId);
                }
            }
        },

        removePizza(pizzaId) {
            const index = this.pizzas.findIndex(p => p.id === pizzaId);
            if (index !== -1) {
                this.pizzas.splice(index, 1);
            }
        },

        updateMiscQuantity(miscId, quantity) {
            const item = this.misc.find(m => m.id === miscId);
            if (item) {
                if (quantity >= MIN_INGREDIENT_VALUE && quantity <= MISC_MAX_COUNTER) {
                    item.quantity = quantity;
                }
            }
        },

        updateUserPhone(phone) {
            // Remove all non-digit characters except plus sign
            const cleaned = phone.replace(/[^\d+]/g, '');

            // Format the phone number if it's a valid Russian number
            if (cleaned.length >= 1 && cleaned.length <= 12) {
                let formatted = cleaned;
                if (cleaned.startsWith('+7') && cleaned.length > 2) {
                    const digits = cleaned.slice(2);
                    formatted = digits.length > 0 ? `+7 ${digits.slice(0, 3)}` : '+7 ';
                    if (digits.length > 3) formatted += ` ${digits.slice(3, 6)}`;
                    if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
                    if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
                } else if (cleaned.startsWith('8') || cleaned.startsWith('7')) {
                    const digits = cleaned.slice(1);
                    formatted = digits.length > 0 ? `+7 ${digits.slice(0, 3)}` : '+7 ';
                    if (digits.length > 3) formatted += ` ${digits.slice(3, 6)}`;
                    if (digits.length > 6) formatted += `-${digits.slice(6, 8)}`;
                    if (digits.length > 8) formatted += `-${digits.slice(8, 10)}`;
                }
                this.userData.phone = formatted;
            }
        },

        editPizza(pizzaId, updatedPizza) {
            const index = this.pizzas.findIndex(p => p.id === pizzaId);
            if (index !== -1) {
                this.pizzas[index] = {
                    ...updatedPizza,
                    id: pizzaId,
                    quantity: this.pizzas[index].quantity
                };
            }
        },

        isValidPhone() {
            const phone = this.userData.phone;
            const cleaned = phone.replace(/[^\d+]/g, '');
            return /^\+7\d{10}$/.test(cleaned);
        },

        updateUserAddress(address) {
            this.userData.address = {
                ...this.userData.address,
                ...address
            };
        },

        setDeliveryAddress(addressId) {
            this.userData.address.savedAddressId = addressId;
        },

        clearUserAddress() {
            this.userData.address = {
                street: '',
                building: '',
                flat: '',
                comment: '',
                savedAddressId: null
            };
        },

        resetUserData() {
            this.userData = {
                phone: '',
                address: {
                    street: '',
                    building: '',
                    flat: '',
                    comment: '',
                    savedAddressId: null
                }
            };
        }
    }
});
