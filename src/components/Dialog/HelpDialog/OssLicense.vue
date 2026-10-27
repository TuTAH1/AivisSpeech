<template>
  <QPage
    ref="scroller"
    class="relative-absolute-wrapper scroller bg-background"
  >
    <div class="q-pa-md markdown markdown-body">
      <QList v-if="detailIndex === undefined">
        <QItem
          v-for="(license, index) in props.licenses"
          :key="index"
          style="border-bottom: 2px solid var(--color-splitter)"
          clickable
          @click="selectLicenseIndex(index)"
        >
          <QItemSection>
            <div>
              <b>{{ license.name }}</b>
              {{ license.version ? " | " + license.version : "" }}
            </div>
          </QItemSection>
        </QItem>
      </QList>
      <div v-else>
        <div class="q-mb-md">
          <QBtn
            outline
            icon="sym_r_keyboard_arrow_left"
            :label="t('helpDialog.back', '戻る')"
            @click="selectLicenseIndex(undefined)"
          />
        </div>
        <h3 style="margin-top: 24px !important">
          {{ licenses[detailIndex].name }}
        </h3>
        <QCard flat bordered class="q-mt-lg">
          <!-- eslint-disable-next-line prettier/prettier -->
          <pre class="markdown markdown-body q-pa-lg" style="margin: 0px; border: 0px">{{ licenses[detailIndex].text }}</pre>
        </QCard>
      </div>
    </div>
  </QPage>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  licenses: Record<string, string>[];
}>();

const { t } = useI18n();

const detailIndex = ref<number | undefined>(undefined);

const scroller = ref<HTMLElement>();

const selectLicenseIndex = (index: number | undefined) => {
  if (scroller.value == undefined)
    throw new Error("scroller.value == undefined");
  scroller.value.scrollTop = 0;
  detailIndex.value = index;
};
</script>

<style scoped lang="scss">
.root {
  .scroller {
    width: 100%;
    overflow: auto;
  }
}
</style>
