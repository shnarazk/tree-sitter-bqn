module.exports = grammar({
  name: 'bqn',

  extras: $ => [/\s/, $.comment],
  // word: $ => $.identifier,

  conflicts: $ => [
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
    STMT: $ => choice($.EXPR, $.nothing), // , $.EXPORT),
    delimiter: $ => repeat1(choice('⋄', ',', token(/\r?\n/))),
    EXPR: $ => choice($.subExpr, $.FuncExpr, $.m_1Expr, $.m_2Expr_),
    EXPORT: $ => seq(optional($.LHS_ELT), '⇐'),

    ANY: $ => choice($.atom, $.Func, $.mod_1, $.mod_2_),
    mod_2_: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol__c_),
      $.symbol__cl_,
      seq('(', $.m_2Expr_, ')'),
      'TODO:$.blMod_2_'
    ),
    mod_1: $ =>  choice(
      seq(optional(seq($.atom, '.')), $.symbol__m),
      $.symbol__ml,
      seq('(', $.m_1Expr, ')'),
      'TODO:$.blMod_1'
    ),
    Func: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F),
      $.symbol_Fl,
      seq('(', $.FuncExpr, ')'),
      'TODO:$.BlFunc'
    ),
    atom: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.symbol_sl,
      seq('(', $.subExpr, ')'),
      'TODO:$.blSub',
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
    subject: $ => choice(
      $.atom,
      field("strand", seq($.ANY, repeat1(seq('‿', $.ANY))))
    ),

    ASGN: $ => choice('←', '⇐', '↩'),
    m_2Expr_: $ => choice($.mod_2_, seq($.symbol__c_, $.ASGN, $.m_2Expr_)),
    m_1Expr: $ => choice($.mod_1, seq($.symbol__m, $.ASGN, $.m_1Expr)),

    Derv: $ => prec.right(choice(
      // prec.left(0,$.Func),
      // prec.left(1,seq($.Operand, $.mod_1)),
      // prec.left(2,seq($.Operand, $.mod_2_, choice($.subject, $.Func)))
      $.Func,
      seq($.Operand, $.mod_1),
      seq($.Operand, $.mod_2_, choice($.subject, $.Func))
    )),
    Operand: $ => prec.right(2, choice(
      $.subject,
      $.Derv
      // prec.left(1, $.subject),
      // prec.left(2, $.Derv)
    )),
    Fork: $ => prec.right(2, choice(
      $.Derv,
      seq($.Operand, $.Derv, $.Fork),
      seq($.nothing, $.Derv, $.Fork)
    )),
    Train: $ => choice($.Fork, seq($.Derv, $.Fork)),
    FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),

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
    FuncLab: $  => choice($.symbol_F,   "𝕊"),
    Mod1Lab: $  => choice($.symbol__m,  "_𝕣"),
    Mod2Lab: $  => choice($.symbol__c_, "_𝕣_"),
    FuncName: $ => $.FuncLab,
    Mod1Name: $ => seq($.HeadF, $.Mod1Lab),
    Mod2Name: $ => seq($.HeadF, $.Mod2Lab, $.HeadG),
    LABEL: $    => choice(         $.FuncLab,  $.Mod1Lab,  $.Mod2Lab),
    IMM_HEAD: $ => choice($.LABEL, $.FuncName, $.Mod1Name, $.Mod2Name),

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
    blMod_1:  $ => choice($.IMM_BLK, $.ARG_BLK),
    blMod_2_: $ => choice($.IMM_BLK, $.ARG_BLK),

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
      // field("system", token(seq('•', /[A-Za-z0-9\.]+/)))
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
    symbol__m: $ => token(/_[A-Za-z][A-Za-z0-9]*/),
    symbol__c_: $ => token(/_[A-Za-z][A-Za-z0-9]*_/),
    comment: $ => token(seq('#', /.*/)),
  }
});
