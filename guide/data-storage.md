# Data Storage

Store dynamic data in `data/` folder.

```csharp
class PlayerData { public int Kills { get; set; } = 0; }

public class StatsPlugin : OxygenPlugin
{
    private Dictionary<string, PlayerData> _stats;

    public override void OnLoad()
    {
        _stats = LoadData<Dictionary<string, PlayerData>>("Stats_Data");
    }

    public override void OnUnload()
    {
        SaveData("Stats_Data", _stats);
    }
}
```
