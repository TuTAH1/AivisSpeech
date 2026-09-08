import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { MenuItemData } from "../type";
import { MaybeComputedMenuBarContent } from "./menuBarData";
import { ensureNotNullish } from "@/helpers/errorHelper";
import { useHotkeyManager, HotkeyAction } from "@/plugins/hotkeyPlugin";
import { Store } from "@/store";

export const useCommonMenuBarData = (store: Store) => {
  const { t } = useI18n();
  const uiLocked = computed(() => store.getters.UI_LOCKED);

  const editor = computed(() => store.state.openedEditor);
  const canUndo = computed(
    () => editor.value && store.getters.CAN_UNDO(editor.value),
  );
  const canRedo = computed(
    () => editor.value && store.getters.CAN_REDO(editor.value),
  );

  const isMultiSelectEnabled = computed(
    () => store.state.experimentalSetting.enableMultiSelect,
  );

  const audioKeys = computed(() => store.state.audioKeys);

  const createNewProject = async () => {
    if (!uiLocked.value) {
      await store.actions.CREATE_NEW_PROJECT({});
    }
  };

  const saveProject = async () => {
    if (!uiLocked.value) {
      await store.actions.SAVE_PROJECT_FILE_OVERWRITE();
    }
  };

  const saveProjectAs = async () => {
    if (!uiLocked.value) {
      await store.actions.SAVE_PROJECT_FILE_AS();
    }
  };

  const saveProjectCopy = async () => {
    if (!uiLocked.value) {
      await store.actions.SAVE_PROJECT_FILE_AS_COPY();
    }
  };

  const importProject = () => {
    if (!uiLocked.value) {
      void store.actions.LOAD_PROJECT_FILE({ type: "dialog" });
    }
  };

  /** UIの拡大 */
  const zoomIn = async () => {
    await store.actions.ZOOM_IN();
  };

  /** UIの縮小 */
  const zoomOut = async () => {
    await store.actions.ZOOM_OUT();
  };

  /** UIの拡大率リセット */
  const zoomReset = async () => {
    await store.actions.ZOOM_RESET();
  };

  const toggleFullScreen = async () => {
    window.backend.toggleFullScreen();
  };

  // 「最近使ったプロジェクト」のメニュー
  const recentProjectsSubMenuData = ref<MenuItemData[]>([]);
  const updateRecentProjects = async () => {
    const recentlyUsedProjects =
      await store.actions.GET_RECENTLY_USED_PROJECTS();
    recentProjectsSubMenuData.value =
      recentlyUsedProjects.length === 0
        ? [
          {
            type: "button",
            label: t("menu.fileItems.recentProjectsEmpty", "最近使ったプロジェクトはありません"),
            onClick: () => {
              // 何もしない
            },
            disabled: true,
            disableWhenUiLocked: false,
          },
        ]
        : recentlyUsedProjects.map((projectFilePath) => ({
          type: "button",
          label: projectFilePath,
          onClick: () => {
            void store.actions.LOAD_PROJECT_FILE({
              type: "path",
              filePath: projectFilePath,
            });
          },
          disableWhenUiLocked: false,
        }));
  };
  const projectFilePath = computed(() => store.state.projectFilePath);
  watch(projectFilePath, updateRecentProjects, {
    immediate: true,
  });

  // TODO: 本来はこのファイルにホットキーの登録を書くべきではないので、どこかに移す。
  const { registerHotkeyWithCleanup } = useHotkeyManager();
  /**
   * 全エディタに対してホットキーを登録する
   * FIXME: hotkeyPlugin側で全エディタに対して登録できるようにする
   */
  function registerHotkeyForAllEditors(action: Omit<HotkeyAction, "editor">) {
    registerHotkeyWithCleanup({
      editor: "talk",
      ...action,
    });
    registerHotkeyWithCleanup({
      editor: "song",
      ...action,
    });
  }

  registerHotkeyForAllEditors({
    callback: createNewProject,
    name: "新規プロジェクト",
  });
  registerHotkeyForAllEditors({
    callback: saveProject,
    name: "プロジェクトを上書き保存",
  });
  registerHotkeyForAllEditors({
    callback: saveProjectAs,
    name: "プロジェクトを名前を付けて保存",
  });
  registerHotkeyForAllEditors({
    callback: saveProjectCopy,
    name: "プロジェクトの複製を保存",
  });
  registerHotkeyForAllEditors({
    callback: importProject,
    name: "プロジェクトを読み込む",
  });
  registerHotkeyForAllEditors({
    callback: toggleFullScreen,
    name: "全画面表示を切り替え",
  });
  registerHotkeyForAllEditors({
    callback: zoomIn,
    name: "拡大",
  });
  registerHotkeyForAllEditors({
    callback: zoomOut,
    name: "縮小",
  });
  registerHotkeyForAllEditors({
    callback: zoomReset,
    name: "拡大率のリセット",
  });

  return computed<MaybeComputedMenuBarContent>(() => ({
    file: {
      project: [
        {
          type: "button",
          label: t("menu.fileItems.newProject", "新規プロジェクト"),
          hotkeyAction: "新規プロジェクト",
          onClick: createNewProject,
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.fileItems.saveOverwrite", "プロジェクトを上書き保存"),
          hotkeyAction: "プロジェクトを上書き保存",
          onClick: async () => {
            await saveProject();
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.fileItems.saveAs", "プロジェクトを名前を付けて保存"),
          hotkeyAction: "プロジェクトを名前を付けて保存",
          onClick: async () => {
            await saveProjectAs();
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.fileItems.saveCopy", "プロジェクトの複製を保存"),
          hotkeyAction: "プロジェクトの複製を保存",
          onClick: async () => {
            await saveProjectCopy();
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.fileItems.loadProject", "プロジェクトを読み込む"),
          hotkeyAction: "プロジェクトを読み込む",
          onClick: () => {
            importProject();
          },
          disableWhenUiLocked: true,
        },
        {
          type: "root",
          label: t("menu.fileItems.recentProjects", "最近使ったプロジェクト"),
          disableWhenUiLocked: true,
          subMenu: recentProjectsSubMenuData.value,
        },
      ],
    },

    edit: {
      undoRedo: [
        {
          type: "button",
          label: t("menu.editItems.undo", "元に戻す"),
          hotkeyAction: "元に戻す",
          onClick: async () => {
            if (!uiLocked.value) {
              await store.actions.UNDO({
                editor: ensureNotNullish(editor.value),
              });
            }
          },
          disabled: !canUndo.value,
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.editItems.redo", "やり直す"),
          hotkeyAction: "やり直す",
          onClick: async () => {
            if (!uiLocked.value) {
              await store.actions.REDO({
                editor: ensureNotNullish(editor.value),
              });
            }
          },
          disabled: !canRedo.value,
          disableWhenUiLocked: true,
        },
        ...(isMultiSelectEnabled.value
          ? [
            {
              type: "button",
              label: t("menu.editItems.selectAll", "すべて選択"),
              hotkeyAction: "すべて選択",
              onClick: async () => {
                if (!uiLocked.value && isMultiSelectEnabled.value) {
                  await store.actions.SET_SELECTED_AUDIO_KEYS({
                    audioKeys: audioKeys.value,
                  });
                }
              },
              disableWhenUiLocked: true,
            } as const,
          ]
          : []),
      ],
    },

    view: {
      window: [
        {
          type: "button",
          label: t("menu.viewItems.toggleFullScreen", "全画面表示を切り替え"),
          hotkeyAction: "全画面表示を切り替え",
          onClick: toggleFullScreen,
          disableWhenUiLocked: false,
        },
        {
          type: "button",
          label: t("menu.viewItems.zoomIn", "拡大"),
          hotkeyAction: "拡大",
          onClick: () => {
            void zoomIn();
          },
          disableWhenUiLocked: false,
        },
        {
          type: "button",
          label: t("menu.viewItems.zoomOut", "縮小"),
          hotkeyAction: "縮小",
          onClick: () => {
            void zoomOut();
          },
          disableWhenUiLocked: false,
        },
        {
          type: "button",
          label: t("menu.viewItems.zoomReset", "拡大率のリセット"),
          hotkeyAction: "拡大率のリセット",
          onClick: () => {
            void zoomReset();
          },
          disableWhenUiLocked: false,
        },
      ],
    },

    setting: {
      options: [
        {
          type: "button",
          label: t("menu.settingItems.options", "オプション"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isSettingDialogOpen: true,
            });
          },
          disableWhenUiLocked: false,
        },
      ],
      subOptions: [
        { type: "separator" },
        {
          type: "button",
          label: t("menu.settingItems.characterOrder", "話者の並び替え設定"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isCharacterOrderDialogOpen: true,
            });
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.settingItems.defaultStyle", "デフォルトスタイルの設定"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isDefaultStyleSelectDialogOpen: true,
            });
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.settingItems.editPreset", "プリセットを編集"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isPresetManageDialogOpen: true,
            });
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.settingItems.dictionary", "読み方＆アクセント辞書"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isDictionaryManageDialogOpen: true,
            });
          },
          disableWhenUiLocked: true,
        },
        {
          type: "button",
          label: t("menu.settingItems.customizeToolbar", "ツールバーのカスタマイズ"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isToolbarSettingDialogOpen: true,
            });
          },
          disableWhenUiLocked: false,
        },
        {
          type: "button",
          label: t("menu.settingItems.hotkeys", "ショートカットキーの変更"),
          onClick() {
            void store.actions.SET_DIALOG_OPEN({
              isHotkeySettingDialogOpen: true,
            });
          },
          disableWhenUiLocked: false,
        },
        { type: "separator" },
        {
          type: "button",
          label: t("menu.settingItems.sendFeedback", "フィードバックを送る"),
          onClick() {
            window.open("https://forms.gle/sTsZGfX7aR8ox8Rs7", "_blank");
          },
          disableWhenUiLocked: false,
        },
      ],
    },
  }));
};
