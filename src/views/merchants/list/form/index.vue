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
      <Form-item label="关联的微信用户" prop="wxUserId">
        <c-wx-user-select
          class="c-form__input"
          :value="cForm.model.wxUserId"
          @change="
            value => {
              $set(cForm.model.wxUserId, value);
            }
          "
        >
        </c-wx-user-select>
      </Form-item>
      <Form-item label="联系人" prop="contactName">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.contactName"
          placeholder="请输入联系人"
        />
      </Form-item>
      <Form-item label="手机号" prop="phoneNumber">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.phoneNumber"
          placeholder="请输入手机号"
        />
      </Form-item>
      <Form-item label="密码" prop="password">
        <Input
          class="c-form__input"
          type="password"
          v-model.trim="cForm.model.password"
          placeholder="请输入密码"
        />
      </Form-item>
    </Form>
  </Modal>
</template>

<script src="./script.js"></script>
