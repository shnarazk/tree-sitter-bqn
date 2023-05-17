module.exports = grammar({
  name: 'bqn',

 // extras: $ => [$.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_, $.symbol_sl, $.symbol_Fl, $.symbol__ml, $.symbol__cl_, $._end_of_line, $.comment],
  extras: $ => [/[ \t]+/, $.comment, $._end_of_line],
  // word: $ => $.end_of_line,

  conflicts: $ => [
  ],

  rules: {
    source_file: $ => seq(
      optional($.delimiter),
      repeat(seq($.STMT, $.delimiter)),
      $.STMT,
      optional($.delimiter),
    ),
    STMT: $ => choice($.EXPR1, $.nothing, '$.EXPORT2'),
    delimiter: $ => repeat1(choice('⋄', ',', $._end_of_line)),
    EXPR: $ => choice($.subExpr),
    EXPR1: $ => choice($.subExpr1),
    EXPORT: $ => seq(optional($.LHS_ELT), '⇐'),
    EXPORT2: $ => seq(optional($.LHS_ELT2), '⇐⇐'),

    ANY: $ => choice($.atom, $.Func),
    ANY1: $ => choice($.atom1, $.Func),
    Func: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F),
      $.symbol_Fl,
      seq('(', $.FuncExpr, ')'),
      $.BlFunc
    ),
    atom: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.symbol_sl,
      seq('(', $.subExpr, ')'),
      $.blSub,
      $.array
    ),
    atom1: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.symbol_sl,
      seq('(', $.subExpr, ')'),
      $.blSub,
      $.array
    ),
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
    subject: $ => prec.right(choice(
      $.atom,
      seq($.ANY, repeat1(seq('‿', $.ANY)))
    )),
    subject1: $ => prec.right(choice(
      $.atom,
      seq($.ANY1, repeat1(seq('‿', $.ANY)))
    )),

    ASGN: $ => choice('←', '⇐', '↩'),

    Derv: $ => choice(
      $.Func,
    ),
    Operand: $ => prec.right(choice(
      '$.subject',
      $.Derv
    )),
    Fork: $ => choice(
      $.Derv,
      seq($.Operand, $.Derv, $.Fork),
      seq($.nothing, $.Derv, $.Fork)
    ),
    Train: $ => choice($.Fork, seq($.Derv, $.Fork)),
    FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),

    arg: $ => choice(
      '$.subject',
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)
    ),
    nothing: $ => choice(
      '·',
      seq(optional(choice('$.subject', $.nothing)), $.Derv, $.nothing)
    ),
    subExpr: $ => choice(
      $.arg,
      seq($.atom, $.ASGN, $.subExpr),
      seq($.atom, $.Derv, "↩", optional($.subExpr))
    ),
    subExpr1: $ => choice(
      $.arg,
      seq($.atom, $.ASGN, $.subExpr),
      seq($.atom, $.Derv, "↩", optional($.subExpr))
    ),

    NAME: $     => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    NAME2: $     => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    LHS_SUB: $  => choice("·", $.lhsList, $.lhsArray, $.symbol_sl),
    LHS_ANY: $  => choice($.NAME, $.LHS_SUB, seq("(", $.LHS_ELT, ")")),
    LHS_ANY2: $  => choice($.NAME2, $.LHS_SUB, seq("(", $.LHS_ELT, ")")),
    LHS_ATOM: $ => choice($.LHS_ANY, seq("(", $.lhsStr, ")")),
    LHS_ATOM2: $ => choice($.LHS_ANY2, seq("(", $.lhsStr, ")")),
    LHS_ELT: $  => choice($.LHS_ANY, $.lhsStr),
    LHS_ELT2: $  => choice($.LHS_ANY, $.lhsStr2),
    LHS_ENTRY: $=> choice($.LHS_ELT, seq($.lhs, "⇐", $.NAME)),
    lhsStr: $   => seq($.LHS_ATOM, repeat1(seq("‿", $.LHS_ATOM))),
    lhsStr2: $   => seq($.LHS_ATOM2, repeat1(seq("‿", $.LHS_ATOM))),
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
    FuncLab: $  => choice($.symbol_F,   "𝕊"),
    FuncName: $ => $.FuncLab,
    LABEL: $    => choice(         $.FuncLab),
    IMM_HEAD: $ => choice($.LABEL, $.FuncName),

    ARG_HEAD: $ => choice(
      $.LABEL,
      seq(optional($.headW), $.IMM_HEAD,       optional("⁼"), $.headX),
      seq(         $.headW , $.IMM_HEAD, "˜",           "⁼" , $.headX),
      seq(                   $.FuncName, optional("˜"), "⁼"          ),
      $.lhsComp
    ),

    BODY: $ => seq(
      optional($.delimiter),
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
    S_CASE: $ => seq(
      optional(seq(optional($.delimiter), $.symbol_s, optional($.delimiter), ":")),
      $.BODY
    ),
    IMM_BLK:  $ => seq("{", repeat(seq($.I_CASE, ";")), $.I_CASE, "}"),
    ARG_BLK:  $ => seq("{", repeat(seq($.A_CASE, ";")), $.A_CASE, "}"),
    blSub:    $ => seq("{", repeat(seq($.S_CASE, ";")), $.S_CASE, "}"),
    BlFunc:   $ => $.ARG_BLK,

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
