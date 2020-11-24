<template>
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
      <Checkbox :true-value="1" :false-value="0" v-model="cForm.model.hot">
        热门
      </Checkbox>
      <Checkbox :true-value="1" :false-value="0" v-model="cForm.model.top">
        置顶
      </Checkbox>
    </Form-item>
    <Form-item label="内容" prop="content">
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
          id ? $helpers.goBack() : $router.push(`/articles/articles/list`)
        "
      >
        返回
      </Button>
    </Form-item>
  </Form>
</template>

<script src="./script.js"></script>
