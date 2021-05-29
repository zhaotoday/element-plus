<template>
  <c-list
    :data="list.items"
    :columns="cList.columns"
    :total="list.total"
    :page-current="listPageCurrent"
    :search-where="listSearchWhere"
    :statistic="`总佣金：${$helpers.formatNumber(cList.total)}元`"
    @selection-change="handleListSelectionChange"
  >
    <c-list-header>
      <c-list-operations>
        <c-bulk-delete
          :selected-items="listSelectedItems"
          @ok="confirmDelete"
        ></c-bulk-delete>
      </c-list-operations>
      <c-list-search>
        <Form
          class="c-form c-form--search"
          inline
          @submit.native.prevent="search"
        >
          <Form-item prop="dateRange">
            <c-date-range
              class="c-form__input"
              :value="cList.cSearch.where.dateRange.$eq"
              @change="
                date => {
                  cList.cSearch.where.dateRange.$eq = date;
                }
              "
            ></c-date-range>
          </Form-item>
          <Form-item prop="wxUserId">
            <c-wx-user-select
              :value="cList.cSearch.where.wxUserId.$eq"
              @change="
                value => {
                  this.cList.cSearch.where.wxUserId.$eq = value;
                }
              "
            >
            </c-wx-user-select>
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
</template>

<script src="./script.js"></script>
