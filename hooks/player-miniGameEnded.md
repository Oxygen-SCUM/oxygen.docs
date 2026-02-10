# OnPlayerMiniGameEnded

This hook is triggered when a player finishes a mini-game.

## Definition

```csharp
public virtual void OnPlayerMiniGameEnded(PlayerBase player, string gameName, bool succeeded) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who participated in the mini-game. |
| `gameName` | `string` | The name or identifier of the mini-game. |
| `succeeded` | `bool` | Indicates whether the player successfully completed the game. |

---

## Usage Example

```csharp
public override void OnPlayerMiniGameEnded(PlayerBase player, string gameName, bool succeeded)
{
    if (succeeded)
    {
        Puts($"Player {player.Name} won the {gameName} mini-game!");
    }
}
```