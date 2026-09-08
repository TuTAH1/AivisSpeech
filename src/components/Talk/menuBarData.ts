import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Store } from "@/store";
import { useRootMiscSetting } from "@/composables/useRootMiscSetting";
import {
  MaybeComputedMenuBarContent,
  MenuBarContent,
} from "@/components/Menu/MenuBar/menuBarData";

export const useMenuBarData = (store: Store): MaybeComputedMenuBarContent => {
  const { t } = useI18n();
  // 「ファイル」メニュー
  const fileSubMenuData = computed<MenuBarContent["file"]>(() => ({
    audioExport: [
      {
        type: "button",
        label: t("menu.fileItems.exportSelectedAudio", "選択音声を書き出し"),
        hotkeyAction: "選択音声を書き出し",
        onClick: () => {
          void store.actions.SHOW_GENERATE_AND_SAVE_SELECTED_AUDIO_DIALOG();
        },
        disableWhenUiLocked: true,
      },
      {
        type: "button",
        label: t("menu.fileItems.exportAudio", "音声書き出し"),
        hotkeyAction: "音声書き出し",
        onClick: () => {
          void store.actions.SHOW_GENERATE_AND_SAVE_ALL_AUDIO_DIALOG();
        },
        disableWhenUiLocked: true,
      },
      {
        type: "button",
        label: t("menu.fileItems.exportConnectedAudio", "音声をつなげて書き出し"),
        hotkeyAction: "音声をつなげて書き出し",
        onClick: () => {
          void store.actions.SHOW_GENERATE_AND_CONNECT_ALL_AUDIO_DIALOG();
        },
        disableWhenUiLocked: true,
      },
    ],
    externalProject: [
      {
        type: "button",
        label: t("menu.fileItems.exportConnectedText", "テキストをつなげて書き出し"),
        hotkeyAction: "テキストをつなげて書き出し",
        onClick: () => {
          void store.actions.SHOW_CONNECT_AND_EXPORT_TEXT_DIALOG();
        },
        disableWhenUiLocked: true,
      },
      {
        type: "button",
        label: t("menu.fileItems.importText", "テキストを読み込む"),
        hotkeyAction: "テキストを読み込む",
        onClick: () => {
          void store.actions.COMMAND_IMPORT_FROM_FILE({ type: "dialog" });
        },
        disableWhenUiLocked: true,
      },
    ],
  }));

  // 「表示」メニュー
  const [showTextLineNumber, changeShowTextLineNumber] = useRootMiscSetting(
    store,
    "showTextLineNumber",
  );
  const viewSubMenuData = computed<MenuBarContent["view"]>(() => ({
    guide: [
      {
        type: "button",
        label: showTextLineNumber.value
          ? t("menu.viewItems.hideLineNumber", "行番号を隠す")
          : t("menu.viewItems.showLineNumber", "行番号を表示"),
        onClick: () => {
          changeShowTextLineNumber(!showTextLineNumber.value);
        },
        disableWhenUiLocked: false,
      },
    ],
  }));

  return {
    file: fileSubMenuData,
    view: viewSubMenuData,
  };
};
