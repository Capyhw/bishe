<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    multiple
    v-model:file-list="fileList"
  >
    <template #trigger>
      <div class="trigger">
        <el-icon><Plus /></el-icon>
      </div>
    </template>
    <template #file="{ file }">
      <div class="card">
        <img class="el-upload-list__item-thumbnail" :src="file.url" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
        <div class="fileName" :title="file.name">{{ file.name }}</div>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible" width="75%" center align-center>
    <img :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
// import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

import type { UploadFile } from "element-plus";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const fileList = ref([] as UploadFile[]);
//删除图片
const handleRemove = (file: UploadFile) => {
  // console.log(file);
  for (let i = 0; i < fileList.value.length; i++) {
    if (fileList.value[i].uid === file.uid) {
      fileList.value.splice(i, 1);
      break;
    }
  }
};
//预览图片
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
//下载图片
const handleDownload = (file: UploadFile) => {
  console.log(file);
};
</script>
<style lang="less" scoped>
@cardWidth: 300px;

:deep(.el-upload-list--picture-card) {
  .el-upload-list__item {
    width: @cardWidth;
    .card {
      width: @cardWidth;
      overflow: hidden;

      .el-upload-list__item-thumbnail {
        height: 80%;
        width: 100%;
      }
      .el-upload-list__item-actions {
        height: 80%;
      }
      .fileName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
  }
  .el-upload--picture-card {
    width: @cardWidth;
  }
}
</style>
