# OnUnload

This hook is triggered when the plugin is being unloaded.

## Definition

```csharp
public virtual void OnUnload() { }
```

## Usage Example

```csharp
public override void OnUnload()
{
    Console.WriteLine("Plugin Unloaded");
}
```