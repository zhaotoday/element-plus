<template>
  <Modal
    width="496"
    v-model.trim="cForm.modal"
    :title="cForm.id ? '编辑' : '新增'"
    :loading="cForm.loading"
    @on-ok="submit"
  >
    <Form
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="80"
    >
      <Form-item label="标题" prop="title">
        <Row>
          <Col span="20">
            <Input v-model.trim="cForm.model.title" placeholder="请输入标题" />
          </Col>
        </Row>
      </Form-item>
      <Form-item label="链接" prop="link">
        <Row>
          <Col span="20">
            <Input v-model.trim="cForm.model.link" placeholder="请输入链接" />
          </Col>
        </Row>
      </Form-item>
      <Form-item label="图片" prop="pictureId">
        <c-uploader
          :has-default-file="!!cForm.model.pictureId"
          v-model="cForm.model.pictureId"
          @change="
            value => {
              handleFormUploaderChange('pictureId', value);
            }
          "
        />
      </Form-item>
      <Form-item label="状态" prop="status">
        <Row>
          <Col span="20">
            <Select v-model.trim="cForm.model.status" style="width: 320px;">
              <Option
                v-for="item in dicts.Status"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </Col>
        </Row>
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import FormMixin from "@/mixins/form";

const module = "ads";

@Component({
  mixins: [FormMixin]
})
export default class AdsListForm extends Vue {
  cForm = {
    id: 0,
    modal: false,
    loading: true,
    model: {},
    rules: {
      title: [
        {
          required: true,
          message: "标题不能为空"
        }
      ],
      link: [
        {
          required: true,
          message: "链接不能为空"
        }
      ],
      pictureId: [
        {
          required: true,
          message: "图片不能为空"
        }
      ]
    }
  };

  show(detail) {
    this.cForm.modal = true;

    if (detail && detail.id) {
      this.cForm.id = detail.id;
      this.initFormFields(detail);
    } else {
      this.cForm.id = 0;
      this.resetFormFields();
    }
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        await this.$store.dispatch(
          this.cForm.id ? `${module}/put` : `${module}/post`,
          {
            id: this.cForm.id || "0",
            body: this.cForm.model
          }
        );

        this.cForm.modal = false;
        this.$Message.success((this.cForm.id ? "编辑" : "新增") + "成功");
        this.getList();
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
