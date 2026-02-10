# OnPlayerLockPickEnded

This hook is triggered when a player finishes a lockpicking attempt, regardless of whether they succeeded or failed.

## Definition

```csharp
public virtual void OnPlayerLockPickEnded(PlayerBase player, PlayerLockPickData data) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who performed the lockpicking. |
| `data` | `PlayerLockPickData` | A struct containing detailed information about the lockpick attempt. |

---

## PlayerLockPickData Struct

The `data` parameter provides the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `Target` | `string` | The name or type of the object being picked (e.g., "Door", "Locker"). |
| `TargetId` | `string` | Unique identifier for the specific target object. |
| `OwnerSteamId` | `string` | The SteamID64 of the player who owns the target. |
| `OwnerName` | `string` | The name of the player who owns the target. |
| `Result` | `int` | The outcome: `1` for success, `0` for failure. |
| `FailCount` | `int` | How many times the player failed during this specific session. |

---

## Usage Example

```csharp
public override void OnPlayerLockPickEnded(PlayerBase player, PlayerLockPickData data)
{
    if (data.Result == 1)
    {
        // Logic for successful pick
        Console.WriteLine($"Player {player.Name} successfully picked {data.Target}");
    }
    else
    {
        // Logic for failure
        Console.WriteLine($"Player {player.Name} failed to pick {data.Target}. Total fails: {data.FailCount}");
    }
}
```