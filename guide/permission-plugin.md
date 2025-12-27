# Permissions & Groups

# <span style="color: orange; font-weight: bold;">DISABLED</span>

Oxygen Framework includes a robust permission system similar to Oxide/uMod. It allows you to assign access rights to specific users or entire groups.

## Key Concepts

- **Permission:** A string token (e.g., `kits.vip`, `admin.ban`).
- **User:** A player identified by SteamID64. Users can have individual permissions.
- **Group:** A named collection of permissions (e.g., "vip", "moderator").
- **Inheritance:** Groups can inherit permissions from other groups (e.g., `superadmin` inherits from `admin`).

---

## Admin Commands

Assuming you have the **AdminManager** plugin installed, you can manage permissions via in-game chat.

### Granting Permissions

| Command          | Syntax                         | Description                              |
| :--------------- | :----------------------------- | :--------------------------------------- |
| **/grant user**  | `/grant user <SteamID> <perm>` | Gives a permission to a specific player. |
| **/grant group** | `/grant group <name> <perm>`   | Gives a permission to a whole group.     |

**Examples:**

- `/grant user 76561198000000001 kits.vip`
- `/grant group admin *` (Gives ALL permissions)

### Managing Groups

| Command           | Syntax                            | Description                    |
| :---------------- | :-------------------------------- | :----------------------------- |
| **/group add**    | `/group add <SteamID> <group>`    | Adds a player to a group.      |
| **/group remove** | `/group remove <SteamID> <group>` | Removes a player from a group. |

**Examples:**

- `/group add 76561198000000001 vip`

---

## Tutorial: Setting up VIP

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

_Save the file and reload the server/plugins._

### 2. Add Permissions to Group

In-game, type:
`T` -> `/grant group vip kits.vip`
`T` -> `/grant group vip chat.color`

### 3. Add User to Group

`T` -> `/group add 76561198123456789 vip`

Now this user automatically has `kits.vip` and `chat.color`.

---
