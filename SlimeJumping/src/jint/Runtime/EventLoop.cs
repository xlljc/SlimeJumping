using System;
using System.Collections.Generic;

namespace Jint.Runtime
{
    internal sealed record EventLoop
    {
        internal readonly Queue<Action> Events = new();
    }
}