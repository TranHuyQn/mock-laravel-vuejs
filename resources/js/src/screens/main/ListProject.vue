<template lang="pug">
h1(class="my-3") Projects
.create-project.d-flex.justify-content-end
  button.btn.btn-primary.mb-3(type='button' @click="showModalAddProject")
    i(class="bi bi-pencil-square")
    span(class="ms-2") Create Project
table.table.table-striped
  thead
    tr
      th(scope='col') #
      th(scope='col') Name
      th(scope='col') Slug
      th(scope='col') Action
  tbody
    tr(v-for="(project, index) in projects")
      th(scope='row') {{index + 1}}
      td
        router-link(class="button" :to="{ name: 'list-api', params: { projectSlug: project.slug } }") {{project.name}}
      td {{project.slug}}
      td
        button.btn.btn-warning(type='button' @click="showModalEditProject(project)")
          i(class="bi bi-pencil-square")
          span(class="ms-2") edit
        button.btn.btn-danger.ms-3(type="button" @click="confirmDeleteProject(project)")
          i(class="bi bi-archive")
          span(class="ms-2") delete
AddProjectModal(ref="addProjectModal")
ConfirmModal(ref="confirmModal")
</template>

<script setup>
import {onMounted, ref} from 'vue';
import useProjects from '../../composable/projects';
import AddProjectModal from '../../components/modal/AddProjectModal.vue';
import ConfirmModal from '../../components/modal/ConfirmModal.vue';

const confirmModal = ref(null);
const addProjectModal = ref(null);
const {projects, getProjects, storeProject, destroyProject, updateProject} = useProjects();
onMounted(getProjects);
const showModalAddProject = () => {
  addProjectModal.value.show({
    title: 'Add Project',
    onSubmit: async (name, slug) => {
      const data = {name, slug};
      addProjectModal.value.hide();
      await storeProject(data);
    }
  });
};
const confirmDeleteProject = (project) => {
  confirmModal.value.show({
    title: 'Confirm delete',
    message: `Are you sure want to delete <strong>${project.name}</strong> project?`,
    buttonSubmit: {
      label: 'Delete',
      onSubmit: async () => {
        confirmModal.value.hide();
        await destroyProject(project.id);
      },
    }
  });
};
const showModalEditProject = (project) => {
  addProjectModal.value.show({
    title: 'Edit Project',
    onSubmit: async (name, slug) => {
      const data = {name, slug};
      addProjectModal.value.hide();
      await updateProject(project.id, data);
    },
    name: project.name,
    slug: project.slug,
  });
}
</script>

<style scoped>

</style>
