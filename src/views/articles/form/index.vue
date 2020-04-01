<template>
  <div>
    <Form
      class="c-form c-form--form"
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
      <Form-item label="分类" prop="categoryId">
        <c-category-select
          class="c-form__input"
          select-parent
          :alias="alias"
          v-model="cForm.model.categoryId"
          @change="
            value => {
              $set(cForm.model, 'categoryId', value);
            }
          "
        ></c-category-select>
      </Form-item>
      <Form-item label="状态" prop="status">
        <c-publish-status-select
          class="c-form__input"
          :value="cForm.model.status"
          @change="
            value => {
              $set(cForm.model, 'status', value);
            }
          "
        ></c-publish-status-select>
      </Form-item>
      <Form-item label="标签" prop="tags">
        <Checkbox :true-value="1" :false-value="0" v-model="cForm.model.hot">
          热门
        </Checkbox>
        <Checkbox :true-value="1" :false-value="0" v-model="cForm.model.new">
          最新
        </Checkbox>
      </Form-item>
      <Form-item label="内容" prop="content">
        <c-editor
          :html="cForm.model.content"
          @change="
            html => {
              $set(cForm.model, 'content', html);
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
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import RouteParamsMixin from "@/mixins/route-params";
import FormMixin from "@/mixins/form";
import { mapState } from "vuex";

const module = "articles";

@Component({
  mixins: [RouteParamsMixin, FormMixin],
  computed: mapState({
    detail: state => state[module].detail
  })
})
export default class ArticlesForm extends Vue {
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
          content: [
            {
              required: true,
              message: "内容不能为空"
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
      originalPrice: 0,
      price: 0,
      stock: 0,
      status: 1,
      content: ""
    };
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const {
          model: { id, ...restModel }
        } = this.cForm;

        await this.$store.dispatch(`${module}/${id ? "put" : "post"}`, {
          id,
          body: restModel
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
