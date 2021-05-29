<template>
  <Modal
    width="496"
    v-model.trim="cForm.modal"
    title="积分增减"
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
      <Form-item label="微信用户" prop="wxUserId">
        <c-school-wx-user-select
          class="c-form__input"
          :school-id="getSchoolId()"
          :value="cForm.model.wxUserId"
          @change="
            value => {
              $set(cForm.model, 'wxUserId', value);
            }
          "
        >
        </c-school-wx-user-select>
      </Form-item>
      <Form-item label="积分" prop="value">
        <InputNumber :min="-10000" :max="100000" v-model="cForm.model.value" />
      </Form-item>
    </Form>
  </Modal>
</template>

<script src="./script.js"></script>
