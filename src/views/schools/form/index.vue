<template>
  <Form
    class="c-form c-form--form"
    ref="form"
    :model="cForm.model"
    :rules="cForm.rules"
    :label-width="100"
  >
    <Form-item label="名称" prop="name">
      <Input
        class="c-form c-form__input"
        placeholder="请输入名称"
        v-model="cForm.model.name"
      />
    </Form-item>
    <Form-item label="地址" prop="address">
      <Input
        class="c-form c-form__input"
        v-model="cForm.model.address"
        placeholder="请输入地址"
      />
    </Form-item>
    <Form-item label="负责人" prop="leader">
      <Input
        class="c-form c-form__input"
        v-model="cForm.model.leader"
        placeholder="请输入负责人"
      />
    </Form-item>
    <Form-item label="手机号" prop="phoneNumber">
      <Input
        class="c-form c-form__input"
        v-model="cForm.model.phoneNumber"
        placeholder="请输入手机号"
        readonly
      />
    </Form-item>
    <Form-item label="密码" prop="password">
      <Input
        class="c-form c-form__input"
        type="password"
        v-model="cForm.cacheModel.password"
        placeholder="请输入密码（留空表示不修改）"
      />
    </Form-item>
    <Form-item label="普通用户升级会员的最低消费" prop="userToMemberMinConsume">
      <InputNumber
        :min="0"
        :max="10000"
        v-model="cForm.model.userToMemberMinConsume"
      />
      元
    </Form-item>
    <Form-item
      v-if="isPlatform()"
      label="校区提现费率"
      prop="schoolWithdrawRate"
    >
      <InputNumber
        :min="0"
        :max="100"
        v-model="cForm.model.schoolWithdrawRate"
      />
      %
    </Form-item>
    <Form-item
      v-if="isPlatform()"
      label="分销员提现费率"
      prop="distributorWithdrawRate"
    >
      <InputNumber
        :min="0"
        :max="100"
        v-model="cForm.model.distributorWithdrawRate"
      />
      %
    </Form-item>
    <Form-item v-if="isPlatform()" label="付费模块" prop="payModules">
      <c-pay-module :form-model="cForm.model || {}"></c-pay-module>
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
        >
          {{ item.label }}
        </Option>
      </Select>
    </Form-item>
    <Form-item label="分销协议" prop="distributionAgreement">
      <c-editor
        :html="cForm.model.distributionAgreement"
        @change="
          html => {
            $set(cForm.model, 'distributionAgreement', html);
            $refs.form.validateField('distributionAgreement');
          }
        "
      ></c-editor>
    </Form-item>
    <Form-item>
      <Button class="u-mr5" type="primary" @click="submit">
        保存
      </Button>
      <Button
        @click="
          id ? $helpers.goBack() : $router.push(`/articles/articles/list`)
        "
      >
        返回
      </Button>
    </Form-item>
  </Form>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import FormMixin from "view-ui-admin/src/mixins/form";
import { mapState } from "vuex";
import PayModule from "@/views/schools/form/pay-module";

const module = "schools";

@Component({
  mixins: [RouteParamsMixin, FormMixin],
  components: {
    "c-pay-module": PayModule
  },
  computed: mapState({
    detail: state => state[module].detail
  })
})
export default class extends Vue {
  data() {
    return {
      cForm: {
        cacheModel: {},
        model: this.getFormInitModel(),
        rules: {
          name: [
            {
              required: true,
              message: "名称不能为空"
            }
          ]
        }
      }
    };
  }

  created() {
    this.id && this.getDetail(module, this.id);
  }

  getFormInitModel() {
    return {
      schoolWithdrawRate: 0,
      distributorWithdrawRate: 0,
      status: 1
    };
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const {
          cacheModel,
          model: { id, ...restModel }
        } = this.cForm;
        const { data } = await this.$store.dispatch(
          `${module}/${id ? "put" : "post"}`,
          {
            id,
            body: {
              ...restModel,
              ...(cacheModel.password ? cacheModel : { password: undefined })
            }
          }
        );

        this.cForm.modal = false;
        this.$Message.success(`${id ? "编辑" : "新增"}成功`);
        this.$emit("get-list", data);
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
