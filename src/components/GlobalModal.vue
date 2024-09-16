<template>
  <div
    v-if="isVisible"
    class="modal fade show d-block"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div :class="['modal-dialog modal-dialog-centered', modalSizeClass]">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
  size: {
    type: String,
    default: "md",
  },
});

const isVisible = ref(false);

// Dynamically compute the modal size class
const modalSizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "modal-sm";
    case "lg":
      return "modal-lg";
    case "xl":
      return "modal-xl";
    default:
      return "";
  }
});

const closeModal = () => {
  isVisible.value = false;
};

const openModal = () => {
  isVisible.value = true;
};

defineExpose({
  closeModal,
  openModal,
});
</script>

<style scoped>
.modal {
  display: block;
  z-index: 1050;
}
</style>
