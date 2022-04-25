<script setup>
  import {onMounted, ref} from "vue";
  import {Modal} from "bootstrap";
  import {genRandomId} from "../../util/Helper";

  defineProps({
    title: String
  });
  let modalEle = ref(null);
  let modal = null;

  const modalId = ref(genRandomId('modal'));

  onMounted(() => {
    modal = new Modal(modalEle.value);
  });

  const _show = () => {
    modal.show();
  };

  const _hide = () => {
    modal.hide();
  };

  defineExpose({
    show: _show,
    hide: _hide,
  });
</script>

<template lang="pug">
.modal.fade(:id="modalId" ref="modalEle" data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true')
  .modal-dialog.modal-dialog-centered.modal-dialog-scrollable
    .modal-content
      .modal-header
        h5.modal-title {{title}}
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        slot(name="body")
      .modal-footer
        button.btn.btn-secondary(type='button' data-bs-dismiss='modal') Close
        slot(name="footer")
</template>
