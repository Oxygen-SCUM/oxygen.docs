# Events

Override virtual methods to react to server events.

```csharp
public override void OnLoad() 
{ 
    Console.WriteLine("Plugin Loaded");
}

public override void OnUnload()
{
    Console.WriteLine("Plugin Unloaded");
}

public override void OnPlayerConnected(PlayerBase player)
{
    Console.WriteLine($"[C#] Player Connected (SteamId: {player.SteamId})!");
}

public override void OnPlayerDisconnected(PlayerBase player)
{
    Console.WriteLine($"[C#] Player leave (SteamId: {player.SteamId})!");
}

public override bool OnPlayerMeleeAttack(PlayerBase player, string victimName)
{
    Console.WriteLine($"{player.PlayerName} hit {victimName}");
            
    return true; // allow damage
}
```
