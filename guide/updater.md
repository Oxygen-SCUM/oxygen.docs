# Installation & Updater

The **Oxygen Updater** is a PowerShell-based utility designed to automate the installation, dependency checking, and updating of the Oxygen plugin for your SCUM server.

::: danger WARNING
During the update process, the script will automatically detect and force-stop any running server processes.
:::

## Features

- **Dependency Check**: Automatically verifies if VC++ Redistributable, .NET 8.0, and OpenSSL 3.x are installed.
- **Firewall Setup**: Automatically creates a rule for the Oxygen Web Link (Port 8447).
- **Auto-Update**: Checks for the latest version via API and synchronizes files.
- **Process Management**: Safely stops server processes before applying updates.

---

## Quick Start

1. **Download**: Get the latest updater from [GitHub Repository](https://github.com/Oxygen-SCUM/oxygen-updater/releases).
2. **Placement**: Place `Run_Updater.bat` and `updater.ps1` in your server's root directory.
![Описание картинки](/updater-lib.jpg)
3. **Execution**: Run `Run_Updater.bat` as **Administrator** (required for Firewall and system checks).
* When you first launch, you need to specify your API token from the server.



## System Requirements

The updater checks for the following components:

| Component | Required Version | Purpose |
| :--- | :--- | :--- |
| **VC++ Redist** | 2015-2022 (x64) | Core library support |
| **.NET Runtime** | 8.0+ | Plugin execution environment |
| **OpenSSL** | 3.x (x64) | Secure API communication |
| **Web Port** | 8447 | Plugin-to-Web synchronization |

## Configuration

On the first run, the updater will ask for your **API Token**. This information is stored securely in `oxygen_license.json`.

## Troubleshooting

### Firewall Issues
If the web interface cannot connect to your server, ensure port **8447 (TCP)** is open. The updater attempts to create a rule named `Oxygen Web Link` automatically.