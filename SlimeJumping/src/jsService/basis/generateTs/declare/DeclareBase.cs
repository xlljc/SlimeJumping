using System.Reflection;

namespace JsService.generate
{
    internal abstract class DeclareBase
    {
        // 名称
        public string Name { get; set; }

        // 定义类型
        public abstract string DeclareType { get; }

        // 在velocity模板中获取的格式化代码
        public virtual string GetFormatString()
        {
            return Name;
        }

        public virtual void OnWrite()
        {

        }

        protected const BindingFlags InstanceBindFlags = 
            BindingFlags.Instance | BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly;
    }
}
