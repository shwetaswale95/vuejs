<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th scope="col" class="px-6 py-3">name</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in product"
            :key="item.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          >
            <td class="px-6 py-3">{{ item.name }}</td>
            <td class="px-6 py-4 truncate max-w-[10px]">
              {{ item.description }}
            </td>
            <td>
              <button
                @click="submit"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Buy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="form-group">
      <label for="description">Description</label>
      <input
        class="form-control"
        id="description"
        name="description"
        required
        v-model="product.description"
      />
    </div>
    <div class="form-group">
      <label for="type">Type</label>
      <input
        type="text"
        class="form-control"
        id="type"
        v-model="product.type"
        required
      />
    </div>
    <div class="form-group">
      <label for="name">Name</label>
      <input class="form-control" id="name" required v-model="product.name" />
    </div>
    <button
      type="button"
      @click="addProduct()"
      class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
    >
      Add Product
    </button> -->
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <!-- <button class="button button4" @click="submit">Buy now</button> -->
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "stripeComponent",
  components: {
    StripeCheckout,
  },
  data() {
    return {
      publishableKey:
        "pk_test_51MSFMaSIDUaT83RH8YJIlAhIFDSaY3YHR0ZF97d4aBQPZqQPT4zpzncpccSgdGfD3eqH968vRuQxTsFFEsXUGQcZ00jOpFwYpv",
      successURL: "http://localhost:8080/stripe",
      cancelURL: "http://localhost:8080/stripe",
      loading: false,
      lineItems: [
        {
          price: "price_1NhVv2SIDUaT83RHRSS9y186",
          quantity: 1,
        },
      ],
      product: {
        description: "",
        type: "",
        name: "",
      },
    };
  },
  methods: {
    submit(price) {
      this.lineItems.price = price;
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getProductList() {
      TutorialDataService.getProduct().then((response) => {
        this.product = response.data.data;
        console.log(this.product);
      });
    },
    addProduct() {
      const data = {
        description: this.product.description,
        type: this.product.type,
        name: this.product.name,
      };
      TutorialDataService.addProduct(data).then(() => {
        this.getProductList();
      });
    },
  },
  mounted() {
    this.getProductList();
  },
};
</script>
