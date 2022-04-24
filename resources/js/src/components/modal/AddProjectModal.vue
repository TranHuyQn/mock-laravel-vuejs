<template lang="pug">
#addProjectModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
  form(@submit.prevent="modalInfo.onSubmit(name, slug)")
    .modal-dialog.modal-dialog-centered.modal-dialog-scrollable
      .modal-content
        .modal-header
          h5#exampleModalLabel.modal-title {{modalInfo.modalTitle}}
          button.btn-close(type='button' @click="closeModal" aria-label='Close')
        .modal-body
          .mb-3
            label.form-label(for='project-name') Project Name
            input#project-name.form-control(type='text' placeholder='project name' v-model="name")
          .mb-3
            label.form-label(for='project-slug') Project Slug
            input#project-slug.form-control(type='text' placeholder='project slug' v-model="slug")
        .modal-footer
          button.btn.btn-secondary(type='button' @click="closeModal") Close
          button.btn.btn-primary(type='submit') {{modalInfo.labelButtonSubmit}}
</template>
<script setup>
import { Modal } from 'bootstrap';
import { computed, onMounted, reactive, ref } from 'vue';
import useEmitter from '../../composable/emitter';
import { convertStringToSlug } from '../../util/Helper';

const emitter = useEmitter();
let modal = null;
const name = ref('');
const slug = computed(() => convertStringToSlug(name.value));
const modalInfo = reactive({
  modalTitle: '',
  onSubmit: () => null,
  labelButtonSubmit: '',
});


onMounted(() => {
    modal = new Modal(document.getElementById('addProjectModal'));
    emitter.on("showModalAddProject", data => {
      if (data) {
        modalInfo.modalTitle = data.title;
        modalInfo.onSubmit = (name, value) => {
          data.onSubmit(name, value);
          closeModal();
        };
        modalInfo.labelButtonSubmit = data.labelButtonSubmit || data.title;
        name.value = data.name || '';
        slug.value = data.slug || '';
      }
      modal.show();
    });
});

const closeModal = () => {
    modal.hide();
}



</script>