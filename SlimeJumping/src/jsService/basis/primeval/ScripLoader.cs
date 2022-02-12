using System.IO;

namespace JsService.primeval
{
    /// <summary>
    /// 默认的脚本加载器
    /// </summary>
    internal static class ScripLoader
    {
        /// <summary>
        /// 默认的脚本加载函数
        /// </summary>
        /// <param name="filePath">脚本路径</param>
        /// <returns>脚本文本对象</returns>
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
