# Managing Permissions

Oxygen includes a comprehensive permission system that allows you to control who can use specific commands and features on your server. This guide explains how to set up and manage permissions effectively.

## Understanding Permissions

### What are Permissions?

Each permission in Oxygen is a string that represents an ability or access right. Permissions typically follow the format `pluginname.permission`.

For example:
- `kits.vip` - Allows access to VIP kits
- `admin.kick` - Allows kick command
- `teleport.home` - Allows teleport home command

When a player executes a command, Oxygen checks if they have the required permission. If they do, the command executes; otherwise, access is denied.

### Permission Hierarchy

Oxygen supports three ways to assign permissions:

1. **User Permissions** - Granted directly to a specific player (by SteamID64)
2. **Group Permissions** - Granted to a group; all group members inherit these permissions
3. **Wildcard Permissions** - Special patterns that grant multiple permissions at once

### Key Concepts

- **Permission**: A string token (e.g., `kits.vip`, `admin.ban`)
- **User**: A player identified by SteamID64
- **Group**: A named collection of permissions (e.g., "admin", "vip", "moderator")
- **Inheritance**: Groups can inherit from parent groups
- **Wildcard (`*`)**: Grants **all** permissions (super admin access)

## First Time Setup (Becoming Admin)

When you first install Oxygen, **no one has permissions**. You must manually grant yourself admin access.

### Step 1: Get Your SteamID64

Find your SteamID64 using one of these methods:
- Visit [steamid.io](https://steamid.io) and enter your Steam profile URL
- In SCUM, open console with `F1` and type `GetUserID`
- Check your server logs after joining

### Step 2: Edit the Users File

1. Start your server once to generate the file structure
2. Navigate to: `SCUM/Binaries/Win64/oxygen/data/`
3. Open `oxygen.users.json`
4. Add your SteamID with full permissions:

```json
{
  "Users": {
    "76561198000000000": {
      "LastNickName": "YourName",
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

5. Save the file
6. **Restart the server**

You now have full admin access!

## Installing the AdminManager Plugin

To manage permissions in-game, you need the AdminManager plugin:

1. Download `AdminManager.cs` from the [official repository](https://github.com/Oxygen-SCUM/oxygen.plugins/blob/main/AdminManager.cs)
2. Place it in `SCUM/Binaries/Win64/oxygen/plugins/`
3. The plugin will auto-load (check console for confirmation)

## Permission Commands

::: tip COMMAND PREFIX
All commands are used in-game chat. Press `T` to open chat, then type the command.
:::

### Viewing Permissions

Check what permissions exist and who has them:

| Command | Description | Example |
| :--- | :--- | :--- |
| `/permissions` | Shows all registered permissions | `/permissions` |

### Managing Users

Grant or revoke permissions for specific players:

| Command | Syntax | Description |
| :--- | :--- | :--- |
| `/grant user` | `/grant user <SteamID> <permission>` | Grants a permission to a player |
| `/revoke user` | `/revoke user <SteamID> <permission>` | Removes a permission from a player |

**Examples:**
```
/grant user 76561198123456789 kits.vip
/grant user 76561198123456789 admin.kick
/revoke user 76561198123456789 teleport.bypass
```

### Managing Groups

Create and configure permission groups:

| Command | Syntax | Description |
| :--- | :--- | :--- |
| `/group add` | `/group add <SteamID> <groupname>` | Adds a player to a group |
| `/group remove` | `/group remove <SteamID> <groupname>` | Removes a player from a group |
| `/grant group` | `/grant group <groupname> <permission>` | Grants a permission to a group |
| `/revoke group` | `/revoke group <groupname> <permission>` | Removes a permission from a group |

**Examples:**
```
/group add 76561198123456789 vip
/group add 76561198123456789 moderator
/group remove 76561198123456789 default

/grant group moderator admin.kick
/grant group moderator admin.mute
/grant group vip kits.vip
/revoke group default chat.color
```

### Using Wildcards

Wildcards grant multiple permissions with one command:

| Pattern | What it Grants | Example |
| :--- | :--- | :--- |
| `*` | **All permissions** (super admin) | `/grant user 76561198000000001 *` |
| `admin.*` | All admin permissions | `/grant group moderator admin.*` |
| `kits.*` | All kit permissions | `/grant group vip kits.*` |

**Examples:**
```
/grant group admin *
/grant group moderator admin.*
/grant user 76561198000000001 kits.*
```

## Tutorial: Setting Up a VIP Group

Here's a complete walkthrough for creating a VIP group with specific permissions.

### Step 1: Create the Group Structure

Edit `SCUM/Binaries/Win64/oxygen/data/oxygen.groups.json`:

```json
{
  "Groups": {
    "default": {
      "Title": "Player",
      "Rank": 0,
      "Permissions": []
    },
    "vip": {
      "Title": "VIP Member",
      "Rank": 10,
      "ParentGroup": "default",
      "Permissions": []
    },
    "admin": {
      "Title": "Administrator",
      "Rank": 100,
      "Permissions": ["*"]
    }
  }
}
```

**Save and restart the server.**

### Step 2: Add Permissions to VIP Group

In-game, open chat and grant permissions:

```
/grant group vip kits.vip
/grant group vip chat.color
/grant group vip teleport.home
```

### Step 3: Add Players to VIP Group

```
/group add 76561198123456789 vip
/group add 76561198987654321 vip
```

### Step 4: Verify

Check the group file again - it should now show:

```json
{
  "Groups": {
    "vip": {
      "Title": "VIP Member",
      "Rank": 10,
      "ParentGroup": "default",
      "Permissions": [
        "kits.vip",
        "chat.color",
        "teleport.home"
      ]
    }
  }
}
```

## Permission Files Reference

### oxygen.users.json

Stores individual user permissions and group memberships:

```json
{
  "Users": {
    "76561198000000000": {
      "LastNickName": "PlayerName",
      "Permissions": [
        "custom.permission"
      ],
      "Groups": [
        "admin",
        "vip"
      ]
    }
  }
}
```

### oxygen.groups.json

Stores group definitions, permissions, and hierarchy:

```json
{
  "Groups": {
    "moderator": {
      "Title": "Moderator",
      "Rank": 50,
      "ParentGroup": "default",
      "Permissions": [
        "admin.kick",
        "admin.mute",
        "admin.warn"
      ]
    }
  }
}
```

## Best Practices

### 1. Use Groups Instead of Individual Permissions

**Don't do this:**
```
/grant user 76561198000000001 admin.kick
/grant user 76561198000000001 admin.ban
/grant user 76561198000000001 admin.mute
```

**Do this instead:**
```
/grant group moderator admin.kick
/grant group moderator admin.ban
/grant group moderator admin.mute
/group add 76561198000000001 moderator
```

### 2. Hierarchical Group Structure

Create a permission hierarchy:

```
default (0) → vip (10) → moderator (50) → admin (100)
```

- `default`: Basic player permissions
- `vip`: Enhanced features
- `moderator`: Chat/moderation powers
- `admin`: Full server control

### 3. Limit Super Admin Access

Only grant `*` permission to trusted owners:

```json
{
  "Groups": {
    "owner": {
      "Title": "Owner",
      "Rank": 999,
      "Permissions": ["*"]
    },
    "admin": {
      "Title": "Admin",
      "Rank": 100,
      "Permissions": [
        "admin.*",
        "teleport.*"
      ]
    }
  }
}
```

### 4. Regular Audits

Periodically review:
- Who has `*` (super admin) permission
- Inactive users with elevated permissions
- Group permission overlap

## Troubleshooting

### Permission Not Working

1. **Check spelling** - Permissions are case-sensitive
2. **Restart may be needed** - Some permission changes require plugin reload
3. **Check inheritance** - Group permissions override user permissions
4. **Verify plugin is loaded** - Check console for plugin load messages

### Player Cannot Use Command

1. Check their permissions:
   - View `oxygen.users.json` for their SteamID
   - Check which groups they're in
2. Check the plugin is loaded:
   - Look for load messages in console
3. Verify the permission string:
   - Check plugin documentation for exact permission name

### Groups Not Working

1. **Check JSON syntax** - Use [jsonlint.com](https://jsonlint.com) to validate
2. **Restart after editing files** - File changes require server restart
3. **Check parent group** - Ensure no circular references (Group A → Group B → Group A)

### Permission Commands Not Available

- Ensure `AdminManager.cs` plugin is loaded
- Check console for plugin errors
- Verify you have permission to use permission commands

## Plugin Developer Reference

If you're developing plugins, check permissions using:

### Attribute-Based (Recommended)

```csharp
[Command("vipkit")]
[Permission("kits.vip")]
private void VIPKitCommand(PlayerBase player, string[] args)
{
    // Only executes if player has 'kits.vip' permission
    player.Reply("Here's your VIP kit!");
}
```

### Manual Check

```csharp
[Command("heal")]
private void HealCommand(PlayerBase player, string[] args)
{
    if (player.HasPermission("vip.fastheal"))
    {
        player.Reply("Instant VIP heal!");
    }
    else
    {
        player.Reply("Healing in 10 seconds...");
    }
}
```

## Related Docs

- [Installing Plugins](/guide/owners/installing-plugins) - How to add plugins that use permissions
- [Configuring Plugins](/guide/owners/configuring-plugins) - Configure permission-based features
- [Admin Commands](/guide/admin-commands) - Commands available with proper permissions
