# Plugin Structure

Every Oxygen plugin is a standalone `.cs` file that is compiled on the fly. To be recognized by the framework, your code must follow a specific structure.

## 1. Namespaces

At the beginning of the file, you must include the core Oxygen libraries to access player objects, items, and framework internals.

```csharp
using System;
using Oxygen.Csharp.API;   // Access to PlayerBase, Item, Color, etc.
using Oxygen.Csharp.Core;  // Core framework logic and base classes
```

---

## 2. Plugin Metadata (Attributes)

Before the class definition, you must provide metadata using attributes. This helps Oxygen identify your plugin in logs and the plugin list.

| Attribute | Parameters | Description |
| :--- | :--- | :--- |
| `[Info]` | `"Name", "Author", "Version"` | **Required.** Basic plugin identification. |
| `[Description]` | `"Text"` | A short summary of what the plugin does. |

```csharp
[Info("My Plugin", "DeveloperName", "1.0.0")]
[Description("A test plugin showing the modern Oxygen architecture")]
public class MyPlugin : OxygenPlugin
{
    // Plugin logic goes here
}
```

---

## 3. Class Inheritance

Your main class **must** be `public` and inherit from the base class `OxygenPlugin`. This inheritance grants you access to all framework methods, such as configuration loading, data storage, and logging.

---

## 4. Lifecycle Hooks

Oxygen uses a hook-based system to manage a plugin's state.

### `OnLoad()`
Triggered when the plugin is initialized (either when the server starts or when you save the `.cs` file). This is where you should load configs, set up timers, or initialize data.

### `OnUnload()`
Triggered before the plugin is removed from memory. Use this to save persistent data (`SaveData`) or clean up active resources.

```csharp
public override void OnLoad()
{
    Conlose.WriteLine("Plugin has been successfully started!");
}

public override void OnUnload()
{
    Conlose.WriteLine("Plugin is shutting down safely.");
}
```

---

## 5. Commands and Handlers

Methods that respond to player input (like chat messages) are registered using the `[Command]` attribute.

```csharp
[Command("test")]
private void OnTest(PlayerBase player, string[] args)
{
    // 'player' is the object of the person who ran the command
    // 'args' is an array of words following the command (/test arg1 arg2)
    
    player.Reply("Oxygen is working perfectly!", Color.Green);
}
```

---

## Plugin Cheat Sheet (Template)

Copy and paste this template to start creating a new plugin:

```csharp
using System;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Core;

[Info("Template", "YourName", "1.0.0")]
public class Template : OxygenPlugin
{
    // 1. Initialization
    public override void OnLoad()
    {
        Conlose.WriteLine("Plugin Loaded");
    }

    // 2. Commands & Logic
    [Command("hello")]
    private void HelloCommand(PlayerBase player, string[] args)
    {
        player.Reply("Hello from your new plugin!");
    }

    // 3. Cleanup
    public override void OnUnload()
    {
        Conlose.WriteLine("Plugin Unloaded");
    }
}
```

---

## Next Steps
* [Hook Reference](/hooks/player-connected) — Complete list of events like `OnPlayerConnected` or `OnPlayerDie`.
* [PlayerBase](/api/players-methods) — Detailed interaction with player inventory and stats.