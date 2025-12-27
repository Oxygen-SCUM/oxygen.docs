# Permissions System

# <span style="color: orange; font-weight: bold;">DISABLED</span>

Oxygen Framework includes a robust permission system.

## Concepts

- **User:** A player identified by SteamID64.
- **Group:** A collection of permissions (e.g., "admin", "vip"). Users can be in multiple groups.
- **Permission:** A string token (e.g., `kits.vip`, `admin.kick`).
- **Wildcards:** Supporting `*` for full access or `kits.*` for partial categories.

## Using Permissions in Plugins

### 1. Attribute (Recommended)
The simplest way to protect a command. The system automatically checks if the user has the permission before running the method.

```csharp
[Command("kick")]
[Permission("admin.kick")] // <--- Auto-check
private void OnKick(string id, string[] args)
{
    // Logic executes only if user has 'admin.kick' or 'admin.*' or '*'
    Reply(id, "Kicked!");
}
```

### 2. Manual Check
Use `HasPermission` for logic branching (e.g., VIPs get better rewards).

```csharp
[Command("heal")]
private void OnHeal(string id, string[] args)
{
    if (HasPermission(id, "vip.fastheal"))
    {
        Reply(id, "Instant heal applied (VIP)!");
    }
    else
    {
        Reply(id, "Healing... please wait 10s.");
    }
}
```

## How to become an Admin

When you first start the server, no one has permissions. You need to manually edit the data file to give yourself the `*` (Super Admin) permission.

1. Start the server once to generate files.
2. Open `data/oxygen.users.json`.
3. Find your SteamID section or add it:

```json
{
  "Users": {
    "YOUR_STEAM_ID_HERE": {
      "LastNickName": "Admin",
      "Permissions": [
        "*" 
      ],
      "Groups": [
        "admin"
      ]
    }
  }
}
```

4. Save the file and reload the server (or a plugin). You now have full access.
