# Player (PlayerBase)

The `PlayerBase` class is the primary object for interacting with a connected player. It provides access to character information (name, position, economy) and allows performing actions, managing inventory, and checking permissions.

## Properties

Access to basic player data.

| Property | Type | Description |
| :--- | :--- | :--- |
| `DatabaseId` | `int` | Player id in SCUM.db. |
| `SteamId` | `string` | Unique 64-bit Steam Identifier (ID64). |
| `Name` | `string` | The character's display name. |
| `FakeName` | `string` | Fake name (used if the player is in streamer mode). |
| `IpAddress` | `string` | The player's IP address. |
| `Ping` | `int` | Current network latency (in milliseconds). |
| `Location` | `Vector4` | Current player coordinates and movement direction (X, Y, Z, W). |

### Economy & Progression

| Property | Type | Description |
| :--- | :--- | :--- |
| `FamePoints` | `int` | Amount of Fame Points (FP). |
| `Money` | `int` | Cash balance. |
| `Gold` | `int` | Gold balance. |

---

## Inventory & Items

The player object allows direct interaction with their items.

### `Inventory`
Grants access to the player's current inventory. Returns a `PlayerInventory` object.

| Property | Type | Description |
| :--- | :--- | :--- |
| `All` | `IReadOnlyList<Item>` | A flat list of all items in the inventory (including nested items). |
| `Count` | `int` | The number of root items (items directly in slots, not inside other items). |

### `Item` Object
Represents a specific item in the game.

| Property / Method | Type | Description |
| :--- | :--- | :--- |
| `Name` | `string` | The item's name. |
| `Contents` | `IReadOnlyList<Item>`| A list of nested items (e.g., items in a backpack or bullets in a magazine). |
| `Destroy()` | `void` | Destroys this item and removes it from the game. |

### `GiveItem`
Spawns and gives an item to the player. The system will first try to place the item directly into the player's inventory or merge it with existing stacks. **If there is no free space available, the item will be dropped on the ground directly in front of the player.** 

```csharp
bool GiveItem(string itemName);
```
**Returns:** `true` if the item was spawned successfully.

![type 1](/ezgif-7def87b4d4c86937.gif)

## Player Management

### `HasPermission`
Checks if the player has a specific permission.

```csharp
bool HasPermission(string permission);
```

## Interaction

### `Reply`
Sends a chat message to the specific player. This is the primary method for feedback.

```csharp
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

---

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

### Give Starter Kit
```csharp
public void GiveStarterKit(PlayerBase player)
{
    // Check permission
    if (!player.HasPermission("kits.starter"))
    {
        player.Reply("You do not have permission to use this kit!", Color.Red);
        return;
    }

    // Give items directly to inventory (or drop if full)
    player.GiveItem("Weapon_AK47");
    player.GiveItem("Magazine_AK47");
    
    player.Reply("Starter kit received successfully!", Color.Green);
}
```

### Advanced Inventory Management (LINQ)
Because `Inventory.All` returns a standard C# collection, you can use LINQ to easily search, count, and manage items.

```csharp
using System.Linq; // Required for LINQ extensions

public void ManagePlayerItems(PlayerBase player)
{
    // 1. Check if the player has a specific item
    bool hasScrewdriver = player.Inventory.All.Any(i => i.Name == "Tool_Screwdriver");
    if (!hasScrewdriver)
    {
        player.Reply("You need a screwdriver to do this!", Color.Red);
        return;
    }

    // 2. Count specific items (e.g., count all bandages)
    int bandageCount = player.Inventory.All.Count(i => i.Name.Contains("Bandage"));
    player.Reply($"You have {bandageCount} bandages in your inventory.", Color.Blue);

    // 3. Find a specific item and destroy it
    var oldWeapon = player.Inventory.All.FirstOrDefault(i => i.Name == "Weapon_AK47");
    if (oldWeapon != null)
    {
        oldWeapon.Destroy();
        player.Reply("Your old AK47 has been removed.", Color.Orange);
    }
}
```

### Balance Check and Action
```csharp
public async void TeleportToSpawn(PlayerBase player)
{
    int cost = 100;

    if (player.Money >= cost)
    {
        await player.ProcessCommandAsync($"ChangeCurrencyBalance Normal -{cost}"); 
        player.ProcessCommand("Teleport 150000 150000 0");
        player.Reply("You have been teleported!", Color.Yellow);
    }
    else
    {
        player.Reply($"Insufficient funds! Required {cost}, you have {player.Money}", Color.Red);
    }
}
```