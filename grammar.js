module.exports = grammar({
  name: 'bqn',
  extras: $ => [/[ \t]+/, $.comment, $._end_of_line],
  conflicts: $ => [
    [$.Fork, $.arg, $.nothing],
    [$.nothing, $.arg],
    [$.Operand, $.nothing, $.arg],
    [$.Operand, $.nothing, $.arg, $.Train],
    [$.Operand, $.nothing],
    [$.nothing],
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
    [$.ASGN, $.LHS_ENTRY],
    [$.NAME, $.lhs],
    [$.LHS_ELT, $.lhsComp],
    [$.FuncExpr, $.NAME],
    [$.Operand, $.Train, $.nothing],
    [$.EXPORT, $.EXPORT_bl0],
    [$.nothing, $.nothing_bl0],
    [$.LHS_SUB, $.LHS_SUB_bl0],
    [$.nothing, $.nothing_bl0, $.LHS_SUB, $.LHS_SUB_bl0],
    [$.atom, $.S_CASE_bl0],
    [$.NAME, $.lhs, $.NAME_bl0, $.lhs_bl0],
    [$.atom, $.atom_bl0],
    [$.atom, $.lhs, $.atom_bl0, $.lhs_bl0],
    [$.atom, $.NAME, $.atom_bl0, $.NAME_bl0],
    [$.lhs, $.lhs_bl0],
    [$.Func, $.Func_bl0],
    [$.FuncExpr, $.NAME, $.FuncExpr_bl0, $.NAME_bl0],
    [$.Func, $.NAME, $.Func_bl0, $.NAME_bl0],
    [$.NAME, $.NAME_bl0],
    [$.subExpr, $.subExpr_bl0],
    [$.atom, $.LHS_SUB, $.atom_bl0, $.LHS_SUB_bl0],
    [$.BODY_bl0, $.STMT_bl0],
    [$.Operand_bl0, $.nothing_bl0],
    [$.Operand_bl0, $.Train_bl0, $.nothing_bl0],
    [$.LHS_ANY_bl0, $.lhsComp_bl0],
    [$.LHS_ELT_bl0, $.lhsComp_bl0],
    [$.atom, $.NAME, $.lhs, $.NAME_bl0, $.lhs_bl0],
    [$.atom, $.LHS_SUB, $.LHS_SUB_bl0],
    [$.LHS_ATOM_bl0, $.LHS_ELT_bl0, $.lhsComp_bl0],
    [$.lhsList, $.lhsList_bl0],
    [$.array, $.array_bl0],
    [$.array, $.lhsList, $.array_bl0, $.lhsList_bl0],
    [$.atom, $.NAME, $.NAME_bl0],
    [$.lhsArray, $.lhsArray_bl0],
    [$.Fork_bl0, $.nothing_bl0],
    [$.array, $.lhsList, $.lhsList_bl0], 
    [$.ASGN, $.LHS_ENTRY_bl0],
    [$.nothing, $.nothing_bl0, $.LHS_SUB_bl0],
    [$.atom, $.atom_bl0, $.lhs_bl0],
    [$.atom, $.atom_bl0, $.NAME_bl0],
    [$.Func, $.Func_bl0, $.NAME_bl0],
    [$.atom, $.atom_bl0, $.LHS_SUB_bl0],
    [$.blSub, $.blSub_bl0],
    [$.nothing_bl0],
    [$.nothing, $.LHS_SUB_bl0],
    [$.atom, $.lhs_bl0],
    [$.atom, $.NAME_bl0],
    [$.Func, $.NAME_bl0],
    [$.atom, $.LHS_SUB_bl0],
    [$.NAME_bl0, $.lhs_bl0],
    [$.FuncExpr_bl0, $.NAME_bl0],
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
      seq(optional(seq($.atom, '.')), $.symbol_s), $.symbol_sl, seq('(', $.subExpr, ')'), $.blSub, $.array
    ),
    array: $   => choice(
      seq('⟨', optional($.sep), optional(seq(repeat(seq($.EXPR, $.sep)), $.EXPR, optional($.sep))), '⟩'),
      seq('[', optional($.sep), repeat(seq($.EXPR, $.sep)), $.EXPR, optional($.sep), ']'),
    ),
    subject: $ => choice($.atom, seq($.ANY, repeat1(seq('‿', $.ANY)))),
    ASGN: $ => choice('←', $.symbol_export, '↩'),
    Derv: $     => $.Func,
    Operand: $  => choice($.subject, $.Derv),
    Fork: $     => choice($.Derv, seq($.Operand, $.Derv, $.Fork), seq($.nothing, $.Derv, $.Fork)),
    Train: $    => choice($.Fork, seq($.Derv, $.Fork)),
    FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),
    arg: $     => choice($.subject, seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)),
    nothing: $ => choice('·', seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing)),
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

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

    BODY_bl0: $   => seq(
      optional($.sep),
      repeat(choice(seq($.STMT_bl0, $.sep),
                    seq($.EXPR_bl0, optional($.sep), "?", optional($.sep)))),
      $.STMT,
      optional($.sep)
    ),
    S_CASE_bl0: $ => seq(
      optional(seq(optional($.sep), $.symbol_s, optional($.sep), ":")),
      $.BODY_bl0
    ),
    blSub:    $ => seq("{", repeat(seq($.S_CASE_bl0, ";")), $.S_CASE_bl0, "}"),

// -----------------------------------------------------------

    STMT_bl0: $        => choice($.EXPR_bl0, $.nothing_bl0, $.EXPORT_bl0),
    EXPR_bl0: $        => choice($.subExpr, $.FuncExpr),
    EXPORT_bl0: $      => seq(optional($.LHS_ELT_bl0), "⇐"),
    EXPR_bl0: $        => choice($.subExpr_bl0, $.FuncExpr_bl0),
    ANY_bl0: $     => choice($.atom_bl0, $.Func_bl0),
    Func_bl0: $    => choice(
      seq(optional(seq($.atom_bl0, '.')), $.symbol_F), $.symbol_Fl, seq('(', $.FuncExpr_bl0, ')'),
    ),
    atom_bl0: $    => choice(
      seq(optional(seq($.atom_bl0, '.')), $.symbol_s), $.symbol_sl, seq('(', $.subExpr_bl0, ')'), $.blSub_bl0, $.array_bl0
    ),
    array_bl0: $   => choice(
      seq('⟨', optional($.sep), optional(seq(repeat(seq($.EXPR_bl0, $.sep)), $.EXPR_bl0, optional($.sep))), '⟩'),
      seq('[', optional($.sep), repeat(seq($.EXPR_bl0, $.sep)), $.EXPR_bl0, optional($.sep), ']'),
    ),
    subject_bl0: $ => choice($.atom_bl0, seq($.ANY_bl0, repeat1(seq('‿', $.ANY_bl0)))),
    Derv_bl0: $     => $.Func_bl0,
    Operand_bl0: $  => choice($.subject_bl0, $.Derv_bl0),
    Fork_bl0: $     => choice($.Derv_bl0, seq($.Operand_bl0, $.Derv_bl0, $.Fork_bl0), seq($.nothing_bl0, $.Derv_bl0, $.Fork_bl0)),
    Train_bl0: $    => choice($.Fork_bl0, seq($.Derv_bl0, $.Fork_bl0)),
    FuncExpr_bl0: $ => choice($.Train_bl0, seq($.symbol_F, $.ASGN, $.FuncExpr_bl0)),
    arg_bl0: $     => choice($.subject_bl0, seq(optional(choice($.subject_bl0, $.nothing_bl0)), $.Derv_bl0, $.subExpr_bl0)),
    nothing_bl0: $ => choice('·', seq(optional(choice($.subject_bl0, $.nothing_bl0)), $.Derv_bl0, $.nothing_bl0)),
    subExpr_bl0: $ => choice(
      $.arg, seq($.lhs_bl0, $.ASGN, $.subExpr_bl0), seq($.lhs_bl0, $.Derv_bl0, "↩", optional($.subExpr_bl0))
    ),
    NAME_bl0: $      => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    LHS_SUB_bl0: $   => choice("·", $.lhsList_bl0, $.lhsArray_bl0, $.symbol_sl),
    LHS_ANY_bl0: $   => choice($.NAME_bl0, $.LHS_SUB_bl0, seq("(", $.LHS_ELT_bl0, ")")),
    LHS_ATOM_bl0: $  => choice($.LHS_ANY_bl0, seq("(", $.lhsStr_bl0, ")")),
    LHS_ELT_bl0: $   => choice($.LHS_ANY_bl0, $.lhsStr_bl0),
    LHS_ENTRY_bl0: $ => choice($.LHS_ELT_bl0, seq($.lhs_bl0, $.symbol_export, $.NAME_bl0)),
    lhsStr_bl0: $    => seq($.LHS_ATOM_bl0, repeat1(seq("‿", $.LHS_ATOM_bl0))),
    lhsList_bl0: $   => seq(
      "⟨", optional($.sep), optional(seq(repeat(seq($.LHS_ENTRY_bl0, $.sep)), $.LHS_ENTRY_bl0, optional($.sep))), "⟩"
    ),
    lhsArray_bl0: $  => seq(
      "[", optional($.sep), optional(seq(repeat(seq($.LHS_ELT_bl0, $.sep)), $.LHS_ELT_bl0, optional($.sep))), "]"
    ),
    lhsComp_bl0: $   => choice($.LHS_SUB_bl0, $.lhsStr_bl0, seq("(", $.lhs_bl0, ")")),
    lhs_bl0: $       => choice($.symbol_s, $.lhsComp_bl0),

    blSub_bl0:    $ => seq("{", repeat(seq($.S_CASE_bl0, ";")), $.S_CASE_bl0, "}"),

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

    // headW: $    => choice($.lhs, "𝕨"),
    // headX: $    => choice($.lhs, "𝕩"),
    // HeadF: $    => choice($.lhs, $.symbol_F, "𝕗", "𝔽"),
    // HeadG: $    => choice($.lhs, $.symbol_F, "𝕘", "𝔾"),
    // FuncLab: $  => choice($.symbol_F,   "𝕊"),
    // FuncName: $ => $.FuncLab,
    // LABEL: $    => choice(         $.FuncLab),
    // IMM_HEAD: $ => choice($.LABEL, $.FuncName),

    // ARG_HEAD: $ => choice(
    //   $.LABEL,
    //   seq(optional($.headW), $.IMM_HEAD,       optional("⁼"), $.headX),
    //   seq(         $.headW , $.IMM_HEAD, "˜",           "⁼" , $.headX),
    //   seq(                   $.FuncName, optional("˜"), "⁼"          ),
    //   $.lhsComp
    // ),

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

    
    number: $    => seq(
      optional("¯"), choice("∞", seq($._mantissa, optional(seq(choice("e", "E"), $._exponent))))
    ),
    _exponent: $ => prec.left(seq(optional("¯"), $._digits)),
    _mantissa: $ => prec.right(10, choice("π", seq($._digits, optional(seq(".", $._digits))))),
    _digits: $   => prec(100, /[0-9]+/),
    character: $ => choice(/'[^']'/, /'\\u[0-9a-fA-F]{4}'/),
    string: $    => seq('"', repeat(choice("''''", '"""', /[^"']+/)), '"'),
    symbol_sl: $      => choice('@', $.character, $.string, $.number),
    // special name '𝕨', '𝕎', '𝕩', '𝕏', '𝕗', '𝔽', '𝕘', '𝔾', '𝕤', '𝕊', '𝕣', 
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
