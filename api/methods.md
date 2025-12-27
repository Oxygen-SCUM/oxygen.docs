# API Methods

Methods available in the `OxygenPlugin` base class.

## Permissions (New)

### `HasPermission(string steamId, string permission)`
Checks if a user has a specific permission, belonging to a group with that permission, or has the wildcard `*`.

```csharp
if (HasPermission(steamId, "admin.ban"))
{
    // Allow ban
}
```

## Messaging

```csharp
// Reply to the command executor
ReplyPlayer(player, "Hello!"); 

// Reply to specific ID
ReplyPlayer(steamId, "Private message");

// Execute admin commands to user
ProcessCommand(player.SteamId, "SpawnItem Weapon_M9");
```
