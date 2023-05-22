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
    [$.Operand, $.arg],
    [$.Operand, $.Fork],
    [$.Operand, $.arg, $.Fork, $.nothing],
    [$.Operand, $.Fork, $.nothing],
    [$.m1_Expr, $.NAME],
    [$.m2_Expr_, $.NAME],
    [$.mod_1, $.NAME],
    [$.mod_2_, $.NAME],
    [$.HEAD, $.symbol_sl],
    [$.Func, $.HEAD],
    [$.mod_1, $.mod_2_, $.Func, $.atom],
    [$.Func, $.atom],
    [$.ANY, $.mod_1, $.mod_2_, $.Func, $.atom],
    [$.mod_1, $.mod_2_, $.Func],
    [$.mod_1, $.mod_2_],
    [$.mod_1, $.mod_2_, $.atom],
    [$.HEAD, $.symbol_Fl],
  ],
  rules: {
    source_file: $ => $._PROGRAM,
    _PROGRAM: $    => seq(optional($.sep), repeat(seq($.STMT, $.sep)), $.STMT, optional($.sep)),
    STMT: $        => prec.left(choice($.EXPR, $.nothing, $.EXPORT)),
    sep: $         => repeat1(choice('⋄', ',', $._end_of_line)),
    EXPR: $        => choice($.subExpr, $.FuncExpr, $.m1_Expr, $.m2_Expr_),
    EXPORT: $      => seq(optional($.LHS_ELT), "⇐"),
    ANY: $     => choice($.atom, $.Func, $.mod_1, $.mod_2_, $.block),
    mod_2_: $ => prec(5, choice(
      seq(optional(seq($.atom, '.')), $.symbol__c_),
      $.system__c_,
      $.symbol__cl_,
      seq('(', $.m2_Expr_, ')'),
      $.block
    )),
    mod_1: $ => prec(5, choice(
      seq(optional(seq($.atom, '.')), $.symbol__m),
      $.system__m,
      $.symbol__ml,
      seq('(', $.m1_Expr, ')'),
      $.block
    )),
    Func: $    => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F),
      $.system_F,
      $.symbol_Fl,
      seq('(', $.FuncExpr, ')'),
      $.block
    ),
    atom: $    => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.system_s,
      $.symbol_sl,
      seq('(', $.subExpr, ')'),
      $.block,
      $.array
    ),
    array: $   => choice(
      seq('⟨', optional($.sep), optional(seq(repeat(seq($.EXPR, $.sep)), $.EXPR, optional($.sep))), '⟩'),
      seq('[', optional($.sep), repeat(seq($.EXPR, $.sep)), $.EXPR, optional($.sep), ']'),
    ),
    subject: $ => choice($.atom, seq($.ANY, repeat1(seq('‿', $.ANY)))),
    ASGN: $ => prec.right(choice('←', $.symbol_export, '↩')),
    m2_Expr_: $ => choice($.mod_2_, seq($.symbol__c_, $.ASGN, $.m2_Expr_)),
    m1_Expr: $ => choice($.mod_1, seq($.symbol__m, $.ASGN, $.m1_Expr)),
    Derv: $     => choice(
      $.Func,
      seq($.Operand, $.mod_1),
      seq($.Operand, $.mod_2_, choice($.subject, $.Func))
    ),
    Operand: $  => choice($.subject, $.Derv),
    Fork: $     => choice(
      $.Derv,
      seq($.Operand, $.Derv, $.Fork),
      seq($.nothing, $.Derv, $.Fork)
    ),
    Train: $    => choice($.Fork, seq($.Derv, $.Fork)),
    FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),
    arg: $     => choice(
      $.subject,
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)
    ),
    nothing: $ => prec.right(choice(
      '·',
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing))
    ),
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

    BODY: $ => prec.left(seq(
      optional($.sep),
      repeat(choice(
        seq($.STMT, $.sep),
        seq($.EXPR, optional($.sep), "?", optional($.sep))
      )),
      $.STMT,
      optional($.sep)
    )),
    HEAD: $ => choice(
      seq(
        optional(choice($.lhs, "𝕨", "𝕎")),
        optional(choice($.lhs, $.symbol_F, "𝕗", "𝔽")),
        choice($.symbol_F, "𝕊", $.symbol__m, "_𝕣", $.symbol__c_, "_𝕣_"),
        optional('˜'),
        optional("⁼"),
        optional(choice($.lhs, $.symbol_F, "𝕘", "𝔾")),
        optional(choice($.lhs, "𝕩", "𝕏")),
      ),
      $.lhsComp,
    ),
    CASE: $ => seq(
      optional(seq(optional($.sep), $.HEAD, ":")),
      $.BODY
    ),
    block: $ => seq("{", repeat(seq($.CASE, ";")), $.CASE, "}"),

    number: $    => token(choice(/¯?[∞]/, /¯π([eE]¯?\d+)?/, /¯?\d+(\.\d+)?([eE]¯?\d+)?/)),
    character: $ => choice(/'.'/, /'\\u[0-9a-fA-F]{4}'/),
    string: $    => token(seq('"', repeat(choice('""', /[^"]+/)), '"')),
    system_s: $ => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/, '.'))),
      /[a-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/
    )),
    symbol_sl: $      => choice(
      '𝕨', '𝕩', '𝕗', '𝕘', '𝕤', '𝕣', '@',
      // '𝕨', '𝕎', '𝕩', '𝕏', '𝕗', '𝔽', '𝕘', '𝔾', '𝕤', '𝕊', '𝕣', '@',
      $.character, $.string, $.number
    ),
    system_F: $ => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/, '.'))),
      /[A-Z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/
    )),
    symbol_Fl: $      => choice(
      '+', '-', '×', '÷', '⋆', '√', '⌊', '⌈', '∧', '∨', '¬', '|', '≤', '<', '>', '≥', '=',
      '≠', '≡', '≢', '⊣', '⊢', '⥊', '∾', '≍', '⋈', '↑', '↓', '↕', '«', '»', '⌽', '⍉', '/',
      '⍋', '⍒', '⊏', '⊑', '⊐', '⊒', '∊', '⍷', '⊔', '!',
      '𝕎', '𝕏', '𝔽', '𝔾', '𝕊',
    ),
    system__m: $ => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/, '.'))),
      /_[A-Za-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/
    )),
    symbol__ml: $     => choice( '˙', '˜', '˘', '¨', '⌜', '⁼', '´', '˝', '`'),
    system__c_: $ => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z0-9]([A-Za-z0-9_]*[A-Za-z0-9]+)?/, '.'))),
      /_[A-Za-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?_/
    )),
    symbol__cl_: $    => choice( '∘', '○', '⊸', '⟜', '⌾', '⊘', '◶', '⎊', '⎉', '⚇', '⍟'),
    symbol_s: $       => /[a-z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/,
    symbol_F: $       => /[A-Z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/,
    symbol__m: $      => /_[a-zA-Z]([A-Za-z0-9_]*[A-Za-z0-9]+)?/,
    symbol__c_: $     => /_[a-zA-Z]([A-Za-z0-9_]*[A-Za-z0-9]+)?_/,
    symbol_export: $ => "⇐",
    comment: $        => /#.*/,
    _end_of_line: $   => token(/\r?\n/),
  }
});
