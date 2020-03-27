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
          v-model="cForm.model.categoryId"
          @change="
            value => {
              $set(cForm.model, 'categoryId', value);
            }
          "
        ></c-category-select>
      </Form-item>
      <Form-item label="原价" prop="originalPrice">
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.model.originalPrice"
        />
        元
      </Form-item>
      <Form-item label="会员价" prop="price">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.price" />
        元
      </Form-item>
      <Form-item label="库存" prop="stock">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.stock" />
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
      <Form-item label="详情" prop="content">
        <c-editor
          :html="cForm.model.content"
          @change="
            html => {
              $set(cForm.model, 'content', html);
            }
          "
        ></c-editor>
      </Form-item>
      <Form-item label="标签" prop="tags">
        <Checkbox :true-value="1" :false-value="0" v-model="cForm.model.new">
          新品
        </Checkbox>
        <Checkbox
          :true-value="1"
          :false-value="0"
          v-model="cForm.model.recommended"
        >
          推荐
        </Checkbox>
      </Form-item>
      <Form-item label="状态" prop="status">
        <Select class="c-form__input" v-model.trim="cForm.model.status">
          <Option
            v-for="item in dicts.ProductStatus"
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
            id ? $helpers.goBack() : $router.push(`/products/products/list`)
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

const module = "products";

@Component({
  mixins: [RouteParamsMixin, FormMixin],
  computed: mapState({
    detail: state => state[module].detail
  })
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
          ],
          content: [
            {
              required: true,
              message: "详情不能为空"
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
      status: 1
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
