<template>
  <div>
    <Divider orientation="left">校区设置</Divider>
    <Form
      class="c-form c-form--dress"
      ref="form"
      :model="props"
      :rules="cForm.rules"
      :label-width="80"
    >
      <Form-item label="校区名称" prop="name">
        <Input
          class="c-form__input"
          v-model.trim="props.name"
          placeholder="请输入校区名称"
        />
      </Form-item>
      <Form-item label="主色调" props>
        <ColorPicker
          v-model="props.primaryColor"
          recommend
          @on-change="handleChange"
        ></ColorPicker>
      </Form-item>
      <Form-item label="Logo" prop="logoId">
        <c-uploader
          class="c-form__input"
          :default-file-ids="props.logoId"
          @change="
            value => {
              $set(props, 'logoId', value);
            }
          "
        />
      </Form-item>
      <Form-item label="公众号二维码" prop="qrCodePictureId">
        <c-uploader
          class="c-form__input"
          :default-file-ids="props.qrCodePictureId"
          @change="
            value => {
              $set(props, 'qrCodePictureId', value);
            }
          "
        />
      </Form-item>
      <Form-item label="介绍" prop="introduction">
        <Input
          class="c-form c-form__input"
          type="textarea"
          :rows="8"
          placeholder="请输入介绍"
          v-model="props.introduction"
        />
      </Form-item>
    </Form>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
