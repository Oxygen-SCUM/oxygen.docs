# Installing Oxygen

This guide walks you through installing the Oxygen Framework on your SCUM server using the automated updater tool.

## Prerequisites

Before installing Oxygen, ensure you have:

1. **A SCUM server** - You must have a dedicated SCUM server set up and accessible.
2. **Administrator access** - Required for installing dependencies and creating firewall rules.
3. **Server file access** - Ability to upload files to your server root directory.
4. **Server stopped** - Shut down your SCUM server before installing Oxygen to avoid file conflicts.

## System Requirements

The Oxygen updater automatically checks for and helps install these dependencies:

| Component | Required Version | Purpose |
| :--- | :--- | :--- |
| **VC++ Redistributable** | 2015-2022 (x64) | Core library support |
| **.NET Runtime** | 8.0+ | Plugin execution environment |
| **OpenSSL** | 3.x (x64) | Secure API communication |
| **Firewall Rule** | Port 8447 (TCP) | Web interface connectivity |

::: warning IMPORTANT
Oxygen requires .NET 8.0 Runtime, not .NET Framework. Make sure you install the correct version.
:::

## Downloading the Updater

1. Visit the [Oxygen Updater GitHub Repository](https://github.com/Oxygen-SCUM/oxygen-updater/releases).
2. Download the latest release (you'll get two files):
   - `Run_Updater.bat`
   - `updater.ps1`
3. Extract both files to your SCUM server's **root directory** (where `SCUM.exe` or `SCUMServer.exe` is located).

::: tip Server Root Location
For most servers, this is: `[YourDrive]:\SteamLibrary\steamapps\common\SCUM\SCUM\Binaries\Win64\`
:::

![Updater Placement](/updater-lib.jpg)

## Running the Updater

### First Time Setup

1. **Right-click** on `Run_Updater.bat`
2. Select **"Run as Administrator"** (required for dependency checks and firewall configuration)
3. The updater will:
   - Check for required dependencies (VC++, .NET 8.0, OpenSSL)
   - Prompt you if any dependencies are missing with download links
   - Request your **API Token** (you'll receive this from the Oxygen team)
4. Enter your API token when prompted
5. The updater will:
   - Create `oxygen_license.json` with your token
   - Download the latest Oxygen files
   - Extract them to the correct directories
   - Create a firewall rule for port 8447 (if needed)

### Dependency Installation

If the updater detects missing dependencies, it will display download links. Install them in this order:

1. **VC++ Redistributable 2015-2022 (x64)**
   - Required for core Oxygen libraries
2. **.NET 8.0 Runtime (x64)**
   - Download the **Desktop Runtime** version
   - Verify installation: run `dotnet --list-runtimes` in PowerShell
3. **OpenSSL 3.x (x64)**
   - Required for secure web communication

After installing dependencies, run the updater again.

## Verifying the Installation

After the updater completes successfully:

1. **Check the server directory structure**:
   ```
   SCUM/
   ├── Binaries/
   │   └── Win64/
   │       ├── oxygen/           ← Oxygen framework files
   │       │   ├── configs/
   │       │   ├── data/
   │       │   └── plugins/
   ├── Run_Updater.bat
   └── updater.ps1
   ```

2. **Start your SCUM server** normally
3. **Check the server console** for Oxygen initialization messages:
   ```
   [OXYGEN] Successfully loaded
   [OXYGEN] plugin version 0.x.x
   [OXYGEN] Loading plugins...
   ```

4. **Verify web interface** (if applicable):
   - The updater creates a firewall rule for port **8447**
   - Check firewall rules: `netsh advfirewall firewall show rule name="Oxygen Web Link"`

## Updating Oxygen

Run the updater regularly to keep Oxygen up to date:

1. **Stop your SCUM server**
2. Run `Run_Updater.bat` as Administrator
3. The updater will:
   - Check for the latest Oxygen version via API
   - Download and apply updates automatically
   - Preserve your configs and data files
4. **Restart your server**

::: danger WARNING
During updates, the updater will automatically detect and force-stop any running server processes to prevent file corruption.
:::

## Troubleshooting

### Firewall Issues

If the web interface cannot connect:

1. Manually create the firewall rule:
   ```powershell
   netsh advfirewall firewall add rule name="Oxygen Web Link" dir=in action=allow protocol=TCP localport=8447
   ```
2. Verify the rule exists:
   ```powershell
   netsh advfirewall firewall show rule name="Oxygen Web Link"
   ```

### Missing Dependencies

If plugins fail to load, verify .NET 8.0 is installed:

```powershell
dotnet --list-runtimes
```

You should see: `Microsoft.NETCore.App 8.0.x`

### Updater Fails to Download

- Check your API token is correct in `oxygen_license.json`
- Verify internet connectivity
- Check antivirus isn't blocking the download
- Run as Administrator

### Files Not Updating

- Ensure the server is fully stopped before updating
- Check file permissions (updater needs write access)
- Temporarily disable antivirus during update

## Next Steps

After successful installation:

1. [Set up owner permissions](/guide/owners/managing-permissions) to grant yourself admin access
2. [Install your first plugin](/guide/owners/installing-plugins)
3. [Configure plugin settings](/guide/owners/configuring-plugins)

## Getting Help

If you encounter issues:

1. Check the updater output for error messages
2. Review `SCUM/Binaries/Win64//logs/OxygenError.log` for detailed logs
3. Verify all prerequisites are met
4. Contact Oxygen support with:
   - Updater output/error messages
   - Your system specifications
   - Oxygen version you're trying to install
