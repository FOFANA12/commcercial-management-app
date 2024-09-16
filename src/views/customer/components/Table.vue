<template>
  <div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in props.customers" :key="index">
              <td>{{ customer.name }}</td>
              <td>{{ customer.address }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td class="text-center">
                <!-- Preview Action -->
                <font-awesome-icon
                  icon="eye"
                  class="text-info me-3"
                  style="cursor: pointer"
                  @click="$emit('preview-customer', customer)"
                />
                <!-- Edit Action -->
                <font-awesome-icon
                  icon="edit"
                  class="text-warning me-3"
                  style="cursor: pointer"
                  @click="$emit('edit-customer', customer)"
                />
                <!-- Delete Action -->
                <font-awesome-icon
                  icon="trash"
                  class="text-danger me-3"
                  style="cursor: pointer"
                  @click="deleteCustomer(index)"
                />
              </td>
            </tr>
            <tr v-if="props.customers.length === 0">
              <td colspan="5" class="text-center">No data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  customers: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['preview-customer', 'edit-customer']);

const deleteCustomer = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
    props.customers.splice(index, 1);
  }
};
</script>
