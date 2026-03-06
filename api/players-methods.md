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

### `Inventory` (PlayerInventory)
Grants access to the player's current inventory. Returns a `PlayerInventory` object.

| Property / Method | Type | Description |
| :--- | :--- | :--- |
| `All` | `IReadOnlyList<Item>` | A flat list of all items in the inventory (including nested items). |
| `Count` | `int` | The number of root items (items directly in slots, not inside other items). |
| `Clear()` | `int` | Completely clears the player's inventory by destroying all items. **Returns:** The number of deleted items. |

### `Item` Object
Represents a specific item in the game.

| Property / Method | Type | Description |
| :--- | :--- | :--- |
| `Name` | `string` | The item's name. |
| `Contents` | `IReadOnlyList<Item>`| A list of nested items (e.g., items in a backpack or bullets in a magazine). |
| `Destroy()` | `void` | Destroys this item and removes it from the game. |
| `SetDurability(float %)` | `Item` | Sets item health (0.0 to 100.0). Automatically handles visual rust/dirt. **Returns:** The `Item` instance for chaining. |
| `SetAmmo(int, [name])` | `Item` | Fills magazines or ammo boxes with the specified count and optional custom ammo type. **Returns:** The `Item` instance for chaining. |

---

## Giving and Equipping Items

### `GiveItem`
Spawns and gives an item to the player. The system will first try to place the item directly into the player's inventory or merge it with existing stacks. **If there is no free space available, the item will be dropped on the ground directly in front of the player.** 
```csharp
Item GiveItem(string itemName);
```
**Returns:** The spawned `Item` instance (or `null` if failed), allowing for immediate modification via Fluent API.

### `EquipItem`
Spawns an item and attempts to equip it directly onto the player (e.g., clothing, backpacks, weapons in hands).
```csharp
Item EquipItem(string itemName);
```
**Returns:** The spawned and equipped `Item` instance (or `null` if failed).

![type 1](/ezgif-7def87b4d4c86937.gif)

---

## Player Management

### `HasPermission`
Checks if the player has a specific permission.

```csharp
bool HasPermission(string permission);
```

---

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

```csharp
void ProcessCommand(string command);
```

**Example:**
```csharp
// Teleport the player to coordinates 0,0,0
player.ProcessCommand("Teleport 0 0 0");
```

### `ProcessCommandAsync`
Executes a command asynchronously and returns the execution result. Use this method if you need to know whether the command succeeded or need the response text from the server (e.g., when spawning items).

```csharp
Task<CmdResult> ProcessCommandAsync(string command);
```

**Returns:** `Task<CmdResult>`, where `CmdResult` contains:
* `Success` (`bool`): Whether the command was executed successfully.
* `Message` (`string`): Text response from the server (e.g., "Item spawned" or "Failed to spawn").

**Example:**
```csharp
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

---

## Usage Examples

### Spawning Customized Items (Fluent API)
Because methods like `GiveItem` and `EquipItem` return the `Item` object, you can immediately chain modifiers like `SetDurability` or `SetAmmo` in a single line of code!

```csharp
public void GiveCustomLoadout(PlayerBase player)
{
    // Check permission
    if (!player.HasPermission("kits.starter"))
    {
        player.Reply("You do not have permission to use this kit!", Color.Red);
        return;
    }

    // 1. Equip a jacket and ensure it's in perfect condition
    player.EquipItem("Motorcycle_Jacket_01")?.SetDurability(100f);

    // 2. Give a weapon and make it rusty (15% health)
    player.GiveItem("Weapon_AK47")?.SetDurability(15.0f); 

    // 3. Give a magazine, fill it with 30 bullets
    player.GiveItem("Magazine_AK47")?.SetAmmo(30, "Cal_7_62x39mm_TR");
    player.GiveItem("Magazine_AK47")?.SetAmmo(30); // load default ammo for this mag. type

    player.Reply("Starter kit received successfully!", Color.Yellow);
}
```

### Advanced Inventory Management (LINQ)
Because `Inventory.All` returns a standard C# collection, you can use LINQ to easily search, count, and manage items.

```csharp
using System.Linq; // Required for LINQ extensions

public void ManagePlayerItems(PlayerBase player)
{
    // 1. Clear the entire inventory
    if (player.Name == "BadGuy")
    {
        int removedCount = player.Inventory.Clear();
        player.Reply($"Your inventory was wiped! Removed {removedCount} items.", Color.Red);
        return;
    }

    // 2. Check if the player has a specific item
    bool hasScrewdriver = player.Inventory.All.Any(i => i.Name == "Tool_Screwdriver");
    if (!hasScrewdriver)
    {
        player.Reply("You need a screwdriver to do this!", Color.Red);
        return;
    }

    // 3. Count specific items (e.g., count all bandages)
    int bandageCount = player.Inventory.All.Count(i => i.Name.Contains("Bandage"));
    player.Reply($"You have {bandageCount} bandages in your inventory.", Color.Blue);

    // 4. Find a specific item and destroy it
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