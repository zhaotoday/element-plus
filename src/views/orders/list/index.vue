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
      <el-table-column label="用户头像" width="120">
        <template #default="{ row }">
          <c-list-image
            :src="
              row.user.avatarFileId
                ? $helpers.getFileUrl({ id: row.user.avatarFileId })
                : row.wxAvatarUrl
            "
          />
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template #default="{ row }">
          {{ row.user.name }}
        </template>
      </el-table-column>
      <el-table-column label="收货地址">
        <template #default="{ row: { address } }">
          {{ address.name }} {{ address.phoneNumber }}<br />
          {{ address.location.name + address.room }}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额" width="140" />
      <el-table-column label="性别" width="80">
        <template #default="{ row }">
          {{ $helpers.getItem(enums.Gender, "value", row.gender)["label"] }}
        </template>
      </el-table-column>
    </el-table>
  </c-list>
</template>

<script src="./script.js"></script>
