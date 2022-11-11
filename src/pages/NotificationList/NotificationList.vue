<script lang="ts" setup>
import { BaseSimpleTable } from '@/components/BaseDataTable';
import { DatatableConfig } from '@/types/local';
import { reactive, computed } from 'vue';
import { ApiResponse } from '@/types/api';
import notificationApi from '@apis/notification.api';
import { useI18n } from '@/plugins/vueI18n';
import datetime from '@/utils/datetime';
import BaseDatePicker from '@/components/BaseDatepicker';

// import { PERMISSION_CODE } from '@utils/constants';

const { t } = useI18n();
const configs = computed(
  () =>
    [
      {
        text: 'ID',
        headerClasses: 'custom-header-class',
        align: 'center',
        value: 'notification_id',
        valueClasses: 'custom-class',
      },
      {
        sortable: true,
        text: t('model.notification.title'),
        value: 'title',
      },
      {
        sortable: true,
        text: t('model.notification.message'),
        value: 'message',
      },
      {
        text: t('model.notification.delivery_start_at'),
        value: 'delivery_start_at',
      },
      {
        text: t('model.notification.delivery_end_at'),
        value: 'delivery_end_at',
      },
    ] as Array<DatatableConfig>,
);
const breadcrumbs = [
  {
    text: 'Home',
    route: {
      name: 'home',
    },
  },
  {
    text: 'Notifications',
  },
];
const NotificationPagination = reactive({
  totalPage: 0,
  totalItem: 0,
  data: [] as Array<ApiResponse.Notification>,
});

const searchData = reactive({
  title: '',
  start_time: '',
  end_time: '',
  page: 1,
  pageSize: 20,
  orderKey: '',
  orderBy: '',
});

const currentSearchData = {
  ...searchData,
};

function cloneObjectAttrs(from: Record<string, any>, to: Record<string, any>) {
  Object.keys(from).forEach((key) => {
    to[key] = from[key];
  });
}

async function handleApiSearch() {
  try {
    const response = await notificationApi.list({
      page: currentSearchData.page,
      page_size: currentSearchData.pageSize,
      title: currentSearchData.title,
      start_time: currentSearchData.start_time,
      end_time: currentSearchData.end_time,
      order_by: currentSearchData.orderBy ?? undefined,
      order_key: currentSearchData.orderKey ?? undefined,
    });
    NotificationPagination.data = response.data.data;

    NotificationPagination.totalPage = response.data.total_page;
    NotificationPagination.totalItem = response.data.total;
  } catch (error: any) {
    if (error.response.status == 422) {
      NotificationPagination.data = [];
    }
  }
}

async function onChangePage(page: number) {
  currentSearchData.page = page;
  cloneObjectAttrs(currentSearchData, searchData);
  await handleApiSearch();
}

async function onChangeSortCondition(key: string, type: string) {
  currentSearchData.orderBy = type;
  currentSearchData.orderKey = key;
  currentSearchData.page = 1;
  cloneObjectAttrs(currentSearchData, searchData);
  handleApiSearch();
}

function onSubmitSearchForm() {
  searchData.page = 1;
  cloneObjectAttrs(searchData, currentSearchData);
  handleApiSearch();
}

handleApiSearch();
</script>

<template>
  <MasterLayout :breadcrumbs="breadcrumbs">
    <BaseCard header-class="d-flex justify-content-between mb-4" :title="t('view.notificationList.pageTitle')">
      <template #button-add>
        <BaseButton :is-link="true" size="md" :to="{ name: 'notifications.create' }">{{
          t('common.create')
        }}</BaseButton>
      </template>
      <template #header>
        <BaseForm @submit.prevent="onSubmitSearchForm">
          <BaseFormGroup v-model="searchData.title" :placeholder="t('model.notification.title')" />
          <BaseFormGroup>
            <div class="row">
              <div class="col-md-6">
                <BaseLabel>{{ t('model.notification.delivery_start_at') }}</BaseLabel>
                <BaseDatePicker v-model="searchData.start_time"></BaseDatePicker>
              </div>
              <div class="col-md-6">
                <BaseLabel>{{ t('model.notification.delivery_end_at') }}</BaseLabel>
                <BaseDatePicker v-model="searchData.end_time"></BaseDatePicker>
              </div>
            </div>
          </BaseFormGroup>
          <div class="d-flex">
            <BaseButton class="" size="md">{{ t('common.search') }}</BaseButton>
          </div>
        </BaseForm>
      </template>

      <BaseSimpleTable
        :configs="configs"
        :items="NotificationPagination.data"
        :page="searchData.page"
        :page-size="searchData.pageSize"
        :total-item="NotificationPagination.totalItem"
        :total-page="NotificationPagination.totalPage"
        @on-change-page="onChangePage"
        @on-change-sort-key="onChangeSortCondition"
      >
        <template #item-delivery_start_at="{ item }">
          <span>{{ datetime.date(item.delivery_start_at) }}</span>
        </template>
        <template #item-delivery_end_at="{ item }">
          <span>{{ datetime.date(item.delivery_end_at) }}</span>
        </template>
        <template #item-title="{ item }">
          <RouterLink
            class="link-primary"
            :exact="true"
            :to="{
              name: 'notifications.detail',
              params: { id: item.notification_id },
            }"
            >{{ item.title }}</RouterLink
          >
        </template>
      </BaseSimpleTable>
    </BaseCard>
  </MasterLayout>
</template>

<style lang="scss" src="./NotificationList.scss" scoped />
