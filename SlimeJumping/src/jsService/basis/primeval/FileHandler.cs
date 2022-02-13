using System.IO;

namespace JsService.primeval
{
    /// <summary>
    /// 默认的文件处理对象
    /// </summary>
    internal static class FileHandler
    {
        /// <summary>
        /// 默认的文本加载函数
        /// </summary>
        /// <param name="filePath">文件路径</param>
        /// <returns>文本内容</returns>
        internal static string Load(IScriptSerivce serivce, string filePath)
        {
            if (serivce.SearchPath == null)
            {
                return File.ReadAllText(filePath);
            }
            return File.ReadAllText(Path.Combine(serivce.SearchPath, filePath));
        }

        /// <summary>
        /// 默认的文件写出函数
        /// </summary>
        /// <param name="context">文本内容</param>
        /// <param name="filePath">文件路径</param>
        internal static void Write(IScriptSerivce serivce, string context, string filePath)
        {
            if (serivce.SearchPath == null)
            {
                File.WriteAllText(filePath, context);
            }
            else 
            {
                File.WriteAllText(Path.Combine(serivce.SearchPath, filePath), context);
            }
        }
    }
}
