<template lang="pug">
h1(class="my-3") Apis
.create-project.d-flex.justify-content-end
  button.btn.btn-primary.mb-3(type='button' @click="showModalAddMock")
    i(class="bi bi-pencil-square")
    span(class="ms-2") Create Mock
table.table.table-striped
  thead
    tr
      th(scope='col') #
      th(scope='col') Endpoint
      th(scope='col') Method
      th(scope='col') Action
  tbody
    tr(v-for="(mock, index) in mocks")
      th(scope='row') {{index + 1}}
      td {{ `/api/${mock.project.slug}/${mock.endpoint}` }}
      td {{mock.method}}
      td
        button.btn.btn-warning(type='button' @click="showModalEditMock(mock)")
          i(class="bi bi-pencil-square")
          span(class="ms-2") edit
        button.btn.btn-danger.ms-3(type="button" @click="confirmDeleteMock(mock)")
          i(class="bi bi-archive")
          span(class="ms-2") delete
ConfirmModal(ref="confirmModal")
AddMockModal(ref="addMockModal")
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import useMocks from "../../composable/mocks";
import ConfirmModal from "../../components/modal/ConfirmModal";
import AddMock from "../../components/modal/AddMockModal";
import AddMockModal from "../../components/modal/AddMockModal";
const route = useRoute();
const projectSlug = route.params.projectSlug;
const confirmModal = ref(null);
const addMockModal = ref(null);

const { mocks, getMocks, storeMock, destroyMock, updateMock } = useMocks()
onMounted(getMocks(projectSlug))

const confirmDeleteMock = (mock) => {
  confirmModal.value.show({
    title: 'Confirm delete',
    message: `Are you sure want to delete <strong>${mock.endpoint}</strong>?`,
    buttonSubmit: {
      label: 'Delete',
      onSubmit: async () => {
        confirmModal.value.hide();
        await destroyMock(mock.id);
      },
    }
  });
}

const showModalAddMock = () => {
  addMockModal.value.show({
    title: 'Create mock',
    onSubmit: async (endpoint, method, response) => {
      const data = {endpoint, method, response, projectSlug};
      addMockModal.value.hide();
      await storeMock(data);
    }
  });
}

const showModalEditMock = (mock) => {
  addMockModal.value.show({
    title: 'Edit Mock',
    onSubmit: async (endpoint, method, response) => {
      const data = {endpoint, method, response, projectSlug};
      addMockModal.value.hide();
      await updateMock(mock.id, data);
    },
    endpoint: mock.endpoint,
    method: mock.method,
    response: JSON.parse(mock.response),
  });
}
</script>

<style scoped>

</style>
