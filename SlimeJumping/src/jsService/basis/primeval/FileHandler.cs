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
        internal static string Load(IScriptSerivce service, string filePath)
        {
            if (service.SearchPath == null)
            {
                return File.ReadAllText(filePath);
            }
            var path = Path.Combine(service.SearchPath, filePath);
            if (!Path.HasExtension(path))
            {
                path += service.ExtensionName;
            }
            return File.ReadAllText(new Uri(path).LocalPath, Encoding.UTF8);
        }

        /// <summary>
        /// 默认的文件写出函数
        /// </summary>
        /// <param name="context">文本内容</param>
        /// <param name="filePath">文件路径</param>
        internal static void Write(IScriptSerivce service, string context, string filePath)
        {
            if (service.SearchPath == null)
            {
                File.WriteAllText(new Uri(filePath).LocalPath, context);
            }
            else 
            {
                string path = Path.Combine(service.SearchPath, filePath);
                File.WriteAllText(new Uri(path).LocalPath, context, Encoding.UTF8);
            }
        }
    }
}
