<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-4">
      <div class="container">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item me-3">
              <router-link
                class="nav-link"
                to="/"
                active-class="active text-primary"
                exact
              >
                <font-awesome-icon icon="users" class="me-1" /> Customers
              </router-link>
            </li>

            <li class="nav-item me-3">
              <router-link
                class="nav-link"
                to="/products"
                active-class="active text-primary"
                exact-active-class="active text-primary"
              >
                <font-awesome-icon icon="box-open" class="me-1" /> Products
              </router-link>
            </li>

            <li class="nav-item me-3">
              <router-link
                class="nav-link"
                to="/orders"
                active-class="active text-primary"
                :class="{ 'active text-primary': isActive('/orders') }"
              >
                <font-awesome-icon icon="shopping-cart" class="me-1" /> Orders
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container mt-5 mb-4 pt-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const isActive = (basePath) => {
  return route.path.startsWith(basePath);
};
</script>

<style scoped>
</style>
