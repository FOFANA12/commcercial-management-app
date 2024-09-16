<template>
  <teleport to="body">
    <GlobalModal ref="productModal" :title="modalTitle" size="lg">
      <template v-slot:body>
        <form @submit.prevent="submitProduct">
          <div class="row">
            <div class="mb-3 col-6">
              <label for="name" class="form-label">Product Name</label>
              <input
                v-model="productData.name"
                type="text"
                id="name"
                class="form-control"
                required
                :disabled="isReadOnly || mode === 'edit'"
              />
            </div>

            <div class="mb-3 col-6">
              <label for="category" class="form-label">Category</label>
              <input
                v-model="productData.category"
                type="text"
                id="category"
                class="form-control"
                required
                :disabled="isReadOnly"
              />
            </div>
          </div>

          <div class="row">
            <div class="mb-3 col-6">
              <label for="price" class="form-label">Price</label>
              <input
                v-model="productData.price"
                type="number"
                id="price"
                class="form-control"
                required
                :disabled="isReadOnly"
                min="0"
                step="0.01"
              />
            </div>

            <div class="mb-3 col-6">
              <label for="stock" class="form-label">Stock Quantity</label>
              <input
                v-model="productData.stock"
                type="number"
                id="stock"
                class="form-control"
                required
                :disabled="isReadOnly"
                min="0"
                step="1"
              />
            </div>
          </div>

          <div class="row">
            <div class="mb-3 col-6">
              <label for="barcode" class="form-label">Barcode</label>
              <input
                v-model="productData.barcode"
                type="text"
                id="barcode"
                class="form-control"
                required
                :disabled="isReadOnly"
              />
            </div>

            <div class="mb-3 col-6">
              <label for="status" class="form-label">Status</label>
              <select
                v-model="productData.status"
                id="status"
                class="form-control"
                :disabled="isReadOnly"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="mb-3 col-12">
              <label for="description" class="form-label">Description</label>
              <textarea
                v-model="productData.description"
                id="description"
                class="form-control"
                required
                :disabled="isReadOnly"
              ></textarea>
            </div>
          </div>
        </form>
      </template>

      <template v-slot:footer>
        <button type="button" class="btn btn-secondary" @click="closeModal">
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-if="mode !== 'view'"
          @click="submitProduct"
        >
          Confirm
        </button>
      </template>
    </GlobalModal>
  </teleport>
</template>

<script setup>
import { computed, ref } from "vue";
import GlobalModal from "@/components/GlobalModal.vue";

const emit = defineEmits(["on-added-product", "on-updated-product"]);

const mode = ref("create");

const modalTitle = computed(() => {
  let title = "Create New Product";
  if (mode.value === "edit") title = "Edit Product";
  else if (mode.value === "view") title = "View Product";
  return title;
});

const isReadOnly = computed(() => mode.value === "view");

const productData = ref({
  name: "",
  description: "",
  price: 0.0,
  stock: 0,
  category: "",
  barcode: "",
  status: "Active",
});

const resetForm = () => {
  productData.value = {
    name: "",
    description: "",
    price: 0.0,
    stock: 0,
    category: "",
    barcode: "",
    status: "Active",
  };
};

const productModal = ref(null);

const openCreateModal = () => {
  resetForm();
  mode.value = "create";
  productModal.value.openModal();
};

const openEditModal = (product) => {
  resetForm();
  mode.value = "edit";
  productData.value = { ...product };
  productModal.value.openModal();
};

const openPreviewModal = (product) => {
  resetForm();
  mode.value = "view";
  productData.value = { ...product };
  productModal.value.openModal();
};

const closeModal = () => {
  productModal.value.closeModal();
};

const submitProduct = () => {
  const action =
    mode.value === "edit" ? "on-updated-product" : "on-added-product";
  const productToSubmit = { ...productData.value };

  emit(action, productToSubmit);

  resetForm();
  closeModal();
};

defineExpose({
  openCreateModal,
  openEditModal,
  openPreviewModal,
});
</script>
