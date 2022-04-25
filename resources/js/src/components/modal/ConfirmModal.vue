<template lang="pug">
#confirmModal.modal.fade( v-show="isVisible" tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
  .modal-dialog.modal-dialog-centered.modal-dialog-scrollable
    .modal-content
      .modal-header
        h5#exampleModalLabel.modal-title Confirm
        button.btn-close(type='button' @click="closeModal" aria-label='Close')
      .modal-body
        span(v-html="message" )
      .modal-footer
        button.btn.btn-secondary(type='button' @click="closeModal") Close
        button.btn.btn-danger(type='button' @click="onConfirm") Delete
</template>
<script setup>
import { Modal } from 'bootstrap';
import {onMounted, ref, watch} from 'vue';
import useEmitter from '../../composable/emitter';

const emitter = useEmitter();
let modal = null;

const message = ref('');
const onConfirm = ref(() => null);

const isVisible = ref(false);

onMounted(() => {
  // if (!modal) {
  //   modal = new Modal(document.getElementById('confirmModal'));
    // emitter.on("showModalConfirm", data => {
    //   message.value = data.message;
    //   onConfirm.value = () => {
    //     data.onConfirm();
    //     modal.hide();
    //   };
    //   modal.show();
    // });
  // }
});

watch(isVisible, () => console.log(isVisible))

const showModal = (modalInfo) => {
  message.value = modalInfo.message;
  onConfirm.value = () => {
    modalInfo.onConfirm();
    closeModal();
  };
  isVisible.value = true
}

const closeModal = () => {
  isVisible.value = false;
}

defineExpose({
  showModal,
  closeModal,
})

</script>
