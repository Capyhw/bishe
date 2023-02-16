<template>
  <div>
    xlsx
    <xlsx></xlsx>
    uploadpic
    <UploadPic></UploadPic>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import UploadPic from "./components/uploadPic.vue";
import xlsx from "./components/xlsx.vue";
</script>

<style scoped></style>
