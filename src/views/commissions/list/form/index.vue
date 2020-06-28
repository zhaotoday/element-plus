<template>
  <Modal
    width="496"
    v-model.trim="cForm.modal"
    title="佣金增减"
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
      <Form-item label="校区" prop="schoolId">
        <c-school-select
          class="c-form__input"
          :value="cForm.model.schoolId"
          @change="
            value => {
              $set(cForm.model, 'schoolId', value);
              $set(cForm.model, 'wxUserId', '');
            }
          "
        >
        </c-school-select>
      </Form-item>
      <Form-item label="微信用户" prop="wxUserId">
        <c-school-wx-user-select
          class="c-form__input"
          :school-id="cForm.model.schoolId"
          :value="cForm.model.wxUserId"
          @change="
            value => {
              $set(cForm.model, 'wxUserId', value);
            }
          "
        >
        </c-school-wx-user-select>
      </Form-item>
      <Form-item label="佣金" prop="value">
        <InputNumber :min="-10000" :max="100000" v-model="cForm.model.value" />
        元
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import FormMixin from "view-ui-admin/src/mixins/form";

const module = "commissions";

@Component({
  mixins: [FormMixin]
})
export default class ListForm extends Vue {
  data() {
    return {
      cForm: {
        id: 0,
        modal: false,
        loading: true,
        model: this.getFormInitModel(),
        rules: {
          schoolId: [
            {
              required: true,
              message: "校区不能为空"
            }
          ],
          wxUserId: [
            {
              required: true,
              message: "微信用户不能为空"
            }
          ],
          value: [
            {
              asyncValidator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (!value) {
                    reject("佣金不能为 0 或为空");
                  } else {
                    resolve();
                  }
                });
              }
            }
          ]
        }
      }
    };
  }

  getFormInitModel() {
    return {
      value: 0
    };
  }

  async show() {
    this.cForm.modal = true;
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { model } = this.cForm;

        await this.$store.dispatch(`${module}/postAction`, {
          action: "increaseOrDecrease",
          body: model
        });

        this.cForm.modal = false;
        this.$Message.success("操作成功");
        this.$emit("get-list");
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
