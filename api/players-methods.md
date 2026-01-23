# Player (PlayerBase)

The `PlayerBase` class is the primary object for interacting with a connected player. It provides access to character information (name, position, economy) and allows performing actions.


## Properties

Access to basic player data.

| Property | Type | Description |
| :--- | :--- | :--- |
| `SteamId` | `string` | Unique 64-bit Steam Identifier (ID64). |
| `Name` | `string` | The character's display name. |
| `FakeName` | `string` | Fake name (used if the player is in streamer mode). |
| `IpAddress` | `string` | The player's IP address. |
| `Ping` | `int` | Current network latency (in milliseconds). |
| `Location` | `Vector3` | Current player coordinates (X, Y, Z). |
### Economy & Progression

| Property | Type | Description |
| :--- | :--- | :--- |
| `FamePoints` | `int` | Amount of Fame Points (FP). |
| `Money` | `int` | Cash balance. |
| `Gold` | `int` | Gold balance. |

---

## Interaction

### `Reply`
Sends a chat message to the specific player. This is the primary method for feedback.

``` csharp
void Reply(string text, Color type = Color.White);
```
**Parameters:**
* `text`: The message text.
* `type`: Message color (default is white). You can use the `Color` class (e.g., `Color.Red`, `Color.Green`).

### Allowed colors

| Color name | Preview |
|-----------|---------|
| White | Welcome on server! |
| Blue | <span style="color:blue;">Welcome on server!</span> |
| Green | <span style="color:green;">Welcome on server!</span> |
| Yellow | <span style="color:gold;">Welcome on server!</span> |
| Orange | <span style="color:orange;">Welcome on server!</span> |
| Red | <span style="color:red;">Welcome on server!</span> |

**Example:**
``` csharp
player.Reply("Welcome to the server!", Color.Green);
```
## Command Execution

These methods allow the plugin to execute server console commands **on behalf of the player** or **targeting the player**.

### `ProcessCommand`
Executes a command "blindly" without waiting for a result. This is the fastest way to execute commands when you don't need a response from the server (e.g., teleportation, kill, suicide).

``` csharp
void ProcessCommand(string command);
```

**Example:**
``` csharp

// Teleport the player to coordinates 0,0,0
player.ProcessCommand("Teleport 0 0 0");
```

### `ProcessCommandAsync`
Executes a command asynchronously and returns the execution result. Use this method if you need to know whether the command succeeded or need the response text from the server (e.g., when spawning items).

``` csharp
Task<CmdResult> ProcessCommandAsync(string command);
```

**Returns:** `Task<CmdResult>`, where `CmdResult` contains:
* `Success` (`bool`): Whether the command was executed successfully.
* `Message` (`string`): Text response from the server (e.g., "Item spawned" or "Failed to spawn").

**Example:**
``` csharp
[ChatCommand("kit")]
public async void GiveKitCommand(PlayerBase player, string[] args)
{
    // Asynchronously spawn an item and wait for the result
    var result = await player.ProcessCommandAsync("SpawnItem Weapon_AKM");

    if (result.Success)
    {
        player.Reply("Kit received successfully!", Color.Green);
    }
    else
    {
        // Output the error reason (e.g., inventory full)
        player.Reply($"Error: {result.Message}", Color.Red);
    }
}
```

## Usage Examples

### Balance Check and Action
``` csharp
public void TeleportToSpawn(PlayerBase player)
{
    int cost = 100; // +- logic here

    // Check if the player has enough money (Money property)
    if (player.Money >= cost)
    {
        // Deduct money (requires appropriate server command or economy API)
        player.ProcessCommandAsync($"ChangeCurrencyBalance Normal {cost}"); 
        
        // Teleport
        player.ProcessCommand("Teleport 150000 150000 0");
        player.Reply("You have been teleported!", Color.Yellow);
    }
    else
    {
        player.Reply($"Insufficient funds! Required {cost}, you have {player.Money}", Color.Red);
    }
}
```

### Logging Player Info
``` csharp
public void LogPlayerInfo(PlayerBase player)
{
    // All properties are automatically refreshed before reading
    string info = $"Player: {player.Name} | SteamID: {player.SteamId} | IP: {player.IpAddress}";
    Console.WriteLine(info);
}
```