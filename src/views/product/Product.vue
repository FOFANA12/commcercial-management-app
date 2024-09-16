<template>
  <div>
    <h2>List of Products</h2>
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <button class="btn btn-primary" @click="openCreateModal">
          Add New Product
        </button>
      </div>
    </div>
    <ProductTable
      :products="products"
      @preview-product="openPreviewModal"
      @edit-product="openEditModal"
    />

    <ProductModal
      ref="productModal"
      @on-added-product="addProduct"
      @on-updated-product="updateProduct"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductModal from "./components/Modal.vue";
import ProductTable from "./components/Table.vue";

const productModal = ref(null);
const selectedProduct = ref(null);

const products = ref([
  {
    name: "Product 001",
    description: "High-quality product.",
    price: 100.0,
    stock: 50,
    category: "Electronics",
    barcode: "123456789012",
    status: "Active",
  },
  {
    name: "Product 002",
    description: "Affordable product.",
    price: 50.0,
    stock: 100,
    category: "Home Appliances",
    barcode: "987654321098",
    status: "Inactive",
  },
  {
    name: "Product 003",
    description: "Durable product.",
    price: 75.0,
    stock: 75,
    category: "Sports",
    barcode: "234567890123",
    status: "Active",
  },
  // Add more products as needed...
]);

const openCreateModal = () => {
  productModal.value.openCreateModal();
};

const openEditModal = (product) => {
  selectedProduct.value = product;
  productModal.value.openEditModal(product);
};

const openPreviewModal = (product) => {
  productModal.value.openPreviewModal(product);
};

const addProduct = (product) => {
  products.value.push({
    ...product,
  });
};

const updateProduct = (product) => {
  const index = products.value.findIndex(
    (p) => p.name === selectedProduct.value.name
  );
  products.value[index] = {
    ...product,
  };
};
</script>
