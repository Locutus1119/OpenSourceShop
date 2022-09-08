export enum SYSTEM_EVENTS {
    APPEND_BLIP = 'append:Blip',
    APPEND_MARKER = 'append:Marker',
    APPEND_TEXTLABELS = 'append:TextLabel',
    APPEND_OBJECT = 'append:Object',
    APPEND_PED = 'append:Ped',
    APPEND_WORLD_NOTIFICATION = 'append:WorldNotification',
    APPEND_POLYGON = 'append:Polygon',
    //
    BOOTUP_ENABLE_ENTRY = 'enable:Entry',
    // Check
    BEGIN_CONNECTION = 'connection:Begin',
    // Commands
    COMMANDS_LOADED = 'commands:Loaded',
    // Debug
    DEBUG_COLSHAPE_VERTICES = 'debug:Colshape:Vertices',
    // Discord
    DISCORD_OPEN = 'discord:Open',
    DISCORD_CLOSE = 'discord:Close',
    DISCORD_FAIL = 'discord:Fail',
    DISCORD_LOGIN = 'discord:Login',
    DISCORD_FINISH_AUTH = 'discord:FinishAuth',
    // ENTITYSETS
    ENTITYSET_ACTIVATE = 'entityset:Activate',
    ENTITYSET_DEACTIVATE = 'entityset:Deactivate',
    ENTITYSET_IS_ACTIVE = 'entityset:IsActive',
    // Holograms
    HOLOGRAM_APPEND = 'hologram:Append',
    //
    INTERACTION = 'player:Interact',
    INTERACTION_FUEL = 'fuel:Action',
    INTERACTION_JOB_ACTION = 'job:Action',
    INTERACTION_TEXT_CREATE = 'interaction:Text:Create',
    INTERACTION_TEXT_REMOVE = 'interaction:Text:Remove',
    INTERACTION_TEMPORARY = 'interaction:Temporary',
    // ITEM
    ITEM_CONSUME = 'item:Consume',
    // IPL
    IPL_LOAD = 'ipl:Load',
    IPL_UNLOAD = 'ipl:Unload',
    //
    META_SET = 'meta:Set',
    META_CHANGED = 'meta:Changed',
    //
    NOCLIP_UPDATE = 'noclip:Update',
    NOCLIP_RESET = 'noclip:Reset',
    //
    PLAYER_CUFF = 'player:Cuff',
    PLAYER_UNCUFF = 'player:Uncuff',
    //
    PLAYER_EMIT_ALARM_START = 'alarm:Start',
    PLAYER_EMIT_ALARM_STOP = 'alarm:Stop',
    PLAYER_EMIT_ALARM_STOP_ALL = 'alarm:StopAll',
    PLAYER_EMIT_ANIMATION = 'animation:Play',
    PLAYER_EMIT_SCENARIO = 'scenario:Play',
    PLAYER_EMIT_AUDIO_STREAM = 'audio:Stream',
    PLAYER_EMIT_CREDITS = 'credits:Create',
    PLAYER_EMIT_CREDITS_CLEAR = 'credits:Clear',
    PLAYER_EMIT_ERROR_SCREEN = 'errorScreen:Create',
    PLAYER_EMIT_ERROR_SCREEN_CLEAR = 'errorScreen:Clear',
    PLAYER_EMIT_SOUND_2D = 'sound:2D',
    PLAYER_EMIT_SOUND_3D = 'sound:3D',
    PLAYER_EMIT_SOUND_3D_POSITIONAL = 'sound:3D:positional',
    PLAYER_EMIT_FRONTEND_SOUND = 'sound:Frontend',
    PLAYER_EMIT_NOTIFICATION = 'notification:Show',
    PLAYER_EMIT_SPINNER = 'spinner:Show',
    PLAYER_EMIT_SPINNER_CLEAR = 'spinner:Clear',
    PLAYER_EMIT_SHARD = 'shard:Create',
    PLAYER_EMIT_SHARD_CLEAR = 'shard:Clear',
    PLAYER_EMIT_TASK_MOVE = 'task:Move',
    PLAYER_EMIT_TASK_TIMELINE = 'task:Timeline',
    PLAYER_EMIT_INVENTORY_NOTIFICATION = 'inventory:Notification',
    PLAYER_EMIT_TEMP_OBJECT_LERP = 'temp:Object:Lerp',
    PLAYER_EMIT_WHEEL_MENU = 'wheelMenu:Dynamic',
    //
    PLAYER_RELOAD = 'player:ForceReload',
    //
    PLAYER_SET_FREEZE = 'freeze:Set',
    PLAYER_SET_DEATH = 'death:Toggle',
    PLAYER_SET_INTERACTION = 'interaction:Set',
    //
    PLAYER_TICK = 'player:Tick',
    //
    PLAYER_TOOLBAR_SET = 'player:Toolbar',
    PLAYER_ITEM_CHANGE = 'player:ItemChange',
    //
    PLAY_PARTICLE_EFFECT = 'ptfx:Play',
    PLAY_ANIMATION_FOR_PED = 'animation:PlayForPed',
    //PEDS
  //  APPEND_PED = 'peds:append',
    PED_DATA = 'peds:GetSetPedData',
   // PLAY_ANIMATION_FOR_PED = 'peds:playAnim',
   // POPULATE_PEDS = 'peds:Populate',
   // REMOVE_GLOBAL_PED = 'peds:removeGlobal',
   // REMOVE_PED = 'peds:remove',
    SET_PED_DECORATIONS = "ped:SetDecoration",
    PLAY_PED_AMBIENT_SPEECH = "peds:PlayAmbientSpeech",
    GET_PED_HEALTH = "peds:GetPedHealth",
    PED_EMIT_TASK_TIMELINE = "peds:EmitTaskTimeline",
    PED_STOP_ANIM = "peds:StopAnim",
    GIVE_WEAPON_TO_PED = "peds:GiveWeapon",
    PED_AIM_AT_ENTITY = "peds:AimAtEntity",
    CLEAR_PED_TASKS = "peds:ClearTaskImmediately",
    PED_SHOOT_ENTITY = "peds:ShootEntity",
    HOLSTER_WEAPON = "peds:RemoveAllWeapons",
    PED_ATTACH = "peds:AttachToPed",
    PED_SYNC_OBJECT_ARRAY_TO_SERVER = "peds:syncObjectArrayToServer",
    PED_SYNC_OBJECT_ARRAY_TO_CLIENT = "peds:syncObjectArrayToClient",
    PED_DETACH = "peds:RemoveAttachable",
    PED_DETACH_ALL_ATTACHMENTS = "peds:DeattachAllAttachments",
    PED_DETACH_DYNAMIC = "peds:DetachDynamic",
    PED_DETACH_DYNAMIC_ALL = "peds:DetachDynamicAll",
    PED_REMOVE_OBJECT_PED = "peds:RemoveObject",
    IS_PLAYER_AIMINIG_AT_PED_TO_CLIENT = "peds:isPlayerAimingAtPedToClient",
    IS_PLAYER_AIMINIG_AT_PED_TO_SERVER = "peds:isPlayerAimingAtPedToServer",
    SET_PED_ARMOR = "peds:setArmor",
    ADD_PED_ARMOR = "peds:addArmor",
    SET_PED_TO_VEHICLE = "peds:setPedToVeh",
    IS_PED_MALE = "peds:setPedToVeh",
    TRIGGER_AIM_CALLBACK_FOR_PED = "peds:TriggerAimCallbackForPed",
    PED_SET_ROT = "peds:SetPedRotation",
    TRIGGER_DAMAGE_CALLBACK_FOR_PED = "peds:TriggerDamageCallbackForPed",
    PEDS_SYNC_DAMAGE_AND_BLOOD = "peds:SyncDamageAndBlood",
    SET_PED_ATTACHMENT_POSITION = "peds:SetObjectPosition",
    APPLY_FORCE_TO_ATTACHMENT = "peds:applyForceToAttachment",
    GET_ALL_PED_DATA = "peds:getAllPedData",
    // Progress Bar
    PROGRESSBAR_CREATE = 'progressbar:Create',
    PROGRESSBAR_REMOVE = 'progressbar:Remove',
    // Polygon
    POLYGON_ENTER = 'polygon:Enter',
    POLYGON_LEAVE = 'polygon:Leave',
    //
    POPULATE_BLIPS = 'blips:Populate',
    POPULATE_MARKERS = 'markers:Populate',
    POPULATE_COMMANDS = 'commands:Populate',
    POPULATE_ITEMS = 'items:Populate',
    POPULATE_INTERACTIONS = 'interactions:Populate',
    POPULATE_TEXTLABELS = 'labels:Populate',
    POPULATE_OBJECTS = 'objects:Populate',
    POPULATE_PEDS = 'peds:Populate',
    POPULATE_WORLD_NOTIFICATIONS = 'worldNotifications:Populate',
    POPULATE_ITEM_DROPS = 'itemDrops:Populate',
    POPULATE_POLYGONS = 'polygons:Populate',
    //
    QUICK_TOKEN_UPDATE = 'quicktoken:update',
    QUICK_TOKEN_FETCH = 'quicktoken:fetch',
    //
    REMOVE_GLOBAL_OBJECT = 'remove:Global:Object',
    REMOVE_OBJECT = 'remove:Object',
    REMOVE_GLOBAL_PED = 'remove:Global:Object',
    REMOVE_PED = 'remove:Object',
    REMOVE_MARKER = 'remove:Marker',
    REMOVE_BLIP = 'remove:Blip',
    REMOVE_TEXTLABEL = 'remove:Textlabel',
    REMOVE_WORLD_NOTIFICATION = 'remove:WorldNotification',
    REMOVE_POLYGON = 'remove:Polygon',
    //
    SET_ACTION_MENU = 'actions:Set',
    SET_VIEW_URL = 'actions:SetViewURL',
    //
    SCREENSHOT_POPULATE_DATA = 'screenshot:Populate:Data',
    SCREENSHOT_CREATE = 'screenshot:Create',
    //
    SET_PLAYER_DECORATIONS = 'character:Ped:Decoration',
    SYNC_APPEARANCE = 'character:Appearance',
    SYNC_EQUIPMENT = 'character:Equipment',
    //
    TICKS_START = 'ticks:Start',
    //
    VEHICLE_ENGINE = 'vehicle:Engine',
    VEHICLES_VIEW_SPAWN = 'vehicles:Spawn',
    VEHICLES_VIEW_DESPAWN = 'vehicles:Despawn',
    //
    WORLD_UPDATE_TIME = 'time:Update',
    WORLD_UPDATE_WEATHER = 'weather:Update',
    //
    VOICE_ADD = 'voice:Add',
    VOICE_JOINED = 'voice:Joined',
    //
    WEBVIEW_INFO = 'webview:Info',
}