# Working with Actors

This section describes methods for creating (spawning), managing, and removing game objects (Actors). Actors can include Mechs (Sentries), Drones (Dropships), NPCs (Bankers), or custom objects defined by their Asset Path.

All these methods return or use an `IntPtr` — a pointer to the object in the game's memory.

::: warning IMPORTANT: TRANSIENT OBJECTS
Actors spawned using these methods are temporary. **They will disappear after a server restart.** If you need them to be permanent, you must save their coordinates and types in your own database, and respawn them manually every time the server starts.
:::

---

## Spawning an Actor (SpawnActor)

Creates a new Actor in the world at the specified coordinates.

```csharp
public IntPtr SpawnActor(
    SpawnableType type,
    float x, float y, float z,
    float pitch = 0f, float yaw = 0f, float roll = 0f,
    string customAssetPath = ""
)
```

### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | `SpawnableType` | The type of object to spawn (see the list below). |
| `x`, `y`, `z` | `float` | The world coordinates for the spawn point. |
| `pitch`, `yaw`, `roll` | `float` | (Optional) The rotation of the object. Default is `0`. |
| `customAssetPath` | `string` | (Optional) The exact Unreal Engine Blueprint path, required only if the `Custom` type is selected. |

**Returns:** `IntPtr` — A pointer to the spawned Actor, or `IntPtr.Zero` if an error occurs.

::: tip PRO TIP: COORDINATES
Ensure you provide correct and safe coordinates for the specific actor type. For example, a **Dropship** requires a very high altitude (`z` coordinate). If you spawn a Dropship too close to the ground, the game engine will instantly despawn it.
:::

### Available `SpawnableType` Values

To make spawning easier, the system provides several pre-configured types:

* **Mechs (Sentries):**
  * `Sentry` — Standard Mech.
  * `DeployableSentry` / `Sentry2` — Deployable versions of the Mech.
  * `SentryAbandonedBunker` — Mech variant found in abandoned bunkers.
* **Drones (Dropships):**
  * `Dropship` — Standard drone.
  * `AbandonedBunkerDropship` — Bunker drone.
  * `AttackerDropship` — Aggressive attacker drone.
  * `GuardedZoneDropship` — Guard zone drone.
* **NPCs:**
  * `Banker` — The standard Banker NPC.

::: warning ATTENTION: UNSUPPORTED ACTORS
Not all game objects can be spawned using this method. **Vehicles and items** require additional engine initialization and will not work correctly if spawned this way. Only the pre-configured types listed above have been tested and are guaranteed to work.
:::

* **Custom Entities:**
  * `Custom` — Use this when you want to spawn an entity not listed above. When using this type, you **must** provide the exact Unreal Engine Asset Path from the game files into the `customAssetPath` parameter.
  * *Example of a Custom Asset Path:* `"/Game/ConZ_Files/Characters/Animals/Bear/BP_Bear.BP_Bear_C"`

---

## Movement Control (MoveActorTo)

Orders an NPC (Mech, Zombie, Animal) to move to a specified point.
::: warning ATTENTION
This method only works for objects that have a built-in Artificial Intelligence (AI Controller) and a navigation system.
:::

```csharp
public void MoveActorTo(IntPtr actorPtr, float x, float y, float z)
```

### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `actorPtr` | `IntPtr` | A pointer to the Actor you want to move (obtained from `SpawnActor`). |
| `x`, `y`, `z` | `float` | The target coordinates the Actor should move to. |

---

## Removing an Actor (DestroyActor)

Instantly destroys the specified Actor and removes it from the world.

```csharp
public void DestroyActor(IntPtr actorPtr)
```

### Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `actorPtr` | `IntPtr` | A pointer to the Actor you want to destroy. |

::: tip PRO TIP
Always store the `IntPtr` of your created objects if you plan to delete them later. If you lose the pointer, you will not be able to programmatically destroy that specific Actor.
:::

---

## Usage Example

Below is an example of a command that spawns a Mech near the player, orders it to step aside, and destroys it after 10 seconds using the plugin's built-in timer system.

```csharp
public void CallPersonalMech(PlayerBase player)
{
    // Get the player's current coordinates
    float x = player.Location.X;
    float y = player.Location.Y;
    float z = player.Location.Z;

    // 1. Spawn a standard Mech near the player (offset by +500 on the X axis)
    IntPtr myMech = SpawnActor(SpawnableType.Sentry, x + 500f, y, z);

    if (myMech == IntPtr.Zero)
    {
        player.Reply("Error spawning Mech!", Color.Red);
        return;
    }

    player.Reply("Mech has arrived! It will self-destruct in 10 seconds.", Color.Green);

    // 2. Send the Mech to different coordinates (further along the X axis)
    MoveActorTo(myMech, x + 2000f, y, z);

    // 3. Destroy the Mech after 10 seconds using the Oxygen timer
    this.After(10f, () => 
    {
        // Check if the Mech pointer is still valid before destroying
        if (myMech != IntPtr.Zero)
        {
            DestroyActor(myMech);
            player.Reply("Mech self-destructed.", Color.Yellow);
        }
    });
}
```