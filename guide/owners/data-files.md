# Understanding Data Files

Data files are JSON files used by plugins to store persistent information (player stats, balances, homes). Unlike **Config Files**, which define *how* a plugin works, **Data Files** store the *results* of its work.

## Data Files vs. Config Files

| Feature | Config Files (`/configs/`) | Data Files (`/data/`) |
| :--- | :--- | :--- |
| **Purpose** | Settings and behavior | Persistent storage and state |
| **Managed by** | Server Administrator | Plugins (Automatic) |
| **Editing** | ✅ Safe (Hot-Reload) | ❌ Dangerous (Requires Stop) |
| **Examples** | Cooldowns, Feature toggles | Player XP, Bank balances, Homes |

::: danger CRITICAL WARNING
**Do not manually edit data files while the server is running.** Most plugins save data on shutdown or periodically, meaning your manual changes will likely be overwritten or cause a crash.
:::

---

## Location & Structure

All data is stored in:
```text
SCUM/Binaries/Win64/oxygen/data/
```

### Common Framework Files
Oxygen uses these core files to manage the server:
* **`oxygen.users.json`**: Individual player permissions and group assignments.
* **`oxygen.groups.json`**: Definitions of groups (Admin, VIP, etc.) and their inherited permissions.

### Example: Player Statistics
```json
{
  "76561198000000001": {
    "PlayerName": "John",
    "Kills": 45,
    "PlayTime": 154320,
    "LastSeen": "2026-03-06T14:30:00"
  }
}
```

---

## When and How to Edit

Manual editing is only recommended for **Permissions** or **Emergency Fixes**.

### Safe Edit Workflow
1. **Stop the Server**: This is mandatory to prevent data overwriting.
2. **Backup**: Copy the file to `filename.json.bak`.
3. **Edit**: Use a JSON-friendly editor (VS Code / Notepad++).
4. **Validate**: Check your syntax at [jsonlint.com](https://jsonlint.com).
5. **Start the Server**: Oxygen will load the updated data on startup.

---

## Backup Strategy

Data files are the most valuable part of your server. If they are lost, your players lose all progress.

| Type | Frequency | Why |
| :--- | :--- | :--- |
| **Permissions** | After every change | To restore admin access |
| **Economy/Stats** | Daily (Automated) | To prevent progress loss after crashes |
| **Full Data Folder**| Weekly | For total server migration/recovery |

```powershell
# Quick PowerShell Backup Example
$date = Get-Date -Format "yyyy-MM-dd"
Copy-Item -Recurse "oxygen/data" "backups/data_$date"
```

---

## Troubleshooting

### Plugin ignores manual changes
* **Reason**: You edited the file while the server was running. The plugin saved its internal memory to the disk upon shutdown/autosave, wiping your edits.
* **Fix**: Stop the server first, then edit.

### Plugin fails to load (Parsing Error)
* **Reason**: Broken JSON syntax (missing comma, unclosed bracket).
* **Fix**: Check `/logs/OxygenError.log` for "Serialization" errors. Use a JSON validator to find the exact line with the error.

### Data loss after a crash
* **Reason**: The server crashed before the plugin could perform its scheduled `SaveData()`.
* **Fix**: Check if the plugin has an `AutoSaveInterval` setting in its config and reduce it to 5-10 minutes.

---

## Developer Reference (API)

If you are writing a plugin, use these methods to interact with the data folder:

```csharp
// Loading data (usually in OnLoad)
_stats = LoadData<Dictionary<string, PlayerData>>("PlayerStats");

// Saving data (usually in OnUnload or Events)
SaveData("PlayerStats", _stats);
```