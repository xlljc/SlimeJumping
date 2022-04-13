
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
        public static object CreateHostArr(string typeName, params object[] length)
        {
            object[] args;
            if (length.Length == 0)
            {
                args = new object[] { 0 };
            }
            else
            {
                args = new object[length.Length];
            }
            for (int i = 0;i < length.Length; i++) {
                args[i] = (int)(double)length[i];
                typeName += "[]";
            }
            var arrType = GetArrType(typeName);
            return arrType.InvokeMember("Set", BindingFlags.CreateInstance, null, obj, args);
        }

        private static Type GetArrType(string typeName)
        {
            arrTypeDic.TryGetValue(typeName, out Type arrType);
            if (arrType == null)
            {
                arrType = Type.GetType(typeName);
                arrTypeDic.Add(typeName, arrType);
            }
            return arrType;
        }
    }
}