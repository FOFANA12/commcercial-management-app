<template>
  <div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Delivery Address</th>
              <th>Track Number</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td>{{ new Date(order.date).toLocaleDateString() }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.delivery_address }}</td>
              <td>{{ order.track_number }}</td>
              <td>{{ order.status }}</td>
              <td class="text-center">
                <!-- Preview Action -->
                <font-awesome-icon
                  icon="eye"
                  class="text-info me-3"
                  style="cursor: pointer"
                  @click="$emit('preview-order', order)"
                />
                <!-- Edit Action -->
                <font-awesome-icon
                  icon="edit"
                  class="text-warning me-3"
                  style="cursor: pointer"
                  @click="$emit('edit-order', order)"
                />
                <!-- Delete Action -->
                <font-awesome-icon
                  icon="trash"
                  class="text-danger me-3"
                  style="cursor: pointer"
                  @click="deleteOrder(index)"
                />
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="6" class="text-center">No data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/store'; 

const orderStore = useOrderStore();
const orders = orderStore.orders;

const deleteOrder = (index) => {
  if (confirm('Are you sure you want to delete this order?')) {
    orders.splice(index, 1); // Remove order from the orders array in the store
  }
};
</script>
