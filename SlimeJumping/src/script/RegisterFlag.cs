
namespace JsService
{
    /// <summary>
    /// 注册对象操作类型
    /// </summary>
    public enum RegisterFlag
    {
        /// <summary>
        /// 注入js环境和生成接口代码
        /// </summary>
        InjectAndInterface,
        /// <summary>
        /// 仅注入js环境
        /// </summary>
        OnlyInject,
        /// <summary>
        /// 仅生成接口
        /// </summary>
        OnlyInterface
    }
}