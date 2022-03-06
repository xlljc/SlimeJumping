using Esprima.Ast;

namespace Jint.Runtime.Interpreter.Statements
{
    internal sealed class JintLabeledStatement : JintStatement<LabeledStatement>
    {
        private JintStatement _body;
        private string _labelName;

        public JintLabeledStatement(LabeledStatement statement) : base(statement)
        {
        }

        protected override void Initialize(EvaluationContext context)
        {
            _body = Build(_statement.Body);
            _labelName = _statement.Label.Name;
        }

        protected override Completion ExecuteInternal(EvaluationContext context)
        {
            // TODO: Esprima added Statement.Label, maybe not necessary as this line is finding the
            // containing label and could keep a table per program with all the labels
            // labeledStatement.Body.LabelSet = labeledStatement.Label;
            var result = _body.Execute(context);
            if (result.Type == CompletionType.Break && result.Target == _labelName)
            {
                var value = result.Value;
                return new Completion(CompletionType.Normal, value, null, Location);
            }

            return result;
        }
    }
}