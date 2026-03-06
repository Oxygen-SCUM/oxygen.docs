# Configuring Plugins

Most Oxygen plugins generate JSON configuration files that allow you to customize behavior without modifying code. This guide explains how to locate, edit, and manage these settings safely.

## Understanding Configuration Files

### Config vs. Data Files
It's important to distinguish between files you should edit and files the system manages:

| Config Files | Data Files |
| :--- | :--- |
| **Location**: `oxygen/configs/` | **Location**: `oxygen/data/` |
| **Purpose**: Plugin settings and behavior | **Purpose**: Runtime data and state |
| **Edited by**: Server administrators | **Managed by**: Plugins (auto-saved) |
| **Safe to edit**: ✅ Yes | **Safe to edit**: ❌ No |

::: warning
Never manually edit **data files** (e.g., player balances, database mirrors) unless you are an expert. Edit **config files** only.
:::

---

## Locating & Editing Configs

### Directory & Naming
All configuration files are stored in:
```text
SCUM/Binaries/Win64/oxygen/configs/
```
The config file name always matches the plugin's filename (e.g., `Kits.cs` creates `Kits.json`).

### The Edit Process
1. **Backup**: Always copy the original `.json` before editing.
2. **Tools**: Use **VS Code** or **Notepad++**. Avoid standard Windows Notepad as it can break file encoding.
3. **Edit**: Modify values carefully (strings, numbers, or booleans).
4. **Validate**: Use [jsonlint.com](https://jsonlint.com) to ensure your JSON structure is correct.

---

## Applying Changes (Hot-Reload)

Oxygen **does not** use manual reload commands. Instead, it monitors file changes in real-time.

### How to trigger a reload:
1. Save your changes in the `.json` config file.
2. Open the corresponding `.cs` plugin file (in `oxygen/plugins/`).
3. **Simply Save the `.cs` file** (even without making any changes).
4. Oxygen detects the "touch" on the source file, recompiles it, and automatically injects the new configuration values.

---

## JSON Syntax Basics

JSON is extremely strict. One missing comma or quote will prevent the plugin from loading.

### Value Types
```json
{
  "StringValue": "text here",   // Text must be in double quotes
  "NumberValue": 100,           // No quotes for numbers
  "BooleanValue": true,         // true or false (lowercase)
  "ArrayValue": ["A", "B"],     // Lists of items
  "ObjectValue": {              // Nested groups
    "Key": "Value"
  }
}
```

### Common Syntax Rules
| Rule | Correct | Incorrect |
| :--- | :--- | :--- |
| **Double Quotes** | `"Enabled": true` | `'Enabled': true` ❌ |
| **Comma Separation** | `"A": 1, "B": 2` | `"A": 1 "B": 2` ❌ |
| **No Trailing Comma** | `"A": 1, "B": 2 }` | `"A": 1, "B": 2, }` ❌ |
| **Boolean Case** | `true` / `false` | `True` / `False` ❌ |

---

## Troubleshooting

### Plugin Fails to Load After Edit
* **Cause**: Invalid JSON syntax.
* **Fix**: Check `/logs/OxygenError.log` for "Serialization" errors. Use a JSON validator to find missing commas or brackets.

### Changes Are Not Visible In-Game
* **Cause**: The plugin hasn't reloaded yet.
* **Fix**: You must "touch" (re-save) the `.cs` plugin file to trigger the Hot-Reload engine. Saving the `.json` alone is not enough.

### Config Resets to Default
* **Cause**: Some plugins overwrite the config if they detect a completely corrupted JSON file.
* **Fix**: Restore your backup, fix the syntax, and then reload the plugin.

---

## Best Practices
1. **One Change at a Time**: Don't rewrite the whole config. Change one value, reload, and verify.
2. **Version Control**: Keep a folder with backups of your working configs.
3. **Comments**: JSON doesn't support comments, so keep a separate `.txt` file for your notes on what specific values do.