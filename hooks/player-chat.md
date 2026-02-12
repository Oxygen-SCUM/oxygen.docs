# OnPlayerChat

This hook is triggered when a player sends a message in the game chat.

## Definition

```csharp
public virtual bool OnPlayerChat(PlayerBase player, string message)
{
    return true;
}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The player who sent the message. |
| `message` | `string` | The content of the chat message. |

## Return Value

| Type | Description |
| :--- | :--- |
| `bool` | Return `true` to allow the message to be sent, or `false` to cancel it. |

## Usage Example

```csharp
public override bool OnPlayerChat(PlayerBase player, string message)
{
    if (message.Contains("badword"))
    {
        Console.WriteLine($"Blocked message from {player.Name}");
        return false;
    }
    return true;
}
```