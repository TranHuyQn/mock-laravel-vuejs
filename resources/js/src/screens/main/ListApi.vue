<template lang="pug">
h1(class="my-3") Projects
.create-project.d-flex.justify-content-end
  button.btn.btn-primary.mb-3(type='button')
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
        button.btn.btn-warning(type='button')
          i(class="bi bi-pencil-square")
          span(class="ms-2") edit
        button.btn.btn-danger.ms-3(type="button" @click="confirmDeleteMock(mock)")
          i(class="bi bi-archive")
          span(class="ms-2") delete
ConfirmModal
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useEmitter from '../../composable/emitter';
import useMocks from "../../composable/mocks";
import ConfirmModal from "../../components/modal/ConfirmModal";

const route = useRoute();

const emitter = useEmitter();
const { mocks, getMocks, storeMock, destroyMock, updateMock } = useMocks()
onMounted(getMocks(route.params.projectSlug))
const confirmDeleteMock = (mock) => {
  emitter.emit("showModalConfirm", {
    message: `Are you sure want to delete ${mock.endpoint}?`,
    onConfirm: () => destroyMock(mock.id)
  });
}
</script>

<style scoped>

</style>
