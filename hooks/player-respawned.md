# OnPlayerRespawned

This hook is triggered **after** the player has successfully completed the respawn process and is already physically present in the world.

## Definition

```csharp
public virtual void OnPlayerRespawned(PlayerBase player) {}
```

## Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `player` | `PlayerBase` | The instance of the player who has just appeared in the world. |

---

## Difference between OnPlayerRespawn and OnPlayerRespawned

It is important to understand the timing of these two hooks:

* **OnPlayerRespawn**: Triggered the moment the player clicks the respawn button in the menu. It provides data about *how* they intend to spawn.
* **OnPlayerRespawned**: Triggered when the loading is finished and the player's character is actually standing in the game world.

---

## Usage Example

This example gives the player a basic item (like a bandage) immediately after they land in the world.

```csharp
public override void OnPlayerRespawned(PlayerBase player)
{
    // Notify the player
    player.Reply("You have returned to the world!", Color.Yellow);

    // Give a basic item for survival
    player.GiveItem("Emergency_Bandage_Big"); // spawn in inventory
    
    Console.WriteLine($"[Spawn] Player {player.Name} is now active in the world.");
}
```

::: tip PRO TIP
This is the best place to apply visual effects, set temporary invulnerability, or teleport the player if your plugin logic requires them to be at a specific starting point after spawning.
:::