<template>
  <div>
    <c-list
      :data="list.items"
      :columns="cList.columns"
      :total="list.total"
      :page-current="listPageCurrent"
      :search-where="listSearchWhere"
      @selection-change="handleListSelectionChange"
    >
      <c-list-header>
        <c-list-operations>
          <Button type="primary" @click="showForm">
            新增
          </Button>
          <c-bulk-delete
            :selected-items="listSelectedItems"
            @ok="confirmDelete"
          ></c-bulk-delete>
          <Button v-if="isParent" @click="gotoParent">
            返回上一级
          </Button>
        </c-list-operations>
        <c-list-search>
          <Form inline @submit.native.prevent="search">
            <Form-item prop="name">
              <Input
                class="c-form__input"
                placeholder="请输入名称"
                v-model.trim="cList.cSearch.where.name.$like"
              />
            </Form-item>
            <Form-item>
              <Button type="primary" @click="search">
                查询
              </Button>
            </Form-item>
          </Form>
        </c-list-search>
      </c-list-header>
      <c-list-navigation v-if="levels !== 1">
        <Alert v-if="isParent">
          <b>{{ parentDetail.name }}</b> 的子分类：
        </Alert>
        <Alert v-else> <b>顶级分类</b> 的子分类 </Alert>
      </c-list-navigation>
    </c-list>
    <Modal
      width="496"
      v-model="cForm.modal"
      :title="cForm.id ? '编辑' : '新增'"
      :loading="cForm.loading"
      @on-ok="submit"
    >
      <Form
        class="c-form c-form--modal"
        ref="form"
        :model="cForm.model"
        :rules="cForm.rules"
        :label-width="80"
      >
        <Form-item v-if="levels !== 1" label="父类">
          {{ isParent ? parentDetail.name : "顶级分类" }}
        </Form-item>
        <Form-item label="名称" prop="name">
          <Input
            class="c-form__input"
            v-model.trim="cForm.model.name"
            placeholder="请输入名称"
          />
        </Form-item>
        <Form-item label="图标" prop="iconId">
          <c-uploader
            class="c-form__input"
            :key="`icon-${cForm.id}`"
            :default-file-ids="cForm.model.iconId"
            @change="
              value => {
                handleFormUploaderChange('iconId', value);
              }
            "
          />
        </Form-item>
        <Form-item label="Banner" prop="bannerId">
          <c-uploader
            class="c-form__input"
            :key="`banner-${cForm.id}`"
            :default-file-ids="cForm.model.bannerId"
            @change="
              value => {
                handleFormUploaderChange('bannerId', value);
              }
            "
          />
        </Form-item>
        <Form-item label="描述" prop="description">
          <Input
            class="c-form__input"
            v-model.trim="cForm.model.description"
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
          />
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
</script>
