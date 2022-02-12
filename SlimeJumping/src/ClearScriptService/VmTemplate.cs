namespace Calljs
{
    /// <summary>
    /// 默认的生成模板
    /// </summary>
    internal static class VmTemplate
    {
        public const string Context = @"/*
 Generate time: $!{time}
 Runtime environment: $!{environment}
*/
## 参数列表 list:参数对象集合
#macro(param list)
#foreach($i in $list)
#if($velocityCount > 1), #end
#if($i.IsParams)...#end
#if($i.Name == 'function' || $i.Name == 'export')_#end
${i.Name}#if($i.HasDefaultValue)?#end
: ${i.Type.GetFormatString($i.IsParams)}#end
#end

## ----------------------------------------
## 写出函数
#foreach($item in $func)
#set($ps = $item.Params)
#set($t = $item.TypeDeclare.RefType)
#set($nspTab = '')
#if($t.TsNamespace != '' || $t.Module != '')#set($nspTab = '    ')#end
#if($t.Module != '')
declare module '${t.Module}' {
#elseif($t.TsNamespace != '')
declare namespace ${t.TsNamespace} {
#end
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
type ${t.TsName} = (#param($ps)) => ${item.ReturnType.GetFormatString()};
#if($item.CanInstance)
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
var ${t.TsName}: unknown;
#end
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
########################
## 函数实例
#foreach($inst in $item.InstanceList)
#set($it = $inst.TsType)
#set($nspTab = '')
#if($it.TsNamespace != '' || $it.Module != '')#set($nspTab = '    ')#end
#if($it.Module != '')
declare module '${it.Module}' {
#elseif($it.TsNamespace != '')
declare namespace ${it.TsNamespace} {
#end
${nspTab}#if($it.Module == '' && $it.TsNamespace == '')declare #end
function ${inst.GetFormatString()}(#param($ps)): ${item.ReturnType.GetFormatString()};
#if($it.TsNamespace != '' || $it.Module != '')
}
#end
#end
#end

## ----------------------------------------
## 动态函数
#foreach($inst in $dynamicFunc)
#set($it = $inst.TsType)
#set($ps = $inst.FunctionDeclare.Params)
#set($nspTab = '')
#if($it.TsNamespace != '' || $it.Module != '')#set($nspTab = '    ')#end
#if($it.Module != '')
declare module '${it.Module}' {
#elseif($it.TsNamespace != '')
declare namespace ${it.TsNamespace} {
#end
${nspTab}#if($it.Module == '' && $it.TsNamespace == '')declare #end
function ${inst.GetFormatString()}(#param($ps)): ${inst.FunctionDeclare.ReturnType.GetFormatString()};
#if($it.TsNamespace != '' || $it.Module != '')
}
#end
#end

## ----------------------------------------
## 写出枚举
#foreach($item in $enum)
#set($t = $item.TypeDeclare.RefType)
#set($nspTab = '')
#if($t.TsNamespace != '' || $t.Module != '')#set($nspTab = '    ')#end
#if($t.Module != '')
declare module '${t.Module}' {
#elseif($t.TsNamespace != '')
declare namespace ${t.TsNamespace} {
#end
##枚举类型
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
type ${t.TsName} = any;
##枚举参数
#if($item.CanInstance)
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}Enum {
#foreach($name in $item.Item)
${nspTab}    ${name}: any,
#end
${nspTab}}
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
var ${t.TsName}: ${t.TsName}Enum;
#end
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
########################
## 枚举实例
#foreach($inst in $item.InstanceList)
#set($it = $inst.TsType)
#set($nspTab = '')
#if($it.TsNamespace != '' || $it.Module != '')#set($nspTab = '    ')#end
#if($it.Module != '')
declare module '${it.Module}' {
#elseif($it.TsNamespace != '')
declare namespace ${it.TsNamespace} {
#end
${nspTab}#if($it.Module == '' && $it.TsNamespace == '')declare #end
var ${inst.GetFormatString()}: ${inst.Type.GetFormatString()};
#if($it.TsNamespace != '' || $it.Module != '')
}
#end
#end
#end

## ----------------------------------------
## 写出类
#foreach($item in $class)
#set($cls = $item)
#set($t = $cls.TypeDeclare.RefType)
#set($nspTab = '')
#if($t.TsNamespace != '' || $t.Module != '')#set($nspTab = '    ')#end
#if($t.Module != '')
declare module '${t.Module}' {
#elseif($t.TsNamespace != '')
declare namespace ${t.TsNamespace} {
#end
## 导入的类
#foreach($imp in $cls.ImportTypes)
${nspTab}import { ${imp.TsName}, ${imp.TsName}Constructor } from '${imp.Module}'; 
#end
########################
## 这个写成员属性
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}${cls.GetClassGenericString()}${cls.GetExtendsString('')} {
## 成员字段
#foreach($field in $item.Fields)
#if(!$field.IsStatic)
${nspTab}    #if($field.IsReadonly)readonly #end${field.Name}: ${field.Type.GetFormatString()};
#end
#end
## 成员属性
#foreach($property in $item.Propertys)
#if(!$property.IsStatic && $property.PropertyType == 'Read')## get属性
${nspTab}    get ${property.Name}(): ${property.Type.GetFormatString()};
#end
#if(!$property.IsStatic && $property.PropertyType == 'Write')## set属性
${nspTab}    set ${property.Name}(v: ${property.Type.GetFormatString()});
#end
#end
## 成员方法
#foreach($method in $item.Methods)
#if(!$method.IsStatic)
#set($ps = $method.Params)
#if($method.GenericTypes && $environment != 'ClearScript')
${nspTab}    //该方法在$!{environment}运行环境下不支持调用!
${nspTab}    //#else
${nspTab}    #end
${method.Name}${method.GetGenericString()}(${method.GetGenericParamString()}#param($ps)): ${method.ReturnType.GetFormatString()};
#end
#end
${nspTab}}
## 这个写构造函数
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}Constructor${cls.GetClassGenericString()} {
##构造函数
#if($cls.CanNew())
#if($cls.IsStruct)
${nspTab}    new(): ${t.TsFullName}${cls.GetClassGenericTypeString()};
#end
#foreach($constructor in $item.Constructors)
#set($ps = $constructor.Params)
${nspTab}    new(#param($ps)): ${t.TsFullName}${cls.GetClassGenericTypeString()};
#end
#end
${nspTab}}
## 静态属性
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}Static${cls.GetClassGenericString()}${cls.GetExtendsString('Static')} {
## 静态字段
#foreach($field in $item.Fields)
#if($field.IsStatic)
#set($f = $field)
${nspTab}    #if($field.IsReadonly)readonly #end${field.Name}: ${field.Type.GetFormatString()};
#end
#end
########################
## 静态属性
#foreach($property in $item.Propertys)
#if($property.IsStatic && $property.PropertyType == 'Read')## get属性
${nspTab}    get ${property.Name}(): ${property.Type.GetFormatString()};
#end
#if($property.IsStatic && $property.PropertyType == 'Write')## set属性
${nspTab}    set ${property.Name}(v: ${property.Type.GetFormatString()});
#end
#end
## 静态方法
#foreach($method in $item.Methods)
#if($method.IsStatic)
#set($ps = $method.Params)
#if($method.GenericTypes && $environment != 'ClearScript')
${nspTab}    //该方法在$!{environment}运行环境下不支持调用!
${nspTab}    //#else
${nspTab}    #end
${method.Name}${method.GetGenericString()}(${method.GetGenericParamString()}#param($ps)): ${method.ReturnType.GetFormatString()};
#end
#end
${nspTab}}
#if($cls.CanInstance)
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
var ${t.TsName}: ${t.TsFullName}Constructor${cls.GetGenericString()} & ${t.TsFullName}Static${cls.GetGenericString()};
#end
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
########################
## 对象实例
#foreach($inst in $item.InstanceList)
#set($it = $inst.TsType)
#set($nspTab = '')
#if($it.TsNamespace != '' || $it.Module != '')#set($nspTab = '    ')#end
#if($it.Module != '')
declare module '${it.Module}' {
#elseif($it.TsNamespace != '')
declare namespace ${it.TsNamespace} {
#end
${nspTab}#if($it.Module == '' && $it.TsNamespace == '')declare #end
var ${inst.GetFormatString()}: ${inst.Type.GetFormatString()};
#if($it.TsNamespace != '' || $it.Module != '')
}
#end
#end
#end

## ----------------------------------------
## 自定义类型
#foreach($item in $cust)
#if(!$item.Ignore)
#set($t = $item.TypeDeclare.RefType)
#set($nspTab = '')
#if($t.TsNamespace != '' || $t.Module != '')#set($nspTab = '    ')#end
#if($t.Module != '')
declare module '${t.Module}' {
#elseif($t.TsNamespace != '')
declare namespace ${t.TsNamespace} {
#end
##
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
type ${t.TsName} = ${item.TypeStr};
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
var ${t.TsName}: ${t.TsFullName};
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
#end
########################
## 实例
#foreach($inst in $item.InstanceList)
#set($it = $inst.TsType)
#set($nspTab = '')
#if($it.TsNamespace != '' || $it.Module != '')#set($nspTab = '    ')#end
#if($it.Module != '')
declare module '${it.Module}' {
#elseif($it.TsNamespace != '')
declare namespace ${it.TsNamespace} {
#end
${nspTab}#if($it.Module == '' && $it.TsNamespace == '')declare #end
var ${inst.GetFormatString()}: ${inst.Type.GetFormatString()};
#if($it.TsNamespace != '' || $it.Module != '')
}
#end
#end
#end

## ----------------------------------------
## 引用类型
#foreach($item in $ref)
#if($item.Module != '')
declare module '${item.Module}'' {
    type ${item.GetTypeStr()} = any;
}
#elseif($item.TsNamespace != '')
declare namespace $item.TsNamespace {
    type ${item.GetTypeStr()} = any;
}
#else
declare type ${item.GetTypeStr()} = any;
#end
#end
";
    }
}
