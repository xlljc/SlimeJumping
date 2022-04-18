using JsService.generate;
using System.Collections.Generic;
using System;

namespace JsService
{
    public static class HostTypeMapping
    {
        private static readonly Dictionary<string, Type> dic = new Dictionary<string, Type>();

        public static void Add(Type type)
        {
            string key = TypeDeclare.GetRealName(type.FullName);
            if (dic.ContainsKey(key))
            {
                throw new ArgumentException("HostTypeMapping 中已经存在类型: " + key);
            }
            dic.Add(key, type);
        }

        public static Type GetTypeByName(string fullName)
        {
            dic.TryGetValue(fullName, out var v);
            return v;
        }
    }
}