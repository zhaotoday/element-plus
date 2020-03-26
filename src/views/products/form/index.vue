<template>
  <div>
    <Form
      class="c-form"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="100"
    >
      <Form-item label="标题" prop="title">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.title"
          placeholder="请输入标题"
        />
      </Form-item>
      <Form-item label="状态" prop="status">
        <Select class="c-form__input" v-model.trim="cForm.model.status">
          <Option
            v-for="item in dicts.Status"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
      <Form-item>
        <Button class="u-mr5" type="primary" @click="submit">
          保存
        </Button>
        <Button
          @click="
            id ? $helpers.goBack() : $router.push(`/${alias}/products/list`)
          "
        >
          返回
        </Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import FormMixin from "@/mixins/form";

const module = "products";

@Component({
  mixins: [FormMixin]
})
export default class ProductsForm extends Vue {
  data() {
    return {
      cForm: {
        model: this.getFormInitModel(),
        rules: {
          title: [
            {
              required: true,
              message: "标题不能为空"
            }
          ],
          pictureId: [
            {
              required: true,
              message: "图片不能为空"
            }
          ]
        }
      }
    };
  }

  getFormInitModel() {
    return {
      status: 1
    };
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { id, model } = this.cForm;

        await this.$store.dispatch(`${module}/${id ? "put" : "post"}`, {
          id,
          body: model
        });

        this.cForm.modal = false;
        this.$Message.success(`${id ? "编辑" : "新增"}成功`);
        this.$emit("get-list");
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
