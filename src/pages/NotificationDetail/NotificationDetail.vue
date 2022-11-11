<script setup lang="ts">
import { useI18n } from '@/plugins/vueI18n';
import notificationApi from '@apis/notification.api';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BaseDatePicker from '@/components/BaseDatepicker';
import BaseModal from '@/components/BaseModal';

const { t } = useI18n();
const $route = useRoute();
const $router = useRouter();
const toast = useToast();

const breadcrumbs = computed(() => [
  {
    text: 'Notifications',
    route: {
      name: 'notifications.list',
    },
  },
  {
    text: 'Notification Detail',
  },
]);

// notification logic
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
const dialog = ref(false);
const disabled = ref(true);
async function getUserDetail() {
  try {
    Object.assign(errors, {
      title: '',
      message: '',
      is_disabled: false,
      delivery_start_at: '',
      delivery_end_at: '',
    });
    const response = await notificationApi.show($route.params.id as string);

    Object.assign(notification, response.data);
  } catch (error) {
    console.log(error);
  }
}

async function updateNotification() {
  try {
    Object.assign(errors, {
      title: '',
      message: '',
      is_disabled: false,
      delivery_start_at: '',
      delivery_end_at: '',
    });
    await notificationApi.update($route.params.id as string, notification);
    toast.success('update notification success');
    $router.push({ name: 'notifications.list' });
  } catch (err: any) {
    Object.assign(errors, err.response.data.errors);
  }
}

async function deleteNotification() {
  try {
    await notificationApi.destroy($route.params.id as string);
    toast.success(t('Delete success'));
    $router.push({
      name: 'notifications.list',
    });
  } catch (error: any) {
    console.error(error);
  }
}

getUserDetail();
</script>

<template>
  <MasterLayout :breadcrumbs="breadcrumbs">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-9 col-12 mx-auto">
          <BaseCard label="Card title">
            <template #header>
              <div class="d-flex align-items-center">
                <h5 class="card__title">{{ t('view.notificationUpdate.pageTitle') }}</h5>
                <BaseButton class="my-0 ms-auto" color="warning" @click="dialog = !dialog"
                  ><i class="fa fa-times"></i>{{ t('common.delete') }}</BaseButton
                >
              </div>
            </template>
            <BaseForm @submit.prevent="updateNotification">
              <BaseFormGroup
                v-model="notification.title"
                :disabled="disabled"
                :error="errors.title"
                :label="t('model.notification.title')"
              />

              <BaseFormGroup :error="errors.delivery_start_at || errors.delivery_end_at">
                <div class="row">
                  <div class="col-md-6">
                    <BaseLabel>{{ t('model.notification.delivery_start_at') }}</BaseLabel>
                    <BaseDatePicker
                      v-model="notification.delivery_start_at"
                      :class="{ 'box-validated': errors.delivery_start_at }"
                      :disabled="disabled"
                    ></BaseDatePicker>
                  </div>
                  <div class="col-md-6">
                    <BaseLabel>{{ t('model.notification.delivery_end_at') }}</BaseLabel>
                    <BaseDatePicker
                      v-model="notification.delivery_end_at"
                      :class="{ 'box-validated': errors.delivery_end_at }"
                      :disabled="disabled"
                    ></BaseDatePicker>
                  </div>
                </div>
              </BaseFormGroup>

              <BaseFormGroup :label="t('model.notification.is_disabled')">
                <div>
                  <BaseCheckBox
                    id="switch"
                    v-model="notification.is_disabled"
                    :disabled="disabled"
                    :is-switch="true"
                  ></BaseCheckBox>
                </div>
              </BaseFormGroup>
              <BaseFormGroup :error="errors.message" :label="t('model.notification.message')">
                <BaseTextarea
                  v-model="notification.message"
                  :class="{ 'box-validated': errors.message }"
                  :disabled="disabled"
                  rows="5"
                />
              </BaseFormGroup>
              <BaseButton v-if="disabled" class="mt-5" :full-width="true" type="button" @click="disabled = false">{{
                t('common.edit')
              }}</BaseButton>
              <template v-else>
                <BaseButton class="mt-5" :full-width="true">{{ t('common.submit') }}</BaseButton>
                <BaseButton class="mt-3" :full-width="true" type="button" @click="(disabled = true), getUserDetail()">{{
                  t('common.close')
                }}</BaseButton>
              </template>
            </BaseForm>
          </BaseCard>
        </div>
      </div>
    </div>
    <BaseModal v-model="dialog" :title="t('view.notificationUpdate.titleConfirmDelete')">
      <template #body>
        <p>{{ t('view.notificationUpdate.descConfirmDelete') }}</p>
      </template>
      <template #footer>
        <BaseButton color="light" variant="plain-text" @click="dialog = false">{{ t('common.no') }}</BaseButton>
        <BaseButton class="ms-3" color="danger" @click="deleteNotification">{{ t('common.yes') }}</BaseButton>
      </template>
    </BaseModal>
  </MasterLayout>
</template>
