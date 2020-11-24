<template>
  <div>
    <c-list
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :page-current="listPageCurrent"
      :search-where="listSearchWhere"
      :statistic="`总积分：${cList.total}`"
      @selection-change="handleListSelectionChange"
    >
      <c-list-header>
        <c-list-operations>
          <c-bulk-delete
            :selected-items="listSelectedItems"
            @ok="confirmDelete"
          >
          </c-bulk-delete>
          <Button type="primary" @click="$refs.form.show()">
            积分增减
          </Button>
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
              <c-school-wx-user-select
                :school-id="getSchoolId()"
                :value="cList.cSearch.where.wxUserId.$eq"
                @change="
                  value => {
                    this.cList.cSearch.where.wxUserId.$eq = value;
                  }
                "
              >
              </c-school-wx-user-select>
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
    <c-list-form ref="form" @get-list="getListAndTotal"></c-list-form>
  </div>
</template>

<script src="./script.js"></script>
