<template>
  <Modal
    width="496"
    v-model.trim="cForm.modal"
    :title="cForm.id ? '编辑' : '新增'"
    :loading="cForm.loading"
    @on-ok="submit"
  >
    <Form
      class="c-form c-form--modal"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="80"
    >
      <Form-item label="名称" prop="name">
        <Input
          class="c-form__input"
          placeholder="请输入名称"
          v-model="cForm.model.name"
        />
      </Form-item>
      <Form-item label="类型" prop="type">
        <Select
          class="c-form__input"
          placeholder="请选择类型"
          v-model="cForm.model.type"
        >
          <Option
            v-for="item in dicts.CouponType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
      <Form-item label="使用范围" prop="objectType">
        <Select
          class="c-form__input"
          placeholder="请选择使用范围"
          v-model="cForm.model.objectType"
        >
          <Option
            v-for="item in dicts.CouponObjectType"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
      <Form-item
        v-show="cForm.model.objectType === 'Product'"
        label="指定商品"
        prop="productIds"
      >
        <c-product-select
          class="c-form__input"
          :value="cForm.model.productIds"
          multiple
          @change="
            value => {
              $set(cForm.model, 'productIds', value);
            }
          "
        ></c-product-select>
      </Form-item>
      <Form-item
        v-show="cForm.model.objectType === 'Category'"
        label="指定分类"
        prop="categoryIds"
      >
        <c-category-select
          class="c-form__input"
          alias="products"
          multiple
          v-model="cForm.model.categoryIds"
          @change="
            value => {
              $set(cForm.model, 'categoryIds', value);
            }
          "
        ></c-category-select>
      </Form-item>
      <Form-item label="抵扣金额" prop="deductAmount">
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.model.deductAmount"
        />
        元
      </Form-item>
      <Form-item
        v-show="cForm.model.type !== 'Reduction'"
        label="最低消费"
        prop="minConsumeAmount"
      >
        <InputNumber
          :min="0"
          :max="100000"
          v-model="cForm.model.minConsumeAmount"
        />
        元
      </Form-item>
      <Form-item label="有效期" prop="period">
        <InputNumber :min="0" :max="100000" v-model="cForm.model.period" />
        天
      </Form-item>
    </Form>
  </Modal>
</template>

<script src="./script.js"></script>
