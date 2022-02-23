using System;

namespace JsService.primeval
{
    /// <summary>
    /// 默认的控制台打印类
    /// </summary>
    internal class ConsoleLog : ILog
    {
        public void log(params object[] args)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write(toLogStr(args) + "\n");
        }

        public void error(params object[] args)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write(toLogStr(args) + "\n");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public void warn(params object[] args)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.Write(toLogStr(args) + "\n");
            Console.ForegroundColor = ConsoleColor.White;
        }

        private string toLogStr(params object[] args)
        {
            string str = "";
            if (args != null && args.Length > 0)
            {
                foreach (var item in args)
                {
                    str += item + " ";
                }
            }
            return str;
        }
    }
}
