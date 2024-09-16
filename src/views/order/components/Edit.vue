<template>
  <div>
    <!-- Two-column layout using Bootstrap's grid system -->
    <div class="row">
      <!-- First Column: Date and Customer -->
      <div class="col-md-6">
        <!-- Date Field -->
        <div class="mb-3">
          <label for="date" class="form-label">Date</label>
          <input
            v-model="formData.date"
            type="date"
            id="date"
            class="form-control"
            required
          />
        </div>

        <!-- Customer Field -->
        <div class="mb-3">
          <label for="customer" class="form-label">Customer Name</label>
          <input
            v-model="formData.customer"
            type="text"
            id="customer"
            class="form-control"
            required
          />
        </div>
      </div>

      <!-- Second Column: Delivery Address, Track Number, and Status -->
      <div class="col-md-6">
        <!-- Delivery Address Field -->
        <div class="mb-3">
          <label for="delivery_address" class="form-label">Delivery Address</label>
          <input
            v-model="formData.delivery_address"
            type="text"
            id="delivery_address"
            class="form-control"
            required
          />
        </div>

        <!-- Track Number Field -->
        <div class="mb-3">
          <label for="track_number" class="form-label">Track Number</label>
          <input
            v-model="formData.track_number"
            type="text"
            id="track_number"
            class="form-control"
            required
            :disabled="mode === 'edit'"
          />
        </div>

        <!-- Status Field -->
        <div class="mb-3">
          <label for="status" class="form-label">Order Status</label>
          <select
            v-model="formData.status"
            id="status"
            class="form-control"
            required
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table for adding product items -->
    <h4 class="mt-4">Order Details</h4> <!-- Updated the heading here -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in formData.items" :key="index">
          <!-- Product Dropdown -->
          <td>
            <select
              v-model="item.product"
              class="form-select"
              required
            >
              <option value="" disabled>Select Product</option>
              <option v-for="product in products" :key="product.id" :value="product.name">
                {{ product.name }}
              </option>
            </select>
          </td>

          <!-- Quantity Input -->
          <td>
            <input
              type="number"
              v-model="item.quantity"
              class="form-control"
              min="1"
              required
            />
          </td>

          <!-- Price Input -->
          <td>
            <input
              type="number"
              v-model="item.price"
              class="form-control"
              min="0"
              step="0.01"
              required
            />
          </td>

          <!-- Action Buttons -->
          <td>
            <button class="btn btn-danger" @click="removeItem(index)">Remove</button>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <button class="btn btn-success" @click="addItem">Add New Detail</button> <!-- Updated button text -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Props passed from the parent
const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

// Form data
const formData = ref({
  date: "", // New date field
  customer: "",
  delivery_address: "",
  track_number: "",
  status: "Processing",
  items: [{ product: "", quantity: 1, price: 0.0 }], // Ensure at least one item
});

// Dummy list of products (In real case, you might fetch this from an API)
const products = ref([
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
]);

// If we are in edit mode, set the form data with initial values
if (props.mode === "edit") {
  formData.value = { ...props.initialData };
}

// Emit event on form submission
const emit = defineEmits(["submit-form"]);

const submitForm = () => {
  emit("submit-form", formData.value); // Emit form data to the parent on submit
};

// Expose the submitForm method to allow the parent to call it
defineExpose({
  submitForm,
});

// Add a new item (product) to the items array
const addItem = () => {
  formData.value.items.push({
    product: "",
    quantity: 1,
    price: 0.0,
  });
};

// Remove an item (product) from the items array, ensuring at least one row is present
const removeItem = (index) => {
  if (formData.value.items.length > 1) {
    formData.value.items.splice(index, 1);
  } else {
    alert("At least one item must be present.");
  }
};
</script>
