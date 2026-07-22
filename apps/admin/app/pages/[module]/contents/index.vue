<script lang="ts" setup>
import { List, ListImage, TypedTableColumn } from '@vuejs-repo/element-plus'
import type * as Api from '~/types/api'
import { renderOverlay } from '@overlastic/vue'
import FormDialog from './components/FormDialog.vue'
import { adminRequest } from '~/utils/request'
import CategorySelect from '~/components/CategorySelect.vue'

const route = useRoute()

const initialState: Api.List<Api.Content> = {
  total: 0,
  items: [],
}

const filterState = reactive({
  ref: undefined,
  model: {
    categoryId: {
      $eq: '',
    },
    title: {
      $like: '',
    },
  },
  rules: {},
})

const {
  isLoading,
  state,
  pagination,
  remove,
  search,
  changePage,
  reload,
} = useList<Api.Content>({
  request: adminRequest,
  url: '/contents',
  initialState,
  filterState,
  query() {
    return {
      include: [{ model: 'Category', as: 'category' }],
      where: {
        module: {
          $eq: route.params.module,
        },
      },
    }
  },
})

async function showForm(data: Partial<Api.Content> = {}) {
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
        <el-form-item prop="categoryId">
          <CategorySelect
            v-model="filterState.model.categoryId.$eq"
            :module="route.params.module as string"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item prop="name">
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
      <TypedTableColumn :rows="state.items" label="封面" width="105">
        <template #default="{ row }">
          <ListImage
            width="80px"
            height="80px"
            :src="row.coverFile ? getFileUrl(row.coverFile) : ''"
            placeholder="暂无封面"
          />
        </template>
      </TypedTableColumn>
      <TypedTableColumn :rows="state.items" label="分类" width="260">
        <template #default="{ row }">
          {{ row.category?.name || '--' }}
        </template>
      </TypedTableColumn>
      <el-table-column label="标题" prop="title" />
      <TypedTableColumn :rows="state.items" label="发布时间" width="180">
        <template #default="{ row }">
          {{ formatTime(row.createdAt!) }}
        </template>
      </TypedTableColumn>
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
