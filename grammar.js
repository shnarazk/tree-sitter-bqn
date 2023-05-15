module.exports = grammar({
  name: 'BQN',

  rules: {
    source_file: $ => seq(
      optional($.stmt_delimiter),
      repeat(seq($.stmt, $.stmt_delimiter)),
      $.stmt,
      optional($.stmt_delimiter)
    ),
    stmt: $ => choice($.expr, $.nothing, $.export),
    stmt_delimiter: $ => repeat1(choice('⋄', ',', '\n', '\r', /#[^\n]*(\n\r)+/)),
    expr: $ => '.',
    export: $ => seq($.symbol, '⇐'),
    nothing: $ => '·',
    symbol: $ => choice($.symbol_s, $.symbol_F, $.symbol__m, $.symbol__c_),
    symbol_s: $ => /[a-z]\w*/,
    symbol_F: $ => /[A-Z]\w*/,
    symbol__m: $ => /_[A-Za-z]\w*/,
    symbol__c_: $ => /_[A-Za-z]\w*_/,
  }
});
 