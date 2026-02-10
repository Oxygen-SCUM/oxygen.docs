# OnPlayerDeath

This hook is triggered when a player dies. It provides detailed information about the cause of death, the killer (if any), and the circumstances of the event.

## Definition

```csharp
public virtual void OnPlayerDeath(PlayerBase player, DeathData info) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who died. |
| `info` | `DeathData` | A struct containing data about the death event and the killer. |

---

## DeathData Struct

The `info` parameter provides the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `KillerId` | `string` | The SteamID64 or identifier of the killer. |
| `KillerName` | `string` | The name of the player or entity that caused the death. |
| `DeadType` | `string` | The category of death . |
| `Reason` | `string` | The specific cause of death. |
| `Event` | `bool` | Returns `true` if the death occurred during a specific server event. |
| `Distance` | `float` | The distance between the killer and the victim at the time of death. |

---

## Usage Example

```csharp
public override void OnPlayerDeath(PlayerBase player, DeathData info)
{
    if (!string.IsNullOrEmpty(info.KillerName))
    {
        Puts($"{player.Name} was killed by {info.KillerName} from {info.Distance}m ({info.Reason})");
    }
    else
    {
        Puts($"{player.Name} died due to {info.Reason}");
    }
}
```