---
name: localization
description: localization rules for AivisSpeech
---

## Objective
- Localize AivisSpeech app

## Rules
- Never change code beyond replacing hardcoded strings to t() without asking user first.
- Never localize inner parametrs, localize only UI output.
- When replacing hardcoded Japanese strings to t(), always copy replaced string as fallback.

## Important Details
- vue-i18n v9 does not support `t(key, fallback, named)` 3-arg form; correct signature is `t(key, named, fallback)`
- Character names/styles come from engine manifest, not app code (deferred per user)

## Work State
### Completed
- Localized ToolBar.vue, TalkEditor.vue, AudioInfo.vue, AudioDetail.vue, CharacterPortrait.vue, AccentPhrase.vue, UpdateInfo.vue, OssLicense.vue, HelpLibraryPolicySection.vue, HelpDialog.vue
- Locale files en-US.json, ja-JP.json, ru-RU.json updated with accentPhrase.*, characterPortrait.*, talkEditor.*, toolbar.*, settings.*, audioDetail.*, audioInfo.param.*, project.*, preset.defaultName, helpDialog.*, common.*, notify.dontShowAgain
- Fixed invalid placeholder `{text|reading}` → `{text}/{reading}` in all 3 locale files

## Relevant Files
- src/components/Dialog/ModelManageDialog.vue: translation syntax fixes
- src/components/Dialog/Dialog.ts: port notification buttons, `showNotifyAndNotShowAgainButton()`
- src/components/Dialog/HelpDialog/HelpDialog.vue: section headers localized
- src/components/Menu/MenuBar/useCommonMenuBarData.ts: recent projects re-translation watcher
- src/store/project/index.ts: TypeScript error fixes
- src/store/preset.ts: preset.defaultName usage
- src/components/Talk/ToolBar.vue: toolbar localization pattern reference
- src/i18n: i18n instance setup
- Locale files: en-US.json, ja-JP.json, ru-RU.json