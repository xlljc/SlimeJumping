namespace JsService.generate
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

/** Indicates this is a C# type. */
declare interface CsType {
    /** The type object of the C# class referred to. */
    csTarget: any;
}
/** Represents an array type in C#. */
declare interface CsArray<T = any> {
    [Symbol.iterator](): IterableIterator<T>;
    [index: number]: T;
    get Length(): number;
    get LongLength(): number;
}
declare interface CsArrayStatic {
    /** Convert JS array to C# Object array. */
    toCsArray<T>(arr: Array<T>): CsArray<T>;
    /** Converts a JS array to a C# array of the specified type. */
    toCsArray<T>(csType: CsType, arr: Array<T>): CsArray<T>;
}
declare var CsArray: CsArrayStatic;

declare interface ArrayConstructor {
    /** Convert C# arrays to JS arrays. */
    toJsArray<T>(csArr: CsArray<T>): Array<T>;
}

## Parameter list, list: collection of parameter objects
#macro(param list)
#foreach($i in $list)
#if($velocityCount > 1), #end
#if($i.IsParams)...#end
#if($i.Name == 'function' || $i.Name == 'export')_#end
${i.Name}#if($i.HasDefaultValue)?#end
: ${i.Type.GetFormatString($i.IsParams)}#end
#end

## ----------------------------------------
## Write a function
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
var ${t.TsName}: CsType;
#end
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
########################
## The function instance
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
## Dynamic function
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
## Write the enumeration
#foreach($item in $enum)
#set($t = $item.TypeDeclare.RefType)
#set($nspTab = '')
#if($t.TsNamespace != '' || $t.Module != '')#set($nspTab = '    ')#end
#if($t.Module != '')
declare module '${t.Module}' {
#elseif($t.TsNamespace != '')
declare namespace ${t.TsNamespace} {
#end
## Enumerated type
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
type ${t.TsName} = any;
## Enumeration parameter
#if($item.CanInstance)
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}Enum {
#foreach($name in $item.Item)
${nspTab}    readonly ${name}: any,
#end
${nspTab}}
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
var ${t.TsName}: ${t.TsName}Enum & CsType;
#end
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
########################
## Enumerated instances
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
## Write a class
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
## The imported class
#foreach($imp in $cls.ImportTypes)
${nspTab}import { ${imp.TsName}, ${imp.TsName}Constructor } from '${imp.Module}'; 
#end
########################
## The write member property
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}${cls.GetClassGenericString()}${cls.GetExtendsString('')} {
## Members of the field
#foreach($field in $item.Fields)
#if(!$field.IsStatic)
${nspTab}    #if($field.IsReadonly)readonly #end${field.Name}: ${field.Type.GetFormatString()};
#end
#end
## Member attribute
#foreach($property in $item.Propertys)
#if(!$property.IsStatic && $property.PropertyType == 'Read')## get
${nspTab}    get ${property.Name}(): ${property.Type.GetFormatString()};
#end
#if(!$property.IsStatic && $property.PropertyType == 'Write')## set
${nspTab}    set ${property.Name}(v: ${property.Type.GetFormatString()});
#end
#end
## Members of the method
#foreach($method in $item.Methods)
#if(!$method.IsStatic)
#set($ps = $method.Params)
#if(!$method.GenericTypes)
${nspTab}   ${method.Name}(${method.GetGenericParamString()}#param($ps)): ${method.ReturnType.GetFormatString()};
#end
#end
#end
${nspTab}}
## This writes the constructor
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}Constructor${cls.GetClassGenericString()} {
## The constructor
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
## Static attributes
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
interface ${t.TsName}Static${cls.GetClassGenericString()}${cls.GetExtendsString('Static')} {
## Static field
#foreach($field in $item.Fields)
#if($field.IsStatic)
#set($f = $field)
${nspTab}    #if($field.IsReadonly)readonly #end${field.Name}: ${field.Type.GetFormatString()};
#end
#end
########################
## Static attributes
#foreach($property in $item.Propertys)
#if($property.IsStatic && $property.PropertyType == 'Read')## get
${nspTab}    get ${property.Name}(): ${property.Type.GetFormatString()};
#end
#if($property.IsStatic && $property.PropertyType == 'Write')## set
${nspTab}    set ${property.Name}(v: ${property.Type.GetFormatString()});
#end
#end
## A static method
#foreach($method in $item.Methods)
#if($method.IsStatic)
#set($ps = $method.Params)
#if(!$method.GenericTypes)
${nspTab}    ${method.Name}(${method.GetGenericParamString()}#param($ps)): ${method.ReturnType.GetFormatString()};
#end
#end
#end
${nspTab}}
#if($cls.CanInstance)
${nspTab}#if($t.Module == '' && $t.TsNamespace == '')declare #end
#set($genericString = $cls.GetGenericString())
var ${t.TsName}: ${t.TsFullName}Constructor${genericString} & ${t.TsFullName}Static${genericString} & CsType;
#end
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
########################
## Object instance
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
## Custom type
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
var ${t.TsName}: CsType;
#if($t.TsNamespace != '' || $t.Module != '')
}
#end
#end
########################
## The instance
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
## Reference types
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