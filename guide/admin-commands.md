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

| Command Class | Description | Parametr |
| :--- | :--- | :--- |
| `AddOrRemoveWidget` | Adds or removes a UI widget from the screen. | AddOrRemoveWidget &lt;Add\|Remove&gt; &lt;Widget&gt; [Z Order]<br>&lt;Action \| Add Or Remove&gt;: Add or remove<br>&lt;Widget \| Widget Name&gt;: Widget to add / remove<br>[Z Order \| Number]<br>Adds or removes the specified widget. |
| `Announce` | Sends an announcement (message) to all players on the server. | Announce &lt;Message&gt;<br>&lt;Message \| Text&gt;: Announcement message<br>Sends the announcement message to all currently connected players. |
| `ArmorAbsorptionOutput` | Outputs data about armor damage absorption (debug). | ArmorAbsorptionOutput &lt;Value&gt;<br>&lt;Value \| Boolean&gt;: Enables or disables armor absorption data logging.<br>Enables or disables armor absorption data logging. |
| `Ban` | Bans a player by SteamID or IP. | Ban &lt;SteamID64&gt;<br>&lt;SteamID64 \| SteamID64&gt;: Steam ID of player to ban<br>Kicks the specified player from the game and prevents him or her from connecting to this server until unbanned. |
| `BoatDebug` | Enables debug mode for boats. | BoatDebug &lt;true\|false&gt;<br>&lt;Boolean&gt;<br>Enables or disables boat debug info |
| `CancelVote` | Cancels an active vote. | |
| `ChangeCurrencyBalance` | Changes a specific player's money balance (add/subtract). | ChangeCurrencyBalance &lt;Normal\|Gold&gt; &lt;Amount&gt; [Player]<br>&lt;Currency Type \| Currency Type Name&gt;<br>&lt;Amount \| Number&gt;<br>[Player \| Player Name]: Player whose balance to change<br>Adds specified currency amount to self or the specified player. |
| `ChangeCurrencyBalanceToAll` | Changes money balance for all players (including offline). | ChangeCurrencyBalanceToAll &lt;Normal\|Gold&gt; &lt;Amount&gt;<br>&lt;Currency Type \| Currency Type Name&gt;: Currency to change<br>&lt;Amount \| Number&gt;<br>Adds the specified currency amount to all players in the database. |
| `ChangeCurrencyBalanceToAllOnline` | Changes money balance for all online players. | ChangeCurrencyBalanceToAllOnline &lt;Normal\|Gold&gt; &lt;Amount&gt;<br>&lt;Currency Type \| Currency Type Name&gt;: Currency to change<br>&lt;Amount \| Number&gt;<br>Adds the specified currency amount to all online players. |
| `ChangeFamePoints` | Changes the amount of Fame Points. | ChangeFamePoints &lt;Amount&gt; [Player]<br>&lt;Amount \| Number&gt;<br>[Player]: Player<br>Changes fame points of the specified player for the specified value. |
| `CheckServerTime` | Displays current in-game and real server time. | |
| `ClearEncounterCooldowns` | Resets encounter spawn timers (zombies in bunkers, drops, etc.). | |
| `ClearFakeName` | Removes a player's fake name (streamer mode). | |
| `CookRecipe` | - | |
| `CreateEntity` | Creates an entity (basic spawn command). | CreateEntity &lt;Setup&gt;<br>&lt;Setup \| Setup&gt;<br>Creates entity using the specified entity setup |
| `DebugProjectileCollisions` | Visualizes projectile trajectories and collisions. | DebugProjectileCollisions &lt;Value&gt;<br>&lt;Value \| Boolean&gt;: Enables or disables projectile collisions debug.<br>Enables or disables projectile collisions debug. |
| `DebugWeapon` | Displays technical information about the held weapon. | |
| `DemolitionSkillDebug` | Debugs the demolition mini-game. | |
| `DestroyAllBaseBuildingElementsForFlag` | Destroys all base building elements belonging to a specific flag. | DestroyAllBaseBuildingElementsForFlag &lt;Flag ID&gt; &lt;please&gt;<br>&lt;Flag ID \| &gt;: Flag for which to destroy all base building elements<br>&lt;Please \| &gt;: Please<br>Destroys all base building elements for squad with the provided id. |
| `DestroyAllBaseBuildingElementsForPlayer` | Destroys all buildings of a specific player. | DestroyAllBaseBuildingElementsForPlayer &lt;Player ID&gt; &lt;please&gt;<br>&lt;Player ID \| &gt;: Player for which to destroy all base building elements<br>&lt;Please \| &gt;: Please<br>Destroys all base building elements for player with the provided id. |
| `DestroyAllBaseBuildingElementsForSquad` | Destroys all buildings of a specific squad. | DestroyAllBaseBuildingElementsForSquad &lt;Squad ID&gt; &lt;please&gt;<br>&lt;Squad ID \| &gt;: Squad for which to destroy all base building elements<br>&lt;Please \| &gt;: Please<br>Destroys all base building elements for squad with the provided id. |
| `DestroyAllFlagsForPlayer` | Destroys all flags of a specific player. | DestroyAllFlagsForPlayer &lt;Player&gt;<br>&lt;Player \| Player Name&gt;: Player whose flags to destroy<br>Destroys all flags owned by the player |
| `DestroyAllItemsWithinRadius` | Destroys all items (loot) within a radius. | DestroyAllItemsWithinRadius &lt;12_Gauge_Birdshot\|12_Gauge_Buckshot\|12_Gauge_Buckshot_Crafted\|12_Gauge_Slug\|Cal_22\|Cal_22_Crafted...&gt; [Radius [m]] [Location]<br>&lt;Item \| &gt;: Type of item to destroy<br>[Radius [m] \| Number]: Radius in meters<br>[Location \| Location / Transform]: Location or transform around which to destroy items<br>Destroys all items within a given radius around given location or player if none given. |
| `DestroyAllRazorsWithinRadius` | Destroys all "Razor" NPCs within a radius. | DestroyAllRazorsWithinRadius &lt;Radius [m]&gt; [Location]<br>&lt;Radius [m] \| Number&gt;: Radius in meters<br>[Location \| Location / Transform]: Location or transform around which to destroy razors<br>Destroys all razors within a given radius around given location or player if none given. |
| `DestroyAllVehicles` | Destroys all vehicles on the map. | DestroyAllVehicles &lt;please&gt; [BPC_WolfsWagen\|BPC_Laika\|BPC_Barba\|BPC_Dirtbike\|BPC_CityBike\|BPC_MountainBike...]<br>&lt;Please \| Please&gt;: Pretty please?<br>[PrimaryAssetId \| PrimaryAssetId]: PrimaryAssetId of the vehicle<br>Destroys all vehicles. |
| `DestroyArmedNPCsWithinRadius` | Destroys armed NPCs (TEC-1 guards) within a radius. | DestroyArmedNPCsWithinRadius &lt;Radius&gt; [Location]<br>&lt;Radius \| &gt;: Radius in meters<br>[Location \| ]: Location or transform around which to destroy armed NPCs.<br>Destroys all armedNPCs within a given radius around given location or player if none given. |
| `DestroyCorpsesWithinRadius` | Destroys corpses within a radius. | DestroyCorpsesWithinRadius &lt;Radius [m]&gt; [true\|false] [Location]<br>&lt;Radius [m] \| Number&gt;: Radius in meters<br>[Boolean]: Should destroy clothes on corpses?<br>[Location \| Location / Transform]: Location or transform around which to destroy corpses<br>Destroys all corpses within a given radius around given location or player if none given. |
| `DestroyEncountersAtPlayerLocation` | Disables the active encounter at the player's location. | |
| `DestroyEntity` | Destroys a specific entity (by ID or crosshair). | DestroyEntity &lt;Setup or ID&gt;<br>&lt;Setup or ID \| Setup or ID&gt;<br>Destroys all entities having the specified setup or a single entity if ID is provided. |
| `DestroyFlag` | Destroys the flag the admin is looking at. | DestroyFlag &lt;Flag&gt;<br>&lt;Flag \| &gt;: Flag ID to destroy<br>Destroys flag having the specified ID. |
| `DestroyVehicle` | Destroys the vehicle the admin is looking at. | DestroyVehicle &lt;Vehicle&gt;<br>&lt;Vehicle \| Vehicle Alias or ID&gt;: Vehicle to destroy<br>Destroys vehicle having the specified alias or ID. |
| `DestroyZombiesWithinRadius` | Destroys all zombies within a radius. | DestroyZombiesWithinRadius &lt;Radius&gt; [Location]<br>&lt;Radius \| Number&gt;: Radius in meters<br>[Location \| Location / Transform]: Location or transform around which to destroy zombies<br>Destroys all zombies within a given radius around given location or player if none given. |
| `DistanceDebug` | - | |
| `DoorDebug` | Shows door status (locked/open, HP, locks). | |
| `DrawDebugZombieCapsulesOnLegacySpawnPoints` | - | |
| `DrawNearbyEncounters` | Draws the boundaries of nearby active encounters on screen. | |
| `DrawSentryHealthBar` | Shows health bars for sentries (Mechs). | DrawSentryHealthBar &lt;true\|false&gt;<br>&lt;Boolean&gt;: Should draw sentry health bar.<br>Enables or disables zmbie location visualization |
| `DumpWetnessDebug` | Dumps item wetness data to a log. | |
| `GrantElevatedStatus` | Grants admin rights (God mode / panel) to a player. | GrantElevatedStatus &lt;SteamID64&gt;<br>&lt;SteamID64 \| SteamID64&gt;: Steam ID of player |
| `RevokeElevatedStatus` | Revokes admin rights. | RevokeElevatedStatus &lt;SteamID64&gt;<br>&lt;SteamID64 \| SteamID64&gt;: Steam ID of player |
| `EnableAdminViolations` | Enables violation tracking (drones start recording actions). | EnableAdminViolations &lt;true\|false&gt;<br>&lt;Enable \| &gt;: Should Admin violations be logged or not |
| `EnableHuntingClueDebugArrow` | Shows an arrow pointing to the next clue during hunting. | |
| `EndTournamentMode` | Forcibly ends the active event/tournament. | |
| `EquipParachute` | Spawns and equips a parachute on the player. | |
| `ExportDefaultItemSpawnerPresets` | Exports default item spawner presets to a file. | |
| `ExportQuests` | Exports quest data. | |
| `FindSquadMember` | Shows the direction or coordinates of a squad member. | FindSquadMember &lt;Player or SteamID64&gt; [true\|false]<br>&lt;Player or SteamID64 \| Player Or SteamID64&gt;: Steam ID of wanted player<br>[Boolean]<br>Find squad member by id and display its squad info. If second argument is 'true', this will copy the result to the clipboard. |
| `ForceBBEncounterOnNearbyOwnedBase` | Forces an encounter (attack) on the nearest player-owned base. | |
| `GetMeshInfo` | Displays info about the 3D model of the object under the crosshair. | |
| `Kick` | Kicks a player from the server. | Kick &lt;Player&gt;<br>&lt;Player \| Player Name&gt;<br>Kicks the specified player from the game. |
| `LeaveCorpse` | Simulates character death leaving a corpse (no respawn). | |
| `ListActiveAbandonedBunkers` | Lists active abandoned bunkers. | |
| `ListActiveHunts` | Lists active hunts (animals). | |
| `ListActiveSecretBunkers` | Lists active secret bunkers. | |
| `ListFlags` | Lists all flags on the server. | ListFlags &lt;Page Number&gt; [true\|false]<br>&lt;Page Number \| Number&gt;<br>[Boolean]<br>Prints the list of all placed flags with their owners and locations. First argument is the page number to list. If second argument is 'true', this will copy the results to the clipboard. |
| `ListItemsSpawnLocations` | Lists item spawn locations. | ListItemsSpawnLocations &lt;SearchType&gt;<br>&lt;SearchType \| Item Spawn Location Search Type&gt;<br>Lists all possible item spawn locations matching the provided search type. |
| `ListMutedPlayers` | Lists players with muted chat. | |
| `ListPlayers` | Lists all players on the server (Online). | |
| `ListSilencedPlayers` | Lists silenced players. | |
| `ListSpawnedAnimals` | Lists spawned animals. | |
| `ListSpawnedArmedNPCs` | Lists spawned armed NPCs. | |
| `ListSpawnedVehicles` | Lists spawned vehicles. | |
| `ListSquadMembers` | Lists members of a specific squad. | ListSquadMembers &lt;&gt; [true\|false]<br>&lt;Squad \| Squad Name&gt;: From which squad to list players<br>[Boolean]<br>Prints the list of all squad members. Argument is squad name or squad id. If second argument is 'true', this will copy the result to the clipboard. |
| `ListSquads` | Lists all squads. | ListSquads &lt;Page Number&gt; [true\|false]<br>&lt;Page Number \| Number&gt;<br>[Boolean]<br>Prints the list of squads. First argument is the page to list. If second argument is 'true', this will copy the result to the clipboard. |
| `ListWeatherControllerOverrides` | Lists active weather overrides. | |
| `Location` | Shows current coordinates (X, Y, Z). | |
| `Loot` | - (Likely debugs a loot container). | |
| `MapTeleport` | Teleports to a point clicked on the map. | |
| `Mute` | Mutes text chat for a player. | Mute &lt;Player&gt;<br>&lt;Player \| Player Name&gt;: Player to mute<br>Hides messages from the muted player. |
| `PlacementDebug` | Building placement debug (why it can't be placed). | 0 = Disabled; 1 = Basic (most useful); 2 = Grounding (not floating) 3 = Walls;<br>PlaceableActor debug =  None. ItemDropPlaceholder debug = None |
| `PlayerInfo` | Displays full player info (IP, Ping, ID, Stats). | PlayerInfo &lt;Player Steam ID&gt; [Show skills]<br>&lt;Player Steam ID \| &gt;: Player Steam ID<br>[Show skills \| ]: Show skill info<br>Lists information about the player |
| `Quests` | Quest management (start/stop). | Quests &lt;ForceEndCurrentCycle\|ClearUser\|ToggleIgnoreLimits\|StartQuest\|TimeoutTrackedQuest\|CompleteTrackedQuest...&gt; [Quest Asset]<br>&lt;Subcommand \| Subcommand&gt;<br>[Quest Asset \| QuestSetup]<br>Control quests system. |
| `RandomizePriceDeltas` | - | |
| `ReloadCustomMapConfig` | Reloads map config without server restart. | |
| `ReloadLootCustomizationsAndResetSpawners` | Reloads loot customization and spawner settings. | |
| `RenameVehicle` | Renames a vehicle (license plate or name). | RenameVehicle &lt;Vehicle&gt; &lt;Name&gt;<br>&lt;Vehicle \| Vehicle Alias or ID&gt;: Which vehicle to rename<br>&lt;Name \| Text&gt;: New Name<br>Renames vehicle having the specified alias or ID. |
| `ReportDesync` | Sends a desync report to the developer server. | ReportDesync &lt;true\|false&gt; [Period] [Delay]<br>&lt;Toggle \| Toggle&gt;: Toggle<br>[Period \| ]: Report period<br>[Delay \| ]: Delay time<br>Starts or stops a report desync function |
| `ResetAchievements` | Resets player achievements. | |
| `ResetAllHuntCooldownsForPlayer` | Resets hunt cooldowns for a player. | |
| `ResetEconomy` | Full economy wipe (money). | |
| `ResetPlayerBalances` | Resets player balances to zero. | ResetPlayerBalances &lt;Player ID&gt; &lt;please&gt;<br>&lt;Player ID \| &gt;: Player for which to reset all balances (cash, gold and fame)<br>&lt;Please \| &gt;: Please<br>Resets all balances (cash, gold and fame) for a player. |
| `ResetSquadInfo` | Deletes squad data. | ResetSquadInfo &lt;&gt;<br>&lt;Squad \| Squad Name&gt;<br>Resets squad name and information. Argument is squad name or ID. |
| `ScheduleCargoDrop` | Schedules a Cargo Drop (Airdrop) at a specific point or randomly. | |
| `ScheduleWorldEvent` | Schedules a world event. | ScheduleWorldEvent &lt;World Event&gt; &lt;X&gt; &lt;Y&gt; &lt;Z&gt;<br>&lt;World Event \| World Event Name&gt;: World event to schedule<br>&lt;X \| Number&gt;: X coordinate<br>&lt;Y \| Number&gt;: Y coordinate<br>&lt;Z \| Number&gt;: Z coordinate<br>Schedules a world event of the specified type at the specified location. |
| `SendNotification` | Sends a pop-up notification to a player. | SendNotification &lt;Notification&gt; &lt;User ID&gt; &lt;Message&gt;<br>&lt;Notification \| Number&gt;: Notification type to send<br>&lt;User ID \| Text&gt;: Whom to send the message to<br>&lt;Message \| Text&gt;<br>Sends notification to target player. Type: {1, 2, .. 5} If User_id is -1, message is sent to all. |
| `SetAchievementUnlocked` | Unlocks an achievement. | SetAchievementUnlocked &lt;spawn_on_island\|\|craft_improvised_knife\|light_first_fire\|reach_100_fame_points\|reach_200_fame_points...&gt;<br>&lt;Achievement Name \| Achievement&gt;<br>Unlocks a Steam achievement. |
| `SetAIInvisibility` | Makes the player invisible to zombies and mechs. | |
| `SetAirplaneMaxVelocity` | Sets maximum airplane velocity. | SetAirplaneMaxVelocity &lt;Value&gt;<br>&lt;Value \| Number&gt;<br>Sets airplanes' max velocity. |
| `SetAllInventoryAccess` | Allows opening any chest (even locked enemy ones). | |
| `SetCraftingSearch` | - | |
| `SetCurrencyBalance` | Sets a specific amount of money for a player. | SetCurrencyBalance &lt;Normal\|Gold&gt; &lt;Amount&gt; [Player]<br>&lt;Currency Type \| Currency Type Name&gt;: Which currency balance to set<br>&lt;Amount \| Number&gt;<br>[Player \| Player Name]: Which player to set for<br>Sets specified currency amount to self or the specified player. |
| `SetDecayTimeDilation` | Changes the decay rate of items/food. | SetDecayTimeDilation &lt;Value&gt;<br>&lt;Value \| Number&gt;<br>Sets decay time dilation for all items. |
| `SetDeluxeVersion` | Simulates Deluxe DLC ownership. | SetDeluxeVersion &lt;Supporter pack version value&gt;<br>&lt;Version&gt;: Supporter pack version value<br>Force supporter packs. |
| `SetFakeName` | Sets a fake name (for admins/streamers). | SetFakeName &lt;Fake Name&gt;<br>&lt;Fake Name \| Text&gt;: Fake name to set<br>Sets a fake name on the server. |
| `SetFamePoints` | Sets a specific amount of Fame Points. | SetFamePoints &lt;Amount&gt; [Player]<br>&lt;Amount \| Number&gt;<br>[Player]: Player<br>Sets fame points of the specified player to the specified value. |
| `SetFarmingSimulationSpeed` | Changes plant growth speed. | SetFarmingSimulationSpeed &lt;Value&gt;<br>&lt;Value \| Number&gt;: Speed<br>Sets simulation speed for farming (gardening). |
| `SetGardenNutrientsHigh` | Replenishes garden nutrients/water. | |
| `SetGender` | Changes character gender. | SetGender &lt;gender&gt;<br>&lt;gender \| &gt;: male\|female<br>Set the gender of prisoner |
| `SetGodMode` | Enables God Mode (invincibility + building without resources). | |
| `SetHealthToItemInHands` | Repairs the item in hands (sets HP). | SetHealthToItemInHands &lt;Health [0-1]&gt;<br>&lt;Health [0-1] \| Number&gt;: Health between 0 and 1.0<br>Sets health to current item in hands. |
| `SetInfiniteAmmo` | Enables infinite ammo. | |
| `SetItemDebugMode` | - | |
| `SetMalfunctionProbability` | Sets weapon malfunction probability. | SetMalfunctionProbability &lt;None\|BadRound\|StovePipe\|RoundNotLoaded\|DoubleFeed\|StuckBullet...&gt; [Malfunction Probability]<br>&lt;Malfunction Name \| Weapon Malfunction&gt;<br>[Malfunction Probability \| Number]<br>Sets probability of chosen malfunction. |
| `SetMountedVehicleProperty` | - (Sets parameters for mounted vehicles). | SetMountedVehicleProperty &lt;Health\|Fuel\|Battery&gt; &lt;Value&gt;<br>&lt;Property Name \| Vehicle Property&gt;<br>&lt;Value \| &gt;: Property Value. Add % suffix to specify value as a percentage of a maximum value instead of absolute value.<br>Sets specified property on the currently mounted vehicle. |
| `SetAttributes` | Sets prisoner attributes (Strength, Dexterity, etc.). | |
| `SetBladderVolume` | Sets bladder volume level. | |
| `SetExhaustion` | Sets exhaustion level. | |
| `SetImmortality` | Enables immortality only (HP doesn't drop), but without free building. | |
| `SetInfiniteOxygen` | Infinite oxygen underwater. | |
| `SetInfiniteStamina` | Infinite stamina. | |
| `SetMetabolismSimulationSpeed` | Accelerates/decelerates metabolism (digestion, hunger). | |
| `SetStomachVolume` | Sets stomach volume level. | |
| `SetSkillLevel` | Sets skill level for a player. | SetSkillLevel &lt;&gt; &lt;Skill Level Value&gt; [Skill Experience Value]<br>&lt;Skill Name \| Skill&gt;<br>&lt;Skill Level Value \| Number&gt;<br>[Skill Experience Value \| Number]<br>Sets level of chosen skill. |
| `SetSuperJump` | Enables super jumps. | |
| `SetTime` | Sets the in-game time of day. | SetTime &lt;Time&gt;<br>&lt;Time \| Number&gt;: Time of day [0-24]<br>Sets time of day to the specified value. |
| `SetTimeSpeed` | Sets time passage speed. | SetTimeSpeed &lt;Value&gt;<br>&lt;Value \| Number&gt;<br>Sets the time of day speed to a specified value. |
| `SetWeather` | Sets the weather (sunny, rain, storm). | SetWeather &lt;Weather&gt;<br>&lt;Weather \| Number&gt;: Weather to set to (0-1)<br>Sets weather to the specified value. |
| `ShowOtherPlayerLocations` | Shows markers of other players on screen/map. | |
| `ShowFlagInfo` | Shows flag info (radius, owner). | |
| `ShowNameplates` | Enables nameplates above heads. | |
| `ShowVehicleDebug` | Shows vehicle technical data (node HP, fuel). | |
| `ShutdownServer` | Gracefully shuts down the server. | |
| `SkipDiseaseIncubationStage` | Instantly advances disease to the active stage. | SkipDiseaseIncubationStage &lt;Value&gt;<br>&lt;Value \| &gt;: If enabled, skips current and future disease's incubation stages.<br>While enabled, skips current and future disease's incubation stages. |
| `Sleep` | Forces the character to sleep (or simulates sleep state). | Sleep &lt;Value&gt;<br>&lt;Value \| Number&gt;: Seconds<br>Suspends the game thread for the specified amount of seconds. |
| `SpawnAllItems` | Spawns all existing items. | SpawnAllItems &lt;12_Gauge_Birdshot\|12_Gauge_Buckshot\|12_Gauge_Buckshot_Crafted\|12_Gauge_Slug\|Cal_22\|Cal_22_Crafted...&gt; &lt;Grouping cutoff point&gt; [Distance between inventories]<br>&lt;Inventory \| InventoryItem&gt;: Inventory to place the items in<br>&lt;Grouping cutoff point \| &gt;: Any item classes with less or equal amounts of items will be grouped together in a "Random" chest<br>[Distance between inventories \| DistanceBetweenInventories]: Distance between two neighbouring inventories<br>Spawns a bunch of inventories with all of the items in the game. |
| `SpawnAnimal` | Spawns an animal. | SpawnAnimal &lt;BP_Bear2\|BP_Crow\|BP_Seagull\|BP_Boar\|BP_Chicken\|BP_Deer2...&gt; [Count] [Location\|DespawnLifetime] [Property Value]<br>&lt;Animal \| Animal Name&gt;: Animal to spawn<br>[Count \| Number]: Number of animals to spawn<br>[Animal Property \| Animal Property Name]<br>[Property Value \| Number]<br>Spawns a specified amount of the given animal type (Default count value is 1). |
| `SpawnArmedNPC` | Spawns an armed NPC. | SpawnArmedNPC &lt;BP_Drifter_Lvl_1\|BP_Drifter_Lvl_2\|BP_Drifter_Lvl_3\|BP_Drifter_Lvl_3_Radiation\|BP_Drifter_Lvl_4\|BP_Drifter_Lvl_4_AbandonedBunker...&gt; [Count]<br>&lt;Armed NPC \| Armed NPC Type Name&gt;: Which armed NPC to spawn<br>[Count \| Number]: Number of armed NPCs to spawn<br>Spawns a specified amount of the given armed NPC type (Default count value is 1). |
| `SpawnBrenner` | Spawns "Brenner" (flamethrower boss). | |
| `SpawnDebugAnimalTrack` | Spawns an animal track (for hunting skill testing). | SpawnDebugAnimalTrack &lt;AnimalClass&gt; &lt;VisualIndex&gt;<br>&lt;AnimalClass \| Animal Class&gt;<br>&lt;VisualIndex \| &gt;<br>Spawns a temporary animal track. |
| `SpawnInventoryFullOf` | Spawns a backpack/clothing full of a specific item. | SpawnInventoryFullOf &lt;12_Gauge_Birdshot\|12_Gauge_Buckshot\|12_Gauge_Buckshot_Crafted\|12_Gauge_Slug\|Cal_22\|Cal_22_Crafted...&gt; &lt;SetCount&gt; [12_Gauge_Birdshot\|12_Gauge_Buckshot\|12_Gauge_Buckshot_Crafted\|12_Gauge_Slug\|Cal_22\|Cal_22_Crafted...]<br>&lt;Inventory \| InventoryItem&gt;: Inventory to place the items in<br>&lt;SetCount \| &gt;: Number of sets to spawn, 0 spawns as many as can fit<br>{Items \| ContainedItem}: Items to spawn into the inventory<br>Spawns an inventory full of N sets of items |
| `SpawnItem` | Spawns an item by ID. | SpawnItem &lt;Item&gt; [Count] [Health\|Uses\|Dirtiness\|Location\|KeyCardSector\|StackCount...] [Property Value]<br>&lt;Item \| Item Name&gt;: Item to spawn<br>[Count \| Number]: Number of items to spawn<br>{Item Property \| Item Property Name}<br>{Property Value \| Value}<br>Spawns one or more items in front of invoking player. |
| `SpawnItem2` | Spawns an item by name | SpawnItem2 &lt;Item&gt;<br>&lt;Item \| Item Name&gt;: Item to spawn<br>Spawns item in front of invoking player. Can use multiple words for finding item suggestions, e.g. #spawnitem2 weapon suppressor ak. |
| `SpawnRandomAnimal` | Spawns a random animal. | |
| `SpawnRandomZombie` | Spawns a random zombie. | |
| `SpawnRazor` | Spawns a "Razor". | |
| `SpawnVehicle` | Spawns a vehicle. | SpawnVehicle &lt;Vehicle&gt; [Count] [Location\|Modifier] [Property value] [Location\|Modifier] [Property value]<br>&lt;Vehicle \| Vehicle Name&gt;: Vehicle to spawn<br>[Count \| Number]: Number of vehicles to spawn<br>[Vehicle Property \| Vehicle Property Name]<br>[Property value \| ]<br>[Vehicle Property \| Vehicle Property Name]<br>[Property value \| ]<br>Spawns vehicle in front of invoking player. |
| `SpawnZombie` | Spawns a specific zombie type. | SpawnZombie &lt;BP_Zombie_Civilian_Fat_Female\|BP_Zombie_Civilian_Fat_Male\|BP_Zombie_Civilian_Muscular_Female\|BP_Zombie_Civilian_Muscular_Male\|BP_Zombie_Civilian_Normal_Male\|BP_Zombie_Civilian_Skinny_Female...&gt; [Count] [Location\|DespawnLifetime] [Property value]<br>&lt;Zombie \| Zombie Type Name&gt;: Which zombie to spawn<br>[Count \| Number]: Number of zombies to spawn<br>[Property \| Zombie Property Name]: Property of the zombie<br>[Property value \| Number]<br>Spawns a specified amount of the given zombie type (Default count value is 1). |
| `SquadInfo` | Displays squad info (ID, leader, members). | SquadInfo &lt;Player ID&gt;<br>&lt;Player ID \| &gt;: Player for whos squad info to show<br>Destroys all base building elements for squad with the provided id. |
| `StartTournamentMode` | Starts an event/tournament. | StartTournamentMode &lt;Center X&gt; &lt;Center Y&gt; &lt;Delay&gt; &lt;Duration&gt;<br>&lt;Center X \| Number&gt;: X coordinate of the center<br>&lt;Center Y \| Number&gt;: Y coordinate of the center<br>&lt;Delay \| Number&gt;: Delay to start<br>&lt;Duration \| Number&gt;: Duration of the tournament mode<br>Initiates tournament mode. |
| `Teleport` | Teleport to coordinates. | Teleport &lt;X&gt; &lt;Y&gt; &lt;Z&gt; [Player]<br>&lt;X \| Number&gt;: X coordinate<br>&lt;Y \| Number&gt;: Y coordinate<br>&lt;Z \| Number&gt;: Z coordinate<br>[Player \| Player Name]: Player to teleport<br>Teleports the specified player to the specified location. If player is unspecified, teleports you. |
| `TeleportTo` | Teleport to a player. | TeleportTo &lt;Player Target&gt; [Teleportee]<br>&lt;Player Target \| Player Name&gt;: Player to teleport to<br>[Teleportee \| Player Name]: Which player to teleport<br>Teleports the specified player to another player. If player to teleport is unspecified, teleports you. |
| `TeleportToMe` | Teleports a player to you. | TeleportToMe &lt;Player&gt;<br>&lt;Player \| Player Name&gt;: Player to teleport<br>Teleports the specified player in front of you. |
| `TeleportToVehicle` | Teleports to a vehicle. | TeleportToVehicle &lt;Vehicle&gt; [Teleportee]<br>&lt;Vehicle \| Vehicle Alias or ID&gt;: Vehicle to teleport to<br>[Teleportee \| Player Name]: Which player to teleport<br>Teleports the specified player to vehicle having the specified alias or ID. If player is unspecified, teleports you. |
| `TeleportTo3pm` | Teleports player to random location | TeleportTo3pm \<steamId\> |
| `ToggleAmbientSound` | Toggles ambient sounds. | |
| `ToggleFog` | Toggles fog. | |
| `ToggleZombieNavigationLogging` | Zombie path debugging (NavMesh). | |
| `TrapsDebug` | Shows trap trigger boundaries. | |
| `Unban` | Unbans a player. | Unban &lt;Player SteamID64&gt;<br>&lt;Player SteamID64 \| SteamID64&gt;: Player Steam ID to unban<br>Lifts the ban on the specified player so he or she can connect to this server again. |
| `Unmute` | Unmutes chat. | Unmute &lt;Player&gt;<br>&lt;Player \| Player Name&gt;: Player to unmute<br>Re-enables chat messaging for the specified player. |
| `Unsilence` | Unsilences a player (voice/chat). | Unsilence &lt;&gt; [Local\|Global\|Squad]<br>&lt;Player \| Player Name&gt;: Player to unsilence<br>[Channel \| Chat Type Name]: Channel in which to unsilence<br>Re-enables chat messaging for the specified player. |
| `UpgradeBaseBuildingElementsWithinRadius` | Instantly upgrades walls/foundations within radius to max level. | UpgradeBaseBuildingElementsWithinRadius &lt;Radius&gt;<br>&lt;Radius \| &gt;: Radius within the upgrade will happen<br>Upgrade all Base Bulding Elements within radius |
| `VehicleCheat` | Vehicle cheat menu (repair, refuel). | VehicleCheat &lt;None\|FlyingDirect\|FlyingForce&gt; [Movement speed]<br>&lt;Cheat type \| Vehicle Cheat Type&gt;<br>[Movement speed \| Number] |
| `VisualizeBulletTrajectories` | Renders lines showing bullet paths/trajectories. | |
| `VisualizePath` | Visualizes AI pathfinding routes (navigation mesh debug). | VisualizePath &lt;start&gt; &lt;startLocation&gt; &lt;end&gt; &lt;endLocation&gt;<br>&lt;start \| &gt;: start<br>&lt;startLocation \| &gt;: Transform or vector of the start location<br>&lt;end \| &gt;: end<br>&lt;endLocation \| &gt;: Transform or vector of the end location<br>Draws a path from start to end location. Note that keywords "start" and "end" need to be put in before the locations. |
| `VisualizePlayerAiming` | Draws a line indicating where a player is aiming. | |
| `VisualizeVehicleTrajectory` | Renders lines showing vehicle movement trajectory. | VisualizeVehicleTrajectory &lt;BPC_WolfsWagen\|BPC_Laika\|BPC_Barba\|BPC_Dirtbike\|BPC_CityBike\|BPC_MountainBike...&gt; &lt;Sampling Interval&gt;<br>&lt;Vehicle \| Vehicle Name&gt;: Vehicle to spawn<br>&lt;Sampling Interval \| Number&gt; |
| `Vote` | Initiates a vote on the server. | Vote &lt;InitiateCargoDrop\|SetTimeOfDay\|SetWeather&gt;<br>&lt;Vote Topic \| Vote Topic Name&gt;: Topic on which to vote<br>Destroys all base building elements for squad with the provided id. |