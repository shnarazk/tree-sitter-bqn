module.exports = grammar({
  name: 'bqn',

  extras: $ => [/[ \t]+/, $.comment, $._end_of_line],
  // word: $ => $.end_of_line,

  conflicts: $ => [],

  rules: {
    source_file: $ => seq(
      optional($.delimiter),
      repeat(seq($.STMT, $.delimiter)),
      $.STMT,
      optional($.delimiter),
    ),
    STMT: $ => choice($.EXPR, $.nothing),
    delimiter: $ => repeat1(choice('⋄', ',', $._end_of_line)),
    EXPR: $ => prec.left($.subExpr),
    ANY: $ => $.atom,
    Func: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_F),
      $.symbol_Fl,
      seq('(', $.FuncExpr, ')'),
    ),
    atom: $ => choice(
      seq(optional(seq($.atom, '.')), $.symbol_s),
      $.symbol_sl,
      seq('(', $.subExpr, ')'),
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
    subject: $ => choice( $.atom, seq($.ANY, repeat1(seq('‿', $.ANY))) ), 
    ASGN: $ => choice('←', '⇐', '↩'), 
    Derv: $ => $.Func,
    Operand: $ => prec.right(choice($.subject, $.Derv)),
    Fork: $ => prec.right(choice(
      $.Derv,
      seq($.Operand, $.Derv, $.Fork),
      seq($.nothing, $.Derv, $.Fork)
    )),
    Train: $ => prec.right(choice($.Fork, seq($.Derv, $.Fork))),
    FuncExpr: $ => $.Train,

    arg: $ => choice(
      $.subject,
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)
    ),
    nothing: $ => prec.right(choice(
      '·',
      seq(optional(choice($.subject, $.nothing)), $.Derv, $.nothing)
    )),
    subExpr: $ => $.arg,

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
    symbol_F: $ => /[A-Z][A-Za-z0-9]*/,
    symbol__m: $ => /_[A-Za-z][A-Za-z0-9]*/,
    symbol__c_: $ => /_[A-Za-z][A-Za-z0-9]*_/,
    comment: $ => /#.*/,
    _end_of_line: $ => token(/\r?\n/),
  }
});
