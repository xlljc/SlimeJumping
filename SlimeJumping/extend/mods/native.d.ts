/*
 version: 
*/

/** Indicates this is a C# type. */
declare type CsType = {
    "System.Int32": number,
    "System.String": string,
    "System.Boolean": boolean,
    "System.Object": Object,
}
/** Represents an array type in C#. */
declare interface CsArray<T = any> {
    [Symbol.iterator](): IterableIterator<T>;
    get Length(): number;
    Get(index: number): T;
    Set(index: number, value: T): void;
}
declare interface CsArrayStatic {
    createCsArray<T1 extends keyof CsType, V extends CsType[T1]>(csType: T1, ...length: number[]): CsArray<V>;
    createCsArray(csType: string, ...length: number[]): CsArray<any>;
    /** Converts a JS array to a C# array of the specified type. */
    toCsArray<T>(csType: CsType, arr: Array<T>): CsArray<T>;
}
declare var CsArray: CsArrayStatic;

declare interface ArrayConstructor {
    /** Convert C# arrays to JS arrays. */
    toJsArray<T>(csArr: CsArray<T>): Array<T>;
}

interface Console {
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
    warn(...data: any[]): void;
}
declare var console: Console;


declare namespace globalThis {
    function TestArr1(array: any): void;
}
declare namespace globalThis {
    /**
     * 这是TestArr2函数
     * @params array 参数为int数组
    */
    function TestArr2(array: CsArray<int>): void;
}
declare namespace globalThis {
    /**
     * 哈哈哈哈555
     * asdf
     * xxx55555
     * @params typeName aaaaf45
     * @params length 阿斯顿发份
     * @returns aaaxxx
    */
    function __createHostArr(typeName: string, ...length: any[]): any;
}

declare namespace Godot {
    type KeyList = any;
    interface KeyListEnum {
        readonly Space: any,
        readonly Exclam: any,
        readonly Quotedbl: any,
        readonly Numbersign: any,
        readonly Dollar: any,
        readonly Percent: any,
        readonly Ampersand: any,
        readonly Apostrophe: any,
        readonly Parenleft: any,
        readonly Parenright: any,
        readonly Asterisk: any,
        readonly Plus: any,
        readonly Comma: any,
        readonly Minus: any,
        readonly Period: any,
        readonly Slash: any,
        readonly Key0: any,
        readonly Key1: any,
        readonly Key2: any,
        readonly Key3: any,
        readonly Key4: any,
        readonly Key5: any,
        readonly Key6: any,
        readonly Key7: any,
        readonly Key8: any,
        readonly Key9: any,
        readonly Colon: any,
        readonly Semicolon: any,
        readonly Less: any,
        readonly Equal: any,
        readonly Greater: any,
        readonly Question: any,
        readonly At: any,
        readonly A: any,
        readonly B: any,
        readonly C: any,
        readonly D: any,
        readonly E: any,
        readonly F: any,
        readonly G: any,
        readonly H: any,
        readonly I: any,
        readonly J: any,
        readonly K: any,
        readonly L: any,
        readonly M: any,
        readonly N: any,
        readonly O: any,
        readonly P: any,
        readonly Q: any,
        readonly R: any,
        readonly S: any,
        readonly T: any,
        readonly U: any,
        readonly V: any,
        readonly W: any,
        readonly X: any,
        readonly Y: any,
        readonly Z: any,
        readonly Bracketleft: any,
        readonly Backslash: any,
        readonly Bracketright: any,
        readonly Asciicircum: any,
        readonly Underscore: any,
        readonly Quoteleft: any,
        readonly Braceleft: any,
        readonly Bar: any,
        readonly Braceright: any,
        readonly Asciitilde: any,
        readonly Nobreakspace: any,
        readonly Exclamdown: any,
        readonly Cent: any,
        readonly Sterling: any,
        readonly Currency: any,
        readonly Yen: any,
        readonly Brokenbar: any,
        readonly Section: any,
        readonly Diaeresis: any,
        readonly Copyright: any,
        readonly Ordfeminine: any,
        readonly Guillemotleft: any,
        readonly Notsign: any,
        readonly Hyphen: any,
        readonly Registered: any,
        readonly Macron: any,
        readonly Degree: any,
        readonly Plusminus: any,
        readonly Twosuperior: any,
        readonly Threesuperior: any,
        readonly Acute: any,
        readonly Mu: any,
        readonly Paragraph: any,
        readonly Periodcentered: any,
        readonly Cedilla: any,
        readonly Onesuperior: any,
        readonly Masculine: any,
        readonly Guillemotright: any,
        readonly Onequarter: any,
        readonly Onehalf: any,
        readonly Threequarters: any,
        readonly Questiondown: any,
        readonly Agrave: any,
        readonly Aacute: any,
        readonly Acircumflex: any,
        readonly Atilde: any,
        readonly Adiaeresis: any,
        readonly Aring: any,
        readonly Ae: any,
        readonly Ccedilla: any,
        readonly Egrave: any,
        readonly Eacute: any,
        readonly Ecircumflex: any,
        readonly Ediaeresis: any,
        readonly Igrave: any,
        readonly Iacute: any,
        readonly Icircumflex: any,
        readonly Idiaeresis: any,
        readonly Eth: any,
        readonly Ntilde: any,
        readonly Ograve: any,
        readonly Oacute: any,
        readonly Ocircumflex: any,
        readonly Otilde: any,
        readonly Odiaeresis: any,
        readonly Multiply: any,
        readonly Ooblique: any,
        readonly Ugrave: any,
        readonly Uacute: any,
        readonly Ucircumflex: any,
        readonly Udiaeresis: any,
        readonly Yacute: any,
        readonly Thorn: any,
        readonly Ssharp: any,
        readonly Division: any,
        readonly Ydiaeresis: any,
        readonly Escape: any,
        readonly Tab: any,
        readonly Backtab: any,
        readonly Backspace: any,
        readonly Enter: any,
        readonly KpEnter: any,
        readonly Insert: any,
        readonly Delete: any,
        readonly Pause: any,
        readonly Print: any,
        readonly Sysreq: any,
        readonly Clear: any,
        readonly Home: any,
        readonly End: any,
        readonly Left: any,
        readonly Up: any,
        readonly Right: any,
        readonly Down: any,
        readonly Pageup: any,
        readonly Pagedown: any,
        readonly Shift: any,
        readonly Control: any,
        readonly Meta: any,
        readonly Alt: any,
        readonly Capslock: any,
        readonly Numlock: any,
        readonly Scrolllock: any,
        readonly F1: any,
        readonly F2: any,
        readonly F3: any,
        readonly F4: any,
        readonly F5: any,
        readonly F6: any,
        readonly F7: any,
        readonly F8: any,
        readonly F9: any,
        readonly F10: any,
        readonly F11: any,
        readonly F12: any,
        readonly F13: any,
        readonly F14: any,
        readonly F15: any,
        readonly F16: any,
        readonly SuperL: any,
        readonly SuperR: any,
        readonly Menu: any,
        readonly HyperL: any,
        readonly HyperR: any,
        readonly Help: any,
        readonly DirectionL: any,
        readonly DirectionR: any,
        readonly Back: any,
        readonly Forward: any,
        readonly Stop: any,
        readonly Refresh: any,
        readonly Volumedown: any,
        readonly Volumemute: any,
        readonly Volumeup: any,
        readonly Bassboost: any,
        readonly Bassup: any,
        readonly Bassdown: any,
        readonly Trebleup: any,
        readonly Trebledown: any,
        readonly Mediaplay: any,
        readonly Mediastop: any,
        readonly Mediaprevious: any,
        readonly Medianext: any,
        readonly Mediarecord: any,
        readonly Homepage: any,
        readonly Favorites: any,
        readonly Search: any,
        readonly Standby: any,
        readonly Openurl: any,
        readonly Launchmail: any,
        readonly Launchmedia: any,
        readonly Launch0: any,
        readonly Launch1: any,
        readonly Launch2: any,
        readonly Launch3: any,
        readonly Launch4: any,
        readonly Launch5: any,
        readonly Launch6: any,
        readonly Launch7: any,
        readonly Launch8: any,
        readonly Launch9: any,
        readonly Launcha: any,
        readonly Launchb: any,
        readonly Launchc: any,
        readonly Launchd: any,
        readonly Launche: any,
        readonly Launchf: any,
        readonly KpMultiply: any,
        readonly KpDivide: any,
        readonly KpSubtract: any,
        readonly KpPeriod: any,
        readonly KpAdd: any,
        readonly Kp0: any,
        readonly Kp1: any,
        readonly Kp2: any,
        readonly Kp3: any,
        readonly Kp4: any,
        readonly Kp5: any,
        readonly Kp6: any,
        readonly Kp7: any,
        readonly Kp8: any,
        readonly Kp9: any,
        readonly Unknown: any,
    }
    var KeyList: KeyListEnum;
}

declare namespace globalThis {
    interface TestJsObject {
    }
    interface TestJsObjectConstructor {
        new(): TestJsObject;
    }
    interface TestJsObjectStatic {
        Test(): void;
        TestArr1(array: any): void;
        /**
         * 这是TestArr2函数
         * @params array 参数为int数组
        */
        TestArr2(array: CsArray<int>): void;
    }
    var TestJsObject: TestJsObjectConstructor & TestJsObjectStatic;
}
declare namespace Godot {
    /**
     * Nodes are Godot's building blocks. They can be assigned as the child of another node, resulting in a tree arrangement. A given node can contain any number of nodes as children with the requirement that all siblings (direct children of a node) should have unique names.
     * A tree of nodes is called a scene. Scenes can be saved to the disk and then instanced into other scenes. This allows for very high flexibility in the architecture and data model of Godot projects.
     * Scene tree: The  contains the active tree of nodes. When a node is added to the scene tree, it receives the  notification and its  callback is triggered. Child nodes are always added after their parent node, i.e. the  callback of a parent node will be triggered before its child's.
     * Once all nodes have been added in the scene tree, they receive the  notification and their respective  callbacks are triggered. For groups of nodes, the  callback is called in reverse order, starting with the children and moving up to the parent nodes.
     * This means that when adding a node to the scene tree, the following order will be used for the callbacks:  of the parent,  of the children,  of the children and finally  of the parent (recursively for the entire scene tree).
     * Processing: Nodes can override the "process" state, so that they receive a callback on each frame requesting them to process (do something). Normal processing (callback , toggled with ) happens as fast as possible and is dependent on the frame rate, so the processing time delta (in seconds) is passed as an argument. Physics processing (callback , toggled with ) happens a fixed number of times per second (60 by default) and is useful for code related to the physics engine.
     * Nodes can also process input events. When present, the  function will be called for each input that the program receives. In many cases, this can be overkill (unless used for simple projects), and the  function might be preferred; it is called when the input event was not handled by anyone else (typically, GUI  nodes), ensuring that the node only receives the events that were meant for it.
     * To keep track of the scene hierarchy (especially when instancing scenes into other scenes), an "owner" can be set for the node with the  property. This keeps track of who instanced what. This is mostly useful when writing editors and tools, though.
     * Finally, when a node is freed with  or , it will also free all its children.
     * Groups: Nodes can be added to as many groups as you want to be easy to manage, you could create groups like "enemies" or "collectables" for example, depending on your game. See ,  and . You can then retrieve all nodes in these groups, iterate them and even call methods on groups via the methods on .
     * Networking with nodes: After connecting to a server (or making one, see ), it is possible to use the built-in RPC (remote procedure call) system to communicate over the network. By calling  with a method name, it will be called locally and in all connected peers (peers = clients and the server that accepts connections). To identify which node receives the RPC call, Godot will use its  (make sure node names are the same on all peers). Also, take a look at the high-level networking tutorial and corresponding demos.
    */
    interface Node extends Godot.Object {
        get EditorDescription(): string;
        set EditorDescription(v: string);
        get _ImportPath(): Godot.NodePath;
        set _ImportPath(v: Godot.NodePath);
        /**
         * Pause mode. How the node will behave if the  is paused.
        */
        get PauseMode(): Godot.Node.PauseModeEnum;
        /**
         * Pause mode. How the node will behave if the  is paused.
        */
        set PauseMode(v: Godot.Node.PauseModeEnum);
        /**
         * The name of the node. This name is unique among the siblings (other child nodes from the same parent). When set to an existing name, the node will be automatically renamed.
         * Note: Auto-generated names might include the @ character, which is reserved for unique names when using . When setting the name manually, any @ will be removed.
        */
        get Name(): string;
        /**
         * The name of the node. This name is unique among the siblings (other child nodes from the same parent). When set to an existing name, the node will be automatically renamed.
         * Note: Auto-generated names might include the @ character, which is reserved for unique names when using . When setting the name manually, any @ will be removed.
        */
        set Name(v: string);
        /**
         * If a scene is instantiated from a file, its topmost node contains the absolute file path from which it was loaded in  (e.g. res://levels/1.tscn). Otherwise,  is set to an empty string.
        */
        get Filename(): string;
        /**
         * If a scene is instantiated from a file, its topmost node contains the absolute file path from which it was loaded in  (e.g. res://levels/1.tscn). Otherwise,  is set to an empty string.
        */
        set Filename(v: string);
        /**
         * The node owner. A node can have any other node as owner (as long as it is a valid parent, grandparent, etc. ascending in the tree). When saving a node (using ), all the nodes it owns will be saved with it. This allows for the creation of complex s, with instancing and subinstancing.
        */
        get Owner(): Godot.Node;
        /**
         * The node owner. A node can have any other node as owner (as long as it is a valid parent, grandparent, etc. ascending in the tree). When saving a node (using ), all the nodes it owns will be saved with it. This allows for the creation of complex s, with instancing and subinstancing.
        */
        set Owner(v: Godot.Node);
        /**
         * The  instance associated with this node. Either the , or the default SceneTree one (if inside tree).
        */
        get Multiplayer(): Godot.MultiplayerAPI;
        /**
         * The override to the default . Set to null to use the default  one.
        */
        get CustomMultiplayer(): Godot.MultiplayerAPI;
        /**
         * The override to the default . Set to null to use the default  one.
        */
        set CustomMultiplayer(v: Godot.MultiplayerAPI);
        /**
         * The node's priority in the execution order of the enabled processing callbacks (i.e. ,  and their internal counterparts). Nodes whose process priority value is lower will have their processing callbacks executed first.
        */
        get ProcessPriority(): int;
        /**
         * The node's priority in the execution order of the enabled processing callbacks (i.e. ,  and their internal counterparts). Nodes whose process priority value is lower will have their processing callbacks executed first.
        */
        set ProcessPriority(v: int);
        /**
         * Called when the node enters the  (e.g. upon instancing, scene changing, or after calling  in a script). If the node has children, its  callback will be called first, and then that of the children.
         * Corresponds to the  notification in .
        */
        _EnterTree(): void;
        /**
         * Called when the node is about to leave the  (e.g. upon freeing, scene changing, or after calling  in a script). If the node has children, its  callback will be called last, after all its children have left the tree.
         * Corresponds to the  notification in  and signal tree_exiting. To get notified when the node has already left the active tree, connect to the tree_exited.
        */
        _ExitTree(): void;
        /**
         * The string returned from this method is displayed as a warning in the Scene Dock if the script that overrides it is a tool script.
         * Returning an empty string produces no warning.
         * Call  when the warning needs to be updated for this node.
        */
        _GetConfigurationWarning(): string;
        /**
         * Called when there is an input event. The input event propagates up through the node tree until a node consumes it.
         * It is only called if input processing is enabled, which is done automatically if this method is overridden, and can be toggled with .
         * To consume the input event and stop it propagating further to other nodes,  can be called.
         * For gameplay input,  and  are usually a better fit as they allow the GUI to intercept the events first.
         * Note: This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
        */
        _Input(event: Godot.InputEvent): void;
        /**
         * Called during the physics processing step of the main loop. Physics processing means that the frame rate is synced to the physics, i.e. the delta variable should be constant. delta is in seconds.
         * It is only called if physics processing is enabled, which is done automatically if this method is overridden, and can be toggled with .
         * Corresponds to the  notification in .
         * Note: This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
        */
        _PhysicsProcess(delta: float): void;
        /**
         * Called during the processing step of the main loop. Processing happens at every frame and as fast as possible, so the delta time since the previous frame is not constant. delta is in seconds.
         * It is only called if processing is enabled, which is done automatically if this method is overridden, and can be toggled with .
         * Corresponds to the  notification in .
         * Note: This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
        */
        _Process(delta: float): void;
        /**
         * Called when the node is "ready", i.e. when both the node and its children have entered the scene tree. If the node has children, their  callbacks get triggered first, and the parent node will receive the ready notification afterwards.
         * Corresponds to the  notification in . See also the onready keyword for variables.
         * Usually used for initialization. For even earlier initialization,  may be used. See also .
         * Note:  may be called only once for each node. After removing a node from the scene tree and adding again, _ready will not be called for the second time. This can be bypassed with requesting another call with , which may be called anywhere before adding the node again.
        */
        _Ready(): void;
        /**
         * Called when an  hasn't been consumed by  or any GUI. The input event propagates up through the node tree until a node consumes it.
         * It is only called if unhandled input processing is enabled, which is done automatically if this method is overridden, and can be toggled with .
         * To consume the input event and stop it propagating further to other nodes,  can be called.
         * For gameplay input, this and  are usually a better fit than  as they allow the GUI to intercept the events first.
         * Note: This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
        */
        _UnhandledInput(event: Godot.InputEvent): void;
        /**
         * Called when an  hasn't been consumed by  or any GUI. The input event propagates up through the node tree until a node consumes it.
         * It is only called if unhandled key input processing is enabled, which is done automatically if this method is overridden, and can be toggled with .
         * To consume the input event and stop it propagating further to other nodes,  can be called.
         * For gameplay input, this and  are usually a better fit than  as they allow the GUI to intercept the events first.
         * Note: This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
        */
        _UnhandledKeyInput(event: Godot.InputEventKey): void;
        /**
         * Adds child_node as a child. The child is placed below the given node in the list of children.
         * If legible_unique_name is true, the child node will have a human-readable name based on the name of the node being instanced instead of its type.
        */
        AddChildBelowNode(node: Godot.Node, childNode: Godot.Node, legibleUniqueName?: boolean): void;
        SetName(name: string): void;
        GetName(): string;
        /**
         * Adds a child node. Nodes can have any number of children, but every child must have a unique name. Child nodes are automatically deleted when the parent node is deleted, so an entire scene can be removed by deleting its topmost node.
         * If legible_unique_name is true, the child node will have a human-readable name based on the name of the node being instanced instead of its type.
         * Note: If the child node already has a parent, the function will fail. Use  first to remove the node from its current parent. For example:
         * 
         * if child_node.get_parent():
         *     child_node.get_parent().remove_child(child_node)
         * add_child(child_node)
         * 
         * Note: If you want a child to be persisted to a , you must set  in addition to calling . This is typically relevant for tool scripts and editor plugins. If  is called without setting , the newly added  will not be visible in the scene tree, though it will be visible in the 2D/3D view.
        */
        AddChild(node: Godot.Node, legibleUniqueName?: boolean): void;
        /**
         * Removes a child node. The node is NOT deleted and must be deleted manually.
         * Note: This function may set the  of the removed Node (or its descendants) to be null, if that  is no longer a parent or ancestor.
        */
        RemoveChild(node: Godot.Node): void;
        /**
         * Returns the number of child nodes.
        */
        GetChildCount(): int;
        /**
         * Returns an array of references to node's children.
        */
        GetChildren(): Godot.Collections.Array;
        /**
         * Returns a child node by its index (see ). This method is often used for iterating all children of a node.
         * To access a child node via its name, use .
        */
        GetChild(idx: int): Godot.Node;
        /**
         * Returns true if the node that the  points to exists.
        */
        HasNode(path: Godot.NodePath): boolean;
        /**
         * Fetches a node. The  can be either a relative path (from the current node) or an absolute path (in the scene tree) to a node. If the path does not exist, a null instance is returned and an error is logged. Attempts to access methods on the return value will result in an "Attempt to call <method> on a null instance." error.
         * Note: Fetching absolute paths only works when the node is inside the scene tree (see ).
         * Example: Assume your current node is Character and the following tree:
         * 
         * /root
         * /root/Character
         * /root/Character/Sword
         * /root/Character/Backpack/Dagger
         * /root/MyGame
         * /root/Swamp/Alligator
         * /root/Swamp/Mosquito
         * /root/Swamp/Goblin
         * 
         * Possible paths are:
         * 
         * get_node("Sword")
         * get_node("Backpack/Dagger")
         * get_node("../Swamp/Alligator")
         * get_node("/root/MyGame")
        */
        GetNode(path: Godot.NodePath): Godot.Node;
        /**
         * Similar to , but does not log an error if path does not point to a valid .
        */
        GetNodeOrNull(path: Godot.NodePath): Godot.Node;
        /**
         * Returns the parent node of the current node, or a null instance if the node lacks a parent.
        */
        GetParent(): Godot.Node;
        /**
         * Finds a descendant of this node whose name matches mask as in String.match (i.e. case-sensitive, but "*" matches zero or more characters and "?" matches any single character except "."). Returns null if no matching  is found.
         * Note: It does not match against the full path, just against individual node names.
         * If owned is true, this method only finds nodes whose owner is this node. This is especially important for scenes instantiated through a script, because those scenes don't have an owner.
         * Note: As this method walks through all the descendants of the node, it is the slowest way to get a reference to another node. Whenever possible, consider using  instead. To avoid using  too often, consider caching the node reference into a variable.
        */
        FindNode(mask: string, recursive?: boolean, owned?: boolean): Godot.Node;
        /**
         * Finds the first parent of the current node whose name matches mask as in String.match (i.e. case-sensitive, but "*" matches zero or more characters and "?" matches any single character except ".").
         * Note: It does not match against the full path, just against individual node names.
         * Note: As this method walks upwards in the scene tree, it can be slow in large, deeply nested scene trees. Whenever possible, consider using  instead. To avoid using  too often, consider caching the node reference into a variable.
        */
        FindParent(mask: string): Godot.Node;
        /**
         * Returns true if the  points to a valid node and its subname points to a valid resource, e.g. Area2D/CollisionShape2D:shape. Properties with a non- type (e.g. nodes or primitive math types) are not considered resources.
        */
        HasNodeAndResource(path: Godot.NodePath): boolean;
        /**
         * Fetches a node and one of its resources as specified by the 's subname (e.g. Area2D/CollisionShape2D:shape). If several nested resources are specified in the , the last one will be fetched.
         * The return value is an array of size 3: the first index points to the  (or null if not found), the second index points to the  (or null if not found), and the third index is the remaining , if any.
         * For example, assuming that Area2D/CollisionShape2D is a valid node and that its shape property has been assigned a  resource, one could have this kind of output:
         * 
         * print(get_node_and_resource("Area2D/CollisionShape2D")) # [[CollisionShape2D:1161], Null, ]
         * print(get_node_and_resource("Area2D/CollisionShape2D:shape")) # [[CollisionShape2D:1161], [RectangleShape2D:1156], ]
         * print(get_node_and_resource("Area2D/CollisionShape2D:shape:extents")) # [[CollisionShape2D:1161], [RectangleShape2D:1156], :extents]
        */
        GetNodeAndResource(path: Godot.NodePath): Godot.Collections.Array;
        /**
         * Returns true if this node is currently inside a .
        */
        IsInsideTree(): boolean;
        /**
         * Returns true if the given node is a direct or indirect child of the current node.
        */
        IsAParentOf(node: Godot.Node): boolean;
        /**
         * Returns true if the given node occurs later in the scene hierarchy than the current node.
        */
        IsGreaterThan(node: Godot.Node): boolean;
        /**
         * Returns the absolute path of the current node. This only works if the current node is inside the scene tree (see ).
        */
        GetPath(): Godot.NodePath;
        /**
         * Returns the relative  from this node to the specified node. Both nodes must be in the same scene or the function will fail.
        */
        GetPathTo(node: Godot.Node): Godot.NodePath;
        /**
         * Adds the node to a group. Groups are helpers to name and organize a subset of nodes, for example "enemies" or "collectables". A node can be in any number of groups. Nodes can be assigned a group at any time, but will not be added until they are inside the scene tree (see ). See notes in the description, and the group methods in .
         * The persistent option is used when packing node to  and saving to file. Non-persistent groups aren't stored.
         * Note: For performance reasons, the order of node groups is not guaranteed. The order of node groups should not be relied upon as it can vary across project runs.
        */
        AddToGroup(group: string, persistent?: boolean): void;
        /**
         * Removes a node from a group. See notes in the description, and the group methods in .
        */
        RemoveFromGroup(group: string): void;
        /**
         * Returns true if this node is in the specified group. See notes in the description, and the group methods in .
        */
        IsInGroup(group: string): boolean;
        /**
         * Moves a child node to a different position (order) among the other children. Since calls, signals, etc are performed by tree order, changing the order of children nodes may be useful.
        */
        MoveChild(childNode: Godot.Node, toPosition: int): void;
        /**
         * Returns an array listing the groups that the node is a member of.
         * Note: For performance reasons, the order of node groups is not guaranteed. The order of node groups should not be relied upon as it can vary across project runs.
         * Note: The engine uses some group names internally (all starting with an underscore). To avoid conflicts with internal groups, do not add custom groups whose name starts with an underscore. To exclude internal groups while looping over , use the following snippet:
         * 
         * # Stores the node's non-internal groups only (as an array of Strings).
         * var non_internal_groups = []
         * for group in get_groups():
         *     if not group.begins_with("_"):
         *         non_internal_groups.push_back(group)
        */
        GetGroups(): Godot.Collections.Array;
        /**
         * Moves this node to the bottom of parent node's children hierarchy. This is often useful in GUIs ( nodes), because their order of drawing depends on their order in the tree. The top Node is drawn first, then any siblings below the top Node in the hierarchy are successively drawn on top of it. After using raise, a Control will be drawn on top of its siblings.
        */
        Raise(): void;
        SetOwner(owner: Godot.Node): void;
        GetOwner(): Godot.Node;
        /**
         * Removes a node and sets all its children as children of the parent node (if it exists). All event subscriptions that pass by the removed node will be unsubscribed.
        */
        RemoveAndSkip(): void;
        /**
         * Returns the node's index, i.e. its position among the siblings of its parent.
        */
        GetIndex(): int;
        /**
         * Prints the tree to stdout. Used mainly for debugging purposes. This version displays the path relative to the current node, and is good for copy/pasting into the  function.
         * Example output:
         * 
         * TheGame
         * TheGame/Menu
         * TheGame/Menu/Label
         * TheGame/Menu/Camera2D
         * TheGame/SplashScreen
         * TheGame/SplashScreen/Camera2D
        */
        PrintTree(): void;
        /**
         * Similar to , this prints the tree to stdout. This version displays a more graphical representation similar to what is displayed in the scene inspector. It is useful for inspecting larger trees.
         * Example output:
         * 
         *  ┖╴TheGame
         *     ┠╴Menu
         *     ┃  ┠╴Label
         *     ┃  ┖╴Camera2D
         *     ┖╴SplashScreen
         *        ┖╴Camera2D
        */
        PrintTreePretty(): void;
        SetFilename(filename: string): void;
        GetFilename(): string;
        /**
         * Notifies the current node and all its children recursively by calling  on all of them.
        */
        PropagateNotification(what: int): void;
        /**
         * Calls the given method (if present) with the arguments given in args on this node and recursively on all its children. If the parent_first argument is true, the method will be called on the current node first, then on all its children. If parent_first is false, the children will be called first.
         * @params args If the parameter is null, then the default value is new Godot.Collections.Array { }
        */
        PropagateCall(method: string, args?: Godot.Collections.Array, parentFirst?: boolean): void;
        /**
         * Enables or disables physics (i.e. fixed framerate) processing. When a node is being processed, it will receive a  at a fixed (usually 60 FPS, see  to change) interval (and the  callback will be called if exists). Enabled automatically if  is overridden. Any calls to this before  will be ignored.
        */
        SetPhysicsProcess(enable: boolean): void;
        /**
         * Returns the time elapsed (in seconds) since the last physics-bound frame (see ). This is always a constant value in physics processing unless the frames per second is changed via .
        */
        GetPhysicsProcessDeltaTime(): float;
        /**
         * Returns true if physics processing is enabled (see ).
        */
        IsPhysicsProcessing(): boolean;
        /**
         * Returns the time elapsed (in seconds) since the last process callback. This value may vary from frame to frame.
        */
        GetProcessDeltaTime(): float;
        /**
         * Enables or disables processing. When a node is being processed, it will receive a  on every drawn frame (and the  callback will be called if exists). Enabled automatically if  is overridden. Any calls to this before  will be ignored.
        */
        SetProcess(enable: boolean): void;
        SetProcessPriority(priority: int): void;
        GetProcessPriority(): int;
        /**
         * Returns true if processing is enabled (see ).
        */
        IsProcessing(): boolean;
        /**
         * Enables or disables input processing. This is not required for GUI controls! Enabled automatically if  is overridden. Any calls to this before  will be ignored.
        */
        SetProcessInput(enable: boolean): void;
        /**
         * Returns true if the node is processing input (see ).
        */
        IsProcessingInput(): boolean;
        /**
         * Enables unhandled input processing. This is not required for GUI controls! It enables the node to receive all input that was not previously handled (usually by a ). Enabled automatically if  is overridden. Any calls to this before  will be ignored.
        */
        SetProcessUnhandledInput(enable: boolean): void;
        /**
         * Returns true if the node is processing unhandled input (see ).
        */
        IsProcessingUnhandledInput(): boolean;
        /**
         * Enables unhandled key input processing. Enabled automatically if  is overridden. Any calls to this before  will be ignored.
        */
        SetProcessUnhandledKeyInput(enable: boolean): void;
        /**
         * Returns true if the node is processing unhandled key input (see ).
        */
        IsProcessingUnhandledKeyInput(): boolean;
        SetPauseMode(mode: Godot.Node.PauseModeEnum): void;
        GetPauseMode(): Godot.Node.PauseModeEnum;
        /**
         * Returns true if the node can process while the scene tree is paused (see ). Always returns true if the scene tree is not paused, and false if the node is not in the tree.
        */
        CanProcess(): boolean;
        /**
         * Prints all stray nodes (nodes outside the ). Used for debugging. Works only in debug builds.
        */
        PrintStrayNodes(): void;
        /**
         * Returns the node's order in the scene tree branch. For example, if called on the first child node the position is 0.
        */
        GetPositionInParent(): int;
        /**
         * Sets the folded state of the node in the Scene dock.
        */
        SetDisplayFolded(fold: boolean): void;
        /**
         * Returns true if the node is folded (collapsed) in the Scene dock.
        */
        IsDisplayedFolded(): boolean;
        /**
         * Enables or disabled internal processing for this node. Internal processing happens in isolation from the normal  calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or processing is disabled for scripting (). Only useful for advanced uses to manipulate built-in nodes' behavior.
         * Warning: Built-in Nodes rely on the internal processing for their own logic, so changing this value from your code may lead to unexpected behavior. Script access to this internal logic is provided for specific advanced uses, but is unsafe and not supported.
        */
        SetProcessInternal(enable: boolean): void;
        /**
         * Returns true if internal processing is enabled (see ).
        */
        IsProcessingInternal(): boolean;
        /**
         * Enables or disables internal physics for this node. Internal physics processing happens in isolation from the normal  calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or physics processing is disabled for scripting (). Only useful for advanced uses to manipulate built-in nodes' behavior.
         * Warning: Built-in Nodes rely on the internal processing for their own logic, so changing this value from your code may lead to unexpected behavior. Script access to this internal logic is provided for specific advanced uses, but is unsafe and not supported.
        */
        SetPhysicsProcessInternal(enable: boolean): void;
        /**
         * Returns true if internal physics processing is enabled (see ).
        */
        IsPhysicsProcessingInternal(): boolean;
        /**
         * Returns the  that contains this node.
        */
        GetTree(): Godot.SceneTree;
        /**
         * Duplicates the node, returning a new node.
         * You can fine-tune the behavior using the flags (see ).
         * Note: It will not work properly if the node contains a script with constructor arguments (i.e. needs to supply arguments to  method). In that case, the node will be duplicated without a script.
        */
        Duplicate(flags?: int): Godot.Node;
        /**
         * Replaces a node in a scene by the given one. Subscriptions that pass through this node will be lost.
         * Note that the replaced node is not automatically freed, so you either need to keep it in a variable for later use or free it using .
        */
        ReplaceBy(node: Godot.Node, keepData?: boolean): void;
        /**
         * Sets whether this is an instance load placeholder. See .
        */
        SetSceneInstanceLoadPlaceholder(loadPlaceholder: boolean): void;
        /**
         * Returns true if this is an instance load placeholder. See .
        */
        GetSceneInstanceLoadPlaceholder(): boolean;
        /**
         * Returns the node's .
        */
        GetViewport(): Godot.Viewport;
        /**
         * Queues a node for deletion at the end of the current frame. When deleted, all of its child nodes will be deleted as well. This method ensures it's safe to delete the node, contrary to . Use  to check whether a node will be deleted at the end of the frame.
         * Important: If you have a variable pointing to a node, it will not be assigned to null once the node is freed. Instead, it will point to a previously freed instance and you should validate it with @GDScript.is_instance_valid before attempting to call its methods or access its properties.
        */
        QueueFree(): void;
        /**
         * Requests that _ready be called again. Note that the method won't be called immediately, but is scheduled for when the node is added to the scene tree again (see ). _ready is called only for the node which requested it, which means that you need to request ready for each child if you want them to call _ready too (in which case, _ready will be called in the same order as it would normally).
        */
        RequestReady(): void;
        /**
         * Sets the node's network master to the peer with the given peer ID. The network master is the peer that has authority over the node on the network. Useful in conjunction with the master and puppet keywords. Inherited from the parent node by default, which ultimately defaults to peer ID 1 (the server). If recursive, the given peer is recursively set as the master for all children of this node.
        */
        SetNetworkMaster(id: int, recursive?: boolean): void;
        /**
         * Returns the peer ID of the network master for this node. See .
        */
        GetNetworkMaster(): int;
        /**
         * Returns true if the local system is the master of this node.
        */
        IsNetworkMaster(): boolean;
        GetMultiplayer(): Godot.MultiplayerAPI;
        GetCustomMultiplayer(): Godot.MultiplayerAPI;
        SetCustomMultiplayer(api: Godot.MultiplayerAPI): void;
        /**
         * Changes the RPC mode for the given method to the given mode. See . An alternative is annotating methods and properties with the corresponding keywords (remote, master, puppet, remotesync, mastersync, puppetsync). By default, methods are not exposed to networking (and RPCs). See also  and  for properties.
        */
        RpcConfig(method: string, mode: Godot.MultiplayerAPI.RPCMode): void;
        /**
         * Changes the RPC mode for the given property to the given mode. See . An alternative is annotating methods and properties with the corresponding keywords (remote, master, puppet, remotesync, mastersync, puppetsync). By default, properties are not exposed to networking (and RPCs). See also  and  for methods.
        */
        RsetConfig(property: string, mode: Godot.MultiplayerAPI.RPCMode): void;
        /**
         * Sends a remote procedure call request for the given method to peers on the network (and locally), optionally sending all additional arguments as arguments to the method called by the RPC. The call request will only be received by nodes with the same , including the exact same node name. Behaviour depends on the RPC configuration for the given method, see . Methods are not exposed to RPCs by default. See also  and  for properties. Returns an empty Variant.
         * Note: You can only safely use RPCs on clients after you received the connected_to_server signal from the . You also need to keep track of the connection state, either by the  signals like server_disconnected or by checking SceneTree.network_peer.get_connection_status() == CONNECTION_CONNECTED.
        */
        Rpc(method: string, ...args: any[]): any;
        /**
         * Sends a  using an unreliable protocol. Returns an empty Variant.
        */
        RpcUnreliable(method: string, ...args: any[]): any;
        /**
         * Sends a  to a specific peer identified by peer_id (see ). Returns an empty Variant.
        */
        RpcId(peerId: int, method: string, ...args: any[]): any;
        /**
         * Sends a  to a specific peer identified by peer_id using an unreliable protocol (see ). Returns an empty Variant.
        */
        RpcUnreliableId(peerId: int, method: string, ...args: any[]): any;
        /**
         * Remotely changes a property's value on other peers (and locally). Behaviour depends on the RPC configuration for the given property, see . See also  for RPCs for methods, most information applies to this method as well.
        */
        Rset(property: string, value: any): void;
        /**
         * Remotely changes the property's value on a specific peer identified by peer_id (see ).
        */
        RsetId(peerId: int, property: string, value: any): void;
        /**
         * Remotely changes the property's value on other peers (and locally) using an unreliable protocol.
        */
        RsetUnreliable(property: string, value: any): void;
        /**
         * Remotely changes property's value on a specific peer identified by peer_id using an unreliable protocol (see ).
        */
        RsetUnreliableId(peerId: int, property: string, value: any): void;
        /**
         * Updates the warning displayed for this node in the Scene Dock.
         * Use  to setup the warning message to display.
        */
        UpdateConfigurationWarning(): void;
    }
    interface NodeConstructor {
        new(): Godot.Node;
    }
    interface NodeStatic extends Godot.ObjectStatic {
        /**
         * Notification received when the node enters a .
        */
        readonly NotificationEnterTree: int;
        /**
         * Notification received when the node is about to exit a .
        */
        readonly NotificationExitTree: int;
        /**
         * Notification received when the node is moved in the parent.
        */
        readonly NotificationMovedInParent: int;
        /**
         * Notification received when the node is ready. See .
        */
        readonly NotificationReady: int;
        /**
         * Notification received when the node is paused.
        */
        readonly NotificationPaused: int;
        /**
         * Notification received when the node is unpaused.
        */
        readonly NotificationUnpaused: int;
        /**
         * Notification received every frame when the physics process flag is set (see ).
        */
        readonly NotificationPhysicsProcess: int;
        /**
         * Notification received every frame when the process flag is set (see ).
        */
        readonly NotificationProcess: int;
        /**
         * Notification received when a node is set as a child of another node.
         * Note: This doesn't mean that a node entered the .
        */
        readonly NotificationParented: int;
        /**
         * Notification received when a node is unparented (parent removed it from the list of children).
        */
        readonly NotificationUnparented: int;
        /**
         * Notification received when the node is instanced.
        */
        readonly NotificationInstanced: int;
        /**
         * Notification received when a drag begins.
        */
        readonly NotificationDragBegin: int;
        /**
         * Notification received when a drag ends.
        */
        readonly NotificationDragEnd: int;
        /**
         * Notification received when the node's  changed.
        */
        readonly NotificationPathChanged: int;
        /**
         * Notification received every frame when the internal process flag is set (see ).
        */
        readonly NotificationInternalProcess: int;
        /**
         * Notification received every frame when the internal physics process flag is set (see ).
        */
        readonly NotificationInternalPhysicsProcess: int;
        /**
         * Notification received when the node is ready, just before  is received. Unlike the latter, it's sent every time the node enters tree, instead of only once.
        */
        readonly NotificationPostEnterTree: int;
        /**
         * Notification received from the OS when the mouse enters the game window.
         * Implemented on desktop and web platforms.
        */
        readonly NotificationWmMouseEnter: int;
        /**
         * Notification received from the OS when the mouse leaves the game window.
         * Implemented on desktop and web platforms.
        */
        readonly NotificationWmMouseExit: int;
        /**
         * Notification received from the OS when the game window is focused.
         * Implemented on all platforms.
        */
        readonly NotificationWmFocusIn: int;
        /**
         * Notification received from the OS when the game window is unfocused.
         * Implemented on all platforms.
        */
        readonly NotificationWmFocusOut: int;
        /**
         * Notification received from the OS when a quit request is sent (e.g. closing the window with a "Close" button or Alt+F4).
         * Implemented on desktop platforms.
        */
        readonly NotificationWmQuitRequest: int;
        /**
         * Notification received from the OS when a go back request is sent (e.g. pressing the "Back" button on Android).
         * Specific to the Android platform.
        */
        readonly NotificationWmGoBackRequest: int;
        /**
         * Notification received from the OS when an unfocus request is sent (e.g. another OS window wants to take the focus).
         * No supported platforms currently send this notification.
        */
        readonly NotificationWmUnfocusRequest: int;
        /**
         * Notification received from the OS when the application is exceeding its allocated memory.
         * Specific to the iOS platform.
        */
        readonly NotificationOsMemoryWarning: int;
        /**
         * Notification received when translations may have changed. Can be triggered by the user changing the locale. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like .
        */
        readonly NotificationTranslationChanged: int;
        /**
         * Notification received from the OS when a request for "About" information is sent.
         * Specific to the macOS platform.
        */
        readonly NotificationWmAbout: int;
        /**
         * Notification received from Godot's crash handler when the engine is about to crash.
         * Implemented on desktop platforms if the crash handler is enabled.
        */
        readonly NotificationCrash: int;
        /**
         * Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
         * Specific to the macOS platform.
        */
        readonly NotificationOsImeUpdate: int;
        /**
         * Notification received from the OS when the app is resumed.
         * Specific to the Android platform.
        */
        readonly NotificationAppResumed: int;
        /**
         * Notification received from the OS when the app is paused.
         * Specific to the Android platform.
        */
        readonly NotificationAppPaused: int;
    }
    var Node: Godot.NodeConstructor & Godot.NodeStatic;
}
declare namespace Godot {
    /**
     * Every class which is not a built-in type inherits from this class.
     * You can construct Objects from scripting languages, using Object.new() in GDScript, new Object in C#, or the "Construct Object" node in VisualScript.
     * Objects do not manage memory. If a class inherits from Object, you will have to delete instances of it manually. To do so, call the  method from your script or delete the instance from C++.
     * Some classes that extend Object add memory management. This is the case of , which counts references and deletes itself automatically when no longer referenced. , another fundamental type, deletes all its children when freed from memory.
     * Objects export properties, which are mainly useful for storage and editing, but not really so much in programming. Properties are exported in  and handled in  and . However, scripting languages and C++ have simpler means to export them.
     * Property membership can be tested directly in GDScript using in:
     * 
     * var n = Node2D.new()
     * print("position" in n) # Prints "True".
     * print("other_property" in n) # Prints "False".
     * 
     * The in operator will evaluate to true as long as the key exists, even if the value is null.
     * Objects also receive notifications. Notifications are a simple way to notify the object about different events, so they can all be handled together. See .
     * Note: Unlike references to a , references to an Object stored in a variable can become invalid without warning. Therefore, it's recommended to use  for data classes instead of .
     * Note: Due to a bug, you can't create a "plain" Object using Object.new(). Instead, use ClassDB.instance("Object"). This bug only applies to Object itself, not any of its descendents like .
    */
    interface Object extends System.IDisposable {
        /**
         * The pointer to the native instance of this Object.
        */
        get NativeInstance(): System.IntPtr;
        /**
         * Gets a new DynamicGodotObject associated with this instance.
        */
        get DynamicObject(): any;
        /**
         * Disposes of this Object.
        */
        Dispose(): void;
        /**
         * Returns a new SignalAwaiter awaiter configured to complete when the instance
         * source emits the signal specified by the signal parameter.
         * @params source The instance the awaiter will be listening to.
         * @params signal The signal the awaiter will be waiting for.
         * @returns A SignalAwaiter that completes when
         * source emits the signal.
        */
        ToSignal(source: Godot.Object, signal: string): Godot.SignalAwaiter;
        /**
         * Virtual method which can be overridden to customize the return value of .
         * Returns the given property. Returns null if the property does not exist.
        */
        _Get(property: string): any;
        /**
         * Virtual method which can be overridden to customize the return value of .
         * Returns the object's property list as an  of dictionaries.
         * Each property's  must contain at least name: String and type: int (see ) entries. Optionally, it can also include hint: int (see ), hint_string: String, and usage: int (see ).
        */
        _GetPropertyList(): Godot.Collections.Array;
        /**
         * Called whenever the object receives a notification, which is identified in what by a constant. The base  has two constants  and , but subclasses such as  define a lot more notifications which are also received by this method.
        */
        _Notification(what: int): void;
        /**
         * Virtual method which can be overridden to customize the return value of .
         * Sets a property. Returns true if the property exists.
        */
        _Set(property: string, value: any): boolean;
        /**
         * Deletes the object from memory immediately. For s, you may want to use  to queue the node for safe deletion at the end of the current frame.
         * Important: If you have a variable pointing to an object, it will not be assigned to null once the object is freed. Instead, it will point to a previously freed instance and you should validate it with @GDScript.is_instance_valid before attempting to call its methods or access its properties.
        */
        Free(): void;
        /**
         * Returns the object's class as a . See also .
         * Note:  does not take class_name declarations into account. If the object has a class_name defined, the base class name will be returned instead.
        */
        GetClass(): string;
        /**
         * Returns true if the object inherits from the given class. See also .
         * Note:  does not take class_name declarations into account. If the object has a class_name defined,  will return false for that name.
        */
        IsClass(_class: string): boolean;
        /**
         * Assigns a new value to the given property. If the property does not exist or the given value's type doesn't match, nothing will happen.
         * Note: In C#, the property name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined properties where you should use the same convention as in the C# source (typically PascalCase).
        */
        Set(property: string, value: any): void;
        /**
         * Returns the Variant value of the given property. If the property doesn't exist, this will return null.
         * Note: In C#, the property name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined properties where you should use the same convention as in the C# source (typically PascalCase).
        */
        Get(property: string): any;
        /**
         * Assigns a new value to the property identified by the . The node path should be relative to the current object and can use the colon character (:) to access nested properties. Example:
         * 
         * set_indexed("position", Vector2(42, 0))
         * set_indexed("position:y", -10)
         * print(position) # (42, -10)
        */
        SetIndexed(property: Godot.NodePath, value: any): void;
        /**
         * Gets the object's property indexed by the given . The node path should be relative to the current object and can use the colon character (:) to access nested properties. Examples: "position:x" or "material:next_pass:blend_mode".
         * Note: Even though the method takes  argument, it doesn't support actual paths to s in the scene tree, only colon-separated sub-property paths. For the purpose of nodes, use  instead.
        */
        GetIndexed(property: Godot.NodePath): any;
        /**
         * Returns the object's property list as an  of dictionaries.
         * Each property's  contain at least name: String and type: int (see ) entries. Optionally, it can also include hint: int (see ), hint_string: String, and usage: int (see ).
        */
        GetPropertyList(): Godot.Collections.Array;
        /**
         * Returns the object's methods and their signatures as an .
        */
        GetMethodList(): Godot.Collections.Array;
        /**
         * Send a given notification to the object, which will also trigger a call to the  method of all classes that the object inherits from.
         * If reversed is true,  is called first on the object's own class, and then up to its successive parent classes. If reversed is false,  is called first on the highest ancestor ( itself), and then down to its successive inheriting classes.
        */
        Notification(what: int, reversed?: boolean): void;
        /**
         * Returns the object's unique instance ID.
         * This ID can be saved in , and can be used to retrieve the object instance with @GDScript.instance_from_id.
        */
        GetInstanceId(): System.UInt64;
        /**
         * Assigns a script to the object. Each object can have a single script assigned to it, which are used to extend its functionality.
         * If the object already had a script, the previous script instance will be freed and its variables and state will be lost. The new script's  method will be called.
        */
        SetScript(script: Godot.Reference): void;
        /**
         * Returns the object's  instance, or null if none is assigned.
        */
        GetScript(): Godot.Reference;
        /**
         * Adds, changes or removes a given entry in the object's metadata. Metadata are serialized and can take any Variant value.
         * To remove a given entry from the object's metadata, use . Metadata is also removed if its value is set to null. This means you can also use set_meta("name", null) to remove metadata for "name".
        */
        SetMeta(name: string, value: any): void;
        /**
         * Removes a given entry from the object's metadata. See also .
        */
        RemoveMeta(name: string): void;
        /**
         * Returns the object's metadata entry for the given name.
        */
        GetMeta(name: string): any;
        /**
         * Returns true if a metadata entry is found with the given name.
        */
        HasMeta(name: string): boolean;
        /**
         * Returns the object's metadata as a .
        */
        GetMetaList(): CsArray<string>;
        /**
         * Adds a user-defined signal. Arguments are optional, but can be added as an  of dictionaries, each containing name: String and type: int (see ) entries.
         * @params arguments If the parameter is null, then the default value is new Godot.Collections.Array { }
        */
        AddUserSignal(signal: string, arguments?: Godot.Collections.Array): void;
        /**
         * Returns true if the given user-defined signal exists. Only signals added using  are taken into account.
        */
        HasUserSignal(signal: string): boolean;
        /**
         * Emits the given signal. The signal must exist, so it should be a built-in signal of this class or one of its parent classes, or a user-defined signal. This method supports a variable number of arguments, so parameters are passed as a comma separated list. Example:
         * 
         * emit_signal("hit", weapon_type, damage)
         * emit_signal("game_over")
        */
        EmitSignal(signal: string, ...args: any[]): void;
        /**
         * Calls the method on the object and returns the result. This method supports a variable number of arguments, so parameters are passed as a comma separated list. Example:
         * 
         * call("set", "position", Vector2(42.0, 0.0))
         * 
         * Note: In C#, the method name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined methods where you should use the same convention as in the C# source (typically PascalCase).
        */
        Call(method: string, ...args: any[]): any;
        /**
         * Calls the method on the object during idle time. This method supports a variable number of arguments, so parameters are passed as a comma separated list. Example:
         * 
         * call_deferred("set", "position", Vector2(42.0, 0.0))
         * 
         * Note: In C#, the method name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined methods where you should use the same convention as in the C# source (typically PascalCase).
        */
        CallDeferred(method: string, ...args: any[]): void;
        /**
         * Assigns a new value to the given property, after the current frame's physics step. This is equivalent to calling  via , i.e. call_deferred("set", property, value).
         * Note: In C#, the property name must be specified as snake_case if it is defined by a built-in Godot node. This doesn't apply to user-defined properties where you should use the same convention as in the C# source (typically PascalCase).
        */
        SetDeferred(property: string, value: any): void;
        /**
         * Calls the method on the object and returns the result. Contrarily to , this method does not support a variable number of arguments but expects all parameters to be via a single .
         * 
         * callv("set", [ "position", Vector2(42.0, 0.0) ])
        */
        Callv(method: string, argArray: Godot.Collections.Array): any;
        /**
         * Returns true if the object contains the given method.
        */
        HasMethod(method: string): boolean;
        /**
         * Returns true if the given signal exists.
        */
        HasSignal(signal: string): boolean;
        /**
         * Returns the list of signals as an  of dictionaries.
        */
        GetSignalList(): Godot.Collections.Array;
        /**
         * Returns an  of connections for the given signal.
        */
        GetSignalConnectionList(signal: string): Godot.Collections.Array;
        /**
         * Returns an  of dictionaries with information about signals that are connected to the object.
         * Each  contains three String entries:
         * - source is a reference to the signal emitter.
         * - signal_name is the name of the connected signal.
         * - method_name is the name of the method to which the signal is connected.
        */
        GetIncomingConnections(): Godot.Collections.Array;
        /**
         * Connects a signal to a method on a target object. Pass optional binds to the call as an  of parameters. These parameters will be passed to the method after any parameter used in the call to . Use flags to set deferred or one-shot connections. See  constants.
         * A signal can only be connected once to a method. It will throw an error if already connected, unless the signal was connected with . To avoid this, first, use  to check for existing connections.
         * If the target is destroyed in the game's lifecycle, the connection will be lost.
         * Examples:
         * 
         * connect("pressed", self, "_on_Button_pressed") # BaseButton signal
         * connect("text_entered", self, "_on_LineEdit_text_entered") # LineEdit signal
         * connect("hit", self, "_on_Player_hit", [ weapon_type, damage ]) # User-defined signal
         * 
         * An example of the relationship between binds passed to  and parameters used when calling :
         * 
         * connect("hit", self, "_on_Player_hit", [ weapon_type, damage ]) # weapon_type and damage are passed last
         * emit_signal("hit", "Dark lord", 5) # "Dark lord" and 5 are passed first
         * func _on_Player_hit(hit_by, level, weapon_type, damage):
         *     print("Hit by %s (lvl %d) with weapon %s for %d damage" % [hit_by, level, weapon_type, damage])
         * @params binds If the parameter is null, then the default value is new Godot.Collections.Array { }
        */
        Connect(signal: string, target: Godot.Object, method: string, binds?: Godot.Collections.Array, flags?: System.UInt32): Godot.Error;
        /**
         * Disconnects a signal from a method on the given target.
         * If you try to disconnect a connection that does not exist, the method will throw an error. Use  to ensure that the connection exists.
        */
        Disconnect(signal: string, target: Godot.Object, method: string): void;
        /**
         * Returns true if a connection exists for a given signal, target, and method.
        */
        IsConnected(signal: string, target: Godot.Object, method: string): boolean;
        /**
         * If set to true, signal emission is blocked.
        */
        SetBlockSignals(enable: boolean): void;
        /**
         * Returns true if signal emission blocking is enabled.
        */
        IsBlockingSignals(): boolean;
        /**
         * Notify the editor that the property list has changed, so that editor plugins can take the new values into account. Does nothing on export builds.
        */
        PropertyListChangedNotify(): void;
        /**
         * Defines whether the object can translate strings (with calls to ). Enabled by default.
        */
        SetMessageTranslation(enable: boolean): void;
        /**
         * Returns true if the object can translate strings. See  and .
        */
        CanTranslateMessages(): boolean;
        /**
         * Translates a message using translation catalogs configured in the Project Settings.
         * Only works if message translation is enabled (which it is by default), otherwise it returns the message unchanged. See .
        */
        Tr(message: string): string;
        /**
         * Returns true if the  method was called for the object.
        */
        IsQueuedForDeletion(): boolean;
    }
    interface ObjectConstructor {
        /**
         * Constructs a new Object.
        */
        new(): Godot.Object;
    }
    interface ObjectStatic extends System.IDisposableStatic {
        /**
         * Called right when the object is initialized. Not available in script.
        */
        readonly NotificationPostinitialize: int;
        /**
         * Called before the object is about to be deleted.
        */
        readonly NotificationPredelete: int;
        /**
         * Returns whether instance is a valid object
         * (e.g. has not been deleted from memory).
         * @params instance The instance to check.
         * @returns If the instance is a valid object.
        */
        IsInstanceValid(instance: Godot.Object): boolean;
        /**
         * Returns a weak reference to an object, or null
         * if the argument is invalid.
         * A weak reference to an object is not enough to keep the object alive:
         * when the only remaining references to a referent are weak references,
         * garbage collection is free to destroy the referent and reuse its memory
         * for something else. However, until the object is actually destroyed the
         * weak reference may return the object even if there are no strong references
         * to it.
         * @params obj The object.
         * @returns The WeakRef reference to the object or null.
        */
        WeakRef(obj: Godot.Object): Godot.WeakRef;
    }
}
declare namespace System {
    interface IDisposable {
        Dispose(): void;
    }
    interface IDisposableConstructor {
    }
    interface IDisposableStatic {
    }
}
declare namespace Godot {
    /**
     * A 2D game object, with a transform (position, rotation, and scale). All 2D nodes, including physics objects and sprites, inherit from Node2D. Use Node2D as a parent node to move, scale and rotate children in a 2D project. Also gives control of the node's render order.
    */
    interface Node2D extends Godot.CanvasItem {
        /**
         * Position, relative to the node's parent.
        */
        get Position(): Godot.Vector2;
        /**
         * Position, relative to the node's parent.
        */
        set Position(v: Godot.Vector2);
        /**
         * Rotation in radians, relative to the node's parent.
        */
        get Rotation(): float;
        /**
         * Rotation in radians, relative to the node's parent.
        */
        set Rotation(v: float);
        /**
         * Rotation in degrees, relative to the node's parent.
        */
        get RotationDegrees(): float;
        /**
         * Rotation in degrees, relative to the node's parent.
        */
        set RotationDegrees(v: float);
        /**
         * The node's scale. Unscaled value: (1, 1).
        */
        get Scale(): Godot.Vector2;
        /**
         * The node's scale. Unscaled value: (1, 1).
        */
        set Scale(v: Godot.Vector2);
        /**
         * Local .
        */
        get Transform(): Godot.Transform2D;
        /**
         * Local .
        */
        set Transform(v: Godot.Transform2D);
        /**
         * Global position.
        */
        get GlobalPosition(): Godot.Vector2;
        /**
         * Global position.
        */
        set GlobalPosition(v: Godot.Vector2);
        /**
         * Global rotation in radians.
        */
        get GlobalRotation(): float;
        /**
         * Global rotation in radians.
        */
        set GlobalRotation(v: float);
        /**
         * Global rotation in degrees.
        */
        get GlobalRotationDegrees(): float;
        /**
         * Global rotation in degrees.
        */
        set GlobalRotationDegrees(v: float);
        /**
         * Global scale.
        */
        get GlobalScale(): Godot.Vector2;
        /**
         * Global scale.
        */
        set GlobalScale(v: Godot.Vector2);
        /**
         * Global .
        */
        get GlobalTransform(): Godot.Transform2D;
        /**
         * Global .
        */
        set GlobalTransform(v: Godot.Transform2D);
        /**
         * Z index. Controls the order in which the nodes render. A node with a higher Z index will display in front of others. Must be between  and  (inclusive).
        */
        get ZIndex(): int;
        /**
         * Z index. Controls the order in which the nodes render. A node with a higher Z index will display in front of others. Must be between  and  (inclusive).
        */
        set ZIndex(v: int);
        /**
         * If true, the node's Z index is relative to its parent's Z index. If this node's Z index is 2 and its parent's effective Z index is 3, then this node's effective Z index will be 2 + 3 = 5.
        */
        get ZAsRelative(): boolean;
        /**
         * If true, the node's Z index is relative to its parent's Z index. If this node's Z index is 2 and its parent's effective Z index is 3, then this node's effective Z index will be 2 + 3 = 5.
        */
        set ZAsRelative(v: boolean);
        SetPosition(position: Godot.Vector2): void;
        SetRotation(radians: float): void;
        SetRotationDegrees(degrees: float): void;
        SetScale(scale: Godot.Vector2): void;
        GetPosition(): Godot.Vector2;
        GetRotation(): float;
        GetRotationDegrees(): float;
        GetScale(): Godot.Vector2;
        /**
         * Applies a rotation to the node, in radians, starting from its current rotation.
        */
        Rotate(radians: float): void;
        /**
         * Applies a local translation on the node's X axis based on the 's delta. If scaled is false, normalizes the movement.
        */
        MoveLocalX(delta: float, scaled?: boolean): void;
        /**
         * Applies a local translation on the node's Y axis based on the 's delta. If scaled is false, normalizes the movement.
        */
        MoveLocalY(delta: float, scaled?: boolean): void;
        /**
         * Translates the node by the given offset in local coordinates.
        */
        Translate(offset: Godot.Vector2): void;
        /**
         * Adds the offset vector to the node's global position.
        */
        GlobalTranslate(offset: Godot.Vector2): void;
        /**
         * Multiplies the current scale by the ratio vector.
        */
        ApplyScale(ratio: Godot.Vector2): void;
        SetGlobalPosition(position: Godot.Vector2): void;
        GetGlobalPosition(): Godot.Vector2;
        SetGlobalRotation(radians: float): void;
        GetGlobalRotation(): float;
        SetGlobalRotationDegrees(degrees: float): void;
        GetGlobalRotationDegrees(): float;
        SetGlobalScale(scale: Godot.Vector2): void;
        GetGlobalScale(): Godot.Vector2;
        SetTransform(xform: Godot.Transform2D): void;
        SetGlobalTransform(xform: Godot.Transform2D): void;
        /**
         * Rotates the node so it points towards the point, which is expected to use global coordinates.
        */
        LookAt(point: Godot.Vector2): void;
        /**
         * Returns the angle between the node and the point in radians.
         * Illustration of the returned angle.
        */
        GetAngleTo(point: Godot.Vector2): float;
        /**
         * Transforms the provided global position into a position in local coordinate space. The output will be local relative to the  it is called on. e.g. It is appropriate for determining the positions of child nodes, but it is not appropriate for determining its own position relative to its parent.
        */
        ToLocal(globalPoint: Godot.Vector2): Godot.Vector2;
        /**
         * Transforms the provided local position into a position in global coordinate space. The input is expected to be local relative to the  it is called on. e.g. Applying this method to the positions of child nodes will correctly transform their positions into the global coordinate space, but applying it to a node's own position will give an incorrect result, as it will incorporate the node's own transformation into its global position.
        */
        ToGlobal(localPoint: Godot.Vector2): Godot.Vector2;
        SetZIndex(zIndex: int): void;
        GetZIndex(): int;
        SetZAsRelative(enable: boolean): void;
        IsZRelative(): boolean;
        /**
         * Returns the  relative to this node's parent.
        */
        GetRelativeTransformToParent(parent: Godot.Node): Godot.Transform2D;
    }
    interface Node2DConstructor {
        new(): Godot.Node2D;
    }
    interface Node2DStatic extends Godot.CanvasItemStatic {
    }
    var Node2D: Godot.Node2DConstructor & Godot.Node2DStatic;
}
declare namespace Godot {
    /**
     * Base class of anything 2D. Canvas items are laid out in a tree; children inherit and extend their parent's transform.  is extended by  for anything GUI-related, and by  for anything related to the 2D engine.
     * Any  can draw. For this,  must be called, then  will be received on idle time to request redraw. Because of this, canvas items don't need to be redrawn on every frame, improving the performance significantly. Several functions for drawing on the  are provided (see draw_* functions). However, they can only be used inside the , signal or  virtual functions.
     * Canvas items are drawn in tree order. By default, children are on top of their parents so a root  will be drawn behind everything. This behavior can be changed on a per-item basis.
     * A  can also be hidden, which will also hide its children. It provides many ways to change parameters such as modulation (for itself and its children) and self modulation (only for itself), as well as its blend mode.
     * Ultimately, a transform notification can be requested, which will notify the node that its global position changed in case the parent tree changed.
     * Note: Unless otherwise specified, all methods that have angle parameters must have angles specified as radians. To convert degrees to radians, use @GDScript.deg2rad.
    */
    interface CanvasItem extends Godot.Node {
        /**
         * If true, this  is drawn. The node is only visible if all of its antecedents are visible as well (in other words,  must return true).
         * Note: For controls that inherit , the correct way to make them visible is to call one of the multiple popup*() functions instead.
        */
        get Visible(): boolean;
        /**
         * If true, this  is drawn. The node is only visible if all of its antecedents are visible as well (in other words,  must return true).
         * Note: For controls that inherit , the correct way to make them visible is to call one of the multiple popup*() functions instead.
        */
        set Visible(v: boolean);
        /**
         * The color applied to textures on this .
        */
        get Modulate(): Godot.Color;
        /**
         * The color applied to textures on this .
        */
        set Modulate(v: Godot.Color);
        /**
         * The color applied to textures on this . This is not inherited by children s.
        */
        get SelfModulate(): Godot.Color;
        /**
         * The color applied to textures on this . This is not inherited by children s.
        */
        set SelfModulate(v: Godot.Color);
        /**
         * If true, the object draws behind its parent.
        */
        get ShowBehindParent(): boolean;
        /**
         * If true, the object draws behind its parent.
        */
        set ShowBehindParent(v: boolean);
        /**
         * If true, the object draws on top of its parent.
        */
        get ShowOnTop(): boolean;
        /**
         * If true, the object draws on top of its parent.
        */
        set ShowOnTop(v: boolean);
        /**
         * The rendering layers in which this  responds to  nodes.
        */
        get LightMask(): int;
        /**
         * The rendering layers in which this  responds to  nodes.
        */
        set LightMask(v: int);
        /**
         * The material applied to textures on this .
        */
        get Material(): Godot.Material;
        /**
         * The material applied to textures on this .
        */
        set Material(v: Godot.Material);
        /**
         * If true, the parent 's  property is used as this one's material.
        */
        get UseParentMaterial(): boolean;
        /**
         * If true, the parent 's  property is used as this one's material.
        */
        set UseParentMaterial(v: boolean);
        /**
         * Overridable function called by the engine (if defined) to draw the canvas item.
        */
        _Draw(): void;
        /**
         * Returns the canvas item RID used by  for this item.
        */
        GetCanvasItem(): Godot.RID;
        SetVisible(visible: boolean): void;
        IsVisible(): boolean;
        /**
         * Returns true if the node is present in the , its  property is true and all its antecedents are also visible. If any antecedent is hidden, this node will not be visible in the scene tree.
        */
        IsVisibleInTree(): boolean;
        /**
         * Show the  if it's currently hidden. This is equivalent to setting  to true. For controls that inherit , the correct way to make them visible is to call one of the multiple popup*() functions instead.
        */
        Show(): void;
        /**
         * Hide the  if it's currently visible. This is equivalent to setting  to false.
        */
        Hide(): void;
        /**
         * Queue the  for update.  will be called on idle time to request redraw.
        */
        Update(): void;
        /**
         * If enable is true, the node won't inherit its transform from parent canvas items.
        */
        SetAsToplevel(enable: boolean): void;
        /**
         * Returns true if the node is set as top-level. See .
        */
        IsSetAsToplevel(): boolean;
        SetLightMask(lightMask: int): void;
        GetLightMask(): int;
        SetModulate(modulate: Godot.Color): void;
        GetModulate(): Godot.Color;
        SetSelfModulate(selfModulate: Godot.Color): void;
        GetSelfModulate(): Godot.Color;
        SetDrawBehindParent(enable: boolean): void;
        IsDrawBehindParentEnabled(): boolean;
        /**
         * Draws a line from a 2D point to another, with a given color and width. It can be optionally antialiased. See also  and .
        */
        DrawLine(from: Godot.Vector2, to: Godot.Vector2, color: Godot.Color, width?: float, antialiased?: boolean): void;
        /**
         * Draws interconnected line segments with a uniform color and width and optional antialiasing. When drawing large amounts of lines, this is faster than using individual  calls. To draw disconnected lines, use  instead. See also .
        */
        DrawPolyline(points: CsArray<Godot.Vector2>, color: Godot.Color, width?: float, antialiased?: boolean): void;
        /**
         * Draws interconnected line segments with a uniform width and segment-by-segment coloring, and optional antialiasing. Colors assigned to line segments match by index between points and colors. When drawing large amounts of lines, this is faster than using individual  calls. To draw disconnected lines, use  instead. See also .
        */
        DrawPolylineColors(points: CsArray<Godot.Vector2>, colors: CsArray<Godot.Color>, width?: float, antialiased?: boolean): void;
        /**
         * Draws a unfilled arc between the given angles. The larger the value of point_count, the smoother the curve. See also .
        */
        DrawArc(center: Godot.Vector2, radius: float, startAngle: float, endAngle: float, pointCount: int, color: Godot.Color, width?: float, antialiased?: boolean): void;
        /**
         * Draws multiple disconnected lines with a uniform color. When drawing large amounts of lines, this is faster than using individual  calls. To draw interconnected lines, use  instead.
         * Note: width and antialiased are currently not implemented and have no effect.
        */
        DrawMultiline(points: CsArray<Godot.Vector2>, color: Godot.Color, width?: float, antialiased?: boolean): void;
        /**
         * Draws multiple disconnected lines with a uniform width and segment-by-segment coloring. Colors assigned to line segments match by index between points and colors. When drawing large amounts of lines, this is faster than using individual  calls. To draw interconnected lines, use  instead.
         * Note: width and antialiased are currently not implemented and have no effect.
        */
        DrawMultilineColors(points: CsArray<Godot.Vector2>, colors: CsArray<Godot.Color>, width?: float, antialiased?: boolean): void;
        /**
         * Draws a rectangle. If filled is true, the rectangle will be filled with the color specified. If filled is false, the rectangle will be drawn as a stroke with the color and width specified. If antialiased is true, the lines will be antialiased.
         * Note: width and antialiased are only effective if filled is false.
        */
        DrawRect(rect: Godot.Rect2, color: Godot.Color, filled?: boolean, width?: float, antialiased?: boolean): void;
        /**
         * Draws a colored, unfilled circle. See also ,  and .
        */
        DrawCircle(position: Godot.Vector2, radius: float, color: Godot.Color): void;
        /**
         * Draws a texture at a given position.
         * @params modulate If the parameter is null, then the default value is new Color(1, 1, 1, 1)
        */
        DrawTexture(texture: Godot.Texture, position: Godot.Vector2, modulate?: System.Nullable<Godot.Color>, normalMap?: Godot.Texture): void;
        /**
         * Draws a textured rectangle at a given position, optionally modulated by a color. If transpose is true, the texture will have its X and Y coordinates swapped.
         * @params modulate If the parameter is null, then the default value is new Color(1, 1, 1, 1)
        */
        DrawTextureRect(texture: Godot.Texture, rect: Godot.Rect2, tile: boolean, modulate?: System.Nullable<Godot.Color>, transpose?: boolean, normalMap?: Godot.Texture): void;
        /**
         * Draws a textured rectangle region at a given position, optionally modulated by a color. If transpose is true, the texture will have its X and Y coordinates swapped.
         * @params modulate If the parameter is null, then the default value is new Color(1, 1, 1, 1)
        */
        DrawTextureRectRegion(texture: Godot.Texture, rect: Godot.Rect2, srcRect: Godot.Rect2, modulate?: System.Nullable<Godot.Color>, transpose?: boolean, normalMap?: Godot.Texture, clipUv?: boolean): void;
        /**
         * Draws a styled rectangle.
        */
        DrawStyleBox(styleBox: Godot.StyleBox, rect: Godot.Rect2): void;
        /**
         * Draws a custom primitive. 1 point for a point, 2 points for a line, 3 points for a triangle, and 4 points for a quad. If 0 points or more than 4 points are specified, nothing will be drawn and an error message will be printed. See also , , , and .
        */
        DrawPrimitive(points: CsArray<Godot.Vector2>, colors: CsArray<Godot.Color>, uvs: CsArray<Godot.Vector2>, texture?: Godot.Texture, width?: float, normalMap?: Godot.Texture): void;
        /**
         * Draws a solid polygon of any amount of points, convex or concave. Unlike , each point's color can be changed individually. See also  and .
         * @params uvs If the parameter is null, then the default value is Array.Empty<Vector2>()
        */
        DrawPolygon(points: CsArray<Godot.Vector2>, colors: CsArray<Godot.Color>, uvs?: CsArray<Godot.Vector2>, texture?: Godot.Texture, normalMap?: Godot.Texture, antialiased?: boolean): void;
        /**
         * Draws a colored polygon of any amount of points, convex or concave. Unlike , a single color must be specified for the whole polygon.
         * @params uvs If the parameter is null, then the default value is Array.Empty<Vector2>()
        */
        DrawColoredPolygon(points: CsArray<Godot.Vector2>, color: Godot.Color, uvs?: CsArray<Godot.Vector2>, texture?: Godot.Texture, normalMap?: Godot.Texture, antialiased?: boolean): void;
        /**
         * Draws text using the specified font at the position (bottom-left corner using the baseline of the font). The text will have its color multiplied by modulate. If clip_w is greater than or equal to 0, the text will be clipped if it exceeds the specified width.
         * Example using the default project font:
         * 
         * # If using this method in a script that redraws constantly, move the
         * # `default_font` declaration to a member variable assigned in `_ready()`
         * # so the Control is only created once.
         * var default_font = Control.new().get_font("font")
         * draw_string(default_font, Vector2(64, 64), "Hello world")
         * 
         * See also .
         * @params modulate If the parameter is null, then the default value is new Color(1, 1, 1, 1)
        */
        DrawString(font: Godot.Font, position: Godot.Vector2, text: string, modulate?: System.Nullable<Godot.Color>, clipW?: int): void;
        /**
         * Draws a string character using a custom font. Returns the advance, depending on the character width and kerning with an optional next character.
         * @params modulate If the parameter is null, then the default value is new Color(1, 1, 1, 1)
        */
        DrawChar(font: Godot.Font, position: Godot.Vector2, char: string, next: string, modulate?: System.Nullable<Godot.Color>): float;
        /**
         * Draws a  in 2D, using the provided texture. See  for related documentation.
         * @params transform If the parameter is null, then the default value is Transform2D.Identity
         * @params modulate If the parameter is null, then the default value is new Color(1, 1, 1, 1)
        */
        DrawMesh(mesh: Godot.Mesh, texture: Godot.Texture, normalMap?: Godot.Texture, transform?: System.Nullable<Godot.Transform2D>, modulate?: System.Nullable<Godot.Color>): void;
        /**
         * Draws a  in 2D with the provided texture. See  for related documentation.
        */
        DrawMultimesh(multimesh: Godot.MultiMesh, texture: Godot.Texture, normalMap?: Godot.Texture): void;
        /**
         * Sets a custom transform for drawing via components. Anything drawn afterwards will be transformed by this.
        */
        DrawSetTransform(position: Godot.Vector2, rotation: float, scale: Godot.Vector2): void;
        /**
         * Sets a custom transform for drawing via matrix. Anything drawn afterwards will be transformed by this.
        */
        DrawSetTransformMatrix(xform: Godot.Transform2D): void;
        /**
         * Returns the transform matrix of this item.
        */
        GetTransform(): Godot.Transform2D;
        /**
         * Returns the global transform matrix of this item.
        */
        GetGlobalTransform(): Godot.Transform2D;
        /**
         * Returns the global transform matrix of this item in relation to the canvas.
        */
        GetGlobalTransformWithCanvas(): Godot.Transform2D;
        /**
         * Returns this item's transform in relation to the viewport.
        */
        GetViewportTransform(): Godot.Transform2D;
        /**
         * Returns the viewport's boundaries as a .
        */
        GetViewportRect(): Godot.Rect2;
        /**
         * Returns the transform matrix of this item's canvas.
        */
        GetCanvasTransform(): Godot.Transform2D;
        /**
         * Returns the mouse position relative to this item's position.
        */
        GetLocalMousePosition(): Godot.Vector2;
        /**
         * Returns the global position of the mouse.
        */
        GetGlobalMousePosition(): Godot.Vector2;
        /**
         * Returns the  of the  canvas where this item is in.
        */
        GetCanvas(): Godot.RID;
        /**
         * Returns the  where this item is in.
        */
        GetWorld2d(): Godot.World2D;
        SetMaterial(material: Godot.Material): void;
        GetMaterial(): Godot.Material;
        SetUseParentMaterial(enable: boolean): void;
        GetUseParentMaterial(): boolean;
        /**
         * If enable is true, children will be updated with local transform data.
        */
        SetNotifyLocalTransform(enable: boolean): void;
        /**
         * Returns true if local transform notifications are communicated to children.
        */
        IsLocalTransformNotificationEnabled(): boolean;
        /**
         * If enable is true, children will be updated with global transform data.
        */
        SetNotifyTransform(enable: boolean): void;
        /**
         * Returns true if global transform notifications are communicated to children.
        */
        IsTransformNotificationEnabled(): boolean;
        /**
         * Forces the transform to update. Transform changes in physics are not instant for performance reasons. Transforms are accumulated and then set. Use this if you need an up-to-date transform when doing physics operations.
        */
        ForceUpdateTransform(): void;
        /**
         * Assigns screen_point as this node's new local transform.
        */
        MakeCanvasPositionLocal(screenPoint: Godot.Vector2): Godot.Vector2;
        /**
         * Transformations issued by event's inputs are applied in local space instead of global space.
        */
        MakeInputLocal(event: Godot.InputEvent): Godot.InputEvent;
    }
    interface CanvasItemConstructor {
    }
    interface CanvasItemStatic extends Godot.NodeStatic {
        /**
         * The 's transform has changed. This notification is only received if enabled by  or .
        */
        readonly NotificationTransformChanged: int;
        /**
         * The  is requested to draw.
        */
        readonly NotificationDraw: int;
        /**
         * The 's visibility has changed.
        */
        readonly NotificationVisibilityChanged: int;
        /**
         * The  has entered the canvas.
        */
        readonly NotificationEnterCanvas: int;
        /**
         * The  has exited the canvas.
        */
        readonly NotificationExitCanvas: int;
    }
}
declare namespace Godot {
    /**
     * A node that displays a 2D texture. The texture displayed can be a region from a larger atlas texture, or a frame from a sprite sheet animation.
    */
    interface Sprite extends Godot.Node2D {
        /**
         * object to draw.
         *             
        */
        get Texture(): Godot.Texture;
        /**
         * object to draw.
         *             
        */
        set Texture(v: Godot.Texture);
        /**
         * The normal map gives depth to the Sprite.
         * Note: Godot expects the normal map to use X+, Y-, and Z+ coordinates. See this page for a comparison of normal map coordinates expected by popular engines.
        */
        get NormalMap(): Godot.Texture;
        /**
         * The normal map gives depth to the Sprite.
         * Note: Godot expects the normal map to use X+, Y-, and Z+ coordinates. See this page for a comparison of normal map coordinates expected by popular engines.
        */
        set NormalMap(v: Godot.Texture);
        /**
         * If true, texture is centered.
        */
        get Centered(): boolean;
        /**
         * If true, texture is centered.
        */
        set Centered(v: boolean);
        /**
         * The texture's drawing offset.
        */
        get Offset(): Godot.Vector2;
        /**
         * The texture's drawing offset.
        */
        set Offset(v: Godot.Vector2);
        /**
         * If true, texture is flipped horizontally.
        */
        get FlipH(): boolean;
        /**
         * If true, texture is flipped horizontally.
        */
        set FlipH(v: boolean);
        /**
         * If true, texture is flipped vertically.
        */
        get FlipV(): boolean;
        /**
         * If true, texture is flipped vertically.
        */
        set FlipV(v: boolean);
        /**
         * The number of columns in the sprite sheet.
        */
        get Hframes(): int;
        /**
         * The number of columns in the sprite sheet.
        */
        set Hframes(v: int);
        /**
         * The number of rows in the sprite sheet.
        */
        get Vframes(): int;
        /**
         * The number of rows in the sprite sheet.
        */
        set Vframes(v: int);
        /**
         * Current frame to display from sprite sheet.  or  must be greater than 1.
        */
        get Frame(): int;
        /**
         * Current frame to display from sprite sheet.  or  must be greater than 1.
        */
        set Frame(v: int);
        /**
         * Coordinates of the frame to display from sprite sheet. This is as an alias for the  property.  or  must be greater than 1.
        */
        get FrameCoords(): Godot.Vector2;
        /**
         * Coordinates of the frame to display from sprite sheet. This is as an alias for the  property.  or  must be greater than 1.
        */
        set FrameCoords(v: Godot.Vector2);
        /**
         * If true, texture is cut from a larger atlas texture. See .
        */
        get RegionEnabled(): boolean;
        /**
         * If true, texture is cut from a larger atlas texture. See .
        */
        set RegionEnabled(v: boolean);
        /**
         * The region of the atlas texture to display.  must be true.
        */
        get RegionRect(): Godot.Rect2;
        /**
         * The region of the atlas texture to display.  must be true.
        */
        set RegionRect(v: Godot.Rect2);
        /**
         * If true, the outermost pixels get blurred out.
        */
        get RegionFilterClip(): boolean;
        /**
         * If true, the outermost pixels get blurred out.
        */
        set RegionFilterClip(v: boolean);
        SetTexture(texture: Godot.Texture): void;
        GetTexture(): Godot.Texture;
        SetNormalMap(normalMap: Godot.Texture): void;
        GetNormalMap(): Godot.Texture;
        SetCentered(centered: boolean): void;
        IsCentered(): boolean;
        SetOffset(offset: Godot.Vector2): void;
        GetOffset(): Godot.Vector2;
        SetFlipH(flipH: boolean): void;
        IsFlippedH(): boolean;
        SetFlipV(flipV: boolean): void;
        IsFlippedV(): boolean;
        SetRegion(enabled: boolean): void;
        IsRegion(): boolean;
        /**
         * Returns true, if the pixel at the given position is opaque and false in other case.
         * Note: It also returns false, if the sprite's texture is null or if the given position is invalid.
        */
        IsPixelOpaque(pos: Godot.Vector2): boolean;
        SetRegionRect(rect: Godot.Rect2): void;
        GetRegionRect(): Godot.Rect2;
        SetRegionFilterClip(enabled: boolean): void;
        IsRegionFilterClipEnabled(): boolean;
        SetFrame(frame: int): void;
        GetFrame(): int;
        SetFrameCoords(coords: Godot.Vector2): void;
        GetFrameCoords(): Godot.Vector2;
        SetVframes(vframes: int): void;
        GetVframes(): int;
        SetHframes(hframes: int): void;
        GetHframes(): int;
        /**
         * Returns a  representing the Sprite's boundary in local coordinates. Can be used to detect if the Sprite was clicked. Example:
         * 
         * func _input(event):
         *     if event is InputEventMouseButton and event.pressed and event.button_index == BUTTON_LEFT:
         *         if get_rect().has_point(to_local(event.position)):
         *             print("A click!")
        */
        GetRect(): Godot.Rect2;
    }
    interface SpriteConstructor {
        new(): Godot.Sprite;
    }
    interface SpriteStatic extends Godot.Node2DStatic {
    }
    var Sprite: Godot.SpriteConstructor & Godot.SpriteStatic;
}
declare namespace Godot {
    /**
     * An animation player is used for general-purpose playback of  resources. It contains a dictionary of animations (referenced by name) and custom blend times between their transitions. Additionally, animations can be played and blended in different channels.
     *  is more suited than  for animations where you know the final values in advance. For example, fading a screen in and out is more easily done with an  node thanks to the animation tools provided by the editor. That particular example can also be implemented with a  node, but it requires doing everything by code.
     * Updating the target properties of animations occurs at process time.
    */
    interface AnimationPlayer extends Godot.Node {
        /**
         * The node from which node path references will travel.
        */
        get RootNode(): Godot.NodePath;
        /**
         * The node from which node path references will travel.
        */
        set RootNode(v: Godot.NodePath);
        /**
         * The name of the currently playing animation. If no animation is playing, the property's value is an empty string. Changing this value does not restart the animation. See  for more information on playing animations.
         * Note: While this property appears in the inspector, it's not meant to be edited, and it's not saved in the scene. This property is mainly used to get the currently playing animation, and internally for animation playback tracks. For more information, see .
        */
        get CurrentAnimation(): string;
        /**
         * The name of the currently playing animation. If no animation is playing, the property's value is an empty string. Changing this value does not restart the animation. See  for more information on playing animations.
         * Note: While this property appears in the inspector, it's not meant to be edited, and it's not saved in the scene. This property is mainly used to get the currently playing animation, and internally for animation playback tracks. For more information, see .
        */
        set CurrentAnimation(v: string);
        /**
         * If playing, the current animation; otherwise, the animation last played. When set, would change the animation, but would not play it unless currently playing. See also .
        */
        get AssignedAnimation(): string;
        /**
         * If playing, the current animation; otherwise, the animation last played. When set, would change the animation, but would not play it unless currently playing. See also .
        */
        set AssignedAnimation(v: string);
        /**
         * The name of the animation to play when the scene loads.
        */
        get Autoplay(): string;
        /**
         * The name of the animation to play when the scene loads.
        */
        set Autoplay(v: string);
        /**
         * This is used by the editor. If set to true, the scene will be saved with the effects of the reset animation applied (as if it had been seeked to time 0), then reverted after saving.
         * In other words, the saved scene file will contain the "default pose", as defined by the reset animation, if any, with the editor keeping the values that the nodes had before saving.
        */
        get ResetOnSave(): boolean;
        /**
         * This is used by the editor. If set to true, the scene will be saved with the effects of the reset animation applied (as if it had been seeked to time 0), then reverted after saving.
         * In other words, the saved scene file will contain the "default pose", as defined by the reset animation, if any, with the editor keeping the values that the nodes had before saving.
        */
        set ResetOnSave(v: boolean);
        /**
         * The length (in seconds) of the currently being played animation.
        */
        get CurrentAnimationLength(): float;
        /**
         * The position (in seconds) of the currently playing animation.
        */
        get CurrentAnimationPosition(): float;
        /**
         * The process notification in which to update animations.
        */
        get PlaybackProcessMode(): Godot.AnimationPlayer.AnimationProcessMode;
        /**
         * The process notification in which to update animations.
        */
        set PlaybackProcessMode(v: Godot.AnimationPlayer.AnimationProcessMode);
        /**
         * The default time in which to blend animations. Ranges from 0 to 4096 with 0.01 precision.
        */
        get PlaybackDefaultBlendTime(): float;
        /**
         * The default time in which to blend animations. Ranges from 0 to 4096 with 0.01 precision.
        */
        set PlaybackDefaultBlendTime(v: float);
        /**
         * If true, updates animations in response to process-related notifications.
        */
        get PlaybackActive(): boolean;
        /**
         * If true, updates animations in response to process-related notifications.
        */
        set PlaybackActive(v: boolean);
        /**
         * The speed scaling ratio. For instance, if this value is 1, then the animation plays at normal speed. If it's 0.5, then it plays at half speed. If it's 2, then it plays at double speed.
        */
        get PlaybackSpeed(): float;
        /**
         * The speed scaling ratio. For instance, if this value is 1, then the animation plays at normal speed. If it's 0.5, then it plays at half speed. If it's 2, then it plays at double speed.
        */
        set PlaybackSpeed(v: float);
        /**
         * The call mode to use for Call Method tracks.
        */
        get MethodCallMode(): Godot.AnimationPlayer.AnimationMethodCallMode;
        /**
         * The call mode to use for Call Method tracks.
        */
        set MethodCallMode(v: Godot.AnimationPlayer.AnimationMethodCallMode);
        /**
         * Adds animation to the player accessible with the key name.
        */
        AddAnimation(name: string, animation: Godot.Animation): Godot.Error;
        /**
         * Removes the animation with key name.
        */
        RemoveAnimation(name: string): void;
        /**
         * Renames an existing animation with key name to newname.
        */
        RenameAnimation(name: string, newname: string): void;
        /**
         * Returns true if the  stores an  with key name.
        */
        HasAnimation(name: string): boolean;
        /**
         * Returns the  with key name or null if not found.
        */
        GetAnimation(name: string): Godot.Animation;
        /**
         * Returns the list of stored animation names.
        */
        GetAnimationList(): CsArray<string>;
        /**
         * Triggers the anim_to animation when the anim_from animation completes.
        */
        AnimationSetNext(animFrom: string, animTo: string): void;
        /**
         * Returns the name of the next animation in the queue.
        */
        AnimationGetNext(animFrom: string): string;
        /**
         * Specifies a blend time (in seconds) between two animations, referenced by their names.
        */
        SetBlendTime(animFrom: string, animTo: string, sec: float): void;
        /**
         * Gets the blend time (in seconds) between two animations, referenced by their names.
        */
        GetBlendTime(animFrom: string, animTo: string): float;
        SetDefaultBlendTime(sec: float): void;
        GetDefaultBlendTime(): float;
        /**
         * Plays the animation with key name. Custom blend times and speed can be set. If custom_speed is negative and from_end is true, the animation will play backwards (which is equivalent to calling ).
         * The  keeps track of its current or last played animation with . If this method is called with that same animation name, or with no name parameter, the assigned animation will resume playing if it was paused, or restart if it was stopped (see  for both pause and stop). If the animation was already playing, it will keep playing.
         * Note: The animation will be updated the next time the  is processed. If other variables are updated at the same time this is called, they may be updated too early. To perform the update immediately, call advance(0).
        */
        Play(name?: string, customBlend?: float, customSpeed?: float, fromEnd?: boolean): void;
        /**
         * Plays the animation with key name in reverse.
         * This method is a shorthand for  with custom_speed = -1.0 and from_end = true, so see its description for more information.
        */
        PlayBackwards(name?: string, customBlend?: float): void;
        /**
         * Stops or pauses the currently playing animation. If reset is true, the animation position is reset to 0 and the playback speed is reset to 1.0.
         * If reset is false, the  will be kept and calling  or  without arguments or with the same animation name as  will resume the animation.
        */
        Stop(reset?: boolean): void;
        /**
         * Returns true if playing an animation.
        */
        IsPlaying(): boolean;
        SetCurrentAnimation(anim: string): void;
        GetCurrentAnimation(): string;
        SetAssignedAnimation(anim: string): void;
        GetAssignedAnimation(): string;
        /**
         * Queues an animation for playback once the current one is done.
         * Note: If a looped animation is currently playing, the queued animation will never play unless the looped animation is stopped somehow.
        */
        Queue(name: string): void;
        /**
         * Returns a list of the animation names that are currently queued to play.
        */
        GetQueue(): CsArray<string>;
        /**
         * Clears all queued, unplayed animations.
        */
        ClearQueue(): void;
        SetActive(active: boolean): void;
        IsActive(): boolean;
        SetSpeedScale(speed: float): void;
        GetSpeedScale(): float;
        /**
         * Gets the actual playing speed of current animation or 0 if not playing. This speed is the  property multiplied by custom_speed argument specified when calling the  method.
        */
        GetPlayingSpeed(): float;
        SetAutoplay(name: string): void;
        GetAutoplay(): string;
        SetResetOnSaveEnabled(enabled: boolean): void;
        IsResetOnSaveEnabled(): boolean;
        SetRoot(path: Godot.NodePath): void;
        GetRoot(): Godot.NodePath;
        /**
         * Returns the name of animation or an empty string if not found.
        */
        FindAnimation(animation: Godot.Animation): string;
        /**
         * caches animated nodes. It may not notice if a node disappears;  forces it to update the cache again.
         *             
        */
        ClearCaches(): void;
        SetAnimationProcessMode(mode: Godot.AnimationPlayer.AnimationProcessMode): void;
        GetAnimationProcessMode(): Godot.AnimationPlayer.AnimationProcessMode;
        SetMethodCallMode(mode: Godot.AnimationPlayer.AnimationMethodCallMode): void;
        GetMethodCallMode(): Godot.AnimationPlayer.AnimationMethodCallMode;
        GetCurrentAnimationPosition(): float;
        GetCurrentAnimationLength(): float;
        /**
         * Seeks the animation to the seconds point in time (in seconds). If update is true, the animation updates too, otherwise it updates at process time. Events between the current frame and seconds are skipped.
        */
        Seek(seconds: float, update?: boolean): void;
        /**
         * Shifts position in the animation timeline and immediately updates the animation. delta is the time in seconds to shift. Events between the current frame and delta are handled.
        */
        Advance(delta: float): void;
    }
    interface AnimationPlayerConstructor {
        new(): Godot.AnimationPlayer;
    }
    interface AnimationPlayerStatic extends Godot.NodeStatic {
    }
    var AnimationPlayer: Godot.AnimationPlayerConstructor & Godot.AnimationPlayerStatic;
}
declare namespace Godot {
    /**
     * Kinematic bodies are special types of bodies that are meant to be user-controlled. They are not affected by physics at all; to other types of bodies, such as a character or a rigid body, these are the same as a static body. However, they have two main uses:
     * Simulated motion: When these bodies are moved manually, either from code or from an  (with  set to "physics"), the physics will automatically compute an estimate of their linear and angular velocity. This makes them very useful for moving platforms or other AnimationPlayer-controlled objects (like a door, a bridge that opens, etc).
     * Kinematic characters: KinematicBody2D also has an API for moving objects (the  and  methods) while performing collision tests. This makes them really useful to implement characters that collide against a world, but don't require advanced physics.
    */
    interface KinematicBody2D extends Godot.PhysicsBody2D {
        /**
         * Extra margin used for collision recovery in motion functions (see , , ).
         * If the body is at least this close to another body, it will consider them to be colliding and will be pushed away before performing the actual motion.
         * A higher value means it's more flexible for detecting collision, which helps with consistently detecting walls and floors.
         * A lower value forces the collision algorithm to use more exact detection, so it can be used in cases that specifically require precision, e.g at very low scale to avoid visible jittering, or for stability with a stack of kinematic bodies.
        */
        get Collision__safeMargin(): float;
        /**
         * Extra margin used for collision recovery in motion functions (see , , ).
         * If the body is at least this close to another body, it will consider them to be colliding and will be pushed away before performing the actual motion.
         * A higher value means it's more flexible for detecting collision, which helps with consistently detecting walls and floors.
         * A lower value forces the collision algorithm to use more exact detection, so it can be used in cases that specifically require precision, e.g at very low scale to avoid visible jittering, or for stability with a stack of kinematic bodies.
        */
        set Collision__safeMargin(v: float);
        /**
         * If true, the body's movement will be synchronized to the physics frame. This is useful when animating movement via , for example on moving platforms. Do not use together with  or  functions.
        */
        get Motion__syncToPhysics(): boolean;
        /**
         * If true, the body's movement will be synchronized to the physics frame. This is useful when animating movement via , for example on moving platforms. Do not use together with  or  functions.
        */
        set Motion__syncToPhysics(v: boolean);
        /**
         * Moves the body along the vector rel_vec. The body will stop if it collides. Returns a , which contains information about the collision when stopped, or when touching another body along the motion.
         * If test_only is true, the body does not move but the would-be collision information is given.
        */
        MoveAndCollide(relVec: Godot.Vector2, infiniteInertia?: boolean, excludeRaycastShapes?: boolean, testOnly?: boolean): Godot.KinematicCollision2D;
        /**
         * Moves the body along a vector. If the body collides with another, it will slide along the other body rather than stop immediately. If the other body is a  or , it will also be affected by the motion of the other body. You can use this to make moving and rotating platforms, or to make nodes push other nodes.
         * This method should be used in  (or in a method called by ), as it uses the physics step's delta value automatically in calculations. Otherwise, the simulation will run at an incorrect speed.
         * linear_velocity is the velocity vector in pixels per second. Unlike in , you should not multiply it by delta — the physics engine handles applying the velocity.
         * up_direction is the up direction, used to determine what is a wall and what is a floor or a ceiling. If set to the default value of Vector2(0, 0), everything is considered a wall. This is useful for topdown games.
         * If stop_on_slope is true, body will not slide on slopes when you include gravity in linear_velocity and the body is standing still.
         * If the body collides, it will change direction a maximum of max_slides times before it stops.
         * floor_max_angle is the maximum angle (in radians) where a slope is still considered a floor (or a ceiling), rather than a wall. The default value equals 45 degrees.
         * If infinite_inertia is true, body will be able to push  nodes, but it won't also detect any collisions with them. If false, it will interact with  nodes like with .
         * Returns the linear_velocity vector, rotated and/or scaled if a slide collision occurred. To get detailed information about collisions that occurred, use .
         * When the body touches a moving platform, the platform's velocity is automatically added to the body motion. If a collision occurs due to the platform's motion, it will always be first in the slide collisions.
         * @params upDirection If the parameter is null, then the default value is new Vector2(0, 0)
        */
        MoveAndSlide(linearVelocity: Godot.Vector2, upDirection?: System.Nullable<Godot.Vector2>, stopOnSlope?: boolean, maxSlides?: int, floorMaxAngle?: float, infiniteInertia?: boolean): Godot.Vector2;
        /**
         * Moves the body while keeping it attached to slopes. Similar to .
         * As long as the snap vector is in contact with the ground, the body will remain attached to the surface. This means you must disable snap in order to jump, for example. You can do this by setting snap to (0, 0) or by using  instead.
         * @params upDirection If the parameter is null, then the default value is new Vector2(0, 0)
        */
        MoveAndSlideWithSnap(linearVelocity: Godot.Vector2, snap: Godot.Vector2, upDirection?: System.Nullable<Godot.Vector2>, stopOnSlope?: boolean, maxSlides?: int, floorMaxAngle?: float, infiniteInertia?: boolean): Godot.Vector2;
        /**
         * Checks for collisions without moving the body. Virtually sets the node's position, scale and rotation to that of the given , then tries to move the body along the vector rel_vec. Returns true if a collision would stop the body from moving along the whole path.
         * Use  instead for detecting collision with touching bodies.
        */
        TestMove(from: Godot.Transform2D, relVec: Godot.Vector2, infiniteInertia?: boolean): boolean;
        /**
         * Returns true if the body collided with the floor on the last call of  or . Otherwise, returns false.
        */
        IsOnFloor(): boolean;
        /**
         * Returns true if the body collided with the ceiling on the last call of  or . Otherwise, returns false.
        */
        IsOnCeiling(): boolean;
        /**
         * Returns true if the body collided with a wall on the last call of  or . Otherwise, returns false.
        */
        IsOnWall(): boolean;
        /**
         * Returns the surface normal of the floor at the last collision point. Only valid after calling  or  and when  returns true.
        */
        GetFloorNormal(): Godot.Vector2;
        /**
         * Returns the floor's collision angle at the last collision point according to up_direction, which is Vector2.UP by default. This value is always positive and only valid after calling  and when  returns true.
         * @params upDirection If the parameter is null, then the default value is new Vector2(0, -1)
        */
        GetFloorAngle(upDirection?: System.Nullable<Godot.Vector2>): float;
        /**
         * Returns the linear velocity of the floor at the last collision point. Only valid after calling  or  and when  returns true.
        */
        GetFloorVelocity(): Godot.Vector2;
        SetSafeMargin(pixels: float): void;
        GetSafeMargin(): float;
        /**
         * Returns the number of times the body collided and changed direction during the last call to  or .
        */
        GetSlideCount(): int;
        /**
         * Returns a , which contains information about a collision that occurred during the last call to  or . Since the body can collide several times in a single call to , you must specify the index of the collision in the range 0 to ( - 1).
         * Example usage:
         * 
         * for i in get_slide_count():
         *     var collision = get_slide_collision(i)
         *     print("Collided with: ", collision.collider.name)
        */
        GetSlideCollision(slideIdx: int): Godot.KinematicCollision2D;
        /**
         * Returns a , which contains information about the latest collision that occurred during the last call to .
        */
        GetLastSlideCollision(): Godot.KinematicCollision2D;
        SetSyncToPhysics(enable: boolean): void;
        IsSyncToPhysicsEnabled(): boolean;
    }
    interface KinematicBody2DConstructor {
        new(): Godot.KinematicBody2D;
    }
    interface KinematicBody2DStatic extends Godot.PhysicsBody2DStatic {
    }
    var KinematicBody2D: Godot.KinematicBody2DConstructor & Godot.KinematicBody2DStatic;
}
declare namespace Godot {
    /**
     * PhysicsBody2D is an abstract base class for implementing a physics body. All *Body2D types inherit from it.
    */
    interface PhysicsBody2D extends Godot.CollisionObject2D {
        /**
         * Both collision_layer and collision_mask. Returns collision_layer when accessed. Updates collision_layer and collision_mask when modified.
        */
        get Layers(): System.UInt32;
        /**
         * Both collision_layer and collision_mask. Returns collision_layer when accessed. Updates collision_layer and collision_mask when modified.
        */
        set Layers(v: System.UInt32);
        /**
         * Returns an array of nodes that were added as collision exceptions for this body.
        */
        GetCollisionExceptions(): Godot.Collections.Array;
        /**
         * Adds a body to the list of bodies that this body can't collide with.
        */
        AddCollisionExceptionWith(body: Godot.Node): void;
        /**
         * Removes a body from the list of bodies that this body can't collide with.
        */
        RemoveCollisionExceptionWith(body: Godot.Node): void;
    }
    interface PhysicsBody2DConstructor {
    }
    interface PhysicsBody2DStatic extends Godot.CollisionObject2DStatic {
    }
}
declare namespace Godot {
    /**
     * CollisionObject2D is the base class for 2D physics objects. It can hold any number of 2D collision s. Each shape must be assigned to a shape owner. The CollisionObject2D can have any number of shape owners. Shape owners are not nodes and do not appear in the editor, but are accessible through code using the shape_owner_* methods.
    */
    interface CollisionObject2D extends Godot.Node2D {
        /**
         * The physics layers this CollisionObject2D is in. Collision objects can exist in one or more of 32 different layers. See also .
         * Note: A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See Collision layers and masks in the documentation for more information.
        */
        get CollisionLayer(): System.UInt32;
        /**
         * The physics layers this CollisionObject2D is in. Collision objects can exist in one or more of 32 different layers. See also .
         * Note: A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See Collision layers and masks in the documentation for more information.
        */
        set CollisionLayer(v: System.UInt32);
        /**
         * The physics layers this CollisionObject2D scans. Collision objects can scan one or more of 32 different layers. See also .
         * Note: A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See Collision layers and masks in the documentation for more information.
        */
        get CollisionMask(): System.UInt32;
        /**
         * The physics layers this CollisionObject2D scans. Collision objects can scan one or more of 32 different layers. See also .
         * Note: A contact is detected if object A is in any of the layers that object B scans, or object B is in any layers that object A scans. See Collision layers and masks in the documentation for more information.
        */
        set CollisionMask(v: System.UInt32);
        /**
         * If true, this object is pickable. A pickable object can detect the mouse pointer entering/leaving, and if the mouse is inside it, report input events. Requires at least one  bit to be set.
        */
        get InputPickable(): boolean;
        /**
         * If true, this object is pickable. A pickable object can detect the mouse pointer entering/leaving, and if the mouse is inside it, report input events. Requires at least one  bit to be set.
        */
        set InputPickable(v: boolean);
        /**
         * Accepts unhandled s. Requires  to be true. shape_idx is the child index of the clicked . Connect to the input_event signal to easily pick up these events.
        */
        _InputEvent(viewport: Godot.Object, event: Godot.InputEvent, shapeIdx: int): void;
        /**
         * Returns the object's .
        */
        GetRid(): Godot.RID;
        SetCollisionLayer(layer: System.UInt32): void;
        GetCollisionLayer(): System.UInt32;
        SetCollisionMask(mask: System.UInt32): void;
        GetCollisionMask(): System.UInt32;
        /**
         * If value is true, sets the specified bit in the the .
         * If value is false, clears the specified bit in the the .
        */
        SetCollisionLayerBit(bit: int, value: boolean): void;
        /**
         * Returns whether or not the specified bit of the  is set.
        */
        GetCollisionLayerBit(bit: int): boolean;
        /**
         * If value is true, sets the specified bit in the the .
         * If value is false, clears the specified bit in the the .
        */
        SetCollisionMaskBit(bit: int, value: boolean): void;
        /**
         * Returns whether or not the specified bit of the  is set.
        */
        GetCollisionMaskBit(bit: int): boolean;
        SetPickable(enabled: boolean): void;
        IsPickable(): boolean;
        /**
         * Creates a new shape owner for the given object. Returns owner_id of the new owner for future reference.
        */
        CreateShapeOwner(owner: Godot.Object): System.UInt32;
        /**
         * Removes the given shape owner.
        */
        RemoveShapeOwner(ownerId: System.UInt32): void;
        /**
         * Returns an  of owner_id identifiers. You can use these ids in other methods that take owner_id as an argument.
        */
        GetShapeOwners(): Godot.Collections.Array;
        /**
         * Sets the  of the given shape owner.
        */
        ShapeOwnerSetTransform(ownerId: System.UInt32, transform: Godot.Transform2D): void;
        /**
         * Returns the shape owner's .
        */
        ShapeOwnerGetTransform(ownerId: System.UInt32): Godot.Transform2D;
        /**
         * Returns the parent object of the given shape owner.
        */
        ShapeOwnerGetOwner(ownerId: System.UInt32): Godot.Object;
        /**
         * If true, disables the given shape owner.
        */
        ShapeOwnerSetDisabled(ownerId: System.UInt32, disabled: boolean): void;
        /**
         * If true, the shape owner and its shapes are disabled.
        */
        IsShapeOwnerDisabled(ownerId: System.UInt32): boolean;
        /**
         * If enable is true, collisions for the shape owner originating from this  will not be reported to collided with s.
        */
        ShapeOwnerSetOneWayCollision(ownerId: System.UInt32, enable: boolean): void;
        /**
         * Returns true if collisions for the shape owner originating from this  will not be reported to collided with s.
        */
        IsShapeOwnerOneWayCollisionEnabled(ownerId: System.UInt32): boolean;
        /**
         * Sets the one_way_collision_margin of the shape owner identified by given owner_id to margin pixels.
        */
        ShapeOwnerSetOneWayCollisionMargin(ownerId: System.UInt32, margin: float): void;
        /**
         * Returns the one_way_collision_margin of the shape owner identified by given owner_id.
        */
        GetShapeOwnerOneWayCollisionMargin(ownerId: System.UInt32): float;
        /**
         * Adds a  to the shape owner.
        */
        ShapeOwnerAddShape(ownerId: System.UInt32, shape: Godot.Shape2D): void;
        /**
         * Returns the number of shapes the given shape owner contains.
        */
        ShapeOwnerGetShapeCount(ownerId: System.UInt32): int;
        /**
         * Returns the  with the given id from the given shape owner.
        */
        ShapeOwnerGetShape(ownerId: System.UInt32, shapeId: int): Godot.Shape2D;
        /**
         * Returns the child index of the  with the given id from the given shape owner.
        */
        ShapeOwnerGetShapeIndex(ownerId: System.UInt32, shapeId: int): int;
        /**
         * Removes a shape from the given shape owner.
        */
        ShapeOwnerRemoveShape(ownerId: System.UInt32, shapeId: int): void;
        /**
         * Removes all shapes from the shape owner.
        */
        ShapeOwnerClearShapes(ownerId: System.UInt32): void;
        /**
         * Returns the owner_id of the given shape.
        */
        ShapeFindOwner(shapeIndex: int): System.UInt32;
    }
    interface CollisionObject2DConstructor {
    }
    interface CollisionObject2DStatic extends Godot.Node2DStatic {
    }
}

declare namespace globalThis {
    type byte = number;
    var byte: never;
}
declare namespace globalThis {
    type short = number;
    var short: never;
}
declare namespace globalThis {
    type int = number;
    var int: never;
}
declare namespace globalThis {
    type long = number;
    var long: never;
}
declare namespace globalThis {
    type string = string;
    var string: never;
}
declare namespace globalThis {
    type float = number;
    var float: never;
}
declare namespace globalThis {
    type double = number;
    var double: never;
}
declare namespace globalThis {
    type boolean = boolean;
    var boolean: never;
}

declare namespace Godot {
    type NodePath = any;
}
declare namespace Godot.Node {
    type PauseModeEnum = any;
}
declare namespace Godot {
    type MultiplayerAPI = any;
}
declare namespace Godot {
    type InputEvent = any;
}
declare namespace Godot {
    type InputEventKey = any;
}
declare namespace Godot.Collections {
    type Array = any;
}
declare namespace Godot {
    type SceneTree = any;
}
declare namespace Godot {
    type Viewport = any;
}
declare namespace Godot.MultiplayerAPI {
    type RPCMode = any;
}
declare namespace System {
    type IntPtr = any;
}
declare namespace Godot {
    type WeakRef = any;
}
declare namespace Godot {
    type SignalAwaiter = any;
}
declare namespace System {
    type UInt64 = any;
}
declare namespace Godot {
    type Reference = any;
}
declare namespace Godot {
    type Error = any;
}
declare namespace System {
    type UInt32 = any;
}
declare namespace Godot {
    type Vector2 = any;
}
declare namespace Godot {
    type Transform2D = any;
}
declare namespace Godot {
    type Color = any;
}
declare namespace Godot {
    type Material = any;
}
declare namespace Godot {
    type RID = any;
}
declare namespace Godot {
    type Rect2 = any;
}
declare namespace Godot {
    type Texture = any;
}
declare namespace System {
    type Nullable<T = any> = any;
}
declare namespace Godot {
    type StyleBox = any;
}
declare namespace Godot {
    type Font = any;
}
declare namespace Godot {
    type Mesh = any;
}
declare namespace Godot {
    type MultiMesh = any;
}
declare namespace Godot {
    type World2D = any;
}
declare namespace Godot.AnimationPlayer {
    type AnimationProcessMode = any;
}
declare namespace Godot.AnimationPlayer {
    type AnimationMethodCallMode = any;
}
declare namespace Godot {
    type Animation = any;
}
declare namespace Godot {
    type KinematicCollision2D = any;
}
declare namespace Godot {
    type Shape2D = any;
}
