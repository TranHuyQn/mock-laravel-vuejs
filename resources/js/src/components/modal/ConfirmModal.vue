<script setup>
  import { ref, reactive } from "vue";
  import Base from './Base';
  const modal = reactive({
    title: 'Modal confirm',
    message: "Are you sure?",
    buttonSubmit: {
      label: "Submit",
      onSubmit: () => null,
    }
  });

  let thisModal= ref(null);

  const show = (modalInfo) => {
    modal.title = modalInfo.title;
    modal.message = modalInfo.message;
    modal.buttonSubmit = modalInfo.buttonSubmit;
    thisModal.value.show();
  };

  const hide = () => {
    thisModal.value.hide();
  };

  defineExpose({
    show,
    hide,
  });

</script>
<template lang="pug">
Base(:title="modal.title" ref="thisModal")
  template(#body)
    span(v-html="modal.message")
  template(#footer)
    button.btn.btn-danger(@click="modal.buttonSubmit.onSubmit()") {{modal.buttonSubmit.label}}
</template>
