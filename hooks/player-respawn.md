# OnPlayerRespawn

This hook is triggered when a player respawns after death. It provides information about the respawn method chosen by the player and the target sector.

## Definition

```csharp
public virtual void OnPlayerRespawn(PlayerBase player, PlayerRespawnData data) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who is respawning. |
| `data` | `PlayerRespawnData` | Structure containing details about the respawn location and type. |

---

## PlayerRespawnData Structure

This structure contains specific information about how and where the player is returning to the game.

| Field | Type | Description |
| :--- | :--- | :--- |
| `SpawnLocationType` | `int` | The numerical ID of the spawn method (see Spawn Types below). |
| `SectorX` | `int` | The X-coordinate of the map sector. |
| `SectorY` | `int` | The Y-coordinate of the map sector. |

### Spawn Location Types (Enum)

| Value | Name | Description |
| :--- | :--- | :--- |
| **0** | `None` | No specific location. |
| **1** | `Random` | Standard random map respawn. |
| **2** | `Sector` | Respawn within a specific chosen sector. |
| **3** | `Home` | Respawn at a shelter or bed roll. |
| **4** | `Squad` | Respawn on a squad member. |
| **5** | `Event` | Respawn triggered by an active in-game event. |

---

## Usage Example

The following example logs the respawn details and greets the player if they respawned at their home base.

```csharp
public override void OnPlayerRespawn(PlayerBase player, PlayerRespawnData data)
{
    // Convert sector coordinates to a readable format (e.g., B1)
    string sectorName = $"{(char)('A' + data.SectorX)}{data.SectorY}";
    
    Console.WriteLine($"[Respawn] {player.Name} spawned in {sectorName} using method ID: {data.SpawnLocationType}");

    // Check if the player spawned at Home (ID: 3)
    if (data.SpawnLocationType == 3)
    {
        player.Reply("Welcome home! Take care of your gear.", Color.Green);
    }
}
```

::: tip SECTOR LOGIC
The `SectorX` and `SectorY` values follow the game's grid system. For instance, `SectorX = 0` is **A**, `SectorX = 1` is **B**, and so on. 
:::