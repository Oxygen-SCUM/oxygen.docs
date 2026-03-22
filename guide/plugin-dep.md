---
title: Inter-Plugin Communication (API)
description: How the automated dependency system works in Oxygen and how to call methods from other plugins.
outline: deep
---

# Inter-Plugin Communication (API)

The **Oxygen** plugin system is built on a modern architecture with automatic dependency resolution. This means you **do not** need to use complex reflection, dictionaries, or third-party libraries (API bridges) for plugins to communicate with each other.

The server core automatically analyzes your source code, finds `using` directives, and builds the correct compilation and loading queue. If a parent plugin is updated on the fly, all dependent plugins are automatically and safely recompiled without crashing!

---

## 1. Creating a Parent Plugin (Exporting API)

To allow other plugins to use your methods (e.g., granting money or checking VIP status), you need to follow two simple steps:

1. Define a **unique** `namespace`.
2. Make the methods you want to export `public static`.

**Example: `EconomyCore.cs`**

```csharp
using System;
using Oxygen.Csharp.API;

// 1. Unique namespace. The core uses this to track dependencies.
namespace Oxygen.Plugins.Economy 
{
    public class EconomyCore : OxygenPlugin
    {
        public override string Name => "Economy Core";
        public override string Author => "Admin";
        public override string Version => "1.0.0";
        
        // 2. Public static method, available to all other plugins
        public static void AddMoney(player PlayerBase, int amount)
        {
            // Your logic for adding money
            Console.WriteLine($"[Economy] Added {amount} coins to player {player.SteamId}.");
        }
    }
}
```

---

## 2. Calling Methods from Another Plugin (Importing API)

To use `EconomyCore` in your plugin, you **do not** need to define dependency attributes or call core methods manually. Just add a `using` directive with the parent plugin's namespace and call the method directly!

The Oxygen core will automatically detect this `using`, compile `EconomyCore` first, and then pass a reference of it to your plugin.

**Example: `TestGive.cs`**

```csharp
using System;
using Oxygen.Csharp.API;

// 1. Simply include the parent plugin's namespace!
using Oxygen.Plugins.Economy; 

namespace Oxygen.Plugins.TestGive
{
    public class TestGiveClass : OxygenPlugin
    {
        public override string Name => "Test Give Bonus";

        public void GiveBonusCommand(player PlayerBase, string[] args)
        {
            // 2. Call the method directly, as if it were part of your own code.
            // You get full IntelliSense and strict type checking!
            EconomyCore.AddMoney(player, 1000); 
            
            Console.WriteLine("Bonus successfully granted!");
        }
    }
}
```

---

## Important Safety Rules (Hot Reload)

To ensure the "Hot Reload" system works perfectly and doesn't crash the server during file updates, follow these rules:

1. **No Circular Dependencies:** Do not make `Plugin A` depend on `Plugin B` while `Plugin B` depends on `Plugin A`. The core will throw a compilation error because it cannot determine which one should load first. If plugins need two-way communication, extract their shared data into a third plugin (e.g., `SharedDataCore`).
2. **Unique Namespaces:** Always use logical and unique namespaces (e.g., `MyServer.Plugins.ModuleName`) to avoid conflicts between plugins from different authors.
3. **Static Access:** Since class instances are completely destroyed and recreated during a Hot Reload, it is best to use `static` methods or the Singleton pattern (`public static MyPlugin Instance { get; private set; }`) for cross-plugin interactions.