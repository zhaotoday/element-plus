<template>
  <el-dialog title="订单详情" v-model="cDialog.visible" width="550px">
    <el-descriptions :column="4" direction="vertical">
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2"
        >Suzhou</el-descriptions-item
      >
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script src="./script.js"></script>
