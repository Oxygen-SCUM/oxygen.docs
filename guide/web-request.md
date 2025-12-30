# Web API for Plugins

Oxygen provides a high-performance, threaded **HTTP Web API** system. This allows your server to accept requests from external websites, Discord bots, or mobile apps securely.

## Security & Authentication

By default, the Web API is **Secure**.

### Authenticating Requests
When sending a request (e.g., via Postman or a Website), you must include the token in the headers:

* **Header Name:** `Authorization` or `X-API-Key`
* **Value:** The token specified in your startup arguments.

---

## Quick Start

To enable web features, use the `Oxygen.Csharp.Web` namespace.

### Basic Implementation

```csharp
using System;
using System.Text.Json;
using Oxygen.Csharp.Core;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Web;  // Web Features

[Info("WebHandle", "jEMIXS", "0.1")]
[Description("Test plugin showing the new Web API")]
namespace MyServer.Plugins
{
    public class WebShopPlugin : OxygenPlugin
    {
        public override void OnLoad()
        {
            // Start listening on port 8081
            StartWebServer(80810);
            Console.WriteLine("[WebShop] Server started on port 8081");
        }

        // POST http://SERVER_IP:8081/buy
        // Requires 'Authorization' header by default
        [WebRoute("/buy", "POST")]
        public string OnBuyItem(string body)
        {
            Console.WriteLine($"[WebShop] Received request: {body}");

            try 
            {
                var data = JsonSerializer.Deserialize<ShopRequest>(body);

                // Execute command safely
                ProcessCommand(SteamId, $"SpawnItem {data.Item} 1");

                return "{ \"status\": \"success\" }";
            }
            catch (Exception ex)
            {
                return $"( \"error\": \"{ex.Message}\" )";
            }
        }
        
        class ShopRequest 
        {
            public string SteamId { get; set; }
            public string Item { get; set; }
        }
    }
}
```

---

## Public Endpoints (No Auth)

Sometimes you want an endpoint to be public (e.g., a server status page). You can disable authentication for specific routes using `requireAuth: false`.

```csharp
// GET http://SERVER_IP:8081/status
// No Authorization header needed
[WebRoute("/status", "GET", requireAuth: false)]
public string GetStatus(string body)
{
    // Return simple JSON
    return "{ \"online\": 50, \"max_players\": 64 }";
}
```

## API Reference

### `StartWebServer(int port)`
Starts the internal HTTP server on the specific port.
* **Best Practice:** Use ports between `8000` and `9000`. Avoid game ports (`7777`, `27015`, `8080`).

### `[WebRoute(path, method, requireAuth)]`
Attribute to map a method to a URL.

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **path** | `string` | *Required* | The URL path (e.g., `/api/give`). |
| **method** | `string` | `"POST"` | HTTP Method (`GET`, `POST`, `PUT`, `DELETE`). |
| **requireAuth** | `bool` | `true` | If `true`, checks the `Authorization` header against the `-oxygen` argument. |


## Examples

### 1. Global Announcer (Discord Integration)
Send messages to the in-game chat from an external source (e.g., Discord Bot).

```csharp
using System;
using System.Text.Json;
using Oxygen.Csharp.Core;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Web;  // Web Features

namespace MyServer.Plugins
{
    public class AnnouncerPlugin : OxygenPlugin
    {
        public override void OnLoad()
        {
            StartWebServer(8091);
        }

        // POST http://YOUR_IP:8091/say
        [WebRoute("/say", "POST")]
        public string OnBroadcast(string body)
        {
            try 
            {
                var data = JsonSerializer.Deserialize<MessageData>(body);

                // Command: #Announce <Message>
                ProcessCommand(SteamId, $"Announce {data.Message}");

                Log($"Broadcast sent: {data.Message}");
                return "{ \"status\": \"sent\" }";
            }
            catch
            {
                return "{ \"error\": \"Bad JSON\" }";
            }
        }

        class MessageData { public string Message { get; set; } }
    }
}
```

### 2. World Control (Time & Weather)
Allow admins to change the time of day or weather via a web panel.

``` csharp
using System;
using System.Text.Json;
using Oxygen.Csharp.Core;
using Oxygen.Csharp.API;
using Oxygen.Csharp.Web;  // Web Features

namespace MyServer.Plugins
{
    public class WorldControlPlugin : OxygenPlugin
    {
        public override void OnLoad()
        {
            StartWebServer(8092);
        }

        // POST http://YOUR_IP:8092/api/world
        [WebRoute("/api/world", "POST")]
        public string SetWorld(string body)
        {
            var data = JsonSerializer.Deserialize<WorldRequest>(body);

            // Change Time
            if (!string.IsNullOrEmpty(data.Time))
            {
                ProcessCommand(SteamId, $"SetTime {data.Time}");
            }
            
            // Change Weather (0-2)
            if (data.WeatherId >= 0)
            {
                ProcessCommand(SteamId, $"SetWeather {data.WeatherId}");
            }

            return "{ \"status\": \"updated\" }";
        }

        class WorldRequest 
        { 
            public string Time { get; set; } 
            public int WeatherId { get; set; } = -1;
        }
    }
}
```

### 3. Remote Ban System
Integration with a website to ban players remotely.

``` csharp
using oxygen.csharp.Core.Plugins;
using oxygen.csharp.Core.Web;
using oxygen.csharp.Core;
using System.Text.Json;

namespace MyServer.Plugins
{
    public class WebBanPlugin : OxygenPlugin
    {
        private const string API_KEY = "SecretAdminPassword";

        public override void OnLoad()
        {
            StartWebServer(8093);
        }

        // POST http://YOUR_IP:8093/admin/ban
        [WebRoute("/admin/ban", "POST")]
        public string BanPlayer(string body)
        {
            var request = JsonSerializer.Deserialize<BanRequest>(body);

            // Security Check
            if (request.Token != API_KEY) return "{ \"error\": \"Forbidden\" }";

            // Execute Ban: #Ban <SteamID> <Reason>
            ProcessCommand(SteamId, $"Ban {request.SteamId} {request.Reason}");
            
            // Kick immediately
            ProcessCommand(SteamId, $"Kick {request.SteamId} {request.Reason}");

            return "{ \"success\": true }";
        }

        class BanRequest
        {
            public string Token { get; set; }
            public string SteamId { get; set; }
            public string Reason { get; set; }
        }
    }
}
```