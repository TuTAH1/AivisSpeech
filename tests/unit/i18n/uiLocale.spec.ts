import { describe, expect, test } from "vitest";
import { detectUiLocaleFromSystem, resolveUiLocale } from "@/i18n/uiLocale";

describe("detectUiLocaleFromSystem", () => {
  test("ru で始まる言語タグは ru-RU にする", () => {
    expect(detectUiLocaleFromSystem("ru")).toBe("ru-RU");
    expect(detectUiLocaleFromSystem("ru-RU")).toBe("ru-RU");
    expect(detectUiLocaleFromSystem("ru-KZ")).toBe("ru-RU");
    expect(detectUiLocaleFromSystem("ru_UA")).toBe("ru-RU");
  });

  test("ja で始まる言語タグは ja-JP にする", () => {
    expect(detectUiLocaleFromSystem("ja")).toBe("ja-JP");
    expect(detectUiLocaleFromSystem("ja-JP")).toBe("ja-JP");
  });

  test("それ以外の言語タグは en-US にする", () => {
    expect(detectUiLocaleFromSystem("en")).toBe("en-US");
    expect(detectUiLocaleFromSystem("en-GB")).toBe("en-US");
    expect(detectUiLocaleFromSystem("de-DE")).toBe("en-US");
    expect(detectUiLocaleFromSystem("zh-CN")).toBe("en-US");
  });
});

describe("resolveUiLocale", () => {
  test("system のときは OS 言語から推定する", () => {
    expect(resolveUiLocale("system", "ru-RU")).toBe("ru-RU");
    expect(resolveUiLocale("system", "ja")).toBe("ja-JP");
    expect(resolveUiLocale("system", "fr-FR")).toBe("en-US");
  });

  test("明示的な設定は OS 言語より優先する", () => {
    expect(resolveUiLocale("en-US", "ru-RU")).toBe("en-US");
    expect(resolveUiLocale("ja-JP", "en-US")).toBe("ja-JP");
    expect(resolveUiLocale("ru-RU", "ja-JP")).toBe("ru-RU");
  });
});
