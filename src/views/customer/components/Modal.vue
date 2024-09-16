<template>
  <teleport to="body">
    <GlobalModal ref="customerModal" :title="modalTitle">
      <template v-slot:body>
        <form @submit.prevent="submitCustomer">
          <div class="mb-3">
            <label for="name" class="form-label">Customer Name</label>
            <input
              v-model="customerData.name"
              type="text"
              id="name"
              class="form-control"
              required
              :disabled="isReadOnly || mode === 'edit'"
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <textarea
              v-model="customerData.address"
              id="address"
              class="form-control"
              required
              :disabled="isReadOnly"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="customerData.email"
              type="email"
              id="email"
              class="form-control"
              required
              :disabled="isReadOnly"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              v-model="customerData.phone"
              type="text"
              id="phone"
              class="form-control"
              required
              :disabled="isReadOnly"
            />
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
          @click="submitCustomer"
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

const emit = defineEmits(["on-added-customer", "on-updated-customer"]);
const mode = ref("create");

const modalTitle = computed(() => {
  let title = "Create new customer";
  if (mode.value === "edit") title = "Edit customer";
  else if (mode.value === "view") title = "View customer";
  return title;
});

const isReadOnly = computed(() => mode.value === "view");

const customerData = ref({
  id: null, // Auto-generated
  name: "",
  address: "",
  email: "",
  phone: "",
});

const resetForm = () => {
  customerData.value = {
    id: null,
    name: "",
    address: "",
    email: "",
    phone: "",
  };
};

const customerModal = ref(null);

const openCreateModal = () => {
  resetForm();
  mode.value = "create";
  customerModal.value.openModal();
};

const openEditModal = (customer) => {
  resetForm();
  mode.value = "edit";
  customerData.value = { ...customer };
  customerModal.value.openModal();
};

const openPreviewModal = (customer) => {
  resetForm();
  mode.value = "view";
  customerData.value = { ...customer };
  customerModal.value.openModal();
};

const closeModal = () => {
  customerModal.value.closeModal();
};

const submitCustomer = () => {
  const action =
    mode.value === "edit" ? "on-updated-customer" : "on-added-customer";
  const customerToSubmit = { ...customerData.value };
  
  // Emit the event to the parent with customer data
  emit(action, customerToSubmit);

  resetForm();
  closeModal();
};

defineExpose({
  openCreateModal,
  openEditModal,
  openPreviewModal,
});
</script>
