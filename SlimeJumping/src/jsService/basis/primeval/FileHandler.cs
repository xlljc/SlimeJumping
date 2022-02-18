using System;
using System.IO;
using System.Text;

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
            var path = Path.Combine(serivce.SearchPath, filePath);
            if (string.IsNullOrEmpty(Path.GetExtension(path)))
            {
                path += serivce.ExtensionName;
            }
            path = path.Replace('/', '\\');
            return File.ReadAllText(path, Encoding.UTF8);
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
                filePath = filePath.Replace('/', '\\');
                File.WriteAllText(filePath, context);
            }
            else 
            {
                string path = Path.Combine(serivce.SearchPath, filePath);
                path = path.Replace('/', '\\');
                File.WriteAllText(path, context, Encoding.UTF8);
            }
        }
    }
}
