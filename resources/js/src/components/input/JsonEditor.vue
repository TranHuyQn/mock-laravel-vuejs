<template lang="pug">
#jsoneditor
</template>

<script setup>
import {onMounted} from 'vue';
import JSONEditor from '../../assets/js/jsoneditor.min';

let editor = null;

const getJson = () => {
  if (editor) {
    try {
      return JSON.stringify(editor.get());
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

const setJson = (data) => editor.set(data)

defineExpose({
  getJson,
  setJson
})

onMounted(() => {
  // create the editor
  const container = document.getElementById("jsoneditor");
  const options = {
    mode: "code",
  };
  editor = new JSONEditor(container, options);
})

</script>

<style>
@import '../../assets/css/jsoneditor.min.css';
#jsoneditor {
  width: 100%;
  height: 600px;
}
button.jsoneditor-sort,
button.jsoneditor-transform,
button.jsoneditor-repair,
button.jsoneditor-undo,
button.jsoneditor-redo,
a.jsoneditor-poweredBy {
  display: none;
}
</style>
