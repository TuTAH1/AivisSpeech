# AivisSpeech

[![日本語](https://flagcdn.io/4x3/32/jp.png)](README.md)
[![Русский](https://flagcdn.io/4x3/32/ru.png)](README.ru.md)
[![English](https://flagcdn.io/4x3/48/us.png)](README.en.md)

[![Releases](https://img.shields.io/github/v/release/Aivis-Project/AivisSpeech?label=Release)](https://github.com/Aivis-Project/AivisSpeech/releases)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL3-blue.svg)](LICENSE)
[![CI: Build](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/build.yml/badge.svg)](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/build.yml)
<!-- [![CI: Test](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/test.yml/badge.svg)](https://github.com/Aivis-Project/AivisSpeech/actions/workflows/test.yml) -->

💠 **AivisSpeech:** **AI** **V**oice **I**mitation **S**ystem - Text to **Speech** Software

-----

**AivisSpeech is Japanese speech synthesis software based on the [VOICEVOX](https://github.com/VOICEVOX/voicevox) editor UI.**  
It includes the Japanese speech synthesis engine [AivisSpeech Engine](https://github.com/Aivis-Project/AivisSpeech-Engine), allowing you to easily generate emotionally rich voices.

#### [💠 Download AivisSpeech](https://aivis-project.com/speech/) ／ [💠 Download AivisSpeech Engine](https://github.com/Aivis-Project/AivisSpeech-Engine/releases)

-----

- [For Users](#for-users)
- [System Requirements](#system-requirements)
- [Supported Speech Synthesis Models](#supported-speech-synthesis-models)
  - [Supported Model Architectures](#supported-model-architectures)
  - [Model File Location](#model-file-location)
- [Development Policy](#development-policy)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Development](#development)
- [License](#license)

## For Users

**If you are looking for how to use AivisSpeech, please see the [AivisSpeech official website](https://aivis-project.com/speech/).**

This page mainly contains information for developers.  
The following are documents for users.

- **[Usage](public/Github/en-US/howtouse.md)**
- **[FAQ/Q&A](public/Github/en-US/qAndA.md)**
- **[Contact](public/Github/en-US/contact.md)**

## System Requirements

Supports Windows and macOS PCs.  
To launch AivisSpeech, your PC needs at least 1.5 GB of free memory (RAM).

- **Windows:** Windows 10 (22H2 or later), Windows 11  
- **macOS:** macOS 13 Ventura or later

> [!NOTE]
> Operation on Macs with Intel CPUs is not actively verified.  
> Macs with Intel CPUs have already ended production, and it is becoming difficult to prepare verification and build environments. We recommend using a Mac with Apple Silicon whenever possible.

> [!WARNING]
> On Windows 10, operation has only been verified in version 22H2.  
> **There have been reports of AivisSpeech Engine crashing and failing to start on older unsupported versions of Windows 10 and LTSC (Long Term Servicing Channel) versions of Windows 10.**  
> From a security perspective as well, if you are using Windows 10, we strongly recommend updating to at least version 22H2 before use.

## Supported Speech Synthesis Models

**AivisSpeech Engine built into AivisSpeech supports speech synthesis model files in the [AIVMX (**Ai**vis **V**oice **M**odel for ONN**X**)](https://github.com/Aivis-Project/aivmlib#aivmx-file-format-specification) format (extension `.aivmx`).**

**AIVM** (**Ai**vis **V**oice **M**odel) / **AIVMX** (**Ai**vis **V**oice **M**odel for ONN**X**) is an **open file format for AI speech synthesis models that packs the trained model, hyperparameters, style vectors, and speaker metadata (name, overview, license, icon, voice samples, etc.) into a single file.**  

For details about the AIVM specification and AIVM / AIVMX files, please refer to the **[AIVM specification](https://github.com/Aivis-Project/aivmlib#aivm-specification)** established by Aivis Project.

> [!NOTE]  
> **"AIVM" is also a collective term for both the AIVM and AIVMX format specifications and metadata specifications.**  
> Specifically, an AIVM file is a "Safetensors format with AIVM metadata added," and an AIVMX file is an "ONNX format with AIVM metadata added."  
> "AIVM metadata" refers to the various metadata associated with trained models as defined in the AIVM specification.

> [!IMPORTANT]  
> **AivisSpeech Engine is also a reference implementation of the AIVM specification, but it is deliberately designed to support only AIVMX files.**  
> This eliminates the dependency on PyTorch, reduces the installation size, and enables fast CPU inference with ONNX Runtime.

> [!TIP]  
> **[AIVM Generator](https://aivm-generator.aivis-project.com/) lets you generate AIVM / AIVMX files from existing speech synthesis models and edit the metadata of existing AIVM / AIVMX files!**

### Supported Model Architectures

You can use AIVMX files with the following model architectures.

- `Style-Bert-VITS2`
- `Style-Bert-VITS2 (JP-Extra)`

> [!NOTE]
> The AIVM metadata specification allows defining multilingual speakers, but AivisSpeech Engine, like VOICEVOX ENGINE, supports only Japanese speech synthesis.  
> Therefore, even if a speech synthesis model supports English or Chinese, it cannot synthesize speech other than Japanese.

### Model File Location

Place AIVMX files in the following folders for each OS.  

- **Windows:** `C:\Users\%username%\AppData\Roaming\AivisSpeech-Engine\Models`
- **macOS:** `~/Library/Application Support/AivisSpeech-Engine/Models`
- **Linux:** `~/.local/share/AivisSpeech-Engine/Models`

The actual folder path is shown as `Models directory:` in the AivisSpeech Engine log immediately after startup.

> [!TIP]  
> **When using AivisSpeech, you can easily add speech synthesis models from the AivisSpeech UI!**  
> End users are generally recommended to add speech synthesis models this way.

> [!IMPORTANT]
> For the development version (when running AivisSpeech Engine without being built with PyInstaller), the placement folder is under `AivisSpeech-Engine-Dev`, not under `AivisSpeech-Engine`.

## Development Policy

[VOICEVOX](https://github.com/VOICEVOX) is extremely large software and is still being actively developed.  
Therefore, AivisSpeech is developed based on the latest version of VOICEVOX according to the following policy.

- Keep modifications as minimal as possible to make it easy to follow the latest version of VOICEVOX
  - Rebranding from VOICEVOX to AivisSpeech is done only where necessary
- Do not perform refactoring
  - Conflicts with VOICEVOX are easily expected, and we are not familiar with the entire codebase
- Do not delete code even for features not used by AivisSpeech (such as singing synthesis)
  - This is also to avoid conflicts
  - Disable unused code by commenting it out rather than deleting it
- Do not update documentation because maintenance and tracking are difficult
  - Therefore, each document has not been updated at all and does not reflect changes in AivisSpeech
- Do not update test code because it is difficult to maintain due to changes for AivisSpeech
  - In particular, E2E tests do not work properly because the UI has been significantly modified
  - Some test code has been modified for AivisSpeech, but it has not been verified and has been left as is

## Setting Up the Development Environment

The steps differ from the original VOICEVOX.  
Node.js 22.11.0 must be installed in advance.

```bash
# Install all dependencies
npm ci

# Copy .env.development to .env
## There is no need to edit the copied .env
cp .env.development .env

# macOS only: edit .env.production
nano .env.production
--------------------
# Rewrite executionFilePath from "AivisSpeech-Engine/run.exe" to "../Resources/AivisSpeech-Engine/run"
## executionFilePath is used when launching the production build of AivisSpeech built with npm run electron:build
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

# Start AivisSpeech Engine in another terminal beforehand
## The development environment for AivisSpeech Engine must be set up separately
cd ../AivisSpeech-Engine
poetry run task serve
```

## Development

Some steps differ from the original VOICEVOX.

```bash
# Launch Electron AivisSpeech in the development environment
npm run electron:serve

# Launch browser AivisSpeech in the development environment
npm run browser:serve

# Build Electron AivisSpeech
npm run electron:build

# Build browser AivisSpeech (WIP)
npm run browser:build

# Automatically fix code formatting
npm run format

# Check code formatting
npm run lint

# Update auto-generated code by OpenAPI Generator
npm run openapi:generate

# Generate license information for dependencies
## Unlike VOICEVOX, do not integrate with the license information of the speech synthesis engine
## Not needed because the editor side can separately display license information obtained from the engine manifest
npm run license:generate
```

## License

Of the dual license of the base VOICEVOX / VOICEVOX ENGINE, only [LGPL-3.0](LICENSE) is inherited independently.

The documents below and under [docs/](docs/) inherit the documents of the original [VOICEVOX](https://github.com/VOICEVOX/voicevox) without modification. There is no guarantee that the contents of these documents also apply to AivisSpeech.

## Special Thanks

AivisSpeech / AivisSpeech Engine are deeply supported by many excellent open source software projects and their contributions.  
We sincerely thank everyone who developed open source software and all community members for their contributions and support.

- [@Stardust-minus](https://github.com/Stardust-minus)
- [@tuna2134](https://github.com/tuna2134)
- [@googlefan256](https://github.com/googlefan256)
- [@WariHima](https://github.com/WariHima)
- [VOICEVOX](https://github.com/VOICEVOX/voicevox) Contributors
- [VOICEVOX ENGINE](https://github.com/VOICEVOX/voicevox_engine) Contributors
- Everyone in [AI Voice Creation Technology Research Group](https://zenn.dev/p/aivoicelab)

-----

# VOICEVOX

[![releases](https://img.shields.io/github/v/release/VOICEVOX/voicevox?label=Release)](https://github.com/VOICEVOX/voicevox/releases)
[![build](https://github.com/VOICEVOX/voicevox/actions/workflows/build.yml/badge.svg)](https://github.com/VOICEVOX/voicevox/actions/workflows/build.yml)
[![test](https://github.com/VOICEVOX/voicevox/actions/workflows/test.yml/badge.svg)](https://github.com/VOICEVOX/voicevox/actions/workflows/test.yml)
[![Discord](https://img.shields.io/discord/879570910208733277?color=5865f2&label=&logo=discord&logoColor=ffffff)](https://discord.gg/WMwWetrzuh)

This is the editor for [VOICEVOX](https://voicevox.hiroshiba.jp/).

(The engine is [VOICEVOX ENGINE](https://github.com/VOICEVOX/voicevox_engine/),
the core is [VOICEVOX CORE](https://github.com/VOICEVOX/voicevox_core/),
and details of the overall structure are available [here](./docs/全体構成.md).)

## For Users

This is a development page. For usage information, please see the [VOICEVOX official website](https://voicevox.hiroshiba.jp/).

## For Those Who Want to Contribute to the Project

The VOICEVOX project welcomes participation from anyone interested.
We provide a [guide explaining the contribution procedure](./CONTRIBUTING.md).

Contribution is often thought of as writing programs, but there are various ways to participate, such as writing documentation, generating tests, and participating in discussions of improvement proposals.
There are also beginner-friendly tasks, and we look forward to your participation.

The VOICEVOX editor uses Electron, TypeScript, Vue, Vuex, and more, making the overall structure difficult to understand.  
We introduce the structure in [How to Walk Through the Code](./docs/コードの歩き方.md), and hope it helps with development.

When creating a pull request to resolve an issue, to avoid working on the same issue as someone else,
please mention in the issue that you have started working on it, or first create a Draft pull request.

We hold development discussions and casual chats on the [VOICEVOX unofficial Discord server](https://discord.gg/WMwWetrzuh). Please feel free to join.

### Design Guidelines

Please refer to the [UX/UI design policy](./docs/UX・UIデザインの方針.md).

## Environment Setup

Install the version of Node.js listed in [.node-version](.node-version).  
Using a Node.js version manager (such as [nvs](https://github.com/jasongin/nvs) or [Volta](https://volta.sh)) makes installation easy and also enables automatic Node.js switching.

After installing Node.js, Fork [this repository](https://github.com/VOICEVOX/voicevox.git) and `git clone` it.

### Install Dependencies

Running the following command installs and updates the dependencies.

```bash
npm i -g pnpm # First time only
pnpm i
```

## Running

### Preparing the Engine

Copy `.env.production` to create `.env`, and set `executionFilePath` in `VITE_DEFAULT_ENGINE_INFOS` to
`vv-engine/run.exe` in the [production version of VOICEVOX](https://voicevox.hiroshiba.jp/).

If you have not changed the installation location on Windows, specify `C:/Users/%username%/AppData/Local/Programs/VOICEVOX/vv-engine/run.exe`.  
Note that the path separator is `/`, not `\`.

If you are using `VOICEVOX.app` for macOS, specify `/path/to/VOICEVOX.app/Resources/MacOS/vv-engine/run`.

For Linux, specify the `vv-engine/run` command included in the tar.gz version available from [Releases](https://github.com/VOICEVOX/voicevox/releases/).
For the AppImage version, you can mount the filesystem with `$ /path/to/VOICEVOX.AppImage --appimage-mount`.

If you are running an engine API server separately from the VOICEVOX editor, you do not need to specify `executionFilePath`,
but instead set `executionEnabled` to `false`.
This also applies when the production version of VOICEVOX is running.

To change the destination endpoint of the engine API, change `host` in `VITE_DEFAULT_ENGINE_INFOS`.

### Running Electron

```bash
# Run in an environment that is easy to develop in
pnpm run electron:serve

# Run in an environment close to the build environment
pnpm run electron:serve --mode production

# Run with arguments
pnpm run electron:serve -- ...
```

The speech synthesis engine repository is here <https://github.com/VOICEVOX/voicevox_engine>

### Running Storybook

You can develop components using Storybook.

```bash
pnpm run storybook
```

The main branch Storybook can be viewed from [VOICEVOX/preview-pages](https://github.com/VOICEVOX/preview-pages).  
<https://voicevox.github.io/preview-pages/preview/editor/branch-main/storybook/index.html>

### Running the Browser Version (Under Development)

Start the speech synthesis engine separately, run the following, and access the displayed localhost.

```bash
pnpm run browser:serve
```

Also, the build result of the main branch is deployed to [VOICEVOX/preview-pages](https://github.com/VOICEVOX/preview-pages).  
<https://voicevox.github.io/preview-pages/preview/editor/branch-main/editor/index.html>  
Currently, you need to start the speech synthesis engine on your local PC.

## Build

```bash
pnpm run electron:build
```

### Building with Github Actions

Enable Actions in the forked repository and run `build.yml` with workflow_dispatch to build.
Artifacts are uploaded to Release.

## Test

### Unit Tests

Runs the tests under `./tests/unit/` and the Storybook tests.

```bash
pnpm run test:unit
pnpm run test-watch:unit # Watch mode
pnpm run test-ui:unit # Show Vitest UI
pnpm run test:unit --update # Update snapshots
```

> [!NOTE]  
> For tests under `./tests/unit`, the environment in which tests run changes depending on the filename.
>
> - `.node.spec.ts`: Node.js environment
> - `.browser.spec.ts`: Browser environment (Chromium)
> - `.spec.ts`: Browser environment (emulated by happy-dom)

### Browser End to End Tests

Runs End to End tests for UI, speech synthesis, etc. that do not require Electron features.

> [!NOTE]
> Tests that rewrite some engine settings are configured to run only on CI (Github Actions).

```bash
pnpm run test:browser-e2e
pnpm run test-watch:browser-e2e # Watch mode
pnpm run test-watch:browser-e2e --headed # Show the UI during tests
pnpm run test-ui:browser-e2e # Show Playwright UI
```

Since Playwright is used, you can also generate test patterns.
Run the following command **with the browser version running**.

```bash
pnpm exec playwright codegen http://localhost:5173/ --viewport-size=1024,630
```

For details, refer to [Playwright documentation's Test generator](https://playwright.dev/docs/codegen-intro).

### Storybook Visual Regression Testing

Compares screenshots of Storybook components and displays differences if there are changes.

> [!NOTE]
> This test can be run only on Windows.

```bash
pnpm run test:storybook-vrt
pnpm run test-watch:storybook-vrt # Watch mode
pnpm run test-ui:storybook-vrt # Show Playwright UI
```

#### Updating Screenshots

Browser End to End tests and Storybook perform Visual Regression Testing.
Currently, VRT tests are run only on Windows.
You can update screenshots with the following steps:

##### Updating with Github Actions

1. Enable GitHub Actions in the settings of the forked repository.
2. In the repository settings, select Read and write permissions under Actions > General > Workflow permissions.
3. Commit with the string `[update snapshots]` included in the commit message.

   ```bash
   git commit -m "Changed UI [update snapshots]"
   ```

4. When the Github Workflow completes, the updated screenshots are committed.
5. After pulling, push an empty commit and rerun the tests.

   ```bash
   git commit --allow-empty -m "(Rerun tests)"
   git push
   ```

> [!NOTE]
> By creating a token and adding it to Secrets, tests can be rerun automatically.
>
> 1. Access [Fine-granted Tokens](https://github.com/settings/personal-access-tokens/new).
> 2. Enter an appropriate name, grant access to `username/voicevox`, and select Read and write for Contents in Repository permissions.
>    <details>
>    <summary>Example settings</summary>
>    <img src="./docs/res/Fine-granted_Tokensの作成.png" width="320" alt="">
>    </details>
> 3. Create the token and copy the string.
> 4. Open Settings > Secrets and variables > Actions > New repository secret in the `username/voicevox` repository.
> 5. Enter `PUSH_TOKEN` as the name, paste the string from earlier, and add the secret.

##### Updating Locally

Only the snapshots corresponding to the local PC's OS are updated.

```bash
pnpm run test:browser-e2e --update-snapshots
```

### Electron End to End Tests

Runs End to End tests that require Electron features, including engine startup and shutdown.

```bash
pnpm run test:electron-e2e
pnpm run test-watch:electron-e2e # Watch mode
```

## Generating License Information for Dependencies

License information for dependencies is automatically generated during builds in Github Workflow. It can be generated with the following commands.

```bash
# get licenses.json from voicevox_engine as engine_licenses.json

pnpm run license:generate -o voicevox_licenses.json
pnpm run license:merge -o public/licenses.json -i engine_licenses.json -i voicevox_licenses.json
```

## Code Formatting

Formats the code. Run this before sending a pull request.

```bash
pnpm run fmt
```

## Linting (Static Analysis)

Performs static analysis of the code to prevent bugs. Run this before sending a pull request.

```bash
pnpm run lint
```

Running lint creates a cache file `.eslintcache` at the repository root.
Delete this file if ESLint is upgraded, the configuration changes, or the cache is corrupted.

## Typo Check

Typos are checked using [typos](https://github.com/crate-ci/typos).

```bash
pnpm run typos
```

You can check typos with this.
If there are false positives or files that should be excluded from checking,
edit `_typos.toml` according to [the configuration file explanation](https://github.com/crate-ci/typos#false-positives).

## Type Check

Performs TypeScript type checking.

```bash
pnpm run typecheck
```

## Markdownlint

Checks Markdown syntax.

```bash
pnpm run markdownlint
```

## Shellcheck

Checks ShellScript syntax.
See [here](https://github.com/koalaman/shellcheck#installing) for installation instructions.

```bash
shellcheck ./build/*.sh
```

## Localization Check

Checks for errors in localization:
- `missing in locale` — keys that are called in the code but are missing from this locale file;
- `unused in code` — keys declared in the locale but not used anywhere in the code.

Does not check for non-localized (hardcoded) strings.

```bash
pnpm run i18n:check
```

## OpenAPI generator

Run the following commands with the speech synthesis engine running.

```bash
curl http://127.0.0.1:50021/openapi.json >openapi.json

pnpm exec openapi-generator-cli generate \
    -i openapi.json \
    -g typescript-fetch \
    -o src/openapi/ \
    --additional-properties "modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true"

pnpm run fmt
```

### Upgrading OpanAPI generator

You can check and install new versions with the following command.

```bash
pnpm exec openapi-generator-cli version-manager list
```

## Debugging in VS Code

Under development builds such as npm scripts `serve` and `electron:serve`, vite used for the build outputs sourcemaps, so source code and output code are mapped.

By copying `.vscode/launch.template.json` to create `.vscode/launch.json`, and
copying `.vscode/tasks.template.json` to create `.vscode/tasks.json`,
tasks that run the development build from VS Code and enable debugging become available.

## License

Dual-licensed under LGPL v3 and another license that does not require source code disclosure.
If you wish to obtain the alternative license, please ask hiho.  
X account: [@hiho_karuta](https://x.com/hiho_karuta)