using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using Jint.Native;
using Jint.Runtime;

namespace Jint.Extensions
{
    internal static class ReflectionExtensions
    {
        private static readonly Type nullableType = typeof(Nullable<>);

        internal static void SetValue(this MemberInfo memberInfo, object forObject, object value)
        {
            if (memberInfo.MemberType == MemberTypes.Field)
            {
                var fieldInfo = (FieldInfo) memberInfo;
                if (value != null && fieldInfo.FieldType.IsInstanceOfType(value))
                {
                    fieldInfo.SetValue(forObject, value);
                }
            }
            else if (memberInfo.MemberType == MemberTypes.Property)
            {
                var propertyInfo = (PropertyInfo) memberInfo;
                if (value != null && propertyInfo.PropertyType.IsInstanceOfType(value))
                {
                    propertyInfo.SetValue(forObject, value);
                }
            }
        }

        internal static Type GetDefinedType(this MemberInfo memberInfo)
        {
            return memberInfo switch
            {
                PropertyInfo propertyInfo => propertyInfo.PropertyType,
                FieldInfo fieldInfo => fieldInfo.FieldType,
                _ => null
            };
        }

        internal static IEnumerable<MethodInfo> GetExtensionMethods(this Type type)
        {
            return type.GetMethods(BindingFlags.Public | BindingFlags.Static)
                .Where(m => m.IsExtensionMethod());
        }

        internal static IEnumerable<MethodInfo> GetOperatorOverloadMethods(this Type type)
        {
            return type.GetMethods(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                .Where(m => m.IsSpecialName);
        }

        private static bool IsExtensionMethod(this MethodBase methodInfo)
        {
            return methodInfo.IsDefined(typeof(ExtensionAttribute), true);
        }

        public static bool IsNullable(this Type type)
        {
            return type is { IsGenericType: true } && type.GetGenericTypeDefinition() == nullableType;
        }

        public static bool IsNumeric(this Type type)
        {
            if (type == null || type.IsEnum)
            {
                return false;
            }

            switch (Type.GetTypeCode(type))
            {
                case TypeCode.Byte:
                case TypeCode.Decimal:
                case TypeCode.Double:
                case TypeCode.Int16:
                case TypeCode.Int32:
                case TypeCode.Int64:
                case TypeCode.SByte:
                case TypeCode.Single:
                case TypeCode.UInt16:
                case TypeCode.UInt32:
                case TypeCode.UInt64:
                    return true;
                default:
                    return false;
            }
        }

        public static bool IsClrNumericCoercible(this Type type)
        {
            if (type == null || type.IsEnum)
            {
                return false;
            }

            switch (Type.GetTypeCode(type))
            {
                case TypeCode.Decimal:
                case TypeCode.Double:
                case TypeCode.Int32:
                case TypeCode.Int64:
                    return true;
                default:
                    return false;
            }
        }

        public static object AsNumberOfType(this double d, TypeCode type)
        {
            switch (type)
            {
                case TypeCode.Decimal:
                    return (decimal) d;
                case TypeCode.Double:
                    return d;
                case TypeCode.Int32:
                    return (int) d;
                case TypeCode.Int64:
                    return (long) d;
                default:
                    ExceptionHelper.ThrowArgumentException("Cannot convert " + type);
                    return null;
            }
        }

        public static bool TryConvertViaTypeCoercion(
            Type _memberType,
            ValueCoercionType valueCoercionType,
            JsValue value,
            out object converted)
        {
            if (_memberType == typeof(bool) && (valueCoercionType & ValueCoercionType.Boolean) != 0)
            {
                converted = TypeConverter.ToBoolean(value);
                return true;
            }

            if (_memberType == typeof(string)
                && !value.IsNullOrUndefined()
                && (valueCoercionType & ValueCoercionType.String) != 0)
            {
                // we know how to print out correct string presentation for primitives
                // that are non-null and non-undefined
                converted = TypeConverter.ToString(value);
                return true;
            }

            if (_memberType.IsClrNumericCoercible() && (valueCoercionType & ValueCoercionType.Number) != 0)
            {
                // we know how to print out correct string presentation for primitives
                // that are non-null and non-undefined
                var number = TypeConverter.ToNumber(value);
                converted = number.AsNumberOfType(Type.GetTypeCode(_memberType));
                return true;
            }

            converted = null;
            return false;
        }
    }
}