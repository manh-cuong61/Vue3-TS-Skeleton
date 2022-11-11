<script setup lang="ts">
import { reactive } from 'vue';
import BaseDatePicker from '@/components/BaseDatepicker';
import notificationApi from '@apis/notification.api';
import { useToast } from 'vue-toastification';
import { useI18n } from '@/plugins/vueI18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const toast = useToast();
const $router = useRouter();

const breadcrumbs = [
  {
    text: 'Home',
    route: {
      name: 'home',
    },
  },
  {
    text: 'Notifications',
    route: {
      name: 'notifications.list',
    },
  },
  {
    text: 'create',
  },
];
const notification = reactive({
  title: '',
  message: '',
  is_disabled: false,
  delivery_start_at: '',
  delivery_end_at: '',
});
const errors = reactive({
  title: '',
  message: '',
  delivery_start_at: '',
  delivery_end_at: '',
});
async function createNotification() {
  try {
    Object.assign(errors, {
      title: '',
      message: '',
      is_disabled: false,
      delivery_start_at: '',
      delivery_end_at: '',
    });
    await notificationApi.store(notification);
    toast.success('create notification success');
    $router.push({ name: 'notifications.list' });
  } catch (err: any) {
    Object.assign(errors, err.response.data.errors);
  }
}
</script>

<template>
  <MasterLayout :breadcrumbs="breadcrumbs">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-9 col-12 mx-auto">
          <BaseCard label="Card title">
            <template #header>
              <div class="d-flex align-items-center">
                <h5 class="card__title">{{ t('view.notificationCreate.pageTitle') }}</h5>
              </div>
            </template>
            <BaseForm @submit.prevent="createNotification">
              <BaseFormGroup
                v-model="notification.title"
                :error="errors.title"
                :label="t('model.notification.title')"
              />

              <BaseFormGroup :error="errors.delivery_start_at ?? errors.delivery_end_at">
                <div class="row">
                  <div class="col-md-6">
                    <BaseLabel>{{ t('model.notification.delivery_start_at') }}</BaseLabel>
                    <BaseDatePicker
                      v-model="notification.delivery_start_at"
                      :class="{ 'box-validated': errors.delivery_start_at }"
                    ></BaseDatePicker>
                  </div>
                  <div class="col-md-6">
                    <BaseLabel>{{ t('model.notification.delivery_end_at') }}</BaseLabel>
                    <BaseDatePicker
                      v-model="notification.delivery_end_at"
                      :class="{ 'box-validated': errors.delivery_end_at }"
                    ></BaseDatePicker>
                  </div>
                </div>
              </BaseFormGroup>
              <BaseFormGroup :label="t('model.notification.is_disabled')">
                <div>
                  <BaseCheckBox id="switch" v-model="notification.is_disabled" :is-switch="true"></BaseCheckBox>
                </div>
              </BaseFormGroup>

              <BaseFormGroup :error="errors.message" :label="t('model.notification.message')">
                <BaseTextarea v-model="notification.message" :class="{ 'box-validated': errors.message }" rows="5" />
              </BaseFormGroup>
              <BaseButton class="mt-5 mb-3" :full-width="true">{{ t('common.submit') }}</BaseButton>
            </BaseForm>
          </BaseCard>
        </div>
      </div>
    </div>
  </MasterLayout>
</template>
