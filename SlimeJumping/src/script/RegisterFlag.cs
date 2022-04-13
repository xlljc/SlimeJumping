
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
        OnlyInterface,
        /// <summary>
        /// 引导类型指向, 用于指向ts的基础类型, 仅对注入类型生效, 不会注入js环境也不会生成接口代码
        /// </summary>
        Guide,
    }
}