# Server API

The `Server` class provides static methods for managing the global state of the game server. It allows you to broadcast messages, execute server-wide commands, and access the list of connected players.

## Player Management

| Property | Type | Description |
| :--- | :--- | :--- |
| `AllPlayers` | `List<PlayerBase>` | Returns a list of all currently connected players. Useful for iteration, searching, or filtering. |

**Example: Counting players**
``` csharp
int count = Server.AllPlayers.Count;
Console.WriteLine($"Players online: {count}");
```

## Chat & Broadcasting

### `PrintToChat`
Sends a message to **all** connected players (Broadcast).

``` csharp
static void PrintToChat(string text, Color type = Color.White);
```

**Parameters:**
* `text`: The message to broadcast.
* `type`: Color of the message (default is White).

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
Server.PrintToChat("Server restart in 5 minutes!", Color.Red);
```

## Command Execution

### `ProcessCommand`
Executes a console command. This method is "Fire & Forget" — it does not wait for a result.

``` csharp
static void ProcessCommand(string cmd);
```

**Example:**
``` csharp
// Set the time to day (12:00)
Server.ProcessCommand("SetTime 12");

// Destroy all vehicles (Server-wide command)
Server.ProcessCommand("DestroyAllVehicles");
```

### `ProcessCommandAsync`
Executes a console command asynchronously and waits for the server's response. Use this when you need to know the output of a command.

``` csharp
static Task<CmdResult> ProcessCommandAsync(string command);
```

**Returns:** `Task<CmdResult>` containing:
* `Success` (`bool`): Whether the command executed successfully.
* `Message` (`string`): The console output returned by the game server.

**Example:**
``` csharp
public async void CheckServerInfo()
{
    // Execute a command that returns information
    var result = await Server.ProcessCommandAsync("ListSpawnedAnimals");

    if (result.Success)
    {
        Console.WriteLine($"Server Response: {result.Message}");
    }
}
```
## Usage Examples

### Announcement System
A simple method to broadcast a message to everyone with a specific color.

``` csharp
public void AnnounceWinner(string winnerName)
{
    string msg = $"Player {winnerName} has won the event!";
    Server.PrintToChat(msg, Color.Yellow);
}
```

### Server Cleanup Script
Asynchronously cleaning up vehicles and verifying the result.

``` csharp
public async void CleanupServer()
{
    Server.PrintToChat("Cleaning up veh...", Color.Orange);

    // Execute server-side cleanup
    var result = await Server.ProcessCommandAsync("DestroyAllVehicles please");

    if (result.Success)
    {
        Server.PrintToChat("Cleanup complete!", Color.Green);
    }
    else
    {
        // Log the error to the console
        Console.WriteLine($"Cleanup failed: {result.Message}");
    }
}
```