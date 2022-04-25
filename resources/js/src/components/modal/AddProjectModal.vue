<template lang="pug">
Base(:title="modalInfo.modalTitle" ref="thisModal")
  template(#body)
    .mb-3
      label.form-label(for='project-name') Project Name
      input#project-name.form-control(type='text' placeholder='project name' v-model="name")
    .mb-3
      label.form-label(for='project-slug') Project Slug
      input#project-slug.form-control(type='text' placeholder='project slug' v-model="slug")
  template(#footer)
    button.btn.btn-primary(@click="onSubmit") {{modalInfo.labelButtonSubmit}}
</template>
<script setup>
import { watch, reactive, ref } from 'vue';
import { convertStringToSlug } from '../../util/Helper';
import Base from './Base';

let modal = null;
const name = ref('');
const slug = ref('');
const thisModal = ref(null);
watch(name, () => slug.value = convertStringToSlug(name.value));

const modalInfo = reactive({
  modalTitle: '',
  onSubmit: () => null,
  labelButtonSubmit: '',
});

const onSubmit = (e) => {
  e.preventDefault();
  modalInfo.onSubmit(name.value, slug.value);
};

const hide = () => thisModal.value.hide();
const show = (infoModal) => {
  modalInfo.modalTitle = infoModal.title;
  modalInfo.onSubmit = (name, value) => {
    infoModal.onSubmit(name, value);
  };
  modalInfo.labelButtonSubmit = infoModal.labelButtonSubmit || infoModal.title;
  name.value = infoModal.name || '';
  slug.value = infoModal.slug || '';
  thisModal.value.show()
};

defineExpose({
  show,
  hide,
});
</script>
