using System;

namespace Calljs
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property | AttributeTargets.Constructor | AttributeTargets.Method)]
    public class IgnoreGenerate : Attribute
    {
    }
}
