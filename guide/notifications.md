# Notification System

The Notification System is used to display visual alerts to players. These commands are executed via the `ProcessCommand(string command)` method on either the **Server** or **Player** object.

## Command Syntax

```text
SendNotification <Notification> <User ID> <Message>
```

### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `<Notification>` | <Badge type="tip" text="Number" /> | Style type: `1`, `2`, `4`, or `5`. |
| `<User ID>` | <Badge type="info" text="Number" /> | The internal Database ID of the user. Use `-1` to notify everyone. |
| `<Message>` | <Badge type="info" text="Text" /> | The text message to display. |

---

## Technical Implementation

To send a notification, call the `ProcessCommand` method. Note that `<User ID>` refers to the database ID, not the SteamID.

**Example for a specific player (DB ID: 123):**
```csharp
player.ProcessCommand("SendNotification 1 123 \"Hello Player!\"");
```

**Example for the whole server:**
```csharp
server.ProcessCommand("SendNotification 1 -1 \"Server-wide announcement\"");
```

## Notification Types

### 1. Standard Notification
Displays a basic notification in the corner of the screen.
```text
SendNotification 1 -1 "test message"
```
![type 1](/notify-type-1.jpg)

### 2. Center Message
Displays a prominent message in the center of the player's screen.
```text
SendNotification 2 123 "test message"
```
![type 2](/notify-type-2.jpg)

### 4. HUD Message
Displays the message directly in the player's HUD (Heads-Up Display).
```text
SendNotification 4 123 "test message"
```
![type 4](/notify-type-4.jpg)

### 5. Kill Log Message
Sends the notification to the server's kill log feed.
```text
SendNotification 5 -1 "test message"
```
![type 4](/notify-type-5.jpg)

---

::: tip INFO
Ensure you use the correct **Database ID** for the `<User ID>` parameter. If you need to broadcast a message to all players, always use `-1`.
:::