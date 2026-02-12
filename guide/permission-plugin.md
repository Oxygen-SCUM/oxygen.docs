# Permissions System

Oxygen Framework includes a robust, asynchronous permission system. It allows server owners to assign access rights to specific users or entire groups.

## Key Concepts

- **Permission:** A string token representing an ability (e.g., `kits.vip`, `admin.ban`).
- **User:** A player identified by their SteamID64. Users can have individual permissions.
- **Group:** A named collection of permissions (e.g., "vip", "moderator").
- **Inheritance:** Groups can inherit permissions from parent groups (e.g., `vip` inherits from `default`).
- **Wildcard (`*`):** A special character that grants **all** permissions. Used for SuperAdmins.

## Initial Setup (First Admin)

When you launch the server for the first time, you have no permissions. You cannot use admin commands yet.

1.  Start the server once to generate the configuration files.
2.  Navigate to `SCUM/Binaries/Win64/oxygen/data/`.
3.  Open **`oxygen.users.json`**.
4.  You will see a template entry. Replace `"YOUR_STEAM_ID_HERE"` with your real **SteamID64**.

```json
{
  "Users": {
    "76561198000000000": {
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

5.  Restart the server. You now have full access.

## Admin Commands

Assuming you have the **AdminManager** plugin installed, you can manage permissions via in-game chat.

### Granting & Revoking Permissions

| Command | Syntax | Description |
| :--- | :--- | :--- |
| **/grant user** | `/grant user <SteamID> <perm>` | Grants a permission to a specific player. |
| **/grant group** | `/grant group <name> <perm>` | Grants a permission to a whole group. |
| **/revoke user** | `/revoke user <SteamID> <perm>` | Removes a permission from a player. |
| **/revoke group** | `/revoke group <name> <perm>` | Removes a permission from a group. |

**Examples:**

- `/grant user 76561198000000001 kits.vip`
- `/grant group admin *` (Gives ALL permissions to admins)
- `/revoke group default chat.color`

### Managing Groups

| Command | Syntax | Description |
| :--- | :--- | :--- |
| **/group add** | `/group add <SteamID> <group>` | Adds a player to a group. |
| **/group remove** | `/group remove <SteamID> <group>` | Removes a player from a group. |

**Examples:**

- `/group add 76561198000000001 vip`
- `/group remove 76561198000000001 admin`

---

## Tutorial: Setting up VIP Group

Here is a step-by-step guide to setting up a VIP group.

### 1. Create the Group

Groups are stored in `data/oxygen.groups.json`. You can create them by editing the file manually (recommended for initial setup) or via code.

Open `data/oxygen.groups.json`:

```json
{
  "Groups": {
    "default": { "Title": "Player", "Rank": 0, "Permissions": [] },
    "admin": { "Title": "Admin", "Rank": 100, "Permissions": ["*"] },

    "vip": {
      "Title": "VIP Player",
      "Rank": 10,
      "ParentGroup": "default", 
      "Permissions": []
    }
  }
}
```

_Save the file and restart the server._

### 2. Add Permissions to Group

In-game, type:
`T` -> `/grant group vip kits.vip`
`T` -> `/grant group vip chat.color`

### 3. Add User to Group

`T` -> `/group add 76561198123456789 vip`

Now this user automatically has `kits.vip` and `chat.color`.

## Developer API

Developers can check permissions in their plugins using the `PlayerBase` object or attributes.

### Attribute Check (Recommended)

```csharp
[Command("mycmd")]
[Permission("myplugin.use")] // Automatically checks permission
private async Task MyCommand(PlayerBase player, string[] args)
{
    player.Reply("You have access!");
}
```

### Manual Check

```csharp
if (player.HasPermission("myplugin.admin"))
{
    // Do admin stuff
}
```

## Download

U can donwnload the plugin on official Oxygen repository
https://github.com/Oxygen-SCUM/oxygen.plugins/blob/main/AdminManager.cs

