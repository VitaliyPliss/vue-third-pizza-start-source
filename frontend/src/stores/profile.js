import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        addresses: addressesJSON
    }),

    getters: {
        getAddressById: (state) => (id) => {
            return state.addresses.find(address => address.id === id);
        }
    },

    actions: {
        addNewAddress(address) {
            const newAddress = {
                id: Date.now(),
                name: `Адрес ${this.addresses.length + 1}`,
                ...address
            };
            this.addresses.push(newAddress);
            return newAddress.id;
        },

        updateAddress(id, address) {
            const existingAddress = this.addresses.find(a => a.id === id);
            if (existingAddress) {
                Object.assign(existingAddress, address);
            }
        },

        removeAddress(id) {
            const index = this.addresses.findIndex(a => a.id === id);
            if (index !== -1) {
                this.addresses.splice(index, 1);
            }
        }
    }
});
