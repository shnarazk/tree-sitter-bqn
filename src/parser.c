#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 21
#define LARGE_STATE_COUNT 4
#define SYMBOL_COUNT 20
#define ALIAS_COUNT 0
#define TOKEN_COUNT 13
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 4
#define PRODUCTION_ID_COUNT 1

enum {
  anon_sym_ = 1,
  anon_sym_COMMA = 2,
  anon_sym_LF = 3,
  anon_sym_CR = 4,
  aux_sym_stmt_delimiter_token1 = 5,
  sym_expr = 6,
  anon_sym_2 = 7,
  sym_nothing = 8,
  sym_symbol_s = 9,
  sym_symbol_F = 10,
  sym_symbol__m = 11,
  sym_symbol__c_ = 12,
  sym_source_file = 13,
  sym_stmt = 14,
  sym_stmt_delimiter = 15,
  sym_export = 16,
  sym_symbol = 17,
  aux_sym_source_file_repeat1 = 18,
  aux_sym_stmt_delimiter_repeat1 = 19,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_] = "⋄",
  [anon_sym_COMMA] = ",",
  [anon_sym_LF] = "\n",
  [anon_sym_CR] = "\r",
  [aux_sym_stmt_delimiter_token1] = "stmt_delimiter_token1",
  [sym_expr] = "expr",
  [anon_sym_2] = "⇐",
  [sym_nothing] = "nothing",
  [sym_symbol_s] = "symbol_s",
  [sym_symbol_F] = "symbol_F",
  [sym_symbol__m] = "symbol__m",
  [sym_symbol__c_] = "symbol__c_",
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
  [anon_sym_LF] = anon_sym_LF,
  [anon_sym_CR] = anon_sym_CR,
  [aux_sym_stmt_delimiter_token1] = aux_sym_stmt_delimiter_token1,
  [sym_expr] = sym_expr,
  [anon_sym_2] = anon_sym_2,
  [sym_nothing] = sym_nothing,
  [sym_symbol_s] = sym_symbol_s,
  [sym_symbol_F] = sym_symbol_F,
  [sym_symbol__m] = sym_symbol__m,
  [sym_symbol__c_] = sym_symbol__c_,
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
  [anon_sym_LF] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_CR] = {
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
      if (eof) ADVANCE(5);
      if (lookahead == '#') ADVANCE(1);
      if (lookahead == ',') ADVANCE(7);
      if (lookahead == '.') ADVANCE(11);
      if (lookahead == '_') ADVANCE(3);
      if (lookahead == 183) ADVANCE(13);
      if (lookahead == 8656) ADVANCE(12);
      if (lookahead == 8900) ADVANCE(6);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('A' <= lookahead && lookahead <= 'Z')) ADVANCE(15);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(14);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(2);
      if (lookahead != 0) ADVANCE(1);
      END_STATE();
    case 2:
      if (lookahead == '\r') ADVANCE(10);
      END_STATE();
    case 3:
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(16);
      END_STATE();
    case 4:
      if (eof) ADVANCE(5);
      if (lookahead == '\n') ADVANCE(8);
      if (lookahead == '\r') ADVANCE(9);
      if (lookahead == '#') ADVANCE(1);
      if (lookahead == ',') ADVANCE(7);
      if (lookahead == '.') ADVANCE(11);
      if (lookahead == '_') ADVANCE(3);
      if (lookahead == 183) ADVANCE(13);
      if (lookahead == 8900) ADVANCE(6);
      if (lookahead == '\t' ||
          lookahead == ' ') SKIP(4)
      if (('A' <= lookahead && lookahead <= 'Z')) ADVANCE(15);
      if (('a' <= lookahead && lookahead <= 'z')) ADVANCE(14);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(anon_sym_);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(anon_sym_LF);
      if (lookahead == '\n') ADVANCE(8);
      if (lookahead == '\r') ADVANCE(9);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(anon_sym_CR);
      if (lookahead == '\n') ADVANCE(8);
      if (lookahead == '\r') ADVANCE(9);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(aux_sym_stmt_delimiter_token1);
      if (lookahead == '\n') ADVANCE(2);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(sym_expr);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(anon_sym_2);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(sym_nothing);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym_symbol_s);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(14);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(sym_symbol_F);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(15);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(sym_symbol__m);
      if (lookahead == '_') ADVANCE(16);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(16);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 4},
  [2] = {.lex_state = 4},
  [3] = {.lex_state = 4},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 4},
  [9] = {.lex_state = 4},
  [10] = {.lex_state = 4},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 4},
  [14] = {.lex_state = 0},
  [15] = {.lex_state = 4},
  [16] = {.lex_state = 4},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(1),
    [sym_expr] = ACTIONS(1),
    [anon_sym_2] = ACTIONS(1),
    [sym_nothing] = ACTIONS(1),
    [sym_symbol_s] = ACTIONS(1),
    [sym_symbol_F] = ACTIONS(1),
    [sym_symbol__m] = ACTIONS(1),
    [sym_symbol__c_] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(19),
    [sym_stmt] = STATE(8),
    [sym_stmt_delimiter] = STATE(7),
    [sym_export] = STATE(15),
    [sym_symbol] = STATE(18),
    [aux_sym_source_file_repeat1] = STATE(4),
    [aux_sym_stmt_delimiter_repeat1] = STATE(3),
    [anon_sym_] = ACTIONS(3),
    [anon_sym_COMMA] = ACTIONS(3),
    [anon_sym_LF] = ACTIONS(3),
    [anon_sym_CR] = ACTIONS(3),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(3),
    [sym_expr] = ACTIONS(5),
    [sym_nothing] = ACTIONS(5),
    [sym_symbol_s] = ACTIONS(7),
    [sym_symbol_F] = ACTIONS(7),
    [sym_symbol__m] = ACTIONS(7),
    [sym_symbol__c_] = ACTIONS(7),
  },
  [2] = {
    [aux_sym_stmt_delimiter_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(9),
    [anon_sym_] = ACTIONS(11),
    [anon_sym_COMMA] = ACTIONS(11),
    [anon_sym_LF] = ACTIONS(11),
    [anon_sym_CR] = ACTIONS(11),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(11),
    [sym_expr] = ACTIONS(14),
    [sym_nothing] = ACTIONS(14),
    [sym_symbol_s] = ACTIONS(14),
    [sym_symbol_F] = ACTIONS(14),
    [sym_symbol__m] = ACTIONS(14),
    [sym_symbol__c_] = ACTIONS(14),
  },
  [3] = {
    [aux_sym_stmt_delimiter_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(16),
    [anon_sym_] = ACTIONS(18),
    [anon_sym_COMMA] = ACTIONS(18),
    [anon_sym_LF] = ACTIONS(18),
    [anon_sym_CR] = ACTIONS(18),
    [aux_sym_stmt_delimiter_token1] = ACTIONS(18),
    [sym_expr] = ACTIONS(20),
    [sym_nothing] = ACTIONS(20),
    [sym_symbol_s] = ACTIONS(20),
    [sym_symbol_F] = ACTIONS(20),
    [sym_symbol__m] = ACTIONS(20),
    [sym_symbol__c_] = ACTIONS(20),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 7,
    ACTIONS(7), 1,
      sym_symbol__c_,
    STATE(5), 1,
      aux_sym_source_file_repeat1,
    STATE(9), 1,
      sym_stmt,
    STATE(15), 1,
      sym_export,
    STATE(18), 1,
      sym_symbol,
    ACTIONS(22), 2,
      sym_expr,
      sym_nothing,
    ACTIONS(24), 3,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [25] = 7,
    ACTIONS(32), 1,
      sym_symbol__c_,
    STATE(5), 1,
      aux_sym_source_file_repeat1,
    STATE(13), 1,
      sym_stmt,
    STATE(15), 1,
      sym_export,
    STATE(18), 1,
      sym_symbol,
    ACTIONS(26), 2,
      sym_expr,
      sym_nothing,
    ACTIONS(29), 3,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [50] = 7,
    ACTIONS(7), 1,
      sym_symbol__c_,
    STATE(5), 1,
      aux_sym_source_file_repeat1,
    STATE(10), 1,
      sym_stmt,
    STATE(15), 1,
      sym_export,
    STATE(18), 1,
      sym_symbol,
    ACTIONS(22), 2,
      sym_expr,
      sym_nothing,
    ACTIONS(24), 3,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [75] = 7,
    ACTIONS(7), 1,
      sym_symbol__c_,
    STATE(6), 1,
      aux_sym_source_file_repeat1,
    STATE(9), 1,
      sym_stmt,
    STATE(15), 1,
      sym_export,
    STATE(18), 1,
      sym_symbol,
    ACTIONS(22), 2,
      sym_expr,
      sym_nothing,
    ACTIONS(24), 3,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [100] = 4,
    ACTIONS(35), 1,
      ts_builtin_sym_end,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(11), 1,
      sym_stmt_delimiter,
    ACTIONS(3), 5,
      anon_sym_,
      anon_sym_COMMA,
      anon_sym_LF,
      anon_sym_CR,
      aux_sym_stmt_delimiter_token1,
  [117] = 4,
    ACTIONS(37), 1,
      ts_builtin_sym_end,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(12), 1,
      sym_stmt_delimiter,
    ACTIONS(3), 5,
      anon_sym_,
      anon_sym_COMMA,
      anon_sym_LF,
      anon_sym_CR,
      aux_sym_stmt_delimiter_token1,
  [134] = 4,
    ACTIONS(39), 1,
      ts_builtin_sym_end,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(14), 1,
      sym_stmt_delimiter,
    ACTIONS(3), 5,
      anon_sym_,
      anon_sym_COMMA,
      anon_sym_LF,
      anon_sym_CR,
      aux_sym_stmt_delimiter_token1,
  [151] = 3,
    ACTIONS(37), 1,
      ts_builtin_sym_end,
    ACTIONS(43), 1,
      sym_symbol__c_,
    ACTIONS(41), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [165] = 3,
    ACTIONS(39), 1,
      ts_builtin_sym_end,
    ACTIONS(43), 1,
      sym_symbol__c_,
    ACTIONS(41), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [179] = 3,
    STATE(3), 1,
      aux_sym_stmt_delimiter_repeat1,
    STATE(17), 1,
      sym_stmt_delimiter,
    ACTIONS(3), 5,
      anon_sym_,
      anon_sym_COMMA,
      anon_sym_LF,
      anon_sym_CR,
      aux_sym_stmt_delimiter_token1,
  [193] = 3,
    ACTIONS(43), 1,
      sym_symbol__c_,
    ACTIONS(45), 1,
      ts_builtin_sym_end,
    ACTIONS(41), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [207] = 2,
    ACTIONS(47), 1,
      ts_builtin_sym_end,
    ACTIONS(49), 5,
      anon_sym_,
      anon_sym_COMMA,
      anon_sym_LF,
      anon_sym_CR,
      aux_sym_stmt_delimiter_token1,
  [218] = 2,
    ACTIONS(51), 1,
      ts_builtin_sym_end,
    ACTIONS(53), 5,
      anon_sym_,
      anon_sym_COMMA,
      anon_sym_LF,
      anon_sym_CR,
      aux_sym_stmt_delimiter_token1,
  [229] = 2,
    ACTIONS(43), 1,
      sym_symbol__c_,
    ACTIONS(41), 5,
      sym_expr,
      sym_nothing,
      sym_symbol_s,
      sym_symbol_F,
      sym_symbol__m,
  [240] = 1,
    ACTIONS(55), 1,
      anon_sym_2,
  [244] = 1,
    ACTIONS(57), 1,
      ts_builtin_sym_end,
  [248] = 1,
    ACTIONS(59), 1,
      anon_sym_2,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(4)] = 0,
  [SMALL_STATE(5)] = 25,
  [SMALL_STATE(6)] = 50,
  [SMALL_STATE(7)] = 75,
  [SMALL_STATE(8)] = 100,
  [SMALL_STATE(9)] = 117,
  [SMALL_STATE(10)] = 134,
  [SMALL_STATE(11)] = 151,
  [SMALL_STATE(12)] = 165,
  [SMALL_STATE(13)] = 179,
  [SMALL_STATE(14)] = 193,
  [SMALL_STATE(15)] = 207,
  [SMALL_STATE(16)] = 218,
  [SMALL_STATE(17)] = 229,
  [SMALL_STATE(18)] = 240,
  [SMALL_STATE(19)] = 244,
  [SMALL_STATE(20)] = 248,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = false}}, SHIFT(3),
  [5] = {.entry = {.count = 1, .reusable = false}}, SHIFT(15),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(20),
  [9] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2),
  [11] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2), SHIFT_REPEAT(2),
  [14] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_stmt_delimiter_repeat1, 2),
  [16] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_stmt_delimiter, 1),
  [18] = {.entry = {.count = 1, .reusable = false}}, SHIFT(2),
  [20] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_stmt_delimiter, 1),
  [22] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [24] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [26] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(15),
  [29] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(20),
  [32] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(20),
  [35] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [37] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 2),
  [39] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 3),
  [41] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [43] = {.entry = {.count = 1, .reusable = false}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [45] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 4),
  [47] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_stmt, 1),
  [49] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_stmt, 1),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_export, 2),
  [53] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_export, 2),
  [55] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [57] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [59] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_symbol, 1),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_BQN(void) {
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
