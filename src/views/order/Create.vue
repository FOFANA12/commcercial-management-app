<template>
  <div>
    <div class="d-flex justify-content-end mb-3">
      <div>
        <router-link :to="{name: 'orders'}" class="btn btn-secondary me-4">
          Return to Home
        </router-link>
        <button class="btn btn-primary" @click="submitForm">Submit</button>
      </div>
    </div>

    <Form mode="create" @submit-form="handleFormSubmission" />
  </div>
</template>

<script setup>
import Form from "./components/Edit.vue";

const handleFormSubmission = (formData) => {
  console.log("Form Data Submitted:", formData);
};
</script>
