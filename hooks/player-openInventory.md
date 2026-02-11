# OnPlayerOpenInventory

This hook is triggered when the player opens any inventory.

## Definition

```csharp
public virtual void OnPlayerOpenInventory(PlayerBase player, string itemName, int ownerDBId) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player opening the inventory. |
| `itemName` | `string` | The name or type of the item/container being opened. |
| `ownerDBId` | `int` | The database identifier of the owner of the inventory. |

---

## Usage Example

```csharp
public override void OnPlayerOpenInventory(PlayerBase player, string itemName, int ownerDBId)
{
    Console.WriteLine($"Player {player.Name} opened {itemName} (Owner ID: {ownerDBId})");
}
```