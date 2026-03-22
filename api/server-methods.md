# Server API

The `Server` class provides static methods for managing the global state of the game server. It allows you to broadcast messages, execute server-wide commands, and access the list of connected players and spawned entities.

## Server Parameters

Access real-time information about the server's time and weather conditions.

| Property | Type | Description |
| :--- | :--- | :--- |
| `TimeOfDay` | `float` | Current game time (ranging from 0.0 to 24.0). |
| `TimeMultiplier` | `float` | Speed of time progression on the server. |
| `SunriseTime` | `float` | Time of sunrise in the game. |
| `SunsetTime` | `float` | Time of sunset in the game. |
| `RainCloudsCoverage`| `float` | Level of storm clouds and rain coverage. |
| `WindSpeed` | `float` | Current wind speed. |
| `OutServerTime` | `float` | Uptime of the server since the last restart (in seconds). |

## Server Collections

These properties allow you to fetch players and spawned entities across the map. 

| Property | Type | Description |
| :--- | :--- | :--- |
| `AllPlayers` | `List<PlayerBase>` | Returns a list of all currently connected players. Useful for iteration, searching, or filtering. |
| `AllVehicles` | `List<VehicleDataPacket>` | Returns a fresh list of all vehicles on the server, including virtualized ones. |
| `AllFlags` | `List<FlagDataPacket>` | Returns a fresh list of all built bases (flags) on the server. |
| `AllSquads` | `List<SquadDataPacket>` | Returns a fresh list of all squads currently on the server. |
| `AllBunkers` | `List<BunkerDataPacket>` | Returns a list of abandoned bunkers and their current status. |

## Data Structures (List Parameters)

Below are the data structures returned by the entity management lists above.

### Squad Data
``` csharp
public struct SquadDataPacket
{
    public string Name;
    public string Message;
    public int MaxMembers;
    public int MemberCount;
    public SquadMemberData[] Members; // Up to 64 members
}

public struct SquadMemberData
{
    public string SteamId;
    public int Rank;
    public bool Online;
    public bool IsAlive;
    public bool InDanger;
}
```

### Bunker Data
``` csharp
public struct BunkerDataPacket
{
    public double PreviousActivationEnd; //timestamp
    public double ActivationStart; //timestamp
    public double ActivationEnd; //timestamp
    public float X;
    public float Y;
    public float Z;
    public bool IsSecretBunker;
    public bool OpenedViaKeycard;
}
```

### Flags Data
``` csharp
public struct FlagDataPacket
{
    public ulong FlagID;
    public ulong OwnerDBId;
    public float X;
    public float Y;
    public float Z;
    public string OwnerName;
}
```

### Vehicles Data
``` csharp
public struct VehicleDataPacket
{
    public ulong VehicleID;
    public ulong GroupID;
    public ulong OwnerID; // database id
    public ulong Timestamp;
    public float X;
    public float Y;
    public float Z;
    public string ClassName;
}
```

### Collection Examples

**Players: Finding a specific player**
``` csharp
foreach (var player in Server.AllPlayers)
{
    if (player.Name == "Admin")
    {
        Server.PrintToChat("Admin is online!", Color.Green);
    }
}
```

**Vehicles: Counting all spawned vehicles**
``` csharp
var vehicles = Server.AllVehicles;
Console.WriteLine($"There are currently {vehicles.Count} vehicles on the server.");
```

**Flags: Checking for built bases**
``` csharp
var flags = Server.AllFlags;
if (flags.Count > 0)
{
    Console.WriteLine($"Players have built {flags.Count} bases (flags).");
}
```

**Squads: Listing all squad names and their sizes**
``` csharp
foreach (var squad in Server.AllSquads)
{
    Console.WriteLine($"Squad '{squad.Name}' has {squad.MemberCount}/{squad.MaxMembers} members.");
}
```

**Bunkers: Finding all secret bunkers**
``` csharp
foreach (var bunker in Server.AllBunkers)
{
    if (bunker.IsSecretBunker)
    {
        Console.WriteLine($"Secret bunker located at X: {bunker.X}, Y: {bunker.Y}");
    }
}
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