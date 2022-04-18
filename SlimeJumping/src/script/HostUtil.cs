
using System.Reflection;
using System;
using System.Collections.Generic;

namespace JsService
{
    internal static class HostUtils
    {
        private readonly static Dictionary<string, Type> arrTypeDic = new Dictionary<string, Type>();
        private readonly static object obj = new object();

        [JsFunction("__createHostArr", RegisterFlag = RegisterFlag.OnlyInject)]
        public static Array CreateHostArr(string typeName, params object[] length)
        {
            int[] args;
            if (length.Length == 0)
            {
                args = new int[] { 0 };
            }
            else
            {
                args = new int[length.Length];
            }
            var arrType = HostTypeMapping.GetTypeByName(typeName);
            for (int i = 0;i < length.Length; i++)
            {
                args[i] = (int)(double)length[i];
            }
            var arr = Array.CreateInstance(arrType, args);
            return arr;
        }
    }
}