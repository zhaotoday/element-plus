<template>
  <Modal width="496" v-model.trim="cForm.modal" title="设置" @on-ok="submit">
    <Form
      class="c-form c-form--modal"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="80"
    >
      <Form-item label="模块" prop="name">
        {{ $helpers.getItem(dicts.PayModule, "value", moduleName)["label"] }}
      </Form-item>
      <Form-item label="到期时间" prop="createsAt">
        <DatePicker
          class="c-form__input"
          :value="cForm.model.expiresAt"
          type="datetime"
          placeholder="请选择到期时间"
          @on-change="
            value => {
              $set(cForm.model, 'expiresAt', value);
            }
          "
        />
      </Form-item>
      <Form-item label="状态" prop="enabled">
        <Select
          class="c-form__input"
          placeholder="请选择状态"
          clearable
          v-model="cForm.model.enabled"
        >
          <Option
            v-for="item in dicts.EnableStatus"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
    </Form>
  </Modal>
</template>

<script src="./script.js"></script>
