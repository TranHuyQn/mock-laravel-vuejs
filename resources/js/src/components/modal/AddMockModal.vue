<template lang="pug">
Base(:title="modalInfo.modalTitle" ref="thisModal" size="lg")
  template(#body)
    .mb-3
      label.form-label(for='endpoint-name') Endpoint
      input#endpoint-name.form-control(type='text' placeholder='endpoint' v-model="endpoint")
    .mb-3
      label.form-label(for='method') Method
      select#method.form-select(aria-label='Select method' v-model="method")
        option(v-for="method in methods" :value="method") {{method}}
    .mb-3
      label.form-label(for='response') Response
      JsonEditor(ref="thisJsonEditor")
  template(#footer)
    button.btn.btn-primary(@click="onSubmit") {{modalInfo.labelButtonSubmit}}
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { convertStringToSlug } from '../../util/Helper';
  import Base from './Base';
  import JsonEditor from "../input/JsonEditor";

  const endpoint = ref('');
  const method = ref('GET');
  const thisModal = ref(null);
  const thisJsonEditor = ref(null);
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  const modalInfo = reactive({
    modalTitle: '',
    onSubmit: () => null,
    labelButtonSubmit: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const response = thisJsonEditor.value.getJson();
    modalInfo.onSubmit(endpoint.value, method.value, response);
  };

  const hide = () => thisModal.value.hide();
  const show = (infoModal) => {
    if (infoModal) {
      modalInfo.modalTitle = infoModal.title;
      modalInfo.onSubmit = (endpoint, method, response) => {
        infoModal.onSubmit(endpoint, method, response);
      };
      modalInfo.labelButtonSubmit = infoModal.labelButtonSubmit || infoModal.title;
      endpoint.value = infoModal.endpoint || '';
      method.value = infoModal.method || 'GET';
      thisJsonEditor.value.setJson(infoModal.response || {})
    }
    thisModal.value.show()
  };

  defineExpose({
    show,
    hide,
  });
</script>

<style scoped>

</style>
