# Configuration

Built-in JSON config system.

```csharp
public class WelcomePlugin : OxygenPlugin
{
    class PluginConfig 
    { 
        public string Message { get; set; } = "Hi!"; 
    }
    
    private PluginConfig _config;

    public override void OnLoad()
    {
        // Loads from "configs/WelcomePlugin.json"
        _config = LoadConfig<PluginConfig>();
    }
}
```
