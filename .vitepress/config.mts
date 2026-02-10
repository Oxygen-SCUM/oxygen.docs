import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Oxygen",
  description: "C# Plugin System for SCUM Server",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started" }
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Installation & Updater", link: "/guide/updater" },
          { text: "Notifications", link: "/guide/notifications" },
          { text: "Admin commands", link: "/guide/admin-commands" },
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
            text: "Player (8)",
            collapsed: true,
            items: [
            { text: "OnPlayerConnected", link: "/hooks/player-connected" },
            { text: "OnPlayerDisconnected", link: "/hooks/player-disconnected" },
            { text: "OnPlayerDeath", link: "/hooks/player-death" },
            { text: "OnPlayerMeleeAttack", link: "/hooks/player-meleeAttack" },
            { text: "OnPlayerMiniGameEnded", link: "/hooks/player-miniGameEnded" },
            { text: "OnPlayerOpenInventory", link: "/hooks/player-openInventory" },
            { text: "OnPlayerTakeItemInHands", link: "/hooks/player-takeItemInHands" },
            { text: "OnPlayerLockPickEnded", link: "/hooks/player-lockPickEnded" },
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
          // { text: "Permissions", link: "/guide/permissions" },
          { text: "Events", link: "/guide/events" },
          { text: "Configuration", link: "/guide/configuration" },
          { text: "Data Storage", link: "/guide/data-storage" },
          // { text: "Grant Permissions", link: "/guide/permission-plugin" },
          { text: "Web API", link: "/guide/web-request" },
          { text: "HTTP client", link: "/guide/http-client" },
          { text: "Database Access", link: "/guide/database" },
          { text: "Timers", link: "/guide/timers" },
        ],
      }
    ],
    socialLinks: [{ icon: "discord", link: "https://discord.gg/f5x7zAm4pF" },
      { icon: "github", link: "https://github.com/Jemixs/Oxygen-scum-server-plugin" }
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
