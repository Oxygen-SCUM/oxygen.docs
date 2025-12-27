# Plugin Structure

Anatomy of a standard plugin.

```csharp
using System;
using System.Collections.Generic;
using oxygen.csharp.API;
using oxygen.csharp.Core;

[Info("My Plugin", "Dev", "1.0.0")]
public class MyPlugin : OxygenPlugin
{
    public override void OnLoad()
    {
        Log("Started!");
    }

    [Command("test")]
    private void OnTest(PlayerBase player, string[] args)
    {
        ReplyPlayer(player, "Hello");
    }
}
```
