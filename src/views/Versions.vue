<template>
  <div class="space-y-6">
    <!-- Header Info -->
    <div class="grid grid-cols-2 gap-4">
      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            {{ t('versions.currentVersion') }}
          </p>
          <div class="flex items-baseline space-x-2">
            <h2 class="text-2xl font-black text-slate-800 dark:text-slate-200">
              {{ currentVersion || t('versions.notSet') }}
            </h2>
            <span
              v-if="currentVersion"
              class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
            >
              {{ t('settings.onlineDownload') }}
            </span>
          </div>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 flex items-center justify-center"
        >
          <CheckCircle2 class="w-6 h-6" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between"
      >
        <div>
          <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            {{ t('versions.latestVersion') }}
          </p>
          <h2 class="text-2xl font-black text-slate-800 dark:text-slate-200">
            {{ latestVersion || t('common.loading') }}
          </h2>
        </div>
        <div
          class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 flex items-center justify-center"
        >
          <Sparkles class="w-6 h-6" />
        </div>
      </div>
    </div>

    <!-- Tab Content: Online -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden"
    >
      <div class="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h3 class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <History class="w-5 h-5 text-slate-400 dark:text-slate-500" />
            {{ t('versions.versionList') }}
          </h3>
          <span
            v-if="lastFetchTimeDisplay"
            class="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700/50 px-2 py-0.5 rounded-full border border-slate-100 dark:border-slate-600 flex items-center gap-1"
          >
            <Clock class="w-3 h-3" />
            {{ t('versions.lastSync') }}: {{ lastFetchTimeDisplay }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <AppTooltip :text="t('versions.forceRefresh')">
            <button
              class="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
              @click="refresh(true)"
            >
              <RefreshCw class="w-4 h-4" :class="{ 'animate-spin': loading }" />
            </button>
          </AppTooltip>
        </div>
      </div>

      <div v-if="loading && releases.length === 0" class="p-10 text-center text-slate-400 dark:text-slate-500">
        <Loader2 class="w-8 h-8 animate-spin mx-auto mb-2" />
        <p>{{ t('versions.fetchingVersions') }}</p>
      </div>

      <div v-else class="divide-y divide-slate-50 dark:divide-slate-700">
        <div
          v-for="release in releases"
          :key="release.id"
          class="p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group"
        >
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="font-bold text-slate-800 dark:text-slate-200">
                  {{ release.name || release.tag_name }}
                </h4>
                <span
                  v-if="release.tag_name === latestVersion"
                  class="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-wide"
                  >Latest</span
                >
                <span
                  v-if="isInstalledOnline(release.tag_name)"
                  class="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide"
                  >Installed</span
                >
                <span
                  v-if="currentVersion === release.tag_name && currentLocalPath === ''"
                  class="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wide"
                  >Current</span
                >
              </div>

              <div class="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-3">
                <span class="flex items-center gap-1">
                  <Calendar class="w-3 h-3" />
                  {{ t('versions.releasedOn') }} {{ formatDate(release.published_at) }}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="w-3 h-3" />
                  {{ t('versions.createdOn') }} {{ formatDate(release.created_at) }}
                </span>
              </div>

              <!-- Body with hover expansion -->
              <div class="text-sm text-slate-600 dark:text-slate-400 relative group/body cursor-default">
                <div
                  class="line-clamp-2 whitespace-pre-wrap group-hover/body:line-clamp-none transition-all duration-300"
                >
                  {{ release.body }}
                </div>
                <div
                  class="absolute -bottom-4 left-0 w-full h-4 bg-gradient-to-t from-white dark:from-slate-800 to-transparent group-hover/body:hidden"
                ></div>
              </div>
            </div>

            <div class="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2 sm:mt-0 shrink-0 pt-1">
              <button
                v-if="isInstalledOnline(release.tag_name) && !hasDependenciesOnline(release.tag_name)"
                class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 justify-center bg-amber-500 text-white hover:bg-amber-600 shadow-sm w-full sm:w-auto break-words text-center"
                @click="handleInstallDependencies(release.tag_name)"
              >
                <Download class="w-4 h-4 shrink-0" />
                <span>{{ t('versions.installDeps') }}</span>
              </button>

              <button
                v-else-if="isInstalledOnline(release.tag_name)"
                :id="'btn-switch-' + release.tag_name"
                :disabled="
                  (currentVersion === release.tag_name && currentLocalPath === '') ||
                  switchingVersion !== null ||
                  deletingVersions.size > 0
                "
                class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 justify-center w-full sm:w-auto break-words text-center"
                :class="
                  (currentVersion === release.tag_name && currentLocalPath === '') ||
                  switchingVersion !== null ||
                  deletingVersions.size > 0
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-slate-100 shadow-sm'
                "
                @click="handleSwitchOnline(release.tag_name)"
              >
                <Power class="w-4 h-4 shrink-0" :class="{ 'animate-spin': switchingVersion === release.tag_name }" />
                <span>{{
                  currentVersion === release.tag_name && currentLocalPath === ''
                    ? t('versions.currentlyUsed')
                    : switchingVersion === release.tag_name
                      ? t('versions.switching')
                      : t('versions.switchVersion')
                }}</span>
              </button>

              <button
                v-if="
                  isInstalledOnline(release.tag_name) &&
                  !(currentVersion === release.tag_name && currentLocalPath === '')
                "
                :disabled="deletingVersions.has(release.tag_name) || switchingVersion !== null"
                class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 justify-center w-full sm:w-auto break-words text-center bg-white dark:bg-slate-700 border shadow-sm"
                :class="
                  deletingVersions.has(release.tag_name) || switchingVersion !== null
                    ? 'border-slate-100 dark:border-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-300'
                "
                @click="handleDeleteOnline(release.tag_name)"
              >
                <Loader2 v-if="deletingVersions.has(release.tag_name)" class="w-4 h-4 animate-spin shrink-0" />
                <Trash2 v-else class="w-4 h-4 shrink-0" />
                <span>{{ t('versions.deleteVersion') }}</span>
                <span v-if="deletingVersions.has(release.tag_name)">
                  {{ t('versions.deleting') }}
                </span>
              </button>

              <button
                v-else-if="!isInstalledOnline(release.tag_name)"
                :id="'btn-install-' + release.tag_name"
                class="px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 justify-center w-full sm:w-auto break-words text-center bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600 shadow-lg dark:shadow-slate-900/50 active:scale-95"
                @click="handleInstall(release)"
              >
                <Download class="w-4 h-4 shrink-0" />
                <span>{{ t('versions.downloadInstall') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { invoke } from '@tauri-apps/api/core'
import { useI18n } from 'vue-i18n'
import {
  CheckCircle2,
  Sparkles,
  History,
  RefreshCw,
  Loader2,
  Calendar,
  Clock,
  Download,
  Power,
  Trash2,
} from 'lucide-vue-next'
import { installState, resetInstallState } from '../lib/useInstall'
import { Dialog } from '../lib/useDialog'
import { toast } from 'vue-sonner'
import { useReleases } from '../lib/useReleases'
import AppTooltip from '../components/AppTooltip.vue'
import { updateOneClickMessage, startOneClickSetup, simulateClickEffect } from '../lib/useOneClick'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { releases, loading, latestVersion, lastFetchTime, fetchReleases } = useReleases()

const isOneClickSetup = computed(() => route.query.action === 'one_click_setup_st')

interface ReleaseAsset {
  name: string
  browser_download_url: string
}

interface Release {
  id: number
  tag_name: string
  name: string
  body: string
  created_at: string
  published_at: string
  zipball_url: string
  assets: ReleaseAsset[]
}

interface InstalledVersionInfo {
  version: string
  hasNodeModules: boolean
  isLink?: boolean
}

const installedVersions = ref<InstalledVersionInfo[]>([])
const currentVersion = ref('')
const currentLocalPath = ref('')

// Synchronous cache loading for current version to prevent blink
try {
  const cachedConfig = localStorage.getItem('app_settings_config_cache')
  if (cachedConfig) {
    const config = JSON.parse(cachedConfig)
    if (config.sillytavern && config.sillytavern.version) {
      const versionObj = config.sillytavern.version
      currentVersion.value = versionObj.version || ''
      currentLocalPath.value = versionObj.path || ''
    }
  }
} catch (e) {
  console.error('Failed to parse config cache:', e)
}

const switchingVersion = ref<string | null>(null)
const deletingVersions = ref<Set<string>>(new Set())
const lastFetchTimeDisplay = computed(() => {
  if (!lastFetchTime.value) return ''
  return formatDate(new Date(lastFetchTime.value).toISOString())
})

const loadAppConfig = async () => {
  try {
    const config: any = await invoke('get_app_config')

    // Get current version from config
    if (config.sillytavern && config.sillytavern.version) {
      const versionObj = config.sillytavern.version
      currentVersion.value = versionObj.version || ''
      currentLocalPath.value = versionObj.path || ''
    }
  } catch (e) {
    console.error('Failed to load app config:', e)
  }
}

const isInstalledOnline = (tagName: string) => installedVersions.value.some(v => v.version === tagName)
const hasDependenciesOnline = (tagName: string) => {
  const v = installedVersions.value.find(v => v.version === tagName)
  return v ? v.hasNodeModules : false
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const refresh = async (forceUpdate = false) => {
  try {
    const [installed] = await Promise.all([invoke('get_installed_versions_info')])
    installedVersions.value = installed as InstalledVersionInfo[]

    await loadAppConfig()

    // 使用统一的获取逻辑
    await fetchReleases(forceUpdate)
  } catch (e) {
    if (!isOneClickSetup.value) {
      toast.error(t('versions.fetchFailed') + ': ' + String(e))
    } else {
      updateOneClickMessage(t('versions.fetchFailed') + ': ' + String(e))
    }
  } finally {
    if (isOneClickSetup.value && releases.value.length > 0 && installState.status !== 'downloading') {
      const releaseToInstall = releases.value[0]
      updateOneClickMessage(t('oneClick.preparingDownload', { version: releaseToInstall.tag_name }))
      setTimeout(() => {
        simulateClickEffect('btn-install-' + releaseToInstall.tag_name)
        handleInstall(releaseToInstall)
      }, 1000)
    }
  }
}

const handleSwitchOnline = async (version: string) => {
  if (switchingVersion.value || deletingVersions.value.size > 0) return
  switchingVersion.value = version
  try {
    const payload = { version: version, path: '' }
    await invoke('switch_sillytavern_version', { version: payload })

    // Update cache from backend
    try {
      const freshConfig: any = await invoke('get_app_config')
      localStorage.setItem('app_settings_config_cache', JSON.stringify(freshConfig))
      if (freshConfig?.sillytavern?.version) {
        currentVersion.value = freshConfig.sillytavern.version.version
        currentLocalPath.value = freshConfig.sillytavern.version.path
      } else {
        currentVersion.value = version
        currentLocalPath.value = ''
      }
    } catch (e) {
      console.error('获取配置更新缓存失败:', e)
      currentVersion.value = version
      currentLocalPath.value = ''
    }

    if (!isOneClickSetup.value) {
      toast.success(t('versions.switchedTo', { version }))
    } else {
      updateOneClickMessage(t('versions.switchedTo', { version }))
    }
  } catch (e) {
    if (!isOneClickSetup.value) {
      toast.error(t('versions.switchFailed') + ': ' + String(e))
    } else {
      updateOneClickMessage(t('versions.switchFailed') + ': ' + String(e))
    }
  } finally {
    switchingVersion.value = null
  }
}

const handleDeleteOnline = (version: string) => {
  Dialog.warning({
    title: t('versions.confirmDelete'),
    msg: t('versions.confirmDeleteMsg', { version }),
    confirmText: t('common.delete'),
    cancelText: t('common.cancel'),
    onConfirm: async () => {
      installState.show = true
      installState.version = version
      installState.status = 'deleting'
      installState.operation = 'delete'
      installState.progress = 0
      installState.logs = [t('versions.startDeleting', { version })]

      deletingVersions.value.add(version)
      try {
        await invoke('delete_sillytavern_version', { version })
        installState.logs.push(t('versions.deleteSuccess', { version }))
        installState.status = 'done'
        installState.progress = 1
        await refresh()
      } catch (e) {
        installState.status = 'error'
        installState.logs.push(t('versions.deleteFailed') + ': ' + String(e))
      } finally {
        deletingVersions.value.delete(version)
        Dialog.close()
      }
    },
  })
}

const handleInstallDependencies = async (version: string) => {
  installState.show = true
  installState.version = version
  installState.status = 'downloading'
  installState.operation = 'install'
  installState.progress = 0
  installState.logs = [t('versions.startInstallingDeps', { version })]

  try {
    await invoke('install_sillytavern_dependencies', { version })
  } catch (e) {
    installState.status = 'error'
    installState.logs.push(`${t('common.error')}: ${String(e)}`)
  }
}

const handleInstall = async (release: Release) => {
  // 检查版本是否需要 Node v20+（ST >= 1.17.0）
  const tagName = release.tag_name // e.g. "v1.17.0"
  const vMatch = tagName.replace(/^v/, '').match(/^(\d+)\.(\d+)\./)
  if (vMatch) {
    const major = parseInt(vMatch[1], 10)
    const minor = parseInt(vMatch[2], 10)
    const needs20 = major > 1 || (major === 1 && minor >= 17)
    if (needs20) {
      // 检查当前 Node 版本
      const nodeCache = localStorage.getItem('app_settings_node_cache')
      const nodeInfo = nodeCache ? JSON.parse(nodeCache) : null
      const nodeVersion: string | null = nodeInfo?.version || null
      const currentMajor = nodeVersion ? parseInt((nodeVersion.match(/v?(\d+)\./) || [])[1] || '0', 10) : 0
      if (currentMajor < 20) {
        // 弹提示
        const shouldProceed = await new Promise<boolean>(resolve => {
          Dialog.warning({
            title: t('versions.nodeVersionWarningTitle'),
            msg: t('versions.nodeVersionWarningDesc', {
              version: tagName,
              required: '20',
              current: nodeVersion || t('home.notInstalled'),
            }),
            confirmText: t('versions.nodeVersionWarningConfirm'),
            cancelText: t('versions.nodeVersionWarningSkip'),
            onConfirm: () => {
              // 跳转到设置页 node 区域触发安装
              router.push('/settings?action=install_node')
              resolve(false)
            },
            onCancel: () => resolve(true),
            onClose: () => resolve(true),
          })
        })
        if (!shouldProceed) return
      }
    }
  }

  installState.show = true
  installState.version = release.tag_name
  installState.status = 'downloading'
  installState.operation = 'install'
  installState.progress = 0
  installState.logs = [t('versions.startInstalling', { version: release.tag_name })]

  let downloadUrl =
    release.zipball_url ||
    `https://github.com/silly-hhhh123/sillytavern-launcher-gui-custom/archive/refs/tags/${release.tag_name}.zip`
  try {
    const config: any = await invoke('get_app_config')
    if (config.githubProxy && config.githubProxy.enable && config.githubProxy.url) {
      let proxyUrl = config.githubProxy.url
      if (!proxyUrl.endsWith('/')) proxyUrl += '/'
      downloadUrl = `${proxyUrl}${downloadUrl}`
      installState.logs.push(t('versions.usingProxy') + `: ${proxyUrl}`)
    }
  } catch (_e) {}

  try {
    await invoke('install_sillytavern_version', { version: release.tag_name, url: downloadUrl })
    // Update checkpoint after successful install/extraction
    const freshConfig: any = await invoke('get_app_config')
    freshConfig.setupCheckpoint = `ST_INSTALLED:${release.tag_name}`
    await invoke('save_app_config', { config: freshConfig })
  } catch (e) {
    installState.status = 'error'
    installState.logs.push(`${t('common.error')}: ${String(e)}`)
  }
}

onMounted(async () => {
  if (isOneClickSetup.value) {
    setTimeout(async () => {
      startOneClickSetup(t('oneClick.fetchingVersions'))
      await loadAppConfig()
      refresh()
    }, 1000)
  } else {
    await loadAppConfig()
    refresh()
  }
})

watch(
  () => installState.status,
  newStatus => {
    if (isOneClickSetup.value) {
      if (newStatus === 'downloading') {
        updateOneClickMessage(t('oneClick.downloadingTavern'))
      } else if (newStatus === 'extracting') {
        updateOneClickMessage(t('oneClick.extractingTavern'))
      } else if (newStatus === 'installing') {
        updateOneClickMessage(t('oneClick.installingDeps'))
      } else if (newStatus === 'error') {
        updateOneClickMessage(t('oneClick.error'))
      }
    }

    if (newStatus === 'done') {
      invoke('get_installed_versions_info')
        .then(installed => {
          installedVersions.value = installed as InstalledVersionInfo[]
        })
        .catch(e => {
          console.error(e)
        })

      if (isOneClickSetup.value) {
        const versionToSwitch = installState.version
        updateOneClickMessage(t('oneClick.downloadSuccess'))

        invoke('get_app_config')
          .then(async (config: any) => {
            config.initialSetupCompleted = true
            config.setupCheckpoint = 'DONE'
            await invoke('save_app_config', { config })
            localStorage.setItem('app_settings_config_cache', JSON.stringify(config))

            setTimeout(() => {
              simulateClickEffect('btn-dialog-close')
              setTimeout(() => resetInstallState(), 200) // 稍微延迟以显示点击效果

              setTimeout(async () => {
                if (versionToSwitch) {
                  simulateClickEffect('btn-switch-' + versionToSwitch)
                  await handleSwitchOnline(versionToSwitch)
                }

                setTimeout(() => {
                  router.push('/console?action=one_click_start')
                }, 3000)
              }, 3000)
            }, 3000)
          })
          .catch(e => {
            console.error('Failed to complete one click setup:', e)
            updateOneClickMessage(String(e))
          })
      } else {
        // 这里修改：如果是手动安装依赖等操作，也在完成后等待3秒才关闭弹窗
        if (installState.operation === 'install' || installState.operation === 'unbind') {
          setTimeout(() => {
            if (installState.status === 'done') {
              // 确保当前依然是完成状态
              resetInstallState()
            }
          }, 3000)
        }
      }
    }
  },
)
</script>
