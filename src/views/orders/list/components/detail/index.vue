<template>
  <el-dialog title="订单详情" v-model="cDialog.visible" width="550px">
    <ul class="b-detail c-scrollbar">
      <li>
        <label>订单号</label>
        {{ detail.no }}
      </li>
      <li>
        <label>用户</label>
        {{ detail.user.name || detail.user.wxNickName }}
      </li>
      <li>
        <label>下单时间</label>
        {{ $time.getTime(detail.createdAt) }}
      </li>
      <li>
        <label>支付时间</label>
        {{ detail.paidAt ? $time.getTime(detail.paidAt) : "" }}
      </li>
      <li v-if="detail.address.location">
        <label>收货地址</label>
        {{ detail.address.name }} {{ detail.address.phoneNumber }}<br />
        {{ detail.address.location.name + detail.address.room }}
      </li>
      <li>
        <label>金额</label>
        {{ detail.amount }}元
      </li>
      <li>
        <label>状态</label>
        {{
          $helpers.getItem(enums.OrderStatus, "value", detail.status)["label"]
        }}
      </li>
      <li>
        <label>购物清单</label>
        <el-table :data="detail.products" size="small" border>
          <el-table-column label="商品名称">
            <template #default="{ row }">
              {{ row.name }}
            </template>
          </el-table-column>
          <el-table-column label="价格" width="60">
            <template #default="{ row }">${{ row.price }} </template>
          </el-table-column>
          <el-table-column label="数量" width="60">
            <template #default="{ row }">x{{ row.number }} </template>
          </el-table-column>
        </el-table>
      </li>
    </ul>
    <template #footer>
      <el-button @click="cDialog.visible = false">取消</el-button>
      <el-button type="primary" @click="cDialog.visible = false">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
