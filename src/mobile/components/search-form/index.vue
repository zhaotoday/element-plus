<template>
  <div>
    <Divider orientation="left">搜索</Divider>
    <Form
      class="c-form c-form--dress"
      ref="form"
      :model="props"
      :rules="cForm.rules"
      :label-width="80"
    >
      <Form-item label="提示文字" prop="placeholder">
        <Input
          class="c-form__input"
          v-model.trim="props.placeholder"
          placeholder="请输入提示文字"
        />
      </Form-item>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
