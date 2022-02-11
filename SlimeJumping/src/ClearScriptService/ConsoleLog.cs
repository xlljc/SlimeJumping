using System;

namespace Calljs
{
    internal class ConsoleLog : ILog
    {
        public void Log(params object[] args)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write(toLogStr(args) + "\n");
        }

        public void LogError(params object[] args)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write(toLogStr(args) + "\n");
            Console.ForegroundColor = ConsoleColor.White;
        }

        public void LogWarn(params object[] args)
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
