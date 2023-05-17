module.exports = grammar({
  name: 'bqn',

 // extras: $ => [$.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_, $.symbol_sl, $.symbol_Fl, $.symbol__ml, $.symbol__cl_, $._end_of_line, $.comment],
  extras: $ => [/[ \t]+/, $.comment],
  // word: $ => $.end_of_line,

  conflicts: $ => [
    [$.nothing, $.LHS_SUB],
    [$.headW, $.symbol_sl],
    [$.HeadF, $.symbol_sl],
    [$.MergedLab, $.symbol_sl],
    [$.MergedLab, $.merged],
    [$.NAME, $.merged],
    // [$.FuncLab, $.symbol_sl]
    // [$.subject, $.subExpr],
    // [$.Operand, $.arg, $.nothing],
  ],

  rules: {
    source_file: $ => seq(
      optional($.delimiter),
      repeat(seq($.STMT, $.delimiter)),
      $.STMT,
      optional($.delimiter)
    ),
    STMT: $ => choice($.EXPR, $.nothing, 'TODO:$.EXPORT'),
    // STMT: $ => choice($.EXPR, $.nothing), // , $.EXPORT),
    delimiter: $ => repeat1(choice('⋄', ',', $._end_of_line)),
    // EXPR: $ => choice($.subExpr, $.FuncExpr, $.m_1Expr, $.m_2Expr_),
    EXPR: $ => choice($.subExpr, $.mergedExpr),
    EXPORT: $ => seq($.LHS_ELT, '⇐'),
    // EXPORT: $ => seq(optional($.LHS_ELT), '⇐'),

    ANY: $ => choice($.atom, $.merged),
    // ANY: $ => choice($.atom, $.Func),
    // ANY: $ => choice($.atom, $.Func, $.mod_1, $.mod_2_),
    // mod_2_: $ => choice(
    //   seq(optional(seq($.atom, '.')), $.symbol__c_),
    //   $.symbol__cl_,
    //   seq('(', $.m_2Expr_, ')'),
    //   // $.blMod_2_
    //   $.blMerged
    // ),
    // mod_1: $ =>  choice(
    //   seq(optional(seq($.atom, '.')), $.symbol__m),
    //   $.symbol__ml,
    //   seq('(', $.m_1Expr, ')'),
    //   // $.blMod_1
    //   $.blMerged
    // ),
    // Func: $ => choice(
    //   seq(optional(seq($.atom, '.')), $.symbol_F),
    //   $.symbol_Fl,
    //   seq('(', $.FuncExpr, ')'),
    //   // $.BlFunc
    //   $.blMerged
    // ),
    merged: $ => choice(
      seq(optional(seq($.atom, '.')), choice($.symbol__c_, $.symbol__m, $.symbol_F)),
      choice($.symbol__cl_, $.symbol__ml, $.symbol_Fl),
      seq('(', $.mergedExpr, ')'),
      // $.BlFunc
      $.blMerged
    ),
    atom: $ => prec(4, choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.symbol_sl,
      seq('(', $.subExpr, ')'),
      $.blSub,
      $.array
    )),
    array: $ => choice(
      seq(
        '⟨',
        optional($.delimiter),
        optional(seq(repeat(seq($.EXPR, $.delimiter)), $.EXPR, optional($.delimiter))),
        '⟩'
      ),
      seq(
        '[',
        optional($.delimiter),
        repeat(seq($.EXPR, $.delimiter)), $.EXPR, optional($.delimiter),
        ']'
      ),
    ),
    subject: $ => choice(
      $.atom,
      seq($.ANY, repeat1(seq('‿', $.ANY)))
    ),

    ASGN: $ => choice('←', '⇐', '↩'),
    // m_2Expr_: $ => choice($.mod_2_, seq($.symbol__c_, $.ASGN, $.m_2Expr_)),
    // m_1Expr: $ => choice($.mod_1, seq($.symbol__m, $.ASGN, $.m_1Expr)),
    // FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),
    mergedExpr: $ => choice($.merged, seq(choice($.symbol__c_, $.symbol__m, $.symbol_F), $.ASGN, $.mergedExpr)),

    Derv: $ => prec.left(choice(
      // prec.left(0,$.Func),
      // prec.left(1,seq($.Operand, $.mod_1)),
      // prec.left(2,seq($.Operand, $.mod_2_, choice($.subject, $.Func)))
      // $.Func,
      // seq($.Operand, $.mod_1),
      // seq($.Operand, $.mod_2_, choice($.subject, $.Func))
      seq(
        optional($.Operand),
        $.merged,
        // optional(choice($.subject, $.Func))
        optional(choice($.subject, $.merged))
      )
    )),
    Operand: $ => prec.right(choice(
      $.subject,
      $.Derv
      // prec.left(1, $.subject),
      // prec.left(2, $.Derv)
    )),
    Fork: $ => choice(
      $.Derv,
      seq($.Operand, $.Derv, $.Fork),
      seq($.nothing, $.Derv, $.Fork)
    ),
    Train: $ => choice($.Fork, seq($.Derv, $.Fork)),

    arg: $ => prec.right(2, choice(
      $.subject,
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)
    )),
    nothing: $ => prec.right(choice(
      '·',
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing)
      // prec.right(1, '·'),
      // TODO: conflict generated here
      // prec.right(2, seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing))
    )),
    subExpr: $ => choice(
      $.arg,
      prec.right(2, seq($.atom, $.ASGN, $.subExpr)),
      prec.right(3, seq($.atom, $.Derv, "↩", optional($.subExpr)))
    ),

    NAME: $     => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    LHS_SUB: $  => choice("·", $.lhsList, $.lhsArray, $.symbol_sl),
    LHS_ANY: $  => choice($.NAME, $.LHS_SUB, seq("(", $.LHS_ELT, ")")),
    LHS_ATOM: $ => choice($.LHS_ANY, seq("(", $.lhsStr, ")")),
    LHS_ELT: $  => choice($.LHS_ANY, $.lhsStr),
    LHS_ENTRY: $=> choice($.LHS_ELT, seq($.lhs, "⇐", $.NAME)),
    lhsStr: $   => seq($.LHS_ATOM, repeat1(seq("‿", $.LHS_ATOM))),
    lhsList: $  => seq(
      "⟨",
      optional($.delimiter),
      optional(seq(
        repeat(seq($.LHS_ENTRY, $.delimiter)),
        $.LHS_ENTRY,
        optional($.delimiter))
      ),
      "⟩"
    ),
    lhsArray: $  => seq(
      "[",
      optional($.delimiter),
      optional(seq(
        repeat(seq($.LHS_ELT, $.delimiter)),
        $.LHS_ELT,
        optional($.delimiter))
      ),
      "]"
    ),
    lhsComp: $  => choice($.LHS_SUB, $.lhsStr , seq("(", $.lhs, ")")),
    lhs: $      => choice($.symbol_s, $.lhsComp),

    headW: $    => choice($.lhs, "𝕨"),
    headX: $    => choice($.lhs, "𝕩"),
    HeadF: $    => choice($.lhs, $.symbol_F, "𝕗", "𝔽"),
    HeadG: $    => choice($.lhs, $.symbol_F, "𝕘", "𝔾"),
    // FuncLab: $  => choice($.symbol_F,   "𝕊"),
    // Mod1Lab: $  => choice($.symbol__m,  "_𝕣"),
    // Mod2Lab: $  => choice($.symbol__c_, "_𝕣_"),
    MergedLab: $ => choice($.symbol_F,   "𝕊", $.symbol__m,  "_𝕣", $.symbol__c_, "_𝕣_"),
    // FuncName: $ => $.FuncLab,
    // Mod1Name: $ => seq($.HeadF, $.Mod1Lab),
    // Mod2Name: $ => seq($.HeadF, $.Mod2Lab, $.HeadG),
    MergedName: $ => seq(
      optional($.HeadF),
      $.MergedLab,
      optional($.HeadG)
    ),
    // LABEL: $    => choice(         $.FuncLab,  $.Mod1Lab,  $.Mod2Lab),
    IMM_HEAD: $ => choice($.MergedLab, $.MergedName),
    // IMM_HEAD: $ => choice($.LABEL, $.FuncName, $.Mod1Name, $.Mod2Name),

    ARG_HEAD: $ => choice(
      $.MergedLab,
      // $.LABEL,
      seq(optional($.headW), $.IMM_HEAD,       optional("⁼"), $.headX),
      seq(         $.headW , $.IMM_HEAD, "˜",           "⁼" , $.headX),
      seq(                   $.IMM_HEAD, optional("˜"), "⁼"          ),
      // seq(                   $.FuncName, optional("˜"), "⁼"          ),
      $.lhsComp
    ),

    BODY: $ => seq(
      // optional($.delimiter),
      repeat(choice(seq($.STMT, $.delimiter),
                    seq($.EXPR, optional($.delimiter), "?", optional($.delimiter)))),
      $.STMT,
      optional($.delimiter)
    ),
    I_CASE: $ => seq(
      optional(seq(optional($.delimiter), $.IMM_HEAD, optional($.delimiter), ":")),
      $.BODY
    ),
    A_CASE: $ => seq(
      optional(seq(optional($.delimiter), $.ARG_HEAD, optional($.delimiter), ":")),
      $.BODY
    ),
    S_CASE: $ => prec(2, seq(
      optional(seq(optional($.delimiter), $.symbol_s, optional($.delimiter), ":")),
      $.BODY
    )),
    IMM_BLK:  $ => seq("{", repeat(seq($.I_CASE, ";")), $.I_CASE, "}"),
    ARG_BLK:  $ => seq("{", repeat(seq($.A_CASE, ";")), $.A_CASE, "}"),
    blSub:    $ => seq("{", repeat(seq($.S_CASE, ";")), $.S_CASE, "}"),
    BlFunc:   $ => $.ARG_BLK,
    blMod_1:  $ => choice($.IMM_BLK, $.ARG_BLK),
    blMod_2_: $ => choice($.IMM_BLK, $.ARG_BLK),
    blMerged: $ => choice($.IMM_BLK, $.ARG_BLK),

    number: $ => seq(optional('¯',), choice(token(/¯?(\d+|\d+\.\d*|\.\d+)/), 'π','∞',)),
    symbol_sl: $ => choice(
      '𝕨',
      '𝕎',
      '𝕩',
      '𝕏',
      '𝕗',
      '𝔽',
      '𝕘',
      '𝔾',
      '𝕤',
      '𝕊',
      '𝕣',
      // '¯',
      '@',
      $.number
    ),
    symbol_Fl: $ => choice(
      '+',
      '-',
      '×',
      '÷',
      '⋆',
      '√',
      '⌊',
      '⌈',
      '∧',
      '∨',
      '¬',
      '|',
      '≤',
      '<',
      '>',
      '≥',
      '=',
      '≠',
      '≡',
      '≢',
      '⊣',
      '⊢',
      '⥊',
      '∾',
      '≍',
      '⋈',
      '↑',
      '↓',
      '↕',
      '«',
      '»',
      '⌽',
      '⍉',
      '/',
      '⍋',
      '⍒',
      '⊏',
      '⊑',
      '⊐',
      '⊒',
      '∊',
      '⍷',
      '⊔',
      '!',
      field("system", /•[A-Za-z0-9]+/)
    ),
    symbol__ml: $ => choice(
      '˙',
      '˜',
      '˘',
      '¨',
      '⌜',
      '⁼',
      '´',
      '˝',
      '`'
    ),
    symbol__cl_: $ => choice(
      '∘',
      '○',
      '⊸',
      '⟜',
      '⌾',
      '⊘',
      '◶',
      '⎊',
      '⎉',
      '⚇',
      '⍟'
    ),
    symbol_s: $ => /[a-z][A-Za-z0-9]*/,
    symbol_F: $ => token(/[A-Z][A-Za-z0-9]*/),
    symbol__m: $ => /_[A-Za-z][A-Za-z0-9]*/,
    symbol__c_: $ => /_[A-Za-z][A-Za-z0-9]*_/,
    comment: $ => token(seq('#', /.*/)),
    _end_of_line: $ => token(/\r?\n/),
  }
});
