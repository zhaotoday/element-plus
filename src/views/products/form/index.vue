<template>
  <div>
    <Form
      class="c-form c-form--lg"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="100"
    >
      <Form-item label="名称" prop="name">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.name"
          placeholder="请输入名称"
        />
      </Form-item>
      <Form-item label="分类" prop="categoryId">
        <c-category-select
          class="c-form__input"
          @change="
            value => {
              $set(cForm.model, 'categoryId', value);
            }
          "
        ></c-category-select>
      </Form-item>
      <Form-item label="图片" prop="pictureId">
        <c-uploader
          class="c-form__input"
          :key="cForm.id"
          :has-default-file="!!cForm.model.pictureId"
          v-model="cForm.model.pictureId"
          @change="
            value => {
              handleFormUploaderChange('pictureId', value);
            }
          "
        />
      </Form-item>
      <Form-item label="视频" prop="videoId">
        <c-uploader
          class="c-form__input"
          :key="cForm.id"
          :has-default-file="!!cForm.model.videoId"
          v-model="cForm.model.videoId"
          @change="
            value => {
              handleFormUploaderChange('videoId', value);
            }
          "
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
          name: [
            {
              required: true,
              message: "名称不能为空"
            }
          ],
          categoryId: [
            {
              required: true,
              message: "分类不能为空"
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
