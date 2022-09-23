<template>
  <c-list
    :total="list.total"
    :current-page="currentPage"
    @page-change="onPageChange"
  >
    <template #operations>
      <el-button type="primary" @click="reRender">刷新</el-button>
    </template>
    <template #filters>
      <el-form
        :ref="cFilters.ref"
        :model="cFilters.model"
        :rules="cFilters.rules"
        inline
      >
        <el-form-item prop="no">
          <el-input
            clearable
            placeholder="请输入订单号"
            v-model.trim="cFilters.model.no.$like"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="list.items" stripe>
      <el-table-column label="订单号" prop="no" width="160" />
      <el-table-column label="用户" width="120">
        <template #default="{ row }">
          {{ row.user.name || row.user.wxNickName }}
        </template>
      </el-table-column>
      <el-table-column label="收货地址">
        <template #default="{ row: { address } }">
          <template v-if="address.location">
            {{ address.name }} {{ address.phoneNumber }}<br />
            {{ address.location.name + address.room }}
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额" width="80">
        <template #default="{ row }">{{ row.amount }}元</template>
      </el-table-column>
      <el-table-column label="下单时间" width="150">
        <template #default="{ row }">
          {{ $time.getTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="支付时间" width="150">
        <template #default="{ row }">
          {{ row.paidAt ? $time.getTime(row.paidAt) : "" }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          {{
            $helpers.getItem(enums.OrderStatus, "value", row.status)["label"]
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px">
        <template #default="{ row }">
          <el-button size="small" @click="detail.show(row)">
            查看详情
          </el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(row)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </c-list>
  <b-detail ref="detail" />
</template>

<script src="./script.js"></script>
