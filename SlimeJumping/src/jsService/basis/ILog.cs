namespace JsService
{
    /// <summary>
    /// js引擎的log对象接口
    /// </summary>
    public interface ILog
    {
        /// <summary>
        /// 在控制台输出一个log
        /// </summary>
        void log(params object[] args);

        /// <summary>
        /// 在控制台输出一个错误
        /// </summary>
        void error(params object[] args);

        /// <summary>
        /// 在控制台输出一个警告
        /// </summary>
        void warn(params object[] args);
    }
}
