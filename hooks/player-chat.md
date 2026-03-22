# OnPlayerChat

This hook is triggered when a player sends a message in the game chat.

## Definition

```csharp
public override bool OnPlayerChat(PlayerBase player, string message, int chatType)
{
    return true;
}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The player who sent the message. |
| `message` | `string` | The content of the chat message. |
| `chatType` | `int` | The content of the chat message. |

### Chat type (Enum)

| Value | Name |
| :--- | :--- |
| **0** | `Default` | 
| **1** | `Local` |
| **2** | `Global` |
| **3** | `Squad` |
| **4** | `Admin` |


## Return Value

| Type | Description |
| :--- | :--- |
| `bool` | Return `true` to allow the message to be sent, or `false` to cancel it. |

## Usage Example

```csharp
public override bool OnPlayerChat(PlayerBase player, string message, int chatType)
{
    if (message.Contains("badword"))
    {
        Console.WriteLine($"Blocked message from {player.Name}");
        return false;
    }
    return true;
}
```