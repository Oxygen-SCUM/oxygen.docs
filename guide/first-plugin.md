# My First Plugin: Starter Kit

This guide walks you through creating an Oxygen plugin that automatically rewards players with essential gear the moment they appear in the world after a respawn.

## Step 1: Create the File

Create a new file named `StarterKit.cs` in your server's plugin folder:

```text
SCUM/Binaries/Win64/oxygen/plugins/
```

## Step 2: Paste the Code

This plugin utilizes the `OnPlayerRespawned` hook. Unlike a standard command, this logic executes automatically whenever a player finishes loading into the game world.

```csharp
using System;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Core;

[Info("Starter Kit", "YourName", "1.0.0")]
[Description("Test plugin showing the new architecture")]
public class StarterKit : OxygenPlugin
{
    public override void OnLoad()
    {
        Console.WriteLine("[StarterKit] Plugin initialized and monitoring respawns.");
    }

    // This hook triggers when the player is physically present in the world
    public override void OnPlayerRespawned(PlayerBase player)
    {
        player.Reply("Welcome back! Here is some basic gear to get you started.", Color.Green);

        // 1. Equip a backpack and ensure it's in perfect condition
        player.EquipItem("BPC_Highland_Backpack_01")?.SetDurability(100f);

        // 2. Give a weapon and a magazine with ammo directly to inventory
        player.GiveItem("Weapon_AK47")?.SetDurability(80f);
        player.GiveItem("Magazine_AK47")?.SetAmmo(30)?.SetDurability(100f);

        // 3. Provide some basic sustenance
        player.GiveItem("CannedFood_01");

        Console.WriteLine($"[StarterKit] Gear delivered to {player.Name}");
    }
}
```

## Step 3: Save and Verify

Oxygen features **Hot-Reload**, so there is no need to restart the server:

1. **Save the file.**
2. Check the server console. You should see: `[StarterKit] Plugin initialized...`.
3. If you see red text (errors), open `/logs/OxygenError.log` to debug the compilation.

## Step 4: Test the Plugin

To test the logic, your character needs to trigger a respawn:
1. In-game, use the `#Suicide` command or die by other means.
2. Choose any respawn option (Random, Sector, etc.).
3. Once the loading screen finishes and you are standing on the ground, the items will appear in your inventory/slots automatically.

---

## Optional: Adding Logic

### Restrict by Permission
If you only want specific players (e.g., VIPs) to receive this kit, use a permission check:

```csharp
public override void OnPlayerRespawned(PlayerBase player)
{
    if (player.HasPermission("kit.vip"))
    {
        player.EquipItem("BPC_Military_Backpack_Black")?.SetDurability(100f);
        player.Reply("VIP Starter Kit applied!", Color.Gold);
    }
}
```

### Using a Config File
To change items without editing the code, you can use the built-in configuration system:

```csharp
public class KitConfig 
{
    public string Weapon { get; set; } = "Weapon_AK47";
    public float InitialDurability { get; set; } = 100f;
}

private KitConfig _config;

public override void OnLoad()
{
    // Loads from oxygen/configs/StarterKit.json
    _config = LoadConfig<KitConfig>();
}

public override void OnPlayerRespawned(PlayerBase player)
{
    player.GiveItem(_config.Weapon)?.SetDurability(_config.InitialDurability);
}
```

---

## Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **Plugin doesn't load** | Ensure the file extension is `.cs` and the class inherits `OxygenPlugin`. |
| **Items don't appear** | Verify the Asset IDs. If a player's inventory is full, items will drop at their feet. |
| **Compile Error** | Check `/logs/OxygenError.log`. Ensure you haven't missed any semicolons `;` or brackets `{}`. |

## Next Steps

* [PlayerBase Reference](/api/players-methods) — Detailed look at player properties and inventory methods.
* [Hook Reference](/hooks/player-connected) — Explore other events like `OnPlayerChat` or `OnPlayerConnected`.
* [Timers & Delays](/guide/timers) — Learn how to delay actions (e.g., give items 5 seconds after spawn).