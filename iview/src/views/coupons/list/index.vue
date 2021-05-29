<template>
  <div>
    <c-list
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :page-current="listPageCurrent"
      :search-where="listSearchWhere"
      @selection-change="handleListSelectionChange"
    >
      <c-list-header>
        <c-list-operations>
          <Button type="primary" @click="$refs.form.show()">
            新增
          </Button>
          <c-bulk-delete
            :selected-items="listSelectedItems"
            @ok="confirmDelete"
          >
          </c-bulk-delete>
        </c-list-operations>
        <c-list-search>
          <Form
            class="c-form c-form--search"
            inline
            @submit.native.prevent="search"
          >
            <Form-item prop="status">
              <Select
                class="c-form__input"
                placeholder="请选择状态"
                clearable
                v-model="cList.cSearch.where.status.$eq"
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
            <Form-item prop="name">
              <Input
                class="c-form__input"
                placeholder="请输入名称"
                v-model="cList.cSearch.where.name.$like"
              />
            </Form-item>
            <Form-item>
              <Button type="primary" @click="search">
                查询
              </Button>
            </Form-item>
          </Form>
        </c-list-search>
      </c-list-header>
    </c-list>
    <c-coupons-list-form ref="form" @get-list="getList"></c-coupons-list-form>
  </div>
</template>

<script src="./script.js"></script>
