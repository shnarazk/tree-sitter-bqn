module.exports = grammar({
  name: 'bqn',
  extras: $ => [/[ \t]+/, $.comment, $._end_of_line],
  conflicts: $ => [
    [$.Operand, $.nothing, $.arg],
    [$.Operand, $.nothing, $.arg, $.Train],
    [$.Operand, $.nothing],
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
    [$.Func, $.HEAD],
    [$.mod_1, $.mod_2_, $.Func, $.atom],
    [$.Func, $.atom],
    [$.ANY, $.mod_1, $.mod_2_, $.Func, $.atom],
    [$.mod_1, $.mod_2_, $.Func],
    [$.mod_1, $.mod_2_],
    [$.mod_1, $.mod_2_, $.atom],
    [$.HEAD, $.specialname_s],
    [$.HEAD, $.specialname_F],
    [$.BODY],
    [$.GuardedSTMT],
  ],
  rules: {
    source_file: $ => $._PROGRAM,
    _PROGRAM: $    => seq(optional($.sep), repeat(seq($.STMT, $.sep)), $.STMT, optional($.sep)),
    STMT: $        => prec.left(choice($.EXPR, $.nothing, $.EXPORT)),
    sep: $         => prec.left(repeat1(choice('⋄', ',', $._end_of_line))),
    EXPR: $        => choice($.subExpr, $.FuncExpr, $.m1_Expr, $.m2_Expr_),
    EXPORT: $      => seq(optional($.LHS_ELT), "⇐"),

    ANY: $     => choice($.atom, $.Func, $.mod_1, $.mod_2_, $.block),
    mod_2_: $  => prec(5, choice(
      seq(optional(seq($.atom, '.')), $.symbol__c_),
      $.specialname__c_,
      $.system__c_,
      $.symbol__cl_,
      seq('(', $.m2_Expr_, ')'),
      $.block
    )),
    mod_1: $   => prec(5, choice(
      seq(optional(seq($.atom, '.')), $.symbol__m),
      $.specialname__m,
      $.system__m,
      $.symbol__ml,
      seq('(', $.m1_Expr, ')'),
      $.block
    )),
    Func: $    => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F),
      $.specialname_F,
      $.system_F,
      $.symbol_Fl,
      seq('(', $.FuncExpr, ')'),
      $.block
    ),
    atom: $    => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.specialname_s,
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

    ASGN: $     => prec.right(choice('←', $.symbol_export, '↩')),
    m2_Expr_: $ => choice($.mod_2_, seq($.symbol__c_, $.ASGN, $.m2_Expr_)),
    m1_Expr: $  => choice($.mod_1, seq($.symbol__m, $.ASGN, $.m1_Expr)),

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
    LHS_SUB: $   => choice("·", $.lhsList, $.lhsArray, $.symbol_sl, $.specialname_s),
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

    GuardedSTMT: $ => seq(
      repeat1(seq(
        $.EXPR,
        optional($.sep),
        "?",
        optional($.sep),
      )),
      optional(repeat(seq($.STMT, $.sep))),
      $.STMT
    ),
    BODY: $ => prec.left(seq(
      optional($.sep),
      repeat(seq(choice($.STMT, $.GuardedSTMT), $.sep)),
      choice($.STMT, $.GuardedSTMT),
      optional($.sep)
    )),
    HEAD: $  => choice(
      seq(
        optional(choice($.lhs, "𝕨", "𝕎")),
        optional(choice($.lhs, $.symbol_F, "𝕗", "𝔽")),
        choice($.symbol_F, "𝕊", $.symbol__m, $.specialname__m, $.symbol__c_, $.specialname__c_),
        optional('˜'),
        optional("⁼"),
        optional(choice($.lhs, $.symbol_F, "𝕘", "𝔾")),
        optional(choice($.lhs, "𝕩", "𝕏")),
      ),
      $.lhsComp,
    ),
    HeadedBODY: $ => seq(
      $.HEAD,
      ":",
      $.BODY
    ),
    CASE_opt: $  => seq(
      optional($.sep),
      choice($.HeadedBODY, $.BODY),
      ";"
    ),
    CASE_end: $  => seq(
      optional($.sep),
      choice($.HeadedBODY, $.BODY)
    ),
    block: $ => seq("{", repeat($.CASE_opt), $.CASE_end, "}"),

    number: $          => token(choice(/¯?[∞]/, /¯π([eE]¯?\d+)?/, /¯?\d+(\.\d+)?([eE]¯?\d+)?/)),
    character: $       => choice('@', /'.'/),
    string: $          => token(seq('"', repeat(choice('""', /[^"]+/)), '"')),
    system_s: $        => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z][A-Za-z0-9¯∞π_]*/, '.'))),
      /[a-z][A-Za-z0-9¯∞π_]*/
    )),
    specialname_s: $   => choice(
      '𝕨', '𝕩', '𝕗', '𝕘', '𝕤',
    ),
    symbol_sl: $       => choice(
      $.character, $.string, $.number
    ),
    system_F: $        => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z][A-Za-z0-9¯∞π_]*/, '.'))),
      /[A-Z][A-Za-z0-9¯∞π_]*/
    )),
    specialname_F: $   => choice(
      '𝕎', '𝕏', '𝔽', '𝔾', '𝕊',
    ),
    symbol_Fl: $       => choice(
      '+', '-', '×', '÷', '⋆', '√', '⌊', '⌈', '∧', '∨', '¬', '|', '≤', '<', '>', '≥', '=',
      '≠', '≡', '≢', '⊣', '⊢', '⥊', '∾', '≍', '⋈', '↑', '↓', '↕', '«', '»', '⌽', '⍉', '/',
      '⍋', '⍒', '⊏', '⊑', '⊐', '⊒', '∊', '⍷', '⊔', '!',
    ),
    system__m: $       => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z][A-Za-z0-9¯∞π_]*/, '.'))),
      /_+[A-Za-z]([A-Za-z0-9¯∞π_]*[A-Za-z0-9¯∞π])?/
    )),
    specialname__m: $  => "_𝕣",
    symbol__ml: $      => choice( '˙', '˜', '˘', '¨', '⌜', '⁼', '´', '˝', '`'),
    system__c_: $      => token(seq(
      "•",
      optional(repeat(seq(/[A-Za-z0-9][A-Za-z0-9¯∞π_]*/, '.'))),
      /_+[A-Za-z][A-Za-z0-9¯∞π_]*_/
    )),
    specialname__c_: $ => "_𝕣_",
    symbol__cl_: $     => choice( '∘', '○', '⊸', '⟜', '⌾', '⊘', '◶', '⎊', '⎉', '⚇', '⍟'),
    symbol_s: $        => /[a-z][A-Za-z0-9¯∞π_]*/,
    symbol_F: $        => /[A-Z][A-Za-z0-9¯∞π_]*/,
    symbol__m: $       => /_+[a-zA-Z]([A-Za-z0-9¯∞π_]*[A-Za-z0-9¯∞π])?/,
    symbol__c_: $      => /_+[a-zA-Z][A-Za-z0-9¯∞π_]*_/,
    symbol_export: $   => "⇐",
    comment: $         => /#.*/,
    _end_of_line: $    => token(/\r?\n/),
  }
});
