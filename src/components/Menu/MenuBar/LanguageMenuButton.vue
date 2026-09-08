<template>
  <QBtn
    dense
    flat
    round
    icon="sym_r_language"
    class="title-bar-buttons language-menu-button"
    :aria-label="t('menu.language', '言語')"
  >
    <QTooltip :delay="150" :offset="[0, 8]">
      {{ t("menu.language", "言語") }}
    </QTooltip>
    <QMenu>
      <QList dense class="bg-background">
        <QItem
          v-for="option in UI_LOCALE_OPTIONS"
          :key="option.id"
          v-close-popup
          clickable
          @click="selectLocale(option.id)"
        >
          <QItemSection>{{ option.nativeName }}</QItemSection>
          <QItemSection v-if="activeLocale === option.id" side>
            <QIcon name="sym_r_check" />
          </QItemSection>
        </QItem>
      </QList>
    </QMenu>
  </QBtn>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { UI_LOCALE_OPTIONS, resolveUiLocale, type UiLocale } from "@/i18n";

const { t } = useI18n();
const store = useStore();

const activeLocale = computed(() => resolveUiLocale(store.state.uiLocale));

const selectLocale = (locale: UiLocale) => {
  void store.actions.SET_ROOT_MISC_SETTING({
    key: "uiLocale",
    value: locale,
  });
};
</script>

<style scoped lang="scss">
.language-menu-button {
  overflow: visible;
}
</style>
