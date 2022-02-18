using Godot;
using JsService;
using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;

/// <summary>
/// 游戏管理器, 负责管理整个项目其它的Manager, 并更新它们
/// </summary>
public class GameManager : Node
{
    public static IScriptSerivce JsService;

    /// <summary>
    /// 是否已经初始化过
    /// </summary>
    private static bool _inited = false;
    
    /// <summary>
    /// 初始化调用
    /// </summary>
    public static void Init()
    {
        if (_inited)
        {
            return;
        }
        _inited = true;

        ScriptManager.Out = new GodotLog();
        ScriptManager.SearchPath = (System.Environment.CurrentDirectory + "\\extend").Replace("/", "\\");

        JsService = new ClearScriptService(ClearScriptDebugFlag.AwaitForStart);
        ScriptManager.RegisterAndWriteTs(JsService, @"mods\TestMod1\.type\core.d.ts", (s) => 
        {
            s.ScanJsClass(typeof(GameManager).Assembly);
        });

        InitCommonJS();
        //测试代码
        AddModel("mods/TestMod1");
        //JsService.RegisterScript("mods/TestMod1/bin/index");
    }

    //
    public static void InitCommonJS()
    {
        //JsService.RegisterScript("CommonJS.js");
        string path = "D:\\GameProject\\SlimeJumping中文路径\\SlimeJumping\\extend\\CommonJS.js";
        string code = System.IO.File.ReadAllText(path);
        var engine = (V8ScriptEngine)JsService.Engine;
        var document = new StringDocument(new DocumentInfo(new System.Uri(path)), code);
        engine.Execute(new DocumentInfo(new System.Uri(path)), code);
    }

    public static void AddModel(string path)
    {
        path += "bin/index";
    }

    public override void _Process(float delta)
    {
        //更新输入事件
        InputManager.Update(delta);
    }

    public override void _PhysicsProcess(float delta)
    {
        //更新物理帧输入事件
        InputManager.PhysicsUpdate(delta);
    }

    public GameManager()
    {
        Init();
    }
}
