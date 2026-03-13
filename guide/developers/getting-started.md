# Getting Started for Plugin Developers

This guide helps you start building Oxygen plugins for SCUM servers. It covers the minimal setup, the plugin file layout, and where to go next.

## What is Oxygen for Developers?

Oxygen provides a C# plugin runtime for SCUM servers. You write plugins in C#, drop them into the server plugin folder, and Oxygen compiles and loads them.

Key developer features:

- C#/.NET 8 runtime for plugins.
- Hot reload of `.cs` files.
- Command and permission attributes.
- Hooks for player and server events.
- Managed timers for delayed and recurring logic.
- JSON config and data persistence helpers.
- HTTP server routes and HTTP client helpers.
- Read-only access to SCUM database data.

## Prerequisites

Before writing your first plugin, ensure:

1. Oxygen is installed and running on a SCUM server.
2. You have file access to the server plugin directory.
3. You have a code editor (VS Code, Rider, or Visual Studio).

If Oxygen is not installed, start with [Installing Oxygen](/guide/owners/installing-oxygen).

## Directory Layout

These directories are used most often during development:

```
SCUM/
└── Binaries/
    └── Win64/
        └── oxygen/
            ├── plugins/        ← C# plugin files (.cs)
            ├── configs/        ← JSON config files
            ├── data/           ← JSON data files
        └── logs/OxygenError.log ← Plugin compilation/runtime logs
```

## Plugin Skeleton

A minimal Oxygen plugin looks like this:

```csharp
using System;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Core;

[Info("My Plugin", "YourName", "1.0.0")]
[Description("Test plugin showing the new architecture")]
public class MyPlugin : OxygenPlugin
{
    public override void OnLoad()
    {
        Console.WriteLine("My Plugin loaded");
    }

    [Command("hello")]
    private void HelloCommand(PlayerBase player, string[] args)
    {
        player.Reply("Hello from Oxygen!");
    }
}
```

Save this as `MyPlugin.cs` in `oxygen/plugins/`. Oxygen will compile and load it.

## Hot Reload

Oxygen automatically detects changes to `.cs` files and reloads plugins. This lets you iterate quickly without restarting the server.

If a plugin fails to load:

- Check `/logs/OxygenError.log` for compile errors.
- Verify your file name and class name are valid.
- Confirm you are using the correct namespaces.

## Core Concepts You Will Use

- **Commands:** [Chat Commands](/guide/commands)
- **Permissions:** [Permissions](/guide/permissions)
- **Player Hooks:** [Player Hooks](/guide/player-hooks)
- **Timers:** [Timers & Delays](/guide/timers)
- **Config Files:** [Configuration](/guide/configuration)
- **Data Storage:** [Data Storage](/guide/data-storage)
- **Web API:** [Web API for Plugins](/guide/web-request)
- **HTTP Client:** [HTTP client](/guide/http-client)
- **Database Access:** [Database Access](/guide/database)

## Next Steps

- [My First Plugin](/guide/first-plugin)
- [Plugin Structure](/guide/plugin-structure)
- [Hooks](/hooks/player-connected)
