
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

        [JsFunction("__toHostArr", RegisterFlag = RegisterFlag.OnlyInject)]
        public static Array ToHostArr(string typeName, params object[] items)
        {
            var arrType = HostTypeMapping.GetTypeByName(typeName);
            var arr = Array.CreateInstance(arrType, items.Length);
            for (int i = 0; i < items.Length; i++)
            {
                arr.SetValue(Conver(items[i], arrType), i);
            }
            return arr;
        }

        private static object Conver(object o, Type t)
        {
            if (t == typeof(int))
                return (int)(double)o;
            else if (t == typeof(float))
                return (float)(double)o;
            else if (t == typeof(long))
                return (long)(double)o;
            else if (t == typeof(short))
                return (short)(double)o;
            else if (t == typeof(byte))
                return (byte)(double)o;
            else if (t == typeof(char))
                return ((string)o)[0];
            else if (t == typeof(uint))
                return (uint)(double)o;
            else if (t == typeof(ulong))
                return (ulong)(double)o;
            else if (t == typeof(ushort))
                return (ushort)(double)o;
            else if (t == typeof(sbyte))
                return (sbyte)(double)o;
            return o;
        }
    }
}