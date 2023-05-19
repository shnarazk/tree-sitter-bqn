module.exports = grammar({
  name: 'bqn',
  extras: $ => [/[ \t]+/, $.comment, $._end_of_line],
  conflicts: $ => [
    [$.Fork, $.arg, $.nothing],
    [$.nothing, $.arg],
    [$.Operand, $.nothing, $.arg],
    [$.Operand, $.nothing, $.arg, $.Train],
    [$.Operand, $.nothing],
    [$.Fork, $.nothing],
    [$.nothing, $.LHS_SUB],
    [$.atom, $.lhs],
    [$.atom, $.NAME],
    [$.atom, $.LHS_SUB],
    [$.atom, $.NAME, $.lhs],
    [$.Func, $.NAME],
    [$.LHS_ANY, $.lhsComp],
    [$.LHS_ATOM, $.LHS_ELT],
    [$.LHS_ATOM, $.LHS_ELT, $.lhsComp],
    [$.array, $.lhsList],
    [$.NAME, $.lhs],
    [$.LHS_ELT, $.lhsComp],
    [$.FuncExpr, $.NAME],
    [$.Operand, $.Train, $.nothing],
  ],
  rules: {
    source_file: $ => $._PROGRAM,
    _PROGRAM: $    => seq(optional($.sep), repeat(seq($.STMT, $.sep)), $.STMT, optional($.sep)),
    STMT: $        => choice($.EXPR, $.nothing, $.EXPORT),
    sep: $         => repeat1(choice('⋄', ',', $._end_of_line)),
    EXPR: $        => choice($.subExpr, $.FuncExpr),
    EXPORT: $      => seq(optional($.LHS_ELT), "⇐"),
    ANY: $     => choice($.atom, $.Func),
    Func: $    => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F), $.symbol_Fl, seq('(', $.FuncExpr, ')'),
    ),
    atom: $    => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s), $.symbol_sl, seq('(', $.subExpr, ')'), $.array
    ),
    array: $   => choice(
      seq('⟨', optional($.sep), optional(seq(repeat(seq($.EXPR, $.sep)), $.EXPR, optional($.sep))), '⟩'),
      seq('[', optional($.sep), repeat(seq($.EXPR, $.sep)), $.EXPR, optional($.sep), ']'),
    ),
    subject: $ => choice($.atom, seq($.ANY, repeat1(seq('‿', $.ANY)))),
    ASGN: $ => prec.right(choice('←', $.symbol_export, '↩')),
    Derv: $     => $.Func,
    Operand: $  => choice($.subject, $.Derv),
    Fork: $     => choice($.Derv, seq($.Operand, $.Derv, $.Fork), seq($.nothing, $.Derv, $.Fork)),
    Train: $    => choice($.Fork, seq($.Derv, $.Fork)),
    FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),
    arg: $     => choice($.subject, seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)),
    nothing: $ => prec.right(choice('·', seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing))),
    subExpr: $ => choice(
      $.arg, seq($.lhs, $.ASGN, $.subExpr), seq($.lhs, $.Derv, "↩", optional($.subExpr))
    ),
    NAME: $      => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    LHS_SUB: $   => choice("·", $.lhsList, $.lhsArray, $.symbol_sl),
    LHS_ANY: $   => choice($.NAME, $.LHS_SUB, seq("(", $.LHS_ELT, ")")),
    LHS_ATOM: $  => choice($.LHS_ANY, seq("(", $.lhsStr, ")")),
    LHS_ELT: $   => choice($.LHS_ANY, $.lhsStr),
    LHS_ENTRY: $ => choice($.LHS_ELT, seq($.lhs, $.symbol_export, $.NAME)),
    lhsStr: $    => seq($.LHS_ATOM, repeat1(seq("‿", $.LHS_ATOM))),
    lhsList: $   => seq(
      "⟨", optional($.sep), optional(seq(repeat(seq($.LHS_ENTRY, $.sep)), $.LHS_ENTRY, optional($.sep))), "⟩"
    ),
    lhsArray: $  => seq(
      "[", optional($.sep), optional(seq(repeat(seq($.LHS_ELT, $.sep)), $.LHS_ELT, optional($.sep))), "]"
    ),
    lhsComp: $   => choice($.LHS_SUB, $.lhsStr , seq("(", $.lhs, ")")),
    lhs: $       => choice($.symbol_s, $.lhsComp),
    number: $    => seq(
      optional("¯"), choice("∞", seq($._mantissa, optional(seq(choice("e", "E"), $._exponent))))
    ),
    _exponent: $ => prec.left(seq(optional("¯"), $._digits)),
    _mantissa: $ => prec.right(10, choice("π", seq($._digits, optional(seq(".", $._digits))))),
    _digits: $   => prec(100, /[0-9]+/),
    character: $ => choice(/'[^']'/, /'\\u[0-9a-fA-F]{4}'/),
    string: $    => seq('"', repeat(choice("''''", '"""', /[^"']+/)), '"'),
    symbol_sl: $      => choice(
      '𝕨', '𝕎', '𝕩', '𝕏', '𝕗', '𝔽', '𝕘', '𝔾', '𝕤', '𝕊', '𝕣', '@',
      $.character, $.string, $.number
    ),
    system_value: $   => /•[A-Za-z0-9\.]+/,
    symbol_Fl: $      => choice(
      '+', '-', '×', '÷', '⋆', '√', '⌊', '⌈', '∧', '∨', '¬', '|', '≤', '<', '>', '≥', '=',
      '≠', '≡', '≢', '⊣', '⊢', '⥊', '∾', '≍', '⋈', '↑', '↓', '↕', '«', '»', '⌽', '⍉', '/',
      '⍋', '⍒', '⊏', '⊑', '⊐', '⊒', '∊', '⍷', '⊔', '!',
      $.system_value
    ),
    symbol__ml: $     => choice( '˙', '˜', '˘', '¨', '⌜', '⁼', '´', '˝', '`' ),
    symbol__cl_: $    => choice( '∘', '○', '⊸', '⟜', '⌾', '⊘', '◶', '⎊', '⎉', '⚇', '⍟' ),
    symbol_s: $       => /[a-z][A-Za-z0-9]*/,
    symbol_F: $       => /[A-Z][A-Za-z0-9]*/,
    symbol__m: $      => /_[A-Za-z][A-Za-z0-9]*/,
    symbol__c_: $     => /_[A-Za-z][A-Za-z0-9]*_/,
    symbol_export: $ => "⇐",
    comment: $        => /#.*/,
    _end_of_line: $   => token(/\r?\n/),
  }
});
