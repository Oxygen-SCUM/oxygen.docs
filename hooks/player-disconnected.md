# OnPlayerDisconnected

This hook is triggered when a player disconnects from the server.

## Definition

```csharp
public virtual void OnPlayerDisconnected(PlayerBase player) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who disconnected. |

---

## Usage Example

```csharp
public override void OnPlayerDisconnected(PlayerBase player)
{
    Console.WriteLine($"Player {player.Name} ({player.Steamid}) disconnected.");
}
```