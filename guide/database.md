# Database Access

Oxygen exposes the server's SCUM.db via a thread-safe, read-only ORM. It utilizes a shadow copy technique to ensure the game server is never locked during read operations.

## Defining Models

Map a C# class to a database table using the [DbTable] attribute. Property names must match the database column names (case-insensitive).

```csharp
using Oxygen.Csharp.Core.Database;

[DbTable("user")]
public class ScumPlayer
{
    // The names of the properties must match the names of the columns in the database! 
    // Case is not important (famepoints will work the same as FamePoints)

    public string id { get; set; }
    public string name { get; set; }
    public string last_login_time { get; set; }

    // You can add only the fields you need. 
    // It is not necessary to describe the entire table (there may be 50 columns).
}
```

## Reading Data

Access the database via the this.Database property.

### Single Record

Use FindOne to retrieve a specific entry.

```csharp
public void OnPlayerJoin(PlayerBase player)
{
    // SELECT * FROM user WHERE id = '...' LIMIT 1
    var dbPlayer = this.Database.FindOne<ScumPlayer>("id", player.SteamId);
    
    if (dbPlayer != null)
    {
        Console.WriteLine($"Last login: {dbPlayer.last_login_time}");
    }
}
```

### Multiple Records

Use All to retrieve a list and standard LINQ for filtering.

```csharp
using System.Linq;

public void PrintTopPlayers()
{
    var topPlayers = this.Database.All<ScumPlayer>()
        .OrderByDescending(p => p.FamePoints)
        .Take(5)
        .ToList();

    foreach (var p in topPlayers)
    {
        Console.WriteLine($"{p.CharacterName}: {p.FamePoints}");
    }
}
```

## Modifying Data

The Database API is Read-Only.
Modifying the C# object properties will not save data to the server, as the game server holds the state in RAM.

To modify data, use ExecuteCommand:

```csharp
// Incorrect:
// playerObj.FamePoints = 1000; 

// Correct:
ProcessCommand(steamId, "SetFamePoints 10");   
```

## API Reference

| Method | Description |
| :--- | :--- |
| `FindOne<T>(col, val)` | Returns the first record matching the condition. |
| `All<T>()` | Returns all records from the table. |
| `FindWhere<T>(col, val)` | Returns a list of records matching the condition. |