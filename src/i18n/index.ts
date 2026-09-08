import { createI18n } from "vue-i18n";
import jaJP from "./locales/ja-JP.json";
import enUS from "./locales/en-US.json";
import ruRU from "./locales/ru-RU.json";
import {
  getUiLocaleOption,
  getSystemLanguage,
  resolveUiLocale,
  type UiLocale,
  type UiLocalePreference,
} from "./uiLocale";

export const i18n = createI18n({
  legacy: false,
  locale: resolveUiLocale("system"),
  fallbackLocale: "ja-JP",
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    "ja-JP": jaJP,
    "en-US": enUS,
    "ru-RU": ruRU,
  },
});

/**
 * 設定値に従って vue-i18n の locale を更新する。
 *
 * @param preference 保存済みの UI 言語設定
 * @param systemLanguage OS の言語タグ
 * @returns 実際に適用した UI 言語
 */
export function applyUiLocalePreference(
  preference: UiLocalePreference,
  systemLanguage: string = getSystemLanguage(),
): UiLocale {
  const locale = resolveUiLocale(preference, systemLanguage);
  i18n.global.locale.value = locale;
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
    const preferredFontFamily = getUiLocaleOption(locale).preferredFontFamily;
    if (preferredFontFamily) {
      document.documentElement.style.setProperty(
        "--ui-locale-font-family",
        preferredFontFamily,
      );
    } else {
      document.documentElement.style.removeProperty("--ui-locale-font-family");
    }
  }
  return locale;
}

export {
  UI_LOCALES,
  UI_LOCALE_OPTIONS,
  UI_LOCALE_PREFERENCES,
  detectUiLocaleFromSystem,
  getUiLocaleOption,
  getSystemLanguage,
  resolveUiLocale,
} from "./uiLocale";
export type { UiLocale, UiLocaleOption, UiLocalePreference } from "./uiLocale";
