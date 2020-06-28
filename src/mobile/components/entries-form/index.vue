<template>
  <div>
    <Divider orientation="left">功能入口</Divider>
    <Form class="c-form c-form--dress" :label-width="80">
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
          <Button icon="md-add" @click="$refs.listForm.show()">新增</Button>
          <Button icon="md-add" @click="showListSelect">
            选择现有
          </Button>
        </div>
      </Form-item>
    </Form>
    <c-list-form ref="listForm" @get-list="handleGetList"></c-list-form>
    <c-list-select
      ref="listSelect"
      :selected-items.sync="data.items"
      :items="list.items"
      @select="handleSelect"
    ></c-list-select>
  </div>
</template>

<script src="./script.js"></script>
