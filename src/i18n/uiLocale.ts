/** 実際に適用する UI 言語 */
export const UI_LOCALES = ["ja-JP", "en-US", "ru-RU"] as const;
export type UiLocale = (typeof UI_LOCALES)[number];

/** 設定として保存する UI 言語。system は OS 言語から推定する */
export const UI_LOCALE_PREFERENCES = [
  "system",
  "ja-JP",
  "en-US",
  "ru-RU",
] as const;
export type UiLocalePreference = (typeof UI_LOCALE_PREFERENCES)[number];

export type UiLocaleOption = {
  id: UiLocale;
  nativeName: string;
  /** UI の基本フォントを上書きするフォントファミリー。空文字列なら上書きしない。 */
  preferredFontFamily: string;
};

export const UI_LOCALE_OPTIONS: ReadonlyArray<UiLocaleOption> = [
  { id: "ja-JP", nativeName: "日本語", preferredFontFamily: "" },
  { id: "en-US", nativeName: "English", preferredFontFamily: "" },
  { id: "ru-RU", nativeName: "Русский", preferredFontFamily: "Tahoma" },
];

/** 指定された UI 言語の表示・フォント設定を返す。 */
export function getUiLocaleOption(locale: UiLocale): UiLocaleOption {
  const option = UI_LOCALE_OPTIONS.find((option) => option.id === locale);
  if (option == undefined) {
    throw new Error(`UI locale option not found: ${locale}`);
  }
  return option;
}

/**
 * 実行環境の言語タグを返す。
 * renderer / ブラウザでは `navigator.language`、それ以外は英語相当として扱う。
 *
 * @returns BCP 47 言語タグ
 */
export function getSystemLanguage(): string {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
}

/**
 * OS の言語タグから、アプリが扱う UI 言語へ正規化する。
 * ru:* は ru-RU、ja:* は ja-JP、それ以外は en-US。
 *
 * @param language BCP 47 言語タグ (例: ru-KZ, ja, en-GB)
 */
export function detectUiLocaleFromSystem(language: string): UiLocale {
  const primary = language.replaceAll("_", "-").split("-")[0]?.toLowerCase();
  if (primary === "ja") {
    return "ja-JP";
  }
  if (primary === "ru") {
    return "ru-RU";
  }
  return "en-US";
}

/**
 * 保存済み設定と OS 言語から、実際に適用する UI 言語を決める。
 *
 * @param preference 設定値
 * @param systemLanguage OS の言語タグ
 */
export function resolveUiLocale(
  preference: UiLocalePreference,
  systemLanguage: string = getSystemLanguage(),
): UiLocale {
  if (preference === "system") {
    return detectUiLocaleFromSystem(systemLanguage);
  }
  return preference;
}
