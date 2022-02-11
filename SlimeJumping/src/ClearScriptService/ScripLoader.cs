using System.IO;

namespace Calljs
{
    internal static class ScripLoader
    {
        // 默认的脚本加载函数
        internal static string Load(IScriptSerivce serivce, string filePath)
        {
            if (serivce.SearchPath == null)
            {
                return File.ReadAllText(filePath + serivce.ExtensionName);
            }
            return File.ReadAllText(Path.Combine(serivce.SearchPath, filePath) + serivce.ExtensionName);
        }
    }
}
