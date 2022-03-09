<template>
  <el-dialog title="订单详情" v-model="cDialog.visible" width="550px">
    <ul class="vc-detail">
      <li>
        <label>订单号</label>
        {{ detail.no }}
      </li>
      <li>
        <label>用户</label>
        {{ detail.user.name }}
      </li>
      <li>
        <label>下单时间</label>
        {{ $time.getTime(detail.createdAt) }}
      </li>
      <li>
        <label>送达时间</label>
        {{ detail.finishedAt ? $time.getTime(detail.finishedAt) : "-" }}
      </li>
      <li>
        <label>金额</label>
        ${{ detail.amount }}
      </li>
      <li>
        <label>状态</label>
        {{
          $helpers.getItem(enums.OrderStatus, "value", detail.status)["label"]
        }}
      </li>
      <li>
        <label>购物清单</label>
        abc
      </li>
    </ul>
  </el-dialog>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
