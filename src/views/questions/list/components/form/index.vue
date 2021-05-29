<template>
  <el-dialog
    :title="`${cForm.updateMode ? '修改' : '新增'}灯谜`"
    width="550px"
    v-model="cDialog.visible"
  >
    <el-form
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      label-position="right"
      label-width="90px"
      style="width: 470px"
    >
      <el-form-item label="谜面" prop="title">
        <el-input type="textarea" rows="6" v-model="cForm.model.title" />
      </el-form-item>
      <el-form-item label="谜底" prop="answer">
        <el-input v-model="cForm.model.answer" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cDialog.visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script src="./script.js"></script>
