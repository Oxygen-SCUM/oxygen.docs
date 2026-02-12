# Permissions System
Oxygen Framework includes a robust, asynchronous permission system.

## Concepts

- **User:** A player identified by SteamID64.
- **Group:** A collection of permissions (e.g., "admin", "vip"). Users can be in multiple groups.
- **Permission:** A string token (e.g., `kits.vip`, `admin.kick`).
- **Wildcards:** Supporting `*` for full access or `kits.*` for partial categories.

## Using Permissions in Plugins (Developer Guide)

### 1. Attribute Check (Recommended)
The simplest way to protect a command. The system automatically checks if the user has the permission before running the method. If they don't, the command execution is blocked.

```csharp
[Command("kick")]
[Permission("admin.kick")] // <--- Auto-check
private async Task OnKick(PlayerBase player, string[] args)
{
    // Logic executes only if user has 'admin.kick' or 'admin.*' or '*'
    player.Reply("Kicked target player!");
}
```

### 2. Manual Check
Use `player.HasPermission(...)` for logic branching (e.g., giving VIPs better rewards or different behavior).

```csharp
[Command("heal")]
private async Task OnHeal(PlayerBase player, string[] args)
{
    if (player.HasPermission("vip.fastheal"))
    {
        player.Reply("Instant heal applied (VIP)!");
        // Apply instant heal logic
    }
    else
    {
        player.Reply("Healing... please wait 10s.");
        // Apply slow heal logic
    }
}
```

## How to become an Admin (First Setup)

When you first start the server, no one has permissions. You need to manually edit the data file to give yourself the `*` (Super Admin) permission.

1.  Start the server once to generate the folder structure.
2.  Navigate to `SCUM/Binaries/Win64/oxygen/data/`.
3.  Open **`oxygen.users.json`**.
4.  Find the template section or add your SteamID:

```json
{
  "Users": {
    "YOUR_STEAM_ID_HERE": {
      "LastNickName": "Owner",
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

5.  Save the file and **restart the server**. You now have full access.