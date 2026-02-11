# OnPlayerConnected

This hook is triggered when a player has successfully connected to the server.

## Definition

```csharp
public virtual void OnPlayerConnected(PlayerBase player) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who connected. |

---

## Usage Example

```csharp
public override void OnPlayerConnected(PlayerBase player)
{
    Console.WriteLine($"Player {player.Name} ({player.Steamid}) connected.");
}
```