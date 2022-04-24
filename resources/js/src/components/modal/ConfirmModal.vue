<template lang="pug">
#confirmModal.modal.fade(tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
  .modal-dialog.modal-dialog-centered.modal-dialog-scrollable
    .modal-content
      .modal-header
        h5#exampleModalLabel.modal-title Confirm
        button.btn-close(type='button' @click="closeModal" aria-label='Close')
      .modal-body
        | {{message}}
      .modal-footer
        button.btn.btn-secondary(type='button' @click="closeModal") Close
        button.btn.btn-danger(type='button' @click="onConfirm") Delete
</template>
<script setup>
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import useEmitter from '../../composable/emitter';

const emitter = useEmitter();
let modal = null;

const message = ref('');
const onConfirm = ref(() => null);

onMounted(() => {
    modal = new Modal(document.getElementById('confirmModal'));
    emitter.on("showModalConfirm", data => {
      message.value = data.message;
      onConfirm.value = () => {
        data.onConfirm();
        modal.hide();
      };
      modal.show();
    });
});

const closeModal = () => {
    modal.hide();
}

</script>