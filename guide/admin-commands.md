---
title: Server Commands
description: Complete list of admin console commands and their descriptions.
head:
  - - meta
    - name: keywords
      content: scum, admin commands, server codes, cheat sheet
---

# Server Admin Commands

Below is a comprehensive list of server administration commands.

::: warning Disclaimer & Usage
The command descriptions provided below are **approximate**. Some commands may be deprecated or function differently in the current version of the game.

**Important:** Not all commands listed here can be executed via the in-game chat console (`#`). Some are internal and may only be triggered programmatically via the **`ProcessCommand`** function within a server plugin.
:::

## Command Reference

| Command Class | Description / Action |
| :--- | :--- |
| `AddOrRemoveWidget` | Adds or removes a UI widget from the screen. |
| `AddPrisonerBodyEffect` | Applies a body effect to the prisoner (illness, bleeding, fracture, etc.). |
| `AdminLight` | Toggles a light source around the admin character. |
| `Announce` | Sends an announcement (message) to all players on the server. |
| `ArmorAbsorptionOutput` | Outputs data about armor damage absorption (debug). |
| `BanPlayer` | Bans a player (by SteamID or IP). |
| `BoatDebug` | Enables debug mode for boats. |
| `CancelVote` | Cancels an active vote. |
| `ChangeCurrencyBalance` | Changes a specific player's money balance (add/subtract). |
| `ChangeCurrencyBalanceToAll` | Changes money balance for all players (including offline). |
| `ChangeCurrencyBalanceToAllOnline` | Changes money balance for all online players. |
| `ChangeFamePoints` | Changes the amount of Fame Points. |
| `CheckServerTime` | Displays current in-game and real server time. |
| `ClearEncounterCooldowns` | Resets encounter spawn timers (zombies in bunkers, drops, etc.). |
| `ClearFakeName` | Removes a player's fake name (streamer mode). |
| `CookRecipe` | - |
| `CrashMajestically` | Forcibly crashes the server (to test restart). |
| `CreateEntity` | Creates an entity (basic spawn command). |
| `DebugProjectileCollisions` | Visualizes projectile trajectories and collisions. |
| `DebugWeapon` | Displays technical information about the held weapon. |
| `DemolitionSkillDebug` | Debugs the demolition mini-game. |
| `DestroyAllBaseBuildingElementsForFlag` | Destroys all base building elements belonging to a specific flag. |
| `DestroyAllBaseBuildingElementsForPlayer` | Destroys all buildings of a specific player. |
| `DestroyAllBaseBuildingElementsForSquad` | Destroys all buildings of a specific squad. |
| `DestroyAllBaseBuildingElementsWithinRadius` | Destroys buildings within a radius around the admin. |
| `DestroyAllFlagsForPlayer` | Destroys all flags of a specific player. |
| `DestroyAllItemsWithinRadius` | Destroys all items (loot) within a radius. |
| `DestroyAllRazorsWithinRadius` | Destroys all "Razor" NPCs within a radius. |
| `DestroyAllVehicles` | Destroys all vehicles on the map. |
| `DestroyArmedNPCsWithinRadius` | Destroys armed NPCs (TEC-1 guards) within a radius. |
| `DestroyCorpsesWithinRadius` | Destroys corpses within a radius. |
| `DestroyEncountersAtPlayerLocation` | Disables the active encounter at the player's location. |
| `DestroyEntity` | Destroys a specific entity (by ID or crosshair). |
| `DestroyFlag` | Destroys the flag the admin is looking at. |
| `DestroyVehicle` | Destroys the vehicle the admin is looking at. |
| `DestroyZombiesWithinRadius` | Destroys all zombies within a radius. |
| `DisablePrisonerBodyEffects` | Disables visual/physical body effects (drunkenness, limping). |
| `DistanceDebug` | Tool for measuring distance between points. |
| `DoorDebug` | Shows door status (locked/open, HP, locks). |
| `DrawDebugZombieCapsulesOnLegacySpawnPoints` | Visualizes zombie collision capsules. |
| `DrawNearbyEncounters` | Draws the boundaries of nearby active encounters on screen. |
| `DrawSentryHealthBar` | Shows health bars for sentries (Mechs). |
| `DumpAllSquadsInfoList` | Dumps information about all squads to a log file. |
| `DumpEncounterManagerData` | Dumps encounter manager data (spawn settings) to a log. |
| `DumpWetnessDebug` | Dumps item wetness data to a log. |
| `GrantElevatedStatus` | Grants admin rights (God mode / panel) to a player. |
| `RevokeElevatedStatus` | Revokes admin rights. |
| `EnableAdminViolations` | Enables violation tracking (drones start recording actions). |
| `EnableHuntingClueDebugArrow` | Shows an arrow pointing to the next clue during hunting. |
| `EnableOrDisableServer` | Enables/Disables server entry (maintenance mode). |
| `EndTournamentMode` | Forcibly ends the active event/tournament. |
| `EnhancedPhotoMode` | Enables enhanced camera mode (for screenshots). |
| `EquipParachute` | Spawns and equips a parachute on the player. |
| `ExecuteConsoleCommand` | Executes a console command (RCON wrapper). |
| `ExecutePrisonerBodyConditionInteraction` | Executes a forced medical action (treatment/bandaging). |
| `ExportDefaultItemSpawnerPresets` | Exports default item spawner presets to a file. |
| `ExportItemLootTree` | Exports the Loot Tree to a file. |
| `ExportQuests` | Exports quest data. |
| `FindSquadMember` | Shows the direction or coordinates of a squad member. |
| `ForceBBEncounterOnNearbyOwnedBase` | Forces an encounter (attack) on the nearest player-owned base. |
| `ForceEncounterAtPlayerLocation` | Forces a zombie/enemy spawn at the current location. |
| `GetMeshInfo` | Displays info about the 3D model of the object under the crosshair. |
| `GetUserID` | Gets a player's SteamID. |
| `KickPlayer` | Kicks a player from the server. |
| `KnockoutPrisoner` | Knocks out the character (consciousness 0). |
| `LeaveCorpse` | Simulates character death leaving a corpse (no respawn). |
| `ListActiveAbandonedBunkers` | Lists active abandoned bunkers. |
| `ListActiveHunts` | Lists active hunts (animals). |
| `ListActiveSecretBunkers` | Lists active secret bunkers. |
| `ListFlags` | Lists all flags on the server. |
| `ListItemsSpawnLocations` | Lists item spawn locations. |
| `ListMutedPlayers` | Lists players with muted chat. |
| `ListPlayers` | Lists all players on the server (Online). |
| `ListPrisonerBodyEffects` | Lists effects applied to the player. |
| `ListSilencedPlayers` | Lists silenced players. |
| `ListSpawnedAnimals` | Lists spawned animals. |
| `ListSpawnedArmedNPCs` | Lists spawned armed NPCs. |
| `ListSpawnedVehicles` | Lists spawned vehicles. |
| `ListSquadMembers` | Lists members of a specific squad. |
| `ListSquads` | Lists all squads. |
| `ListWeatherControllerOverrides` | Lists active weather overrides. |
| `Location` | Shows current coordinates (X, Y, Z). |
| `Loot` | - (Likely debugs a loot container). |
| `MapTeleport` | Teleports to a point clicked on the map. |
| `MutePlayer` | Mutes text chat for a player. |
| `PlacementDebug` | Building placement debug (why it can't be placed). |
| `PlayerInfo` | Displays full player info (IP, Ping, ID, Stats). |
| `PrintEntities` | Prints entity count/list to console. |
| `Quests` | Quest management (start/stop). |
| `RandomizePriceDeltas` | Randomizes dynamic trader prices. |
| `ReloadCustomMapConfig` | Reloads map config without server restart. |
| `ReloadLootCustomizations...` | Reloads loot customization settings. |
| `RemovePrisonerBodyEffect` | Removes a specific illness/effect from a player. |
| `RenameVehicle` | Renames a vehicle (license plate or name). |
| `ReportDesync` | Sends a desync report to the developer server. |
| `ResetAchievements` | Resets player achievements. |
| `ResetAllHuntCooldownsForPlayer` | Resets hunt cooldowns for a player. |
| `ResetEconomy` | Full economy wipe (money). |
| `ResetPlayerBalances` | Resets player balances to zero. |
| `ResetSquadInfo` | Deletes squad data. |
| `ScheduleCargoDrop` | Schedules a Cargo Drop (Airdrop) at a specific point or randomly. |
| `ScheduleWorldEvent` | Schedules a world event. |
| `SendNotification` | Sends a pop-up notification to a player. |
| `SetAchievementUnlocked` | Unlocks an achievement. |
| `SetAIInvisibility` | Makes the player invisible to zombies and mechs. |
| `SetAirplaneMaxVelocity` | Sets maximum airplane velocity. |
| `SetAllInventoryAccess` | Allows opening any chest (even locked enemy ones). |
| `SetCraftingSearch` | - |
| `SetCurrencyBalance` | Sets a specific amount of money for a player. |
| `SetDecayTimeDilation` | Changes the decay rate of items/food. |
| `SetDeluxeVersion` | Simulates Deluxe DLC ownership. |
| `SetFakeName` | Sets a fake name (for admins/streamers). |
| `SetFamePoints` | Sets a specific amount of Fame Points. |
| `SetFarmingSimulationSpeed` | Changes plant growth speed. |
| `SetGardenNutrientsHigh` | Replenishes garden nutrients/water. |
| `SetGender` | Changes character gender. |
| `SetGodMode` | Enables God Mode (invincibility + building without resources). |
| `SetHealthToItemInHands` | Repairs the item in hands (sets HP). |
| `SetInfiniteAmmo` | Enables infinite ammo. |
| `SetItemDebugMode` | - |
| `SetMalfunctionProbability` | Sets weapon malfunction probability. |
| `SetMountedVehicleProperty` | - (Sets parameters for mounted vehicles). |
| `SetPrisonerAttributes` | Sets prisoner attributes (Strength, Dexterity, etc.). |
| `SetPrisonerBladderVolume` | Sets bladder volume level. |
| `SetPrisonerExhaustion` | Sets exhaustion level. |
| `SetPrisonerImmortality` | Enables immortality only (HP doesn't drop), but without free building. |
| `SetPrisonerInfiniteOxygen` | Infinite oxygen underwater. |
| `SetPrisonerInfiniteStamina` | Infinite stamina. |
| `SetPrisonerMetabolismSimulationSpeed` | Accelerates/decelerates metabolism (digestion, hunger). |
| `SetPrisonerStomachVolume` | Sets stomach volume level. |
| `SetReplishableResourceAmount` | Sets refillable resource amount (gas pumps, etc.). |
| `SetSkillLevel` | Sets skill level for a player. |
| `SetSuperJump` | Enables super jumps. |
| `SetTime` | Sets the in-game time of day. |
| `SetTimeSpeed` | Sets time passage speed. |
| `SetWeather` | Sets the weather (sunny, rain, storm). |
| `ShouldShowOtherPlayerInfo` | Enables ESP (info) about other players. |
| `ShouldShowOtherPlayerLocations` | Shows markers of other players on screen/map. |
| `ShowBaseBuildingDebug` | Shows technical data of building elements. |
| `ShowFlagInfo` | Shows flag info (radius, owner). |
| `ShowNameplates` | Enables nameplates above heads. |
| `ShowRespawnTimes` | Shows loot respawn timers. |
| `ShowVehicleDebug` | Shows vehicle technical data (node HP, fuel). |
| `ShutdownServer` | Gracefully shuts down the server. |
| `SilencePlayer` | Silences a player (disables voice chat or all chat). |
| `SkipDiseaseIncubationStage` | Instantly advances disease to the active stage. |
| `Sleep` | Forces the character to sleep (or simulates sleep state). |
| `SpawnAllItems` | Spawns all existing items (Warning: server crash). |
| `SpawnAnimal` | Spawns an animal. |
| `SpawnArmedNPC` | Spawns an armed NPC. |
| `SpawnBrenner` | Spawns "Brenner" (flamethrower boss). |
| `SpawnDebugAnimalTrack` | Spawns an animal track (for hunting skill testing). |
| `SpawnInventoryFullOf` | Spawns a backpack/clothing full of a specific item. |
| `SpawnItem` | Spawns an item by ID. |
| `SpawnRandomAnimal` | Spawns a random animal. |
| `SpawnRandomZombie` | Spawns a random zombie. |
| `SpawnRazor` | Spawns a "Razor". |
| `SpawnVehicle` | Spawns a vehicle. |
| `SpawnZombie` | Spawns a specific zombie type. |
| `SquadInfo` | Displays squad info (ID, leader, members). |
| `StartTournamentMode` | Starts an event/tournament. |
| `Teleport` | Teleport to coordinates. |
| `TeleportTo` | Teleport to a player. |
| `TeleportToMe` | Teleports a player to you. |
| `TeleportToVehicle` | Teleports to a vehicle. |
| `ToggleAmbientSound` | Toggles ambient sounds. |
| `ToggleFamePointsDebugVisualization` | - |
| `ToggleFog` | Toggles fog. |
| `ToggleZombieNavigationLogging` | Zombie path debugging (NavMesh). |
| `TrackShotsFired` | Enables shot logging. |
| `TrapsDebug` | Shows trap trigger boundaries. |
| `UnbanPlayer` | Unbans a player. |
| `UnmutePlayer` | Unmutes chat. |
| `UnsilencePlayer` | Unsilences a player (voice/chat). |
| `UpgradeBaseBuildingElementsWithinRadius` | Instantly upgrades walls/foundations within radius to max level. |
| `VehicleCheat` | Vehicle cheat menu (repair, refuel). |
| `VisualizeAnimalLocation` | Draws debug markers at current animal locations. |
| `VisualizeArmedNPCLocation` | Draws debug markers at current armed NPC locations. |
| `VisualizeBulletTrajectories` | Renders lines showing bullet paths/trajectories. |
| `VisualizePath` | Visualizes AI pathfinding routes (navigation mesh debug). |
| `VisualizePlayerAiming` | Draws a line indicating where a player is aiming. |
| `VisualizeVehicleTrajectory` | Renders lines showing vehicle movement trajectory. |
| `VisualizeZombieLocation` | Draws debug markers at current zombie locations. |
| `Vote` | Initiates a vote on the server. |