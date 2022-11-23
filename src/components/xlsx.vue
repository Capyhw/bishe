<template>
  <div class="m-btn">
    导入表格
    <input
      type="file"
      accept=".xls,.xlsx"
      class="upload-file"
      @change="changeExcel($event)"
    />
  </div>
  <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
  >
    <template #trigger>
      <div>
        <el-icon>
          <Edit />
        </el-icon>
      </div>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
    <template #file> file </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as XLSX from "xlsx";

const tableData = ref([]); //表格数据

const dealExcel = (ws) => {
  let keymap = {
    // 转换的开头
    姓名: "name",
    工资月份: "month",
    工资总金额: "money",
    部门: "section",
    职位: "job",
  };
  ws.forEach((sourceObj) => {
    Object.keys(sourceObj).map((keys) => {
      let newKey = keymap[keys];
      if (newKey) {
        sourceObj[newKey] = sourceObj[keys];
        delete sourceObj[keys];
      }
    });
  });
  tableData.value = ws;
};
const changeExcel = (e) => {
  const files = e.target.files;
  if (files.length <= 0) {
    return false;
  } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    return false;
  }
  // 读取表格数据
  const fileReader = new FileReader();
  fileReader.onload = (ev) => {
    const workbook = XLSX.read(ev.target.result, {
      type: "binary",
    });
    const wsname = workbook.SheetNames[0];
    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
    dealExcel(ws); //转换数据格式
    tableData.value = ws; //赋值
  };
  fileReader.readAsBinaryString(files[0]);
};
</script>

<style scoped></style>
