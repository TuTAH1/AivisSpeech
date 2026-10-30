# AivisSpeech

[![Releases](https://img.shields.io/github/v/release/Aivis-Project/AivisSpeech?label=Release)](https://github.com/Aivis-Project/AivisSpeech/releases)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL3-blue.svg)](LICENSE)
[![CI: Build](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/build.yml/badge.svg)](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/build.yml)
<!-- [![CI: Test](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/test.yml/badge.svg)](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/test.yml) -->

💠 **AivisSpeech:** **AI** **V**oice **I**mitation **S**ystem — программное обеспечение для синтеза речи (**Text to Speech**)

-----

**AivisSpeech — это программное обеспечение для синтеза японской речи, основанное на UI-редакторе [VOICEVOX](https://github.com/VOICEVOX/voicevox).**  
В него встроен движок синтеза японской речи [AivisSpeech Engine](https://github.com/Aivis-Project/AivisSpeech-Engine), позволяющий легко генерировать эмоционально выразительную речь.

#### [💠 Скачать AivisSpeech](https://aivis-project.com/speech/) ／ [💠 Скачать AivisSpeech Engine](https://github.com/Aivis-Project/AivisSpeech-Engine/releases)

-----

- [Для пользователей](#для-пользователей)
- [Системные требования](#системные-требования)
- [Поддерживаемые модели синтеза речи](#поддерживаемые-модели-синтеза-речи)
  - [Поддерживаемые архитектуры моделей](#поддерживаемые-архитектуры-моделей)
  - [Расположение файлов моделей](#расположение-файлов-моделей)
- [Политика разработки](#политика-разработки)
- [Настройка среды разработки](#настройка-среды-разработки)
- [Разработка](#разработка)
- [Лицензия](#лицензия)

## Для пользователей

**Если вы ищете инструкцию по использованию AivisSpeech, см. [официальный сайт AivisSpeech](https://aivis-project.com/speech/).**

На этой странице в основном размещена информация для разработчиков.  
Ниже приведены документы для пользователей.

- **[Как использовать](public/howtouse.md)**
- **[Часто задаваемые вопросы / Q&A](public/qAndA.md)**
- **[Контакты](public/contact.md)**

## Системные требования

Поддерживаются ПК с Windows и macOS.  
Для запуска AivisSpeech на ПК необходимо не менее 1,5 ГБ свободной оперативной памяти (RAM).

- **Windows:** Windows 10 (22H2 или новее)・Windows 11  
- **macOS:** macOS 13 Ventura или новее

> [!NOTE]
> Работа на Mac с процессором Intel активно не проверяется.  
> Производство Mac с процессорами Intel уже прекращено, и подготовка сред проверки и сборки становится всё сложнее. По возможности рекомендуем использовать Mac с Apple Silicon.

> [!WARNING]
> В Windows 10 проверка работы выполнялась только в версии 22H2.  
> **Сообщается о случаях, когда AivisSpeech Engine аварийно завершается и не запускается в старых версиях Windows 10, поддержка которых завершена, а также в LTSC (Long Term Servicing Channel) версии Windows 10.**  
> С точки зрения безопасности пользователям Windows 10 настоятельно рекомендуется обновляться как минимум до версии 22H2 перед использованием.

## Поддерживаемые модели синтеза речи

**Встроенный в AivisSpeech движок AivisSpeech Engine поддерживает файлы моделей синтеза речи в формате [AIVMX (**Ai**vis **V**oice **M**odel for ONN**X**)](https://github.com/Aivis-Project/aivmlib#aivmx-file-format-specification) (расширение `.aivmx`).**

**AIVM** (**Ai**vis **V**oice **M**odel) / **AIVMX** (**Ai**vis **V**oice **M**odel for ONN**X**) — это открытый формат файлов для моделей AI-синтеза речи, в котором обученная модель, гиперпараметры, векторы стиля и метаданные говорящего (имя, описание, лицензия, иконка, образцы голоса и т. п.) компактно упакованы в один файл.  

Подробности о спецификации AIVM и файлах AIVM / AIVMX см. в **[спецификации AIVM](https://github.com/Aivis-Project/aivmlib#aivm-specification)**, разработанной в Aivis Project.

> [!NOTE]  
> **«AIVM» также является общим названием для спецификаций формата и метаданных как AIVM, так и AIVMX.**  
> Конкретно, файл AIVM — это «формат Safetensors с добавленными метаданными AIVM», а файл AIVMX — это «формат ONNX с добавленными метаданными AIVM».  
> «Метаданные AIVM» означают различные метаданные, связанные с обученной моделью, определённые в спецификации AIVM.

> [!IMPORTANT]  
> **AivisSpeech Engine также является эталонной реализацией спецификации AIVM, но намеренно спроектирован так, чтобы поддерживать только файлы AIVMX.**  
> Благодаря этому устранена зависимость от PyTorch, уменьшен размер установки и достигнут быстрый вывод на CPU с помощью ONNX Runtime.

> [!TIP]  
> **[С помощью AIVM Generator](https://aivm-generator.aivis-project.com/) можно генерировать файлы AIVM / AIVMX из существующих моделей синтеза речи и редактировать метаданные существующих файлов AIVM / AIVMX!**

### Поддерживаемые архитектуры моделей

Можно использовать файлы AIVMX следующих архитектур моделей.

- `Style-Bert-VITS2`
- `Style-Bert-VITS2 (JP-Extra)`

> [!NOTE]
> По спецификации метаданных AIVM можно определять многоязычных говорящих, но AivisSpeech Engine, как и VOICEVOX ENGINE, поддерживает только синтез японской речи.  
> Поэтому даже модели, поддерживающие английский или китайский, не могут синтезировать речь на языках, кроме японского.

### Расположение файлов моделей

Файлы AIVMX следует размещать в следующих папках в зависимости от ОС.  

- **Windows:** `C:\Users\%username%\AppData\Roaming\AivisSpeech-Engine\Models`
- **macOS:** `~/Library/Application Support/AivisSpeech-Engine/Models`
- **Linux:** `~/.local/share/AivisSpeech-Engine/Models`

Фактический путь к папке отображается в логе сразу после запуска AivisSpeech Engine как `Models directory:`.

> [!TIP]  
> **При использовании AivisSpeech можно легко добавить модель синтеза речи из UI AivisSpeech!**  
> Конечным пользователям в основном рекомендуется добавлять модели синтеза речи этим способом.

> [!IMPORTANT]
> В версии для разработки (когда AivisSpeech Engine запускается без сборки через PyInstaller) папка размещения находится не под `AivisSpeech-Engine`, а под `AivisSpeech-Engine-Dev`.

## Политика разработки

[VOICEVOX](https://github.com/VOICEVOX) — очень крупное программное обеспечение, и его активная разработка продолжается.  
Поэтому AivisSpeech разрабатывается на основе последней версии VOICEVOX по следующей политике.

- Чтобы упростить отслеживание последней версии VOICEVOX, по возможности минимизировать необходимые изменения
  - Переименовывать VOICEVOX в AivisSpeech только там, где это необходимо
- Не выполнять рефакторинг
  - Легко предвидеть конфликты с VOICEVOX, к тому же мы не знакомы со всем кодом
- Не удалять код даже для функций, не используемых в AivisSpeech (например, синтез пения)
  - Это тоже для избежания конфликтов
  - Отключение неиспользуемого кода выполнять не удалением, а комментированием
- Не обновлять документацию, так как её сложно сопровождать и поддерживать актуальность
  - Поэтому документы вообще не обновляются и не отражают изменения в AivisSpeech
- Не обновлять тестовый код, так как его сложно поддерживать при изменениях для AivisSpeech
  - Особенно E2E-тесты не работают нормально, поскольку UI сильно изменён
  - Часть тестового кода исправлена под AivisSpeech, но проверка работы не проводилась и всё оставлено как есть

## Настройка среды разработки

Процедура отличается от оригинального VOICEVOX.  
Предварительно должен быть установлен Node.js 22.11.0.

```bash
# Установить все зависимости
npm ci

# Скопировать .env.development в .env
## Редактировать скопированный .env не нужно
cp .env.development .env

# Только для macOS, отредактировать .env.production
nano .env.production
--------------------
# Переписать executionFilePath с "AivisSpeech-Engine/run.exe" на "../Resources/AivisSpeech-Engine/run"
## executionFilePath используется при запуске продуктовой сборки AivisSpeech, собранной через npm run electron:build
...
VITE_DEFAULT_ENGINE_INFOS=`[
    {
        "uuid": "1b4a5014-d9fd-11ee-b97d-83c170a68ed3",
        "name": "AivisSpeech Engine",
        "executionEnabled": true,
        "executionFilePath": "../Resources/AivisSpeech-Engine/run",
        "executionArgs": [],
        "host": "http://127.0.0.1:10101"
    }
]`
...
--------------------

# Заранее запустить AivisSpeech Engine в другом терминале
## Среду разработки AivisSpeech Engine нужно настроить отдельно
cd ../AivisSpeech-Engine
poetry run task serve
```

## Разработка

Процедура частично отличается от оригинального VOICEVOX.

```bash
# Запустить Electron-версию AivisSpeech в среде разработки
npm run electron:serve

# Запустить браузерную версию AivisSpeech в среде разработки
npm run browser:serve

# Собрать Electron-версию AivisSpeech
npm run electron:build

# Собрать браузерную версию AivisSpeech (WIP)
npm run browser:build

# Автоматически исправить форматирование кода
npm run format

# Проверить форматирование кода
npm run lint

# Обновить автогенерируемый код OpenAPI Generator
npm run openapi:generate

# Сгенерировать информацию о лицензиях зависимых библиотек
## В отличие от VOICEVOX, интеграция с информацией о лицензиях движка синтеза речи не выполняется
## Не требуется, так как на стороне редактора можно отдельно отображать информацию о лицензиях, полученную из манифеста движка
npm run license:generate
```

## Лицензия

Из двойной лицензии базовых VOICEVOX / VOICEVOX ENGINE мы наследуем только [LGPL-3.0](LICENSE) отдельно.

Приведённые ниже документы, а также документы в [docs/](docs/), полностью унаследованы без изменений из документации оригинального [VOICEVOX](https://github.com/VOICEVOX/voicevox). Не гарантируется, что содержание этих документов применимо к AivisSpeech.

## Особая благодарность

AivisSpeech / AivisSpeech Engine глубоко опираются на множество замечательных open-source программ и вклад в них.  
Выражаем искреннюю благодарность всем, кто разрабатывал open-source ПО, и всем в сообществе за вклад и поддержку.

- [@Stardust-minus](https://github.com/Stardust-minus)
- [@tuna2134](https://github.com/tuna2134)
- [@googlefan256](https://github.com/googlefan256)
- [@WariHima](https://github.com/WariHima)
- [VOICEVOX](https://github.com/VOICEVOX/voicevox) Contributors
- [VOICEVOX ENGINE](https://github.com/VOICEVOX/voicevox_engine) Contributors
- Все участники [AI声づくり技術研究会](https://zenn.dev/p/aivoicelab)

-----

# VOICEVOX

[![releases](https://img.shields.io/github/v/release/VOICEVOX/voicevox?label=Release)](https://github.com/VOICEVOX/voicevox/releases)
[![build](https://github.com/VOICEVOX/voicevox/actions/workflows/build.yml/badge.svg)](https://github.com/VOICEVOX/voicevox/actions/workflows/build.yml)
[![test](https://github.com/VOICEVOX/voicevox/actions/workflows/test.yml/badge.svg)](https://github.com/VOICEVOX/voicevox/actions/workflows/test.yml)
[![Discord](https://img.shields.io/discord/879570910208733277?color=5865f2&label=&logo=discord&logoColor=ffffff)](https://discord.gg/WMwWetrzuh)

Это редактор [VOICEVOX](https://voicevox.hiroshiba.jp/).

(Движок — [VOICEVOX ENGINE](https://github.com/VOICEVOX/voicevox_engine/),
ядро — [VOICEVOX CORE](https://github.com/VOICEVOX/voicevox_core/),
подробнее об общей структуре — [здесь](./docs/全体構成.md).)

## Для пользователей

Это страница для разработки. Информацию об использовании см. на [официальном сайте VOICEVOX](https://voicevox.hiroshiba.jp/).

## Тем, кто хочет внести вклад в проект

Проект VOICEVOX приветствует участие заинтересованных людей.
У нас есть [руководство с описанием процедуры внесения вклада](./CONTRIBUTING.md).

Вклад часто воспринимается как написание программ, но есть и другие способы участия: написание документации, создание тестов, участие в обсуждениях предложений по улучшению и т. д.
Есть также задачи, где приветствуются новички, поэтому ждём вашего участия.

В редакторе VOICEVOX используются Electron, TypeScript, Vue, Vuex и другие технологии, поэтому общая структура трудна для понимания.  
В [руководстве «Как читать код»](./docs/コードの歩き方.md) описана структура — надеемся, это поможет в разработке.

При создании pull request, решающего Issue, чтобы избежать работы над тем же Issue, что и другие, сообщите в Issue о начале работы или сначала создайте Draft pull request.

В [неофициальном Discord-сервере VOICEVOX](https://discord.gg/WMwWetrzuh) мы обсуждаем разработку и общаемся. Присоединяйтесь.

### Руководство по дизайну

См. [принципы UX/UI-дизайна](./docs/UX・UIデザインの方針.md).

## Настройка окружения

Установите Node.js версии, указанной в [.node-version](.node-version).  
Использование менеджера версий Node.js ([nvs](https://github.com/jasongin/nvs), [Volta](https://volta.sh) и т. п.) упростит установку и позволит автоматически переключать Node.js.

После установки Node.js сделайте Fork [этого репозитория](https://github.com/VOICEVOX/voicevox.git) и выполните `git clone`.

### Установка зависимых библиотек

Следующая команда установит и обновит зависимые библиотеки.

```bash
npm i -g pnpm # только в первый раз
pnpm i
```

## Запуск

### Подготовка движка

Скопируйте `.env.production` и создайте `.env`, затем укажите в `executionFilePath` внутри `VITE_DEFAULT_ENGINE_INFOS`
путь к `vv-engine/run.exe` из [продуктовой версии VOICEVOX](https://voicevox.hiroshiba.jp/), и всё будет работать.

Если в Windows место установки не менялось, укажите `C:/Users/%username%/AppData/Local/Programs/VOICEVOX/vv-engine/run.exe`.  
Обратите внимание, что разделитель пути — `/`, а не `\`.

Если используется `VOICEVOX.app` для macOS, укажите `/path/to/VOICEVOX.app/Resources/MacOS/vv-engine/run`.

Для Linux укажите команду `vv-engine/run` из tar.gz-версии, доступной в [Releases](https://github.com/VOICEVOX/voicevox/releases/).  
Для AppImage-версии файловую систему можно смонтировать командой `$ /path/to/VOICEVOX.AppImage --appimage-mount`.

Если помимо запуска редактора VOICEVOX вы поднимаете сервер Engine API отдельно, `executionFilePath` указывать не нужно,
но вместо этого установите `executionEnabled` в `false`.
Это также касается случая, когда запущен продуктовый VOICEVOX.

Если нужно изменить конечную точку Engine API, измените `host` в `VITE_DEFAULT_ENGINE_INFOS`.

### Запуск Electron

```bash
# Запуск в среде, удобной для разработки
pnpm run electron:serve

# Запуск в среде, близкой к сборке
pnpm run electron:serve --mode production

# Запуск с аргументами
pnpm run electron:serve -- ...
```

Репозиторий движка синтеза речи находится здесь: <https://github.com/VOICEVOX/voicevox_engine>

### Запуск Storybook

С помощью Storybook можно разрабатывать компоненты.

```bash
pnpm run storybook
```

Storybook ветки main можно посмотреть в [VOICEVOX/preview-pages](https://github.com/VOICEVOX/preview-pages).  
<https://voicevox.github.io/preview-pages/preview/editor/branch-main/storybook/index.html>

### Запуск браузерной версии (в разработке)

Отдельно запустите движок синтеза речи, выполните следующее и перейдите на отображённый localhost.

```bash
pnpm run browser:serve
```

Кроме того, результат сборки ветки main развёрнут в [VOICEVOX/preview-pages](https://github.com/VOICEVOX/preview-pages).  
<https://voicevox.github.io/preview-pages/preview/editor/branch-main/editor/index.html>  
Сейчас необходимо запускать движок синтеза речи на локальном ПК.

## Сборка

```bash
pnpm run electron:build
```

### Сборка через Github Actions

В форкнутом репозитории включите Actions и запустите `build.yml` через workflow_dispatch — сборка будет выполнена.
Артефакты загружаются в Release.

## Тестирование

### Модульные тесты

Выполняются тесты в `./tests/unit/` и тесты Storybook.

```bash
pnpm run test:unit
pnpm run test-watch:unit # режим наблюдения
pnpm run test-ui:unit # показать UI Vitest
pnpm run test:unit --update # обновить снапшоты
```

> [!NOTE]  
> В тестах в `./tests/unit` окружение выполнения зависит от имени файла.
>
> - `.node.spec.ts`: окружение Node.js
> - `.browser.spec.ts`: браузерное окружение (Chromium)
> - `.spec.ts`: браузерное окружение (эмуляция через happy-dom)

### Браузерные End-to-End тесты

Выполняются End-to-End тесты UI и синтеза речи, не требующие функций Electron.

> [!NOTE]
> Некоторые тесты, изменяющие настройки движка, выполняются только в CI (Github Actions).

```bash
pnpm run test:browser-e2e
pnpm run test-watch:browser-e2e # режим наблюдения
pnpm run test-watch:browser-e2e --headed # показывать UI во время тестов
pnpm run test-ui:browser-e2e # показать UI Playwright
```

Поскольку используется Playwright, можно также генерировать шаблоны тестов.
**При запущенной браузерной версии** выполните следующую команду.

```bash
pnpm exec playwright codegen http://localhost:5173/ --viewport-size=1024,630
```

Подробнее см. [Test generator в документации Playwright](https://playwright.dev/docs/codegen-intro).

### Visual Regression Testing в Storybook

Скриншоты компонентов Storybook сравниваются, и при наличии изменений показывается разница.

> [!NOTE]
> Этот тест можно выполнять только в Windows.

```bash
pnpm run test:storybook-vrt
pnpm run test-watch:storybook-vrt # режим наблюдения
pnpm run test-ui:storybook-vrt # показать UI Playwright
```

#### Обновление скриншотов

В браузерных End-to-End тестах и Storybook выполняется Visual Regression Testing.
Сейчас VRT-тесты выполняются только в Windows.
Скриншоты можно обновить следующей процедурой:

##### Обновление через Github Actions

1. Включите GitHub Actions в настройках форкнутого репозитория.
2. В настройках репозитория Actions > General > Workflow permissions выберите Read and write permissions.
3. Сделайте коммит, включив в сообщение коммита строку `[update snapshots]`.

   ```bash
   git commit -m "Изменил UI [update snapshots]"
   ```

4. После завершения Github Workflow обновлённые скриншоты будут закоммичены.
5. После пула отправьте пустой коммит и перезапустите тесты.

   ```bash
   git commit --allow-empty -m "(Перезапуск тестов)"
   git push
   ```

> [!NOTE]
> Создав токен и добавив его в Secrets, можно автоматически перезапускать тесты.
>
> 1. Перейдите в [Fine-granted Tokens](https://github.com/settings/personal-access-tokens/new).
> 2. Введите произвольное имя, дайте доступ к `имя-пользователя/voicevox` и в Repository permissions > Contents выберите Read and write.
>    <details>
>    <summary>Пример настройки</summary>
>    <img src="./docs/res/Fine-granted_Tokensの作成.png" width="320" alt="">
>    </details>
> 3. Создайте токен и скопируйте строку.
> 4. Откройте Settings > Secrets and variables > Actions > New repository secret в репозитории `имя-пользователя/voicevox`.
> 5. Введите имя `PUSH_TOKEN`, вставьте скопированную строку и добавьте Secret.

##### Обновление локально

Обновляются только скриншоты, соответствующие ОС локального ПК.

```bash
pnpm run test:browser-e2e --update-snapshots
```

### Electron End-to-End тесты

Выполняются End-to-End тесты, включая запуск и завершение движка, требующие функций Electron.

```bash
pnpm run test:electron-e2e
pnpm run test-watch:electron-e2e # режим наблюдения
```

## Генерация информации о лицензиях зависимых библиотек

Информация о лицензиях зависимых библиотек автоматически генерируется при сборке в Github Workflow. Её можно сгенерировать следующей командой.

```bash
# получить licenses.json из voicevox_engine как engine_licenses.json

pnpm run license:generate -o voicevox_licenses.json
pnpm run license:merge -o public/licenses.json -i engine_licenses.json -i voicevox_licenses.json
```

## Форматирование кода

Форматирует код. Выполните перед отправкой pull request.

```bash
pnpm run fmt
```

## Линтинг (статический анализ)

Выполняет статический анализ кода и предотвращает ошибки. Выполните перед отправкой pull request.

```bash
pnpm run lint
```

При линтинге в корне репозитория создаётся файл кэша `.eslintcache`.
Удалите этот файл, если ESLint обновился, настройки изменились или кэш повреждён.

## Проверка опечаток

Для проверки опечаток используется [typos](https://github.com/crate-ci/typos).

```bash
pnpm run typos
```

позволяет проверить опечатки.
Если есть ложные срабатывания или файлы, которые следует исключить из проверки,
отредактируйте `_typos.toml` согласно [описанию файла настроек](https://github.com/crate-ci/typos#false-positives).

## Проверка типов

Выполняет проверку типов TypeScript.

```bash
pnpm run typecheck
```

## Markdownlint

Проверяет синтаксис Markdown.

```bash
pnpm run markdownlint
```

## Shellcheck

Проверяет синтаксис ShellScript.
Способ установки см. [здесь](https://github.com/koalaman/shellcheck#installing).

```bash
shellcheck ./build/*.sh
```

## Проверка локализации

Проверяет ошибки в локализации:
- `missing in locale` — ключи, которые вызываются в коде, но отсутствуют в данном файле локали;
- `unused in code` — ключи, объявленные в локали, но нигде в коде не используемые.

Не проверяет на нелокализованные (захардкоденные) строки.

```bash
pnpm run i18n:check
```

## OpenAPI generator

Выполните следующую команду при запущенном движке синтеза речи.

```bash
curl http://127.0.0.1:50021/openapi.json >openapi.json

pnpm exec openapi-generator-cli generate \
    -i openapi.json \
    -g typescript-fetch \
    -o src/openapi/ \
    --additional-properties "modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true"

pnpm run fmt
```

### Обновление версии OpanAPI generator

Проверить и установить новую версию можно следующими командами.

```bash
pnpm exec openapi-generator-cli version-manager list
```

## Отладка в VS Code

В средах разработки, таких как `serve` или `electron:serve` из npm scripts, vite выводит sourcemap, поэтому исходный код сопоставляется с выходным кодом.

Скопировав `.vscode/launch.template.json` в `.vscode/launch.json` и
`.vscode/tasks.template.json` в `.vscode/tasks.json`,
вы включите задачи, позволяющие запускать среду разработки из VS Code и отлаживать её.

## Лицензия

Двойная лицензия: LGPL v3 и другая лицензия, не требующая раскрытия исходного кода.
Если вы хотите получить другую лицензию, обратитесь к Хихо.  
X аккаунт: [@hiho_karuta](https://x.com/hiho_karuta)