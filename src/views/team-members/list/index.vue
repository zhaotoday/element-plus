<template>
  <c-list
    :total="list.total"
    :current-page="currentPage"
    @page-change="onPageChange"
  >
    <template #operations>
      <el-button type="primary" @click="reRender">刷新</el-button>
      <el-button type="primary" @click="form.show()">新增</el-button>
    </template>
    <template #filters>
      <el-form
        :ref="cFilters.ref"
        :model="cFilters.model"
        :rules="cFilters.rules"
        inline
      >
        <el-form-item prop="name">
          <el-input
            clearable
            placeholder="请输入姓名"
            v-model.trim="cFilters.model.name.$like"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="list.items" stripe>
      <el-table-column label="头像" width="120">
        <template #default="{ row }">
          <c-list-image
            :src="`${$helpers.getFileUrl({ id: row.avatarFileId })}`"
          />
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="生日" prop="birthday" />
      <el-table-column label="单位" prop="unit" />
      <el-table-column label="学位">
        <template #default="{ row }">
          {{ $helpers.getItem(enums.Degree, "value", row.degree)["label"] }}
        </template>
      </el-table-column>
      <el-table-column label="职位" prop="title" />
      <el-table-column label="排序（从小到大）" width="140">
        <template #default="{ row }">
          <c-order-input :api="teamMembersApi" :row="row" @ok="reRender" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template #default="{ row }">
          <el-button type="" size="small" @click="form.show(row)">
            编辑
          </el-button>
          <el-popconfirm title="确定删除吗？" @confirm="del(row)">
            <template #reference>
              <el-button type="danger" size="small"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </c-list>
  <b-form ref="form" :path="currentPath" @ok="reRender" />
</template>

<script src="./script.js"></script>
