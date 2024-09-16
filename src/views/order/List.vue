<template>
  <div>
    <h2>List of Orders</h2>
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <router-link class="btn btn-primary" :to="{name: 'orders-create'}">
          Add New Order
        </router-link>
      </div>
    </div>
    <OrderTable />

  </div>
</template>

<script setup>
import OrderTable from "./components/Table.vue";

</script>
