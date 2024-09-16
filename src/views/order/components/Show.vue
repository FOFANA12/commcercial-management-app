<template>
  <teleport to="body">
    <GlobalModal ref="surveyModal" :title="modalTitle" @confirm="submitSurvey">
      <template v-slot:body>
        <form @submit.prevent="submitSurvey">
          <div class="mb-3">
            <label for="name" class="form-label">Survey Name</label>
            <input
              v-model="surveyData.name"
              type="text"
              id="name"
              class="form-control"
              required
              :disabled="isReadOnly || mode === 'edit'"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              v-model="surveyData.description"
              id="description"
              class="form-control"
              required
              :disabled="isReadOnly"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="employeeName" class="form-label"
              >Created By (Name)</label
            >
            <input
              v-model="surveyData.createdBy.employeeName"
              type="text"
              id="employeeName"
              class="form-control"
              required
              :disabled="isReadOnly"
            />
          </div>
          <div class="mb-3">
            <label for="employeeRole" class="form-label"
              >Created By (Role)</label
            >
            <input
              v-model="surveyData.createdBy.employeeRole"
              type="text"
              id="employeeRole"
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
        <button type="button" class="btn btn-primary" v-if="mode !== 'view'" @click="submitSurvey">
          Confirm
        </button>
      </template>
    </GlobalModal>
  </teleport>
</template>
  
  <script setup>
import { computed, ref } from "vue";
import GlobalModal from "@/components/GlobalModal.vue";
const emit = defineEmits(["on-added-survey", "on-updated-survey"]);
const mode = ref("create");

const modalTitle = computed(() => {
  let title = "Create new survey";
  if (mode.value === "edit") title = "Edit survey";
  else if (mode.value === "view") title = "Overview survey";
  return title;
});

const isReadOnly = computed(() => mode.value === "view");

// Survey data for the form
const surveyData = ref({
  name: "",
  description: "",
  createdBy: {
    employeeName: "",
    employeeRole: "",
  },
});

// Reset the form for adding a new survey
const resetForm = () => {
  surveyData.value = {
    name: "",
    description: "",
    createdBy: {
      employeeName: "",
      employeeRole: "",
    },
  };
};

// Modal visibility control
const surveyModal = ref(null);

// Method to open the modal
const openCreateModal = () => {
  resetForm();
  mode.value = "create";
  surveyModal.value.openModal();
};

const openEditModal = (survey) => {
  resetForm();
  mode.value = "edit";
  surveyData.value = { ...survey };
  surveyModal.value.openModal();
};

const openPreviewModal = (survey) => {
  resetForm();
  mode.value = "view";
  surveyData.value = { ...survey };
  surveyModal.value.openModal();
};

// Method to close the modal
const closeModal = () => {
  surveyModal.value.closeModal();
};

// Submit the survey (either add or edit)
const submitSurvey = () => {
  console.log("internal event");
  const action =
    mode.value === "edit" ? "on-updated-survey" : "on-added-survey";
  const surveyToSubmit = { ...surveyData.value };

  // Emit the event to the parent
  emit(action, surveyToSubmit);

  // Reset form and close the modal
  resetForm();
  closeModal();
};

// Expose the openModal method for use in the parent component
defineExpose({
  openCreateModal,
  openEditModal,
  openPreviewModal,
});
</script>
  