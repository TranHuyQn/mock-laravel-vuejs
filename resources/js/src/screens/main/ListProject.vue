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
        button.btn.btn-danger.ms-3(type="button" @click="confirmDeleteProject(project.id)")
            i(class="bi bi-archive")
            span(class="ms-2") delete
AddProjectModal
ConfirmModal
</template>

<script setup>
    import { onMounted } from 'vue';
    import useProjects from '../../composable/projects';
    import AddProjectModal from '../../components/modal/AddProjectModal.vue';
    import useEmitter from '../../composable/emitter';
    import ConfirmModal from '../../components/modal/ConfirmModal.vue';

    const emitter = useEmitter();
    const { projects, getProjects, storeProject, destroyProject, updateProject } = useProjects()
    onMounted(getProjects)
    const showModalAddProject = () => {
        emitter.emit("showModalAddProject", {
          title: 'Add Project',
          onSubmit: (name, slug) => {
            const data = {name, slug};
            storeProject(data);
          }
        });
    }
    const confirmDeleteProject = (id) => {
        emitter.emit("showModalConfirm", {
            message: "Are you sure want to delete this project?",
            onConfirm: () => destroyProject(id)
        });
    }
    const showModalEditProject = (project) => {
        emitter.emit("showModalAddProject", {
          title: 'Edit Project',
          onSubmit: (name, slug) => {
            const data = {name, slug};
            updateProject(project.id, data);
          },
          name: project.name,
          slug: project.slug,
        });
    }
</script>

<style scoped>

</style>
