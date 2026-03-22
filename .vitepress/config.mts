import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Oxygen",
  description: "C# Advanced framework for SCUM servers",
  lang: 'en-US',
  head: [
    ['meta', { name: 'theme-color', content: '#b13c32' }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Oxygen Framework for SCUM' }],
    ['meta', { property: 'og:description', content: 'The ultimate plugin framework for SCUM servers. Build, customize, and manage with powerful API and Hooks.' }],
    
    ['meta', { property: 'og:image', content: 'https://docs.oxymod.com/oxy-logo.png' }],
    ['meta', { property: 'og:url', content: 'https://docs.oxymod.com/' }],

    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Oxygen Framework' }],
    ['meta', { name: 'twitter:description', content: 'The ultimate plugin framework for SCUM servers.' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.oxymod.com/oxy-logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      {
      text: 'To OXYMOD',
      link: 'https://oxymod.com',
      target: '_blank',
      rel: 'noopener'
      },
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/owners/getting-started" }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
       {
        text: "Server owners",
        items: [
          { text: "Getting Started", link: "/guide/owners/getting-started" },
          { text: "Installing Oxygen", link: "/guide/owners/installing-oxygen" },
          { text: "Installing Plugins", link: "/guide/owners/installing-plugins" },
          { text: "Managing Permissions", link: "/guide/owners/managing-permissions" },
          { text: "Configuring Plugins", link: "/guide/owners/configuring-plugins" },
          { text: "Understanding Data Files", link: "/guide/owners/data-files" },
        ],
      },
      {
        text: "Developer Introduction",
        items: [
          { text: "Getting Started", link: "/guide/developers/getting-started" },
          { text: "My First plugin", link: "/guide/first-plugin" },
          { text: "Plugin Structure", link: "/guide/plugin-structure" },
          { text: "Notifications", link: "/guide/notifications" },
          { text: "Admin commands", link: "/guide/admin-commands" },
          { text: "Working with Actors", link: "/guide/actors" },
        ],
      },
      {
        text: "Reference & API",
        items: [
          { text: "Player (PlayerBase)", link: "/api/players-methods" },
          { text: "Server API", link: "/api/server-methods" }
        ],
        
      },
      {
        text: "Hooks",
        items: [
          { 
            text: "Player (11)",
            collapsed: true,
            items: [
            { text: "OnPlayerConnected", link: "/hooks/player-connected" },
            { text: "OnPlayerChat", link: "/hooks/player-chat" },
            { text: "OnPlayerDisconnected", link: "/hooks/player-disconnected" },
            { text: "OnPlayerDeath", link: "/hooks/player-death" },
            { text: "OnPlayerMeleeAttack", link: "/hooks/player-meleeAttack" },
            { text: "OnPlayerMiniGameEnded", link: "/hooks/player-miniGameEnded" },
            { text: "OnPlayerOpenInventory", link: "/hooks/player-openInventory" },
            { text: "OnPlayerTakeItemInHands", link: "/hooks/player-takeItemInHands" },
            { text: "OnPlayerLockPickEnded", link: "/hooks/player-lockPickEnded" },
            { text: "OnPlayerRespawn", link: "/hooks/player-respawn" },
            { text: "OnPlayerRespawned", link: "/hooks/player-respawned" },
          ]
          },
          {
            text: "Plugin (2)",
            collapsed: true,
            items: [
              { text: "OnLoad", link: "/hooks/plugin-loaded" },
              { text: "OnUnload", link: "/hooks/plugin-unloaded" },
            ]
          }
        ],
      },
      {
        text: "Core Concepts",
        items: [
          { text: "Chat Commands", link: "/guide/commands" },
          { text: "Permissions", link: "/guide/permissions" },
          { text: "Configuration", link: "/guide/configuration" },
          { text: "Data Storage", link: "/guide/data-storage" },
          { text: "Grant Permissions", link: "/guide/permission-plugin" },
          { text: "Web API", link: "/guide/web-request" },
          { text: "HTTP client", link: "/guide/http-client" },
          { text: "Database Access", link: "/guide/database" },
          { text: "Timers", link: "/guide/timers" },
        ],
      }
    ],
    socialLinks: [{ icon: "discord", link: "https://discord.gg/f5x7zAm4pF" },
      { icon: "github", link: "https://github.com/Oxygen-SCUM" }
    ],

    editLink: {
      pattern: 'https://github.com/Oxygen-SCUM/oxygen.docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    // 2. Настройка "Last updated"
    // Важно: текст будет на английском, если не настроить перевод
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short', // Выведет дату в формате DD.MM.YY
        timeStyle: 'short'  // Выведет время HH:MM
      }
    }
  },
});
