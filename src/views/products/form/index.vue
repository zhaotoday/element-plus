<template>
  <div>
    <Form
      class="c-form c-form--form"
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
      <Form-item label="是否积分商品" prop="pointProduct">
        <Select
          class="c-form__input"
          placeholder="请选择是或否"
          clearable
          v-model="cForm.model.pointProduct"
        >
          <Option
            v-for="item in [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            :disabled="item.value === 1 && !paidModules.includes('PointMall')"
          >
            {{ item.label }}
          </Option>
        </Select>
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
      <Form-item label="类型" prop="type">
        <Select
          class="c-form__input"
          placeholder="请选择类型"
          clearable
          v-model="cForm.model.type"
        >
          <Option
            v-for="item in dicts.ProductType"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            :disabled="!paidModules.includes(item.value)"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
      <Form-item label="图片" prop="pictureIds">
        <c-uploader
          class="c-form__input"
          :key="`picture-${cForm.id}`"
          multiple
          placeholder="请选择文件（可上传多张图片）"
          :default-file-ids="cForm.model.pictureIds"
          @change="
            value => {
              handleFormUploaderChange('pictureIds', value);
            }
          "
        ></c-uploader>
      </Form-item>
      <Form-item
        v-if="cForm.model.type === 'Video'"
        label="视频"
        prop="videoId"
      >
        <c-video-uploader
          class="c-form__input"
          :key="`video-${cForm.id}`"
          :format="['mp4']"
          :max-size="1024 * 1024 * 2"
          :default-id="cForm.model.videoId"
          @change="
            value => {
              $set(cForm.model, 'videoId', value);
            }
          "
        />
      </Form-item>
      <Form-item
        v-if="cForm.model.type === 'CourseWare'"
        label="课件"
        prop="courseWareIds"
      >
        <c-uploader
          class="c-form__input"
          :key="`courseWare-${cForm.id}`"
          multiple
          :format="['doc', 'docx', 'ppt', 'pdf']"
          :max-size="1024 * 1024"
          :default-file-ids="cForm.model.courseWareIds"
          @change="
            value => {
              handleFormUploaderChange('courseWareIds', value);
            }
          "
        />
      </Form-item>
      <Form-item
        v-show="cForm.model.type === 'Column'"
        label="专栏商品"
        prop="columnProductIds"
      >
        <c-product-select
          class="c-form__input"
          :value="cForm.model.columnProductIds"
          multiple
          :types="['Video', 'CourseWare']"
          @change="
            value => {
              $set(cForm.model, 'columnProductIds', value);
            }
          "
        ></c-product-select>
      </Form-item>
      <Form-item
        v-if="!cForm.model.pointProduct"
        label="原价"
        prop="originalPrice"
      >
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.model.originalPrice"
        />
        元
      </Form-item>
      <Form-item v-if="!cForm.model.pointProduct" label="会员价" prop="price">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.price" />
        元
      </Form-item>
      <Form-item
        v-if="!cForm.model.pointProduct"
        label="赠送积分"
        prop="givingPoints"
      >
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.model.givingPoints"
        />
      </Form-item>
      <Form-item
        v-if="!cForm.model.pointProduct"
        label="佣金比例"
        prop="commissionRate"
      >
        <InputNumber :min="0" :max="100" v-model="cForm.model.commissionRate" />
        %
      </Form-item>
      <Form-item v-if="cForm.model.pointProduct" label="兑换积分" prop="points">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.points" />
      </Form-item>
      <Form-item label="分销员奖励积分" prop="commissionPoints">
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.model.commissionPoints"
        />
      </Form-item>
      <Form-item label="库存" prop="stock">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.stock" />
      </Form-item>
      <Form-item label="销量" prop="sales">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.sales" />
      </Form-item>
      <Form-item
        v-if="cForm.model.type === 'Video' || cForm.model.type === 'CourseWare'"
        label="观看密码"
        prop="password"
      >
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.password"
          placeholder="请输入观看密码"
        />
      </Form-item>
      <Form-item
        v-if="cForm.model.type === 'Video' || cForm.model.type === 'CourseWare'"
        label="第三方链接"
        prop="link"
      >
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.link"
          placeholder="请输入第三方链接"
        />
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
      <Form-item label="购买按钮文字" prop="buyButtonText">
        <Input
          class="c-form__input"
          v-model.trim="cForm.model.buyButtonText"
          placeholder="请输入购买按钮文字（可不填）"
        />
      </Form-item>
      <Form-item label="自定义表单" prop="formFields">
        <Input
          v-for="item in cForm.model.formFields"
          :key="item.key"
          style="width: 400px; margin-bottom: 6px;"
          placeholder="请输入表单名称"
          v-model.trim="item.label"
        >
          <Button
            slot="append"
            icon="md-close"
            @click="deleteFormField(item)"
          ></Button>
        </Input>
        <Input
          style="width: 400px; margin-bottom: 6px;"
          placeholder="请输入表单名称"
          v-model.trim="formField.label"
        >
          <Button slot="append" icon="md-add" @click="addFormField"></Button>
        </Input>
      </Form-item>
      <Form-item label="详情" prop="content">
        <c-editor
          :html="cForm.model.content"
          @change="
            html => {
              $set(cForm.model, 'content', html);
              $refs.form.validateField('content');
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
import { Component, Vue } from "vue-property-decorator";
import RouteParamsMixin from "view-ui-admin/src/mixins/route-params";
import FormMixin from "view-ui-admin/src/mixins/form";
import { mapState } from "vuex";
import PayModuleMixin from "@/mixins/pay-module";

const module = "products";

@Component({
  mixins: [RouteParamsMixin, FormMixin, PayModuleMixin],
  computed: mapState({
    detail: state => state[module].detail
  })
})
export default class extends Vue {
  data() {
    return {
      paidModules: [],
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
          type: [
            {
              required: true,
              message: "类型不能为空"
            }
          ],
          pictureIds: [
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
      },
      formField: {
        key: 0,
        label: ""
      }
    };
  }

  async created() {
    this.id && this.getDetail(module, this.id);
    this.paidModules = await this.getPaidModules();
  }

  getFormInitModel() {
    return {
      pointProduct: 0,
      originalPrice: 0,
      price: 0,
      points: 0,
      commissionPoints: 0,
      givingPoints: 0,
      commissionRate: 0,
      stock: 0,
      status: 1,
      formFields: []
    };
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const {
          model: { id, ...restModel }
        } = this.cForm;

        const { data } = await this.$store.dispatch(
          `${module}/${id ? "put" : "post"}`,
          {
            id,
            body: restModel
          }
        );

        this.cForm.modal = false;
        this.$Message.success(`${id ? "编辑" : "新增"}成功`);
        this.$emit("get-list", data);
      }

      this.fixFormButtonLoading();
    });
  }

  deleteFormField(item) {
    const index = this.cForm.model.formFields.findIndex(
      ({ key }) => key === item.key
    );
    this.cForm.model.formFields.splice(index, 1);
  }

  addFormField() {
    if (!this.formField.label) {
      this.$Message.error("表单名称不能为空");
      return;
    }
    if (!this.cForm.model.formFields) {
      this.cForm.model.formFields = [];
    }
    this.formField.key = `form${new Date().getTime()}`;
    this.cForm.model.formFields.push(this.$helpers.deepCopy(this.formField));
    this.formField.key = 0;
    this.formField.label = "";
  }
}
</script>
