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
        <el-form-item prop="status">
          <c-enum-select
            clearable
            placeholder="请选择平台"
            :items="enums.AppPlatform"
            v-model:value="cFilters.model.platform"
          />
        </el-form-item>
        <el-form-item prop="status">
          <c-enum-select
            clearable
            placeholder="请选择状态"
            :items="enums.PublishStatus"
            v-model:value="cFilters.model.status"
          />
        </el-form-item>
        <el-form-item prop="versionName">
          <el-input
            clearable
            placeholder="请输入版本名称"
            v-model.trim="cFilters.model.versionName.$like"
          />
        </el-form-item>
        <el-form-item prop="versionCode">
          <el-input
            clearable
            placeholder="请输入版本号"
            v-model.trim="cFilters.model.versionCode.$like"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table :data="list.items" stripe>
      <el-table-column label="平台" width="100">
        <template #default="{ row }">
          {{
            $helpers.getItem(enums.AppPlatform, "value", row.platform)["label"]
          }}
        </template>
      </el-table-column>
      <el-table-column label="包类型" width="100">
        <template #default="{ row }">
          {{
            $helpers.getItem(enums.AppPackageType, "value", row.packageType)[
              "label"
            ]
          }}
        </template>
      </el-table-column>
      <el-table-column prop="versionName" label="版本名称" width="100" />
      <el-table-column prop="versionCode" label="版本号" width="100" />
      <el-table-column prop="log" label="更新日志" />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          {{
            $helpers.getItem(enums.PublishStatus, "value", row.status)["label"]
          }}
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
  <b-form ref="form" @ok="reRender" />
</template>

<script src="./script.js"></script>
