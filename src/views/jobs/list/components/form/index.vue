<template>
  <el-dialog
    :title="cForm.id ? '编辑' : '新增'"
    v-model="cDialog.visible"
    width="750px"
  >
    <div
      class="c-scrollbar"
      style="
        height: 500px;
        overflow-x: hidden;
        overflow-y: auto;
        padding-right: 10px;
      "
    >
      <el-form
        ref="formRef"
        :model="cForm.model"
        :rules="cForm.rules"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="职位名称" prop="name">
          <el-input v-model.trim="cForm.model.name" />
        </el-form-item>
        <el-form-item label="工作经验" prop="experience">
          <el-input v-model.trim="cForm.model.experience" />
        </el-form-item>
        <el-form-item label="招聘人数" prop="recruitment">
          <el-input v-model.trim="cForm.model.recruitment" />
        </el-form-item>
        <el-form-item label="学历要求" prop="education">
          <el-input v-model.trim="cForm.model.education" />
        </el-form-item>
        <el-form-item label="薪资范围" prop="salaryRange">
          <el-input v-model.trim="cForm.model.salaryRange" />
        </el-form-item>
        <el-form-item label="技能" prop="skills">
          <el-input v-model.trim="cForm.model.skills" />
        </el-form-item>
        <el-form-item label="职位描述" prop="description">
          <div style="position: relative; z-index: 2">
            <c-editor
              style="height: 250px"
              v-model:value="cForm.model.description"
              @change="form.validateField('description')"
            />
          </div>
        </el-form-item>
        <el-form-item label="工作地点" prop="address">
          <el-input v-model.trim="cForm.model.address" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="cDialog.visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script src="./script.js"></script>
