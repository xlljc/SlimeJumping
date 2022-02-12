using Microsoft.ClearScript;
using System;
using System.IO;
using System.Threading.Tasks;

namespace JsService
{
    /// <summary>
    /// 重写 Microsoft.ClearScript 的脚本加载函数
    /// </summary>
    internal class ScriptFileLoader : DocumentLoader
    {
        private ClearScriptService service;

        public ScriptFileLoader(ClearScriptService service)
        {
            this.service = service;
        }

        public override Document LoadDocument(DocumentSettings settings, DocumentInfo? sourceInfo, string specifier, DocumentCategory category, DocumentContextCallback contextCallback)
        {
            try
            {
                string path;
                if (service.SearchPath != null)
                {
                    path = Path.Combine(service.SearchPath, specifier);
                }
                else
                {
                    path = Path.Combine(Environment.CurrentDirectory, specifier);
                }
                Uri uri = new Uri(path + service.ExtensionName);
                var documentInfo = new DocumentInfo(uri)
                {
                    Category = category,
                    ContextCallback = contextCallback
                };
                if (contextCallback != null)
                {
                    contextCallback(documentInfo);
                }
                return new StringDocument(documentInfo, service.ScriptLoadHandler(service, specifier));
            }
            catch (AggregateException ex)
            {
                AggregateException ex2 = ex.Flatten();
                if (ex2.InnerExceptions.Count == 1)
                {
                    throw new FileLoadException(null, specifier, ex2.InnerExceptions[0]);
                }
                throw new FileLoadException(null, specifier, ex2);
            }
        }

        public override Task<Document> LoadDocumentAsync(DocumentSettings settings, DocumentInfo? sourceInfo, string specifier, DocumentCategory category, DocumentContextCallback contextCallback)
        {
            return new Task<Document>(() => LoadDocument(settings, sourceInfo, specifier, category, contextCallback));
        }
    }
}
