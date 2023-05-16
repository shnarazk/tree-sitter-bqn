module.exports = grammar({
  name: 'bqn',

  extras: $ => [/\s/, $.comment],
  // word: $ => $.identifier,

  rules: {
    source_file: $ => seq(
      optional($.STMT_delimiter),
      repeat(seq($.STMT, $.STMT_delimiter)),
      $.STMT,
      optional($.STMT_delimiter)
    ),
    STMT: $ => choice($.EXPR, $.nothing, $.EXPORT),
    STMT_delimiter: $ => repeat1(choice('⋄', ',', /\r?\n/)),
    EXPR: $ => choice($.subExpr, $.FuncExpr, $._m1Expr, $._m2Expr_),
    EXPORT: $ => seq(optional('TODO:$.LHS_ELT'), '⇐'),

    ANY: $ => choice($.atom, $.Func, $._mod1, $._mod2_),
    _mod2_: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol__c_),
      $.symbol__cl_,
      seq('(', $._m2Expr_, ')'),
      'TODO:$._blMod2_' 
    ),
    _mod1: $ =>  choice(
      seq(optional(seq($.atom, '.')), $.symbol__m), 
      $.symbol__ml,
      seq('(', $._m1Expr, ')'),
      'TODO:_blMod1'
    ),
    Func: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F),
      $.symbol_Fl,
      seq('(', $.FuncExpr, ')'),
      'TODO:blFunc'
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
        optional($.STMT_delimiter),
        optional(seq(repeat(seq($.EXPR, $.STMT_delimiter)), $.EXPR, optional($.STMT_delimiter))),
        '⟩'
      ),
      seq(
        '[',
        optional($.STMT_delimiter),
        seq(repeat(seq($.EXPR, $.STMT_delimiter)), $.EXPR, optional($.STMT_delimiter)),
        ']'
      ),
    ),
    subject: $ => choice($.atom, seq($.ANY, repeat1(seq('‿', $.ANY)))),

    ASGN: $ => choice('←', '⇐', '↩'),
    _m2Expr_: $ => choice($._mod2_, seq($.symbol__c_, $.ASGN, $._m2Expr_)),
    _m1Expr: $ => choice($._mod1, seq($.symbol__m, $.ASGN, $._m1Expr)),

    Derv: $ => choice(
      prec.left(0,$.Func),
      prec.left(1,seq($.Operand, $._mod1)),
      prec.left(2,seq($.Operand, $._mod2_, choice($.subject, $.Func)))
      // $.Func,
      // seq($.Operand, $._mod1),
      // seq($.Operand, $._mod2_, choice($.subject, $.Func))
    ),
    Operand: $ => choice(
      // $.subject, 
      // $.Derv
      prec.left(1, $.subject), 
      prec.left(2, $.Derv)
    ), 
    Fork: $ => choice(
      $.Derv,
      seq($.Derv, $.Operand, $.Derv, $.Fork),
      seq($.nothing, $.Operand, $.Derv, $.Fork)
    ),
    Train: $ => choice($.Fork, seq($.Derv, $.Fork)),
    FuncExpr: $ => choice($.Train, seq($.symbol_F, $.ASGN, $.FuncExpr)),

    arg: $ => choice(
      $.subject,
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)
    ),
    nothing: $ => choice(
      prec.right(1, '·'),
      // TODO: conflict generated here
      // prec.right(2, seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing))
    ),
    subExpr: $ => choice(
      $.arg,
      seq('TODO:$.lhs', $.ASGN, $.subExpr),
      seq('TODO:$.hls', $.Derv, optional($.subExpr))
    ),

    NAME: $     => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    LHS_SUB: $  => choice("·", 'TODO:$.lhsList', 'TODO:$.lhsArray', $.symbol_sl),
    LHS_ANY: $  => choice($.NAME, $.LHS_SUB, seq("(", $.LHS_ELT, ")")),
    LHS_ATOM: $ => choice($.LHS_ANY, seq("(", $.lhsStr, ")")),
    LHS_ELT: $  => choice($.LHS_ANY, $.lhsStr),
    LHS_ENTRY: $=> choice($.LHS_ELT, seq($.lhs, "⇐", $.NAME)),
    lhsStr: $   => seq($.LHS_ATOM, repeat1(seq("‿", $.LHS_ATOM))),
    lhsList: $  => seq(
      "⟨",
      optional($.STMT_delimiter),
      optional(seq(
        repeat(seq($.LHS_ENTRY, $.STMT_delimiter)),
        $.LHS_ENTRY,
        optional($.STMT_delimiter))
      ),
      "⟩"
    ),
    lhsArray: $  => seq(
      "[",
      optional($.STMT_delimiter),
      optional(seq(
        repeat(seq($.LHS_ELT, $.STMT_delimiter)),
        $.LHS_ELT,
        optional($.STMT_delimiter))
      ),
      "]"
    ),
    lhsComp: $  => choice($.LHS_SUB, $.lhsStr , seq("(", $.lhs, ")")),
    lhs: $      => choice($.symbol_s, $.lhsComp),

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
      '!'
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
    symbol_s: $ => token(/[a-z][A-Za-z0-9]*/),
    symbol_F: $ => token(/[A-Z][A-Za-z0-9]*/),
    symbol__m: $ => token(/_[A-Za-z][A-Za-z0-9]*/),
    symbol__c_: $ => token(/_[A-Za-z][A-Za-z0-9]*_/),
    comment: $ => token(seq('#', /.*/)),
  }
}); 
