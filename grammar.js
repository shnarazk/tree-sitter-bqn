module.exports = grammar({
  name: 'bqn',

  extras: $ => [/\s/, $.comment],

  rules: {
    source_file: $ => seq(
      optional($.STMT_delimiter),
      repeat(seq($.STMT, $.STMT_delimiter)),
      $.STMT,
      optional($.STMT_delimiter)
    ),
    STMT: $ => choice($.EXPR, $.nothing, $.EXPORT),
    STMT_delimiter: $ => repeat1(choice('⋄', ',', /\r?\n/)),
    EXPR: $ => choice($.subExpr, 'TODO:FuncExpr', 'TODO:_m1Expr', 'TODO._m2Expr_'),
    EXPORT: $ => seq($.symbol, '⇐'),

    ANY: $ => choice($.atom, $.Func, $._mod1, $._mod2_),
    _mod2_: $ => choice(seq(optional(seq($.atom, '.')), $.symbol__c_), $.symbol__cl_) ,
    _mod1: $ =>  choice(seq(optional(seq($.atom, '.')), $.symbol__m), $.symbol__ml) ,
    Func: $ =>   choice(seq(optional(seq($.atom, '.')), $.symbol_F), $.symbol_Fl) ,
    atom: $ =>   choice(seq(optional(seq($.atom, '.')), $.symbol_s),$.symbol_sl) ,
    // atom: $ =>
    // array: $ =>
    subject: $ => choice($.atom, seq($.ANY, repeat1(seq('‿', $.ANY)))),

    Derv: $ => choice('Func', seq('TODO:Operand', $._mod1), seq('TODO:Operand', $._mod2_, choice($.subject, $.Func))),

    arg: $ => choice($.subject, seq(optional(choice($.subject, $.nothing)), $.Derv, $.subExpr)),
    nothing: $ => '·',
    subExpr: $ => choice($.arg),

    symbol: $ => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),

    symbol_sl: $ => choice('∞') ,
    symbol_Fl: $ => choice('⍋', '⊑') ,
    symbol__ml: $ => choice('˘', '´') ,
    symbol__cl_: $ => choice('⊸', '○') ,

    symbol_s: $ => /[a-z]\w*/,
    symbol_F: $ => /[A-Z]\w*/,
    symbol__m: $ => /_[A-Za-z]\w*/,
    symbol__c_: $ => /_[A-Za-z]\w*_/,
    comment: $ => token(seq('#', /.*/))
  }
});

