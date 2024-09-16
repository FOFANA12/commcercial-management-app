<template>
  <div>
    <h2>List of Customers</h2>
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <button class="btn btn-primary" @click="openCreateModal">
          Add New Customer
        </button>
      </div>
    </div>
    <CustomerTable
      :customers="customers"
      @preview-customer="openPreviewModal"
      @edit-customer="openEditModal"
    />

    <CustomerModal
      ref="customerModal"
      @on-added-customer="addCustomer"
      @on-updated-customer="updateCustomer"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomerModal from "./components/Modal.vue";
import CustomerTable from "./components/Table.vue";

const customerModal = ref(null);
const selectedCustomer = ref(null);

const customers = ref([
  {
    name: "John Doe",
    address: "123 Main St, New York, NY",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  },
  {
    name: "Jane Smith",
    address: "456 Oak St, Los Angeles, CA",
    email: "janesmith@example.com",
    phone: "098-765-4321",
  },
  {
    name: "Alice Martin",
    address: "789 Pine St, Chicago, IL",
    email: "alicemartin@example.com",
    phone: "234-567-8901",
  },
  {
    name: "David Brown",
    address: "101 Maple Ave, Houston, TX",
    email: "davidbrown@example.com",
    phone: "345-678-9012",
  },
  {
    name: "Michael Johnson",
    address: "202 Elm St, Phoenix, AZ",
    email: "michaeljohnson@example.com",
    phone: "456-789-0123",
  },
  {
    name: "Emily Clark",
    address: "303 Cedar St, Philadelphia, PA",
    email: "emilyclark@example.com",
    phone: "567-890-1234",
  },
  {
    name: "Robert White",
    address: "404 Birch St, San Antonio, TX",
    email: "robertwhite@example.com",
    phone: "678-901-2345",
  },
  {
    name: "Sarah Green",
    address: "505 Walnut St, San Diego, CA",
    email: "sarahgreen@example.com",
    phone: "789-012-3456",
  },
  {
    name: "Chris Blue",
    address: "606 Spruce St, Dallas, TX",
    email: "chrisblue@example.com",
    phone: "890-123-4567",
  },
  {
    name: "Rachel Black",
    address: "707 Chestnut St, San Jose, CA",
    email: "rachelblack@example.com",
    phone: "901-234-5678",
  },
]);

const openCreateModal = () => {
  customerModal.value.openCreateModal();
};

const openEditModal = (customer) => {
  selectedCustomer.value = customer;
  customerModal.value.openEditModal(customer);
};

const openPreviewModal = (customer) => {
  customerModal.value.openPreviewModal(customer);
};

const addCustomer = (customer) => {
  customers.value.push({
    ...customer,
    createdAt: new Date(),
  });
};

const updateCustomer = (customer) => {
  const index = customers.value.findIndex((c) => c.name === selectedCustomer.value.name);
  customers.value[index] = {
    ...customer,
    createdAt: selectedCustomer.value.createdAt,
  };
};
</script>
