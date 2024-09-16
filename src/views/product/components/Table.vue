<template>
  <div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Barcode</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in props.products" :key="index">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.barcode }}</td>
              <td>{{ product.status }}</td>
              <td class="text-center">
                <!-- Preview Action -->
                <font-awesome-icon
                  icon="eye"
                  class="text-info me-3"
                  style="cursor: pointer"
                  @click="$emit('preview-product', product)"
                />
                <!-- Edit Action -->
                <font-awesome-icon
                  icon="edit"
                  class="text-warning me-3"
                  style="cursor: pointer"
                  @click="$emit('edit-product', product)"
                />
                <!-- Delete Action -->
                <font-awesome-icon
                  icon="trash"
                  class="text-danger me-3"
                  style="cursor: pointer"
                  @click="deleteProduct(index)"
                />
              </td>
            </tr>
            <tr v-if="props.products.length === 0">
              <td colspan="8" class="text-center">No data</td>
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
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['preview-product', 'edit-product']);

const deleteProduct = (index) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    props.products.splice(index, 1);
  }
};
</script>
