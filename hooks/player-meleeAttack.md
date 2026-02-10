# OnPlayerMeleeAttack

This hook is triggered when a player performs a melee attack. Returning `false` will cancel the attack.

## Definition

```csharp
public virtual bool OnPlayerMeleeAttack(PlayerBase player, string victimName)
{
    return true;
}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player performing the attack. |
| `victimName` | `string` | The name of the target entity being attacked. |

## Return Value

| Type | Description |
| :--- | :--- |
| `bool` | Return `true` to allow the attack, or `false` to cancel it. |

---

## Usage Example

```csharp
public override bool OnPlayerMeleeAttack(PlayerBase player, string victimName)
{
    if (victimName == "SafeZone_Target")
    {
        return false;
    }
    return true;
}
```