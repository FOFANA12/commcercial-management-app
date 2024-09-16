<template>
  <div>
    <h2>List of Answers</h2>
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <button class="btn btn-primary" @click="openCreateModal">
          Add New Answer
        </button>
      </div>
    </div>
    <SurveyTable
      :surveys="surveys"
      @preview-survey="openPreviewModal"
      @edit-survey="openEditModal"
    />

    <SurveyModal
      ref="surveyModal"
      @on-added-survey="addSurvey"
      @on-updated-survey="updateSurvey"
    />
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import SurveyModal from "./components/Show.vue";
import SurveyTable from "./components/Table.vue";

const surveyModal = ref(null);
const selectedSurvey = ref(null);

// Define the reactive surveys array and prefill it with 10 sample surveys
const surveys = ref([
  {
    name: "Enquête de Satisfaction 001",
    description:
      "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
    createdAt: "2024-07-25T08:00:00Z",
    createdBy: {
      employeeName: "Jane Smith",
      employeeRole: "Responsable du service client",
    },
  },
  {
    name: "Enquête de Satisfaction 002",
    description: "Enquête sur la qualité du service technique.",
    createdAt: "2024-07-26T08:00:00Z",
    createdBy: {
      employeeName: "John Doe",
      employeeRole: "Chef de service technique",
    },
  },
  {
    name: "Enquête de Satisfaction 003",
    description: "Enquête sur la réactivité du support client.",
    createdAt: "2024-07-27T08:00:00Z",
    createdBy: {
      employeeName: "Alice Martin",
      employeeRole: "Responsable support client",
    },
  },
  {
    name: "Enquête de Satisfaction 004",
    description: "Enquête concernant la qualité des produits.",
    createdAt: "2024-07-28T08:00:00Z",
    createdBy: {
      employeeName: "David Green",
      employeeRole: "Chef produit",
    },
  },
  {
    name: "Enquête de Satisfaction 005",
    description: "Enquête pour évaluer les délais de livraison.",
    createdAt: "2024-07-29T08:00:00Z",
    createdBy: {
      employeeName: "Emily Clark",
      employeeRole: "Responsable logistique",
    },
  },
  {
    name: "Enquête de Satisfaction 006",
    description: "Enquête pour comprendre les besoins des clients.",
    createdAt: "2024-07-30T08:00:00Z",
    createdBy: {
      employeeName: "Robert White",
      employeeRole: "Responsable marketing",
    },
  },
  {
    name: "Enquête de Satisfaction 007",
    description:
      "Enquête sur la satisfaction des services d’assistance technique.",
    createdAt: "2024-07-31T08:00:00Z",
    createdBy: {
      employeeName: "Rachel Blue",
      employeeRole: "Support technique",
    },
  },
  {
    name: "Enquête de Satisfaction 008",
    description: "Enquête sur les attentes des clients.",
    createdAt: "2024-08-01T08:00:00Z",
    createdBy: {
      employeeName: "Michael Brown",
      employeeRole: "Analyste commercial",
    },
  },
  {
    name: "Enquête de Satisfaction 009",
    description: "Enquête sur l’utilisation des outils numériques.",
    createdAt: "2024-08-02T08:00:00Z",
    createdBy: {
      employeeName: "Sarah Wilson",
      employeeRole: "Chargée de projet digital",
    },
  },
  {
    name: "Enquête de Satisfaction 010",
    description: "Enquête sur l’impact des campagnes publicitaires.",
    createdAt: "2024-08-03T08:00:00Z",
    createdBy: {
      employeeName: "Chris Johnson",
      employeeRole: "Chef de projet marketing",
    },
  },
]);

const openCreateModal = () => {
  surveyModal.value.openCreateModal();
};

const openEditModal = (survey) => {
  selectedSurvey.value = survey;
  surveyModal.value.openEditModal(survey);
};

const openPreviewModal = (survey) => {
  surveyModal.value.openPreviewModal(survey);
};

// Define the addSurvey method
const addSurvey = (survey) => {
  surveys.value.push({
    ...survey,
    createdAt: new Date(),
  });
};
const updateSurvey = (survey) => {
  console.log("ici");

  const index = surveys.value.findIndex((s) => s.name === selectedSurvey.name);
  console.log(index);

  surveys.value[index] = {
    ...survey,
    createdAt: selectedSurvey.createdAt,
  };
};
</script>
  