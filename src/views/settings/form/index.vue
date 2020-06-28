<template>
  <Form
    class="c-form c-form--form"
    ref="form"
    :model="cForm.model"
    :rules="cForm.rules"
    :label-width="100"
  >
    <Form-item label="申请校区文字" prop="applySchoolText">
      <Input
        class="c-form c-form__input"
        v-model="cForm.model.applySchoolText"
        placeholder="请输入申请校区文字"
      />
    </Form-item>
    <Form-item label="申请分销员文字" prop="applyDistributorText">
      <Input
        class="c-form c-form__input"
        v-model="cForm.model.applyDistributorText"
        placeholder="请输入申请分销员文字"
      />
    </Form-item>
    <Form-item>
      <Button class="u-mr5" type="primary" @click="submit">
        保存
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

const module = "settings";

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
        model: this.getFormInitModel(),
        rules: {}
      }
    };
  }

  created() {
    this.id && this.getDetail(module, this.id);
  }

  getFormInitModel() {
    return {};
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const {
          model: { id, ...restModel }
        } = this.cForm;

        await this.$store.dispatch(`${module}/put`, {
          id,
          body: restModel
        });

        this.cForm.modal = false;
        this.$Message.success("保存成功");
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
