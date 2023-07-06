<template>
  <el-dialog
    :title="cForm.id ? '编辑' : '新增'"
    v-model="cDialog.visible"
    width="900px"
  >
    <div
      class="c-scrollbar"
      style="height: 600px; overflow-y: auto; padding-right: 10px"
    >
      <el-form
        ref="form"
        :model="cForm.model"
        :rules="cForm.rules"
        label-position="right"
        label-width="60px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="cForm.model.name" />
        </el-form-item>
        <el-form-item label="头像" prop="avatarFileId">
          <c-upload
            :key="`${cForm.id}:avatarFileId`"
            v-model:value="cForm.model.avatarFileId"
            @change="validateField('avatarFileId')"
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <c-enum-select
            class="c-select--full"
            placeholder="请选择性别"
            :items="enums.Gender"
            v-model:value="cForm.model.gender"
          />
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            class="c-date-picker--full"
            type="month"
            placeholder="请选择生日年月"
            value-format="YYYY-MM"
            v-model="cForm.model.birthday"
          />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="cForm.model.unit" />
        </el-form-item>
        <el-form-item label="学位" prop="degree">
          <c-enum-select
            class="c-select--full"
            placeholder="请选择学位"
            :items="enums.Degree"
            v-model:value="cForm.model.degree"
          />
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-input v-model="cForm.model.title" />
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <c-editor
            style="height: 500px"
            v-model:value="cForm.model.introduction"
            @change="validateField('introduction')"
          />
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
