<script lang="ts" setup>
import {
  List,
  ListImage,
  OrderInput,
  TypedTableColumn,
} from '@vuejs-repo/element-plus'
import type * as Api from '~/types/api'
import { renderOverlay } from '@overlastic/vue'
import FormDialog from './components/FormDialog.vue'
import { adminRequest } from '~/utils/request'

const route = useRoute()

const initialState: Api.List<Api.Ad> = {
  total: 0,
  items: [],
}

const filterState = reactive({
  ref: undefined,
  model: {
    title: {
      $like: '',
    },
  },
  rules: {},
})

const updateOrderWhere = computed(() => ({
  module: {
    $eq: route.params.module,
  },
}))

const {
  isLoading,
  state,
  pagination,
  remove,
  search,
  changePage,
  reload,
} = useList<Api.Ad>({
  request: adminRequest,
  url: '/ads',
  initialState,
  filterState,
  query() {
    return {
      order: [['order', 'ASC']],
      where: {
        module: {
          $eq: route.params.module,
        },
      },
    }
  },
})

async function showForm(data: Partial<Api.Ad> = {}) {
  await renderOverlay(FormDialog, { data })
  await search()
}
</script>

<template>
  <List>
    <template #actions>
      <el-button type="primary" @click="reload()">刷新</el-button>
      <el-button type="primary" @click="showForm()">新增</el-button>
    </template>
    <template #filter>
      <el-form
        :ref="filterState.ref"
        :model="filterState.model"
        :rules="filterState.rules"
        inline
        @submit.prevent
      >
        <el-form-item prop="title">
          <el-input
            v-model.trim="filterState.model.title.$like"
            clearable
            placeholder="请输入标题"
            style="width: 240px"
            @keyup.enter="search"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-table v-loading="isLoading" border :data="state.items">
      <TypedTableColumn :rows="state.items" label="图片" width="105">
        <template #default="{ row }">
          <ListImage
            width="80px"
            height="80px"
            :src="row.imageFile ? getFileUrl(row.imageFile) : undefined"
            placeholder="暂无图片"
          />
        </template>
      </TypedTableColumn>
      <el-table-column label="标题" prop="title" />
      <el-table-column label="描述" prop="description" show-overflow-tooltip />
      <TypedTableColumn :rows="state.items" label="创建时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.createdAt!) }}
        </template>
      </TypedTableColumn>
      <el-table-column label="排序（升序）" width="120">
        <template #default="{ row }">
          <OrderInput
            :request="adminRequest"
            url="/ads"
            :query="{ where: updateOrderWhere }"
            :item="row"
            @success="search"
          />
        </template>
      </el-table-column>
      <TypedTableColumn :rows="state.items" label="操作" width="145">
        <template #default="{ row }">
          <el-button size="small" @click="showForm(row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            cancel-button-text="取消"
            confirm-button-text="确定"
            @confirm="remove(row)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </TypedTableColumn>
      <template #empty>
        <el-empty
          v-if="!isLoading && !state.items.length"
          description="暂无数据"
          :image-size="70"
        />
      </template>
    </el-table>
    <template #pagination>
      <el-pagination
        v-model:current-page="pagination.currentPage"
        background
        layout="total, prev, pager, next"
        :total="state.total"
        :page-size="pagination.pageSize"
        @change="changePage"
      />
    </template>
  </List>
</template>
