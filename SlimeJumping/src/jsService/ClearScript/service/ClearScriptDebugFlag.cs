
namespace JsService
{
    /// <summary>
    /// js引擎调试选项
    /// </summary>
    public enum ClearScriptDebugFlag
    {
        /// <summary>
        /// 禁用调试
        /// </summary>
        Disable = 0,
        /// <summary>
        /// 启用调试
        /// </summary>
        Enable = 1,
        /// <summary>
        /// 启用调试, 并且在执行前等待调试器连接
        /// </summary>
        AwaitForStart = 2,
    }
}
