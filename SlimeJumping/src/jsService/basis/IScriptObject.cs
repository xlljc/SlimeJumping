
namespace JsService
{
    /// <summary>
    /// 脚本实例对象
    /// </summary>
    public interface IScriptObject
    {
        /// <summary>
        /// 获取C#实例对象
        /// </summary>
        object Object { get; }

        /// <summary>
        /// 获取js实例对象
        /// </summary>
        object JsObject { get; }

        /// <summary>
        /// 获取属性值
        /// </summary>
        /// <param name="property">属性名称</param>
        IScriptObject GetValue(string property);

        /// <summary>
        /// 设置属性值
        /// </summary>
        /// <param name="property">属性名称</param>
        /// <param name="v">值</param>
        void SetValue(string property, object v);

        /// <summary>
        /// 删除属性值
        /// </summary>
        /// <param name="property">属性名称</param>
        void Delete(string property);

        /// <summary>
        /// 执行方法
        /// </summary>
        /// <param name="args">传的参数</param>
        IScriptObject Invoke(params object[] args);

        /// <summary>
        /// 执行方法
        /// </summary>
        /// <param name="thisArg">指定this指向</param>
        /// <param name="args">传的参数</param>
        IScriptObject InvokeBind(object thisArg, params object[] args);

        /// <summary>
        /// 实例化对象
        /// </summary>
        /// <param name="args">传的参数</param>
        IScriptObject New(params object[] args);

        /// <summary>
        /// 返回值是否为空
        /// </summary>
        bool IsNull();

        /// <summary>
        /// 返回值是否未定义
        /// </summary>
        bool IsUndefined();
    }
}
