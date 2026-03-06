# Installing Plugins

Plugins are C# code files that extend your SCUM server's functionality. This guide explains how to find, install, update, and troubleshoot Oxygen plugins.

## Prerequisites

Before installing plugins, ensure you have:

1. **Oxygen installed** - See [Installing Oxygen](/guide/owners/installing-oxygen)
2. **Server file access** - Ability to upload files to your server
3. **Basic understanding** - of your server's directory structure

## Understanding Plugin Files

Oxygen plugins are distributed as **C# source files** with a `.cs` extension.

Key characteristics:
- **File format**: `.cs` (C# source code)
- **Auto-compilation**: Oxygen automatically compiles plugins when they're placed in the plugins folder
- **Hot-reload**: Oxygen detects file changes and reloads plugins without server restart

::: tip HOT RELOAD
You **do not** need to restart your server to install or update plugins. Simply drop the `.cs` file into the plugins folder, and Oxygen will compile and load it automatically.
:::

## Plugin Directory Structure

Plugins are stored in the Oxygen plugins directory:

```
SCUM/
└── Binaries/
    └── Win64/
        └── oxygen/
            ├── plugins/        ← Place .cs files here
            │   ├── MyPlugin.cs
            │   ├── AdminTools.cs
            │   └── Kits.cs
            ├── configs/        ← Auto-generated config files
            │   ├── MyPlugin.json
            │   └── Kits.json
            └── data/           ← Plugin data storage
         └── logs/           ← OxygenError.log
```

## Finding Plugins

### Official Repository

The primary source for Oxygen plugins:

**[Oxygen Plugins Repository](https://github.com/Oxygen-SCUM/oxygen.plugins)**

Browse available plugins and download the `.cs` files directly.

### Community Sources

- Discord server plugin channels
- Developer GitHub repositories
- Community forums

::: warning SECURITY
Only install plugins from trusted sources. Plugins have full access to your server and can execute arbitrary code.
:::

### What to Check Before Installing

When evaluating a plugin:

1. **Source reputation** - Is it from a trusted developer?
2. **Code review** - Can you or someone you trust review the source?
3. **Dependencies** - Does it require other plugins or extensions?
4. **Compatibility** - Is it compatible with your Oxygen version?
5. **Documentation** - Does it include setup instructions?

## Installing a Plugin

### Method 1: Direct Installation (Server Running)

If your server is running:

1. **Download the plugin** `.cs` file
2. **Navigate** to `SCUM/Binaries/Win64/oxygen/plugins/`
3. **Upload/Copy** the `.cs` file to this directory and trigger file edit
4. **Watch the console** - you should see:
   ```
   [Oxygen] Compiling plugin "PluginName"...
   [Oxygen] Plugin "PluginName" v1.0.0 loaded successfully
   ```

### Method 2: Server Stopped Installation

If your server is stopped:

1. **Download the plugin** `.cs` file
2. **Copy** to `SCUM/Binaries/Win64/oxygen/plugins/`
3. **Start the server**
4. **Check console** for confirmation

### Verification

After installation, verify the plugin loaded correctly:

1. **Check console output**:
   ```
   [Oxygen] Loading plugin "PluginName" v1.0.0
   ```

2. **Look for config file creation**:
   - Check `oxygen/configs/` for `PluginName.json`
   - Many plugins auto-generate config files on first load

3. **Test plugin functionality**:
   - Try a plugin command in-game
   - Check if the plugin's features work as expected

## Plugin Structure Example

Here's what a basic Oxygen plugin looks like:

```csharp
using System;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Core;

[Info("My Plugin", "Developer", "1.0.0")]
[Description("Test plugin showing the new architecture")]
public class MyPlugin : OxygenPlugin
{
    public override void OnLoad()
    {
        Console.WriteLine("My Plugin loaded!");
    }

    [Command("test")]
    [Permission("myplugin.use")]
    private void TestCommand(PlayerBase player, string[] args)
    {
        player.Reply("Plugin is working!");
    }
}
```

When this plugin loads, Oxygen:
1. Compiles the C# code
2. Creates a config file (if the plugin defines one)
3. Registers commands and permissions
4. Calls `OnLoad()` method

## Updating Plugins

### Standard Update Process

To update an existing plugin:

1. **Download the latest version** of the `.cs` file
2. **Replace the old file** in `oxygen/plugins/` with the new one
3. Oxygen will **automatically detect** the change and reload the plugin
4. **Watch console** for reload confirmation:
   ```
   [Oxygen] Detected file change: PluginName.cs
   [Oxygen] Reloading plugin "PluginName"...
   [Oxygen] Plugin "PluginName" v1.1.0 loaded successfully
   ```

::: warning CONFIG COMPATIBILITY
Some plugin updates change the config file structure. Check the plugin's changelog before updating.
:::

### Handling Config Changes

If a plugin update changes config format:

1. **Backup your current config**:
   ```
   oxygen/configs/PluginName.json → PluginName.json.backup
   ```

2. **Update the plugin** (replace the `.cs` file)

3. **Check the new config**:
   - Oxygen will generate a new default config
   - Manually merge your old settings into the new structure

4. **Test thoroughly** before going live

## Uninstalling Plugins

To remove a plugin:

### Standard Uninstall

1. **Delete the plugin file**:
   - Remove `PluginName.cs` from `oxygen/plugins/`

2. Oxygen will **automatically unload** it:
   ```
   [Oxygen] Plugin "PluginName" unloaded
   ```

### Clean Uninstall

To completely remove all traces:

1. **Delete the plugin file**: `oxygen/plugins/PluginName.cs`
2. **Delete the config file**: `oxygen/configs/PluginName.json`
3. **Delete data files**: `oxygen/data/PluginName.json` (if it exists)
4. **Clean up permissions** (if applicable):
   - Remove group permissions related to the plugin
   - Remove user permissions related to the plugin

## Troubleshooting

### Plugin Won't Load

Check the console and logs for error messages:

```
[Oxygen] Error compiling plugin "PluginName": ...
```

Common causes:

| Issue | Solution |
| :--- | :--- |
| **Compilation errors** | Plugin code has syntax errors; contact developer |
| **Missing dependencies** | Plugin requires another plugin; install dependencies first |
| **Version incompatibility** | Plugin written for older/newer Oxygen version |
| **File permissions** | Ensure Oxygen can read the `.cs` file |

### Check Plugin Logs

Detailed error information is in:
```
/logs/OxygenError.log[date]_plugins.log
```

### Plugin Loads But Doesn't Work

1. **Check permissions**:
   - Some plugins require specific permissions
   - Grant yourself test permissions: `/grant user <YourSteamID> pluginname.*`

2. **Review config file**:
   - Check `oxygen/configs/PluginName.json`
   - Ensure settings are correct
   - Validate JSON syntax at [jsonlint.com](https://jsonlint.com)

3. **Check for conflicts**:
   - Two plugins might conflict
   - Try disabling other plugins to isolate the issue

4. **Review plugin documentation**:
   - Some plugins need additional setup steps
   - Check for required dependencies

Or restart the server.

### Plugin Causes Server Lag

If a plugin impacts performance:

1. **Check plugin logs** for repeated errors
2. **Monitor server resources** (CPU, RAM)
3. **Try updating** to the latest version
4. **Contact the developer** with details
5. **Temporarily disable** the plugin if critical

## Plugin Dependencies

Some plugins require other plugins to function:

### Example: AdminManager Dependency

Many admin-focused plugins require `AdminManager.cs` for permission management.

**Installation order:**
1. Install `AdminManager.cs` first
2. Then install dependent plugins

### Checking Dependencies

Plugin documentation usually lists dependencies. Look for:
- Required plugins
- Required Oxygen version
- Required .NET libraries

## Best Practices

### 1. Test in Development First

Before deploying to production:

1. Set up a test server
2. Install and configure the plugin
3. Test all features thoroughly
4. Monitor for errors and performance issues

### 2. Keep Backups

Before major changes:

```
# Backup plugins
oxygen/plugins/ → plugins_backup/

# Backup configs
oxygen/configs/ → configs_backup/

# Backup data
oxygen/data/ → data_backup/
```

### 3. Document Your Plugins

Maintain a list of installed plugins:

```
Installed Plugins:
- AdminManager v1.0.0 (permission management)
- Kits v2.1.0 (player kit system)
- Teleport v1.5.0 (teleportation commands)
```

### 4. Update Regularly

- Check for plugin updates weekly
- Subscribe to plugin update notifications
- Read changelogs before updating

### 5. Monitor Plugin Health

Regularly check:
- Console for error messages
- `/logs/OxygenError.log` for warnings
- Server performance metrics

## Example Installation Walkthrough

Let's install a fictional "Kits" plugin:

### Step 1: Download

Download `Kits.cs` from the repository.

### Step 2: Upload

Copy to: `SCUM/Binaries/Win64/oxygen/plugins/Kits.cs`

### Step 3: Verify Load

Check console:
```
[Oxygen] Compiling plugin "Kits"...
[Oxygen] Plugin "Kits" v1.0.0 by DevName loaded successfully
```

### Step 4: Configure

Edit generated config at `oxygen/configs/Kits.json`:

```json
{
  "VIPKit": {
    "Items": ["Rifle", "Ammo", "Food"],
    "Cooldown": 3600
  }
}
```

### Step 5: Set Permissions

```
/grant group vip kits.vip
```

### Step 6: Test

In-game:
```
/kit vip
```

## Next Steps

After installing plugins:

1. [Configure plugins](/guide/owners/configuring-plugins) to customize behavior
2. [Set up permissions](/guide/owners/managing-permissions) to control access
3. [Understand data files](/guide/owners/data-files) for plugin persistence

## Getting Help

If you encounter plugin issues:

1. **Check plugin documentation** for setup instructions
2. **Review error logs** in `logs/OxygenError.log`
3. **Contact the plugin developer** with:
   - Error messages
   - Oxygen version
   - Server setup details
4. **Ask the community** in Discord or forums
