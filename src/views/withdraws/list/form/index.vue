<template>
  <Modal
    width="496"
    v-model.trim="cForm.modal"
    title="申请提现"
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
      <Form-item label="账户余额" prop="incomes">{{ total }}元 </Form-item>
      <Form-item label="提现金额" prop="value">
        <InputNumber :min="50" :max="5000" v-model="cForm.model.value" />
        元
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import FormMixin from 'view-ui-admin/src/mixins/form'

const module = "withdraws";

@Component({
  mixins: [FormMixin]
})
export default class ListForm extends Vue {
  data() {
    return {
      total: 0,
      cForm: {
        id: 0,
        modal: false,
        loading: true,
        model: this.getFormInitModel(),
        rules: {
          value: [
            {
              required: true,
              message: "提现金额不能为空"
            },
            {
              pattern: /\d+/,
              message: "提现金额必须为整数"
            },
            {
              asyncValidator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (+value < 50 || +value > 5000) {
                    reject("提现金额必须大于50小于5000");
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
      value: 50
    };
  }

  async show() {
    this.cForm.modal = true;
    this.total = await this.getTotal();
  }

  async getTotal() {
    const { items } = await this.$store.dispatch("schoolWxUsers/getList", {
      query: {
        where: {
          schoolId: { $eq: this.getSchoolId() },
          wxUserId: { $eq: this.user.id }
        }
      }
    });
    return items[0]
      ? this.$helpers.formatNumber(items[0].incomes + items[0].expenses)
      : 0;
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { model } = this.cForm;

        this.cForm.modal = false;

        await this.$store.dispatch(`${module}/post`, {
          body: {
            ...model,
            userType: "School"
          }
        });

        this.$Message.success("申请成功，审核中");
        this.$emit("get-list");
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
