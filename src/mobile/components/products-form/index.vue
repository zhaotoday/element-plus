<template>
  <div>
    <Divider orientation="left">
      {{ $helpers.getItem(dicts.ProductType, "value", type)["label"] }}
    </Divider>
    <Form class="c-form c-form--dress" :label-width="80">
      <Form-item label="标题" prop="title">
        <Input
          class="c-form__input"
          v-model.trim="props.title"
          placeholder="请输入标题"
        />
      </Form-item>
      <Form-item label="排版" prop="modifier">
        <Select
          class="c-form__input"
          placeholder="请选择排版"
          clearable
          v-model="props.modifier"
        >
          <Option
            v-for="item in $consts.ProductModifier"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
      <Form-item label="展示数据">
        <c-mini-list :items="data.items"></c-mini-list>
      </Form-item>
    </Form>
    <Form
      class="c-form c-form--dress"
      :label-width="80"
      style="margin-top: -20px"
    >
      <Form-item>
        <div class="b-modules">
          <Button icon="md-add" @click="add">新增</Button>
          <Button icon="md-add" @click="showListSelect">
            选择现有
          </Button>
        </div>
      </Form-item>
    </Form>
    <c-list-select
      ref="listSelect"
      :selected-items.sync="data.items"
      :items="list.items"
      is-product
      @select="handleSelect"
    ></c-list-select>
  </div>
</template>

<script src="./script.js"></script>
