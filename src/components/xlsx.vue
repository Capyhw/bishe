<template>
  <el-upload
    class="upload-demo"
    accept=".xls,.xlsx"
    ref="upload"
    drag
    :auto-upload="false"
    :limit="1"
    :on-exceed="handleExceed"
    :on-change="change"
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
      <div class="el-upload__tip">xls/xlsx files</div>
    </template>
  </el-upload>

  <el-table
    :data="tableData"
    :default-sort="{ prop: '学号', order: 'descending' }"
    stripe
    border
    max-height="60vh"
    style="width: 100%"
  >
    <template v-for="(v, k, i) in tableData[0]">
      <el-table-column
        v-if="k == '作业'"
        :prop="k"
        :label="k"
        sortable
        :filters="[
          { text: '已提交', value: '已提交' },
          { text: '未提交', value: '未提交' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-start"
      >
      </el-table-column>
      <el-table-column v-else :prop="k" :label="k" sortable> </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as XLSX from "xlsx";
import {
  ElMessage,
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRawFile,
} from "element-plus";
import { genFileId } from "element-plus";

//ref-upload
const upload = ref<UploadInstance>();

//新文件替换旧文件
const handleExceed: UploadProps["onExceed"] = (files: any[]) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

//表格数据接口
interface TableData {
  [x: string]: string;
}
//表格数据
const tableData = ref<TableData[]>([]);
//读取、解析表格
const change = (file: UploadFile) => {
  const orginFile = file.raw as File;
  //判断文件类型
  if (orginFile == null) {
  } else if (!/\.(xls|xlsx)$/.test(orginFile.name.toLowerCase())) {
    ElMessage.error("文件类型不正确");
  } else {
    // 读取表格数据
    const fileReader = new FileReader();
    fileReader.onload = (ev: Event) => {
      const target = ev.target as FileReader;
      const workbook = XLSX.read(target.result, {
        type: "binary",
      });
      const wsname = workbook.SheetNames[0];
      const ws: TableData[] = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
      console.log(ws);

      tableData.value = ws; //赋值
    };
    fileReader.readAsBinaryString(orginFile);
  }
};

//表格-作业-过滤
const filterTag = (value: string, row: { [x: string]: string }) => {
  return row["作业"] === value;
};
</script>

<style scoped></style>
