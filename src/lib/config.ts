import pkg from '../../package.json'
import { KeyRound, BookOpen } from 'lucide-vue-next'
import logo from '../assets/logo.svg'

export default {
  appName: '酒馆启动器GUI',
  appNameEn: 'SillyTavern Launcher GUI',
  appVersion: pkg.version,
  appDescription: pkg.description,
  appDescriptionEn: pkg.descriptionEn,
  appHomepage: pkg.homepage,
  appIcon: logo,
  git: {
    github: 'https://github.com/al01cn/sillyTavern-launcher',
    gitee: 'https://gitee.com/al01/sillytavern-launcher',
  },
  tools: {
    API密钥购买: [
      {
        defaultIcon: KeyRound,
        name: '酒馆文字及生图api密钥购买',
        url: 'https://pay.ldxp.cn/shop/BM7RR8F6',
      },
    ],
    酒馆使用教程: [
      {
        defaultIcon: BookOpen,
        name: '酒馆使用教程',
        url: 'https://vlink.cc/hlky1lzy',
      },
    ],
  },
  ca: {
    categories: [
      {
        name: '框架 / Frameworks',
        items: [
          { name: 'Tauri', version: '2', url: 'https://tauri.app/', key: 'tauri' },
          { name: 'Vue', version: '3.5', url: 'https://vuejs.org/', key: 'vue' },
          { name: 'Rust', version: '1.75+', url: 'https://www.rust-lang.org/', key: 'rust' },
        ],
      },
      {
        name: '前端依赖 / Frontend',
        items: [
          { name: 'Tailwind CSS', version: '4.2', url: 'https://tailwindcss.com/', key: 'tailwind' },
          { name: 'vue-i18n', version: '11', url: 'https://vue-i18n.intlify.dev/', key: 'vueI18n' },
          { name: 'vue-router', version: '5', url: 'https://router.vuejs.org/', key: 'vueRouter' },
          { name: 'Phosphor Icons', version: '2.2', url: 'https://phosphoricons.com/', key: 'phosphorIcons' },
          { name: 'Lucide Vue', version: '0.577', url: 'https://lucide.dev/', key: 'lucide' },
          { name: 'QRCode', version: '1.5', url: 'https://github.com/soldair/node-qrcode', key: 'qrcode' },
          { name: 'Vue Sonner', version: '2', url: 'https://github.com/AntonyAnu/sonner-vue', key: 'vueSonner' },
          { name: 'DaisyUI', version: '5', url: 'https://daisyui.com/', key: 'daisyui' },
        ],
      },
      {
        name: '后端依赖 / Backend',
        items: [
          { name: 'Tokio', version: '1', url: 'https://tokio.rs/', key: 'tokio' },
          { name: 'Reqwest', version: '0.12', url: 'https://docs.rs/reqwest/0.12/reqwest/', key: 'reqwest' },
          { name: 'Serde', version: '1', url: 'https://serde.rs/', key: 'serde' },
          { name: 'Zip', version: '0.6', url: 'https://github.com/zip-rs/zip', key: 'zip' },
          { name: 'Walkdir', version: '2.5', url: 'https://github.com/BurntSushi/walkdir', key: 'walkdir' },
          { name: 'Jwalk', version: '0.8', url: 'https://github.com/Byron/jwalk', key: 'jwalk' },
          { name: 'Sevenz', version: '0.6', url: 'https://github.com/erthink/7z', key: 'sevenz' },
          {
            name: 'Headless Chrome',
            version: '1',
            url: 'https://github.com/ChromeDevTools/headless_chrome',
            key: 'headlessChrome',
          },
          { name: 'Winreg', version: '0.52', url: 'https://github.com/gentoo90/winreg', key: 'winreg' },
        ],
      },
      {
        name: '开发工具 / DevTools',
        items: [
          { name: 'Vite', version: '6', url: 'https://vite.dev/', key: 'vite' },
          { name: 'TypeScript', version: '6', url: 'https://www.typescriptlang.org/', key: 'typescript' },
          { name: 'ESLint', version: '10', url: 'https://eslint.org/', key: 'eslint' },
          { name: 'Prettier', version: '3.8', url: 'https://prettier.io/', key: 'prettier' },
        ],
      },
      {
        name: '特别感谢 / Special Thanks',
        items: [
          { name: 'SillyTavern', version: '1.1x.x', url: 'https://sillytavern.app/', key: 'sillytavern' },
          {
            name: 'SillyTavern 社区',
            version: '',
            url: 'https://github.com/SillyTavern/SillyTavern',
            key: 'sillytavernCommunity',
          },
          {
            name: 'Github Proxy',
            version: '',
            url: 'https://github.akams.cn/',
            key: 'githubProxy',
          },
          {
            name: 'Github Proxy - ghfast',
            version: '',
            url: 'https://ghfast.top/',
            key: 'ghfast',
          },
        ],
      },
    ],
  },
}
