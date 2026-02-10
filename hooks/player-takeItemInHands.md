# OnPlayerTakeItemInHands

This hook is triggered when a player attempts to take an item into their hands. Returning `false` will prevent the action.

## Definition

```csharp
public virtual bool OnPlayerTakeItemInHands(PlayerBase player, string itemName)
{
    return true;
}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player attempting to hold the item. |
| `itemName` | `string` | The name or type of the item being taken into hands. |

## Return Value

| Type | Description |
| :--- | :--- |
| `bool` | Return `true` to allow the action, or `false` to cancel it. |

---

## Usage Example

```csharp
public override bool OnPlayerTakeItemInHands(PlayerBase player, string itemName)
{
    if (itemName == "Restricted_Item")
    {
        return false;
    }
    return true;
}
```