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
      <Form-item label="分类" prop="categoryId">
        <c-category-select
          class="c-form__input"
          :alias="alias"
          v-model="cForm.model.categoryId"
          @change="
            value => {
              $set(cForm.model, 'categoryId', value);
            }
          "
        ></c-category-select>
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
      <Form-item label="佣金比例" prop="commissionRate">
        <InputNumber :min="0" :max="100" v-model="cForm.model.commissionRate" />
        %
      </Form-item>
      <Form-item label="库存" prop="stock">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.stock" />
      </Form-item>
      <Form-item label="销量" prop="sales">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.sales" />
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

<script src="./script.js"></script>
