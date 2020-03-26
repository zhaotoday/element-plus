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
            <Input
              v-model.trim="cForm.formValidate.title"
              placeholder="请输入标题"
            />
          </Col>
        </Row>
      </Form-item>
      <Form-item label="链接" prop="link">
        <Row>
          <Col span="20">
            <Input
              v-model.trim="cForm.formValidate.link"
              placeholder="请输入链接"
            />
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
            <Select
              v-model.trim="cForm.formValidate.status"
              style="width: 320px;"
            >
              <Option
                v-for="item in $consts.AD_STATUSES"
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
export default class adsListForm extends Vue {
  cForm = {
    id: 0,
    modal: false,
    loading: true,
    model: {},
    rules: {
      name: [
        {
          required: true,
          message: "名称不能为空"
        }
      ],
      nextNodeUserId: [
        {
          required: true,
          message: "经办人不能为空"
        }
      ],
      types: [
        {
          required: true,
          message: "专业类别不能为空"
        }
      ]
    }
  };

  show(detail) {
    this.cForm.modal = true;

    if (detail && detail.id) {
      this.cForm.id = detail.id;
      this.initFormFields(detail);
      this.$refs.types.init(detail.id);
      this.$refs.uploader.init(detail.attachments);
    } else {
      this.cForm.id = 0;
      this.resetFormFields();
    }
  }

  handleTypeChange(value) {
    this.$set(this.cForm.model, "types", value[0] ? value : null);
    this.$refs.form.validate();
  }

  handleUploaderChange(attachments) {
    this.$set(this.cForm.model, "attachments", attachments);
  }

  submit() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        await this.$store.dispatch(`${module}/postAction`, {
          action: "update",
          body: {}
        });

        this.cForm.modal = false;
        this.$Message.success("编辑成功");
        this.$emit("get-list");
      }

      this.fixFormButtonLoading();
    });
  }
}
</script>
