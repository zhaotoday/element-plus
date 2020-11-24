<template>
  <Modal
    width="496"
    v-model.trim="cForm.modal"
    :title="cForm.id ? '编辑' : '新增'"
    :loading="cForm.loading"
    @on-ok="submit"
  >
    <Form
      class="c-form c-form--modal"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="80"
    >
      <Form-item label="名称" prop="name">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.name"
          placeholder="请输入名称"
        />
      </Form-item>
      <Form-item label="Logo" prop="logoId">
        <c-uploader
          class="c-form__input"
          :key="`logo-${cForm.id}`"
          :default-file-ids="cForm.model.logoId"
          @change="
            value => {
              handleFormUploaderChange('logoId', value);
            }
          "
        />
      </Form-item>
      <Form-item label="链接" prop="link">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.link"
          placeholder="请输入链接"
        />
      </Form-item>
      <Form-item label="状态" prop="status">
        <Select
          class="c-form__input"
          placeholder="请选择状态"
          clearable
          v-model="cForm.model.status"
        >
          <Option
            v-for="item in dicts.PublishStatus"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            >{{ item.label }}
          </Option>
        </Select>
      </Form-item>
    </Form>
  </Modal>
</template>

<script src="./script.js"></script>
