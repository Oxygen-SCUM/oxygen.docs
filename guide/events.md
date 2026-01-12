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
```
