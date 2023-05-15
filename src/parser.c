#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 21
#define LARGE_STATE_COUNT 8
#define SYMBOL_COUNT 19
#define ALIAS_COUNT 0
#define TOKEN_COUNT 12
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 4
#define PRODUCTION_ID_COUNT 1

enum {
  anon_sym_ = 1,
  anon_sym_COMMA = 2,
  aux_sym_stmt_delimiter_token1 = 3,
  sym_expr = 4,
  anon_sym_2 = 5,
  sym_nothing = 6,
  sym_symbol_s = 7,
  sym_symbol_F = 8,
  sym_symbol__m = 9,
  sym_symbol__c_ = 10,
  sym_comment = 11,
  sym_source_file = 12,
  sym_stmt = 13,
  sym_stmt_delimiter = 14,
  sym_export = 15,
  sym_symbol = 16,
  aux_sym_source_file_repeat1 = 17,
  aux_sym_stmt_delimiter_repeat1 = 18,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_] = "⋄",
  [anon_sym_COMMA] = ",",
  [aux_sym_stmt_delimiter_token1] = "stmt_delimiter_token1",
  [sym_expr] = "expr",
  [anon_sym_2] = "⇐",
  [sym_nothing] = "nothing",
  [sym_symbol_s] = "symbol_s",
  [sym_symbol_F] = "symbol_F",
  [sym_symbol__m] = "symbol__m",
  [sym_symbol__c_] = "symbol__c_",
  [sym_comment] = "comment",
  [sym_source_file] = "source_file",
  [sym_stmt] = "stmt",
  [sym_stmt_delimiter] = "stmt_delimiter",
  [sym_export] = "export",
  [sym_symbol] = "symbol",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_stmt_delimiter_repeat1] = "stmt_delimiter_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_] = anon_sym_,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [aux_sym_stmt_delimiter_token1] = aux_sym_stmt_delimiter_token1,
  [sym_expr] = sym_expr,
  [anon_sym_2] = anon_sym_2,
  [sym_nothing] = sym_nothing,
  [sym_symbol_s] = sym_symbol_s,
  [sym_symbol_F] = sym_symbol_F,
  [sym_symbol__m] = sym_symbol__m,
  [sym_symbol__c_] = sym_symbol__c_,
  [sym_comment] = sym_comment,
  [sym_source_file] = sym_source_file,
  [sym_stmt] = sym_stmt,
  [sym_stmt_delimiter] = sym_stmt_delimiter,
  [sym_export] = sym_export,
  [sym_symbol] = sym_symbol,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_stmt_delimiter_repeat1] = aux_sym_stmt_delimiter_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_stmt_delimiter_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_expr] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_2] = {
    .visible = true,
    .named = false,
  },
  [sym_nothing] = {
    .visible = true,
    .named = true,
  },
  [sym_symbol_s] = {
    .visible = true,
    .named = true,
  },
  [sym_symbol_F] = {
    .visible = true,
    .named = true,
  },
  [sym_symbol__m] = {
    .visible = true,
    .named = true,
  },
  [sym_symbol__c_] = {
    .visible = true,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_stmt] = {
    .visible = true,
    .named = true,
  },
  [sym_stmt_delimiter] = {
    .visible = true,
    .named = true,
  },
  [sym_export] = {
    .visible = true,
    .named = true,
  },
  [sym_symbol] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_stmt_delimiter_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(4);
      if (lookahead == '#') ADVANCE(14);
      if (lookahead == ',') ADVANCE(6);
      if (lookahead == '.') ADVANCE(8);
      if (lookahead == '_') ADVANCE(2);
      if (lookahead == 183) ADVANCE(10);
      if (lookahead == 8656) ADVANCE(9);
      if (lookahead == 8900) ADVANCE(5);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('A' <= lookahead && lookahead <= 'Z')) ADVANCE(12);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(11);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(7);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == '#') ADVANCE(14);
      if (lookahead == ',') ADVANCE(6);
      if (lookahead == '.') ADVANCE(8);
      if (lookahead == '_') ADVANCE(2);
      if (lookahead == 183) ADVANCE(10);
      if (lookahead == 8900) ADVANCE(5);
      if (lookahead == '\t' ||
          lookahead == ' ') SKIP(1)
      if (('A' <= lookahead && lookahead <= 'Z')) ADVANCE(12);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(11);
      END_STATE();
    case 2:
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(13);
      END_STATE();
    case 3:
      if (eof) ADVANCE(4);
      if (lookahead == '\n') ADVANCE(7);
      if (lookahead == '\r') ADVANCE(1);
      if (lookahead == '#') ADVANCE(14);
      if (lookahead == ',') ADVANCE(6);
      if (lookahead == '.') ADVANCE(8);
      if (lookahead == '_') ADVANCE(2);
      if (lookahead == 183) ADVANCE(10);
      if (lookahead == 8900) ADVANCE(5);
      if (lookahead == '\t' ||
          lookahead == ' ') SKIP(3)
      if (('A' <= lookahead && lookahead <= 'Z')) ADVANCE(12);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(11);
      END_STATE();
    case 4:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(anon_sym_);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(aux_sym_stmt_delimiter_token1);
      if (lookahead == '\n') ADVANCE(7);
      if (lookahead == '\r') ADVANCE(1);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(sym_expr);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(anon_sym_2);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(sym_nothing);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(sym_symbol_s);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(11);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(sym_symbol_F);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(12);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(sym_symbol__m);
      if (lookahead == '_') ADVANCE(13);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(13);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(14);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 3},
  [2] = {.lex_state = 3},
  [3] = {.lex_state = 3},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 3},
  [12] = {.lex_state = 3},
  [13] = {.lex_state = 3},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 3},
  [16] = {.lex_state = 3},
  [17] = {.lex_state = 3},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [sym_expr] = ACTIONS(1),
    [anon_sym_2] = ACTIONS(1),
    [sym_nothing] = ACTIONS(1),
    [sym_symbol_s] = ACTIONS(1),
    [sym_symbol_F] = ACTIONS(1),
    [sym_symbol__m] = ACTIONS(1),
    [sym_symbol__c_] = ACTIONS(1),
    [sym_comment] = ACTIONS(3),
  },
  [1] = {
    [sym_source_file] = STATE(19),
    [sym_stmt] = STATE(12),
    [sym_stmt_delimiter] = STATE(7),
    [sym_export] = STATE(16),
    [sym_symbol] = STATE(18),
    [aux_sym_source_file_repeat1] = STATE(4),
    [aux_sym_stmt_delimiter_repeat1] = STATE(3),
    [anon_sym_] = ACTIONS(5),
    [anon_sym_COMMA] = ACTIONS(5),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(7),
    [sym_expr] = ACTIONS(9),
    [sym_nothing] = ACTIONS(9),
    [sym_symbol_s] = ACTIONS(11),
    [sym_symbol_F] = ACTIONS(11),
    [sym_symbol__m] = ACTIONS(11),
    [sym_symbol__c_] = ACTIONS(11),
    [sym_comment] = ACTIONS(13),
  },
  [2] = {
    [aux_sym_stmt_delimiter_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(15),
    [anon_sym_] = ACTIONS(17),
    [anon_sym_COMMA] = ACTIONS(17),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(20),
    [sym_expr] = ACTIONS(23),
    [sym_nothing] = ACTIONS(23),
    [sym_symbol_s] = ACTIONS(23),
    [sym_symbol_F] = ACTIONS(23),
    [sym_symbol__m] = ACTIONS(23),
    [sym_symbol__c_] = ACTIONS(23),
    [sym_comment] = ACTIONS(13),
  },
  [3] = {
    [aux_sym_stmt_delimiter_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(25),
    [anon_sym_] = ACTIONS(27),
    [anon_sym_COMMA] = ACTIONS(27),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(29),
    [sym_expr] = ACTIONS(31),
    [sym_nothing] = ACTIONS(31),
    [sym_symbol_s] = ACTIONS(31),
    [sym_symbol_F] = ACTIONS(31),
    [sym_symbol__m] = ACTIONS(31),
    [sym_symbol__c_] = ACTIONS(31),
    [sym_comment] = ACTIONS(13),
  },
  [4] = {
    [sym_stmt] = STATE(11),
    [sym_export] = STATE(16),
    [sym_symbol] = STATE(18),
    [aux_sym_source_file_repeat1] = STATE(5),
    [sym_expr] = ACTIONS(33),
    [sym_nothing] = ACTIONS(33),
    [sym_symbol_s] = ACTIONS(35),
    [sym_symbol_F] = ACTIONS(35),
    [sym_symbol__m] = ACTIONS(35),
    [sym_symbol__c_] = ACTIONS(11),
    [sym_comment] = ACTIONS(3),
  },
  [5] = {
    [sym_stmt] = STATE(15),
    [sym_export] = STATE(16),
    [sym_symbol] = STATE(18),
    [aux_sym_source_file_repeat1] = STATE(5),
    [sym_expr] = ACTIONS(37),
    [sym_nothing] = ACTIONS(37),
    [sym_symbol_s] = ACTIONS(40),
    [sym_symbol_F] = ACTIONS(40),
    [sym_symbol__m] = ACTIONS(40),
    [sym_symbol__c_] = ACTIONS(43),
    [sym_comment] = ACTIONS(3),
  },
  [6] = {
    [sym_stmt] = STATE(13),
    [sym_export] = STATE(16),
    [sym_symbol] = STATE(18),
    [aux_sym_source_file_repeat1] = STATE(5),
    [sym_expr] = ACTIONS(33),
    [sym_nothing] = ACTIONS(33),
    [sym_symbol_s] = ACTIONS(35),
    [sym_symbol_F] = ACTIONS(35),
    [sym_symbol__m] = ACTIONS(35),
    [sym_symbol__c_] = ACTIONS(11),
    [sym_comment] = ACTIONS(3),
  },
  [7] = {
    [sym_stmt] = STATE(11),
    [sym_export] = STATE(16),
    [sym_symbol] = STATE(18),
    [aux_sym_source_file_repeat1] = STATE(6),
    [sym_expr] = ACTIONS(33),
    [sym_nothing] = ACTIONS(33),
    [sym_symbol_s] = ACTIONS(35),
    [sym_symbol_F] = ACTIONS(35),
    [sym_symbol__m] = ACTIONS(35),
    [sym_symbol__c_] = ACTIONS(11),
    [sym_comment] = ACTIONS(3),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(46), 1,
      ts_builtin_sym_end,
    ACTIONS(50), 1,
      sym_symbol__c_,
    ACTIONS(48), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [17] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(50), 1,
      sym_symbol__c_,
    ACTIONS(52), 1,
      ts_builtin_sym_end,
    ACTIONS(48), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [34] = 4,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(50), 1,
      sym_symbol__c_,
    ACTIONS(54), 1,
      ts_builtin_sym_end,
    ACTIONS(48), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [51] = 6,
    ACTIONS(7), 1,
      aux_sym_stmt_delimiter_token1,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(46), 1,
      ts_builtin_sym_end,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(9), 1,
      sym_stmt_delimiter,
    ACTIONS(5), 2,
      anon_sym_,
      anon_sym_COMMA,
  [71] = 6,
    ACTIONS(7), 1,
      aux_sym_stmt_delimiter_token1,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(56), 1,
      ts_builtin_sym_end,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(8), 1,
      sym_stmt_delimiter,
    ACTIONS(5), 2,
      anon_sym_,
      anon_sym_COMMA,
  [91] = 6,
    ACTIONS(7), 1,
      aux_sym_stmt_delimiter_token1,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(52), 1,
      ts_builtin_sym_end,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(10), 1,
      sym_stmt_delimiter,
    ACTIONS(5), 2,
      anon_sym_,
      anon_sym_COMMA,
  [111] = 3,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(50), 1,
      sym_symbol__c_,
    ACTIONS(48), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [125] = 5,
    ACTIONS(7), 1,
      aux_sym_stmt_delimiter_token1,
    ACTIONS(13), 1,
      sym_comment,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(14), 1,
      sym_stmt_delimiter,
    ACTIONS(5), 2,
      anon_sym_,
      anon_sym_COMMA,
  [142] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(58), 2,
      ts_builtin_sym_end,
      aux_sym_stmt_delimiter_token1,
    ACTIONS(60), 2,
      anon_sym_,
      anon_sym_COMMA,
  [154] = 3,
    ACTIONS(13), 1,
      sym_comment,
    ACTIONS(62), 2,
      ts_builtin_sym_end,
      aux_sym_stmt_delimiter_token1,
    ACTIONS(64), 2,
      anon_sym_,
      anon_sym_COMMA,
  [166] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(66), 1,
      anon_sym_2,
  [173] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(68), 1,
      ts_builtin_sym_end,
  [180] = 2,
    ACTIONS(3), 1,
      sym_comment,
    ACTIONS(70), 1,
      anon_sym_2,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(8)] = 0,
  [SMALL_STATE(9)] = 17,
  [SMALL_STATE(10)] = 34,
  [SMALL_STATE(11)] = 51,
  [SMALL_STATE(12)] = 71,
  [SMALL_STATE(13)] = 91,
  [SMALL_STATE(14)] = 111,
  [SMALL_STATE(15)] = 125,
  [SMALL_STATE(16)] = 142,
  [SMALL_STATE(17)] = 154,
  [SMALL_STATE(18)] = 166,
  [SMALL_STATE(19)] = 173,
  [SMALL_STATE(20)] = 180,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(3),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [9] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT_EXTRA(),
  [15] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2),
  [17] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2), SHIFT_REPEAT(2),
  [20] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2), SHIFT_REPEAT(2),
  [23] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2),
  [25] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_stmt_delimiter, 1),
  [27] = {.entry = {.count = 1, .reusable = false}}, SHIFT(2),
  [29] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [31] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_stmt_delimiter, 1),
  [33] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [35] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [37] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(16),
  [40] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(20),
  [43] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(20),
  [46] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 2),
  [48] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [50] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [52] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 3),
  [54] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 4),
  [56] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [58] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_stmt, 1),
  [60] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_stmt, 1),
  [62] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_export, 2),
  [64] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_export, 2),
  [66] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [68] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [70] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_symbol, 1),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_bqn(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
