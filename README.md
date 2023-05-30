# tree-sitter-bqn
Structual editing and highlighting [BQN](https://mlochbaum.github.io/BQN) programs with editors powered by [tree-sitter](https://tree-sitter.github.io/)

![](https://user-images.githubusercontent.com/997855/241345573-dd2ed350-d7e7-4c7b-8709-7fa9290eba47.png)

## Implementation memo

- A simplified grammar

This `tree-sitter-bqn` provides a parser for a simplified BQN grammar, in which blocks (`subExpr`, `FuncExpr`, `_m1Expr` and `_m2_Expr`) are unified as a typeless `block` type.
So you get the following from `{⋆}{𝔾𝔽¨𝕩}+{𝔽´}{↕10}`:

```
(source_file [0, 0] - [1, 0]
  (STMT [0, 0] - [0, 15]
    (EXPR [0, 0] - [0, 15]
      (subExpr [0, 0] - [0, 15]
        (arg [0, 0] - [0, 15]
          (subject [0, 0] - [0, 3]
            (atom [0, 0] - [0, 3]
              (block [0, 0] - [0, 3]
                (CASE_end [0, 1] - [0, 2]
                  (BODY [0, 1] - [0, 2]
                    (STMT [0, 1] - [0, 2]
                      (EXPR [0, 1] - [0, 2]
                        (FuncExpr [0, 1] - [0, 2]
                          (Train [0, 1] - [0, 2]
                            (Fork [0, 1] - [0, 2]
                              (Derv [0, 1] - [0, 2]
                                (Func [0, 1] - [0, 2]
                                  (symbol_Fl [0, 1] - [0, 2])))))))))))))
          (Derv [0, 3] - [0, 11]
            (Func [0, 3] - [0, 11]
              (block [0, 3] - [0, 11]
                (CASE_end [0, 4] - [0, 10]
                  (BODY [0, 4] - [0, 10]
                    (STMT [0, 4] - [0, 10]
                      (EXPR [0, 4] - [0, 10]
                        (FuncExpr [0, 4] - [0, 10]
                          (Train [0, 4] - [0, 10]
                            (Fork [0, 4] - [0, 10]
                              (Derv [0, 4] - [0, 10]
                                (Operand [0, 4] - [0, 8]
                                  (Derv [0, 4] - [0, 8]
                                    (Func [0, 4] - [0, 8]
                                      (specialname_F [0, 4] - [0, 8]))))
                                (mod_1 [0, 8] - [0, 10]
                                  (symbol__ml [0, 8] - [0, 10])))))))))))))
          (subExpr [0, 11] - [0, 15]
            (arg [0, 11] - [0, 15]
              (subject [0, 11] - [0, 15]
                (atom [0, 11] - [0, 15]
                  (block [0, 11] - [0, 15]
                    (CASE_end [0, 12] - [0, 14]
                      (BODY [0, 12] - [0, 14]
                        (STMT [0, 12] - [0, 14]
                          (EXPR [0, 12] - [0, 14]
                            (subExpr [0, 12] - [0, 14]
                              (arg [0, 12] - [0, 14]
                                (subject [0, 12] - [0, 14]
                                  (atom [0, 12] - [0, 14]
                                    (symbol_sl [0, 12] - [0, 14]
                                      (number [0, 12] - [0, 14])))))))))))))))))))
```

- This is a CFG but not LR(1)

`(((+))(((⌜))))((˜))((↕)10)` gives

```
(source_file [0, 0] - [0, 31]
  (STMT [0, 0] - [0, 31]
    (EXPR [0, 0] - [0, 31]
      (subExpr [0, 0] - [0, 31]
        (arg [0, 0] - [0, 31]
          (Derv [0, 0] - [0, 22]
            (Operand [0, 0] - [0, 16]
              (Derv [0, 0] - [0, 16]
                (Func [0, 0] - [0, 16]
                  (FuncExpr [0, 1] - [0, 15]
                    (Train [0, 1] - [0, 15]
                      (Fork [0, 1] - [0, 15]
                        (Derv [0, 1] - [0, 15]
                          (Operand [0, 1] - [0, 6]
                            (Derv [0, 1] - [0, 6]
                              (Func [0, 1] - [0, 6]
                                (FuncExpr [0, 2] - [0, 5]
                                  (Train [0, 2] - [0, 5]
                                    (Fork [0, 2] - [0, 5]
                                      (Derv [0, 2] - [0, 5]
                                        (Func [0, 2] - [0, 5]
                                          (FuncExpr [0, 3] - [0, 4]
                                            (Train [0, 3] - [0, 4]
                                              (Fork [0, 3] - [0, 4]
                                                (Derv [0, 3] - [0, 4]
                                                  (Func [0, 3] - [0, 4]
                                                    (symbol_Fl [0, 3] - [0, 4]))))))))))))))
                          (mod_1 [0, 6] - [0, 15]
                            (m1_Expr [0, 7] - [0, 14]
                              (mod_1 [0, 7] - [0, 14]
                                (m1_Expr [0, 8] - [0, 13]
                                  (mod_1 [0, 8] - [0, 13]
                                    (m1_Expr [0, 9] - [0, 12]
                                      (mod_1 [0, 9] - [0, 12]
                                        (symbol__ml [0, 9] - [0, 12])))))))))))))))
            (mod_1 [0, 16] - [0, 22]
              (m1_Expr [0, 17] - [0, 21]
                (mod_1 [0, 17] - [0, 21]
                  (m1_Expr [0, 18] - [0, 20]
                    (mod_1 [0, 18] - [0, 20]
                      (symbol__ml [0, 18] - [0, 20])))))))
          (subExpr [0, 22] - [0, 31]
            (arg [0, 22] - [0, 31]
              (subject [0, 22] - [0, 31]
                (atom [0, 22] - [0, 31]
                  (subExpr [0, 23] - [0, 30]
                    (arg [0, 23] - [0, 30]
                      (Derv [0, 23] - [0, 28]
                        (Func [0, 23] - [0, 28]
                          (FuncExpr [0, 24] - [0, 27]
                            (Train [0, 24] - [0, 27]
                              (Fork [0, 24] - [0, 27]
                                (Derv [0, 24] - [0, 27]
                                  (Func [0, 24] - [0, 27]
                                    (symbol_Fl [0, 24] - [0, 27]))))))))
                      (subExpr [0, 28] - [0, 30]
                        (arg [0, 28] - [0, 30]
                          (subject [0, 28] - [0, 30]
                            (atom [0, 28] - [0, 30]
                              (symbol_sl [0, 28] - [0, 30]
                                (number [0, 28] - [0, 30])))))))))))))))))
```

## References

- [Specification BQN grammar](https://mlochbaum.github.io/BQN/spec/grammar.html)
- [tree-sitter tutorial](https://tree-sitter.github.io/tree-sitter/creating-parsers)
- [target color schema](https://github.com/helix-editor/helix/blob/53f47bc47771c94dab51626ca025be28e62eba0c/runtime/themes/solarized_light.toml#L1-L23)
- [textobjects](https://docs.helix-editor.com/guides/textobject.html)

# A configuration for Helix

Are you a [Helix](https://helix-editor.com/) user? Then try:

1. Add the following to your $CONFIG/helix/languages.toml (Note: this does not include settings for bqnlsp. Please check [the wiki](https://github.com/helix-editor/helix/wiki/How-to-install-the-default-language-servers#bqn) about it.)

```toml
[[language]]
name = "bqn"
language-id = "bqn"
file-types = ["bqn"]
injection-regex = "bqn"
scope = "source.bqn"
roots = []
comment-token = "#"
indent = { tab-width = 2, unit = "  " }
shebangs = ["BQN", "CBQN", "bqn", "cbqn"]

[[grammar]]
name = "bqn"
source.git = "https://github.com/shnarazk/tree-sitter-bqn"
source.rev = "a56f2d20ee42d39afe67730eeb13c2f41e1b0877" or something new

[language.auto-pairs]
'(' = ')'
'{' = '}'
'[' = ']'
"'" = "'"
'"' = '"'
'⟨' = '⟩'
```

2. Build up on shell:

```
$ hx -g fetch
$ hx -g build
```

3. Copy query files:

```
$ mkdir -p $HELIX/runtime/queries/bqn
$ cp -r queries $HELIX/runtime/queries/bqn
```

Now you can:
- expand/shrink selection by moving up/down AST
- indent after `:`, `?`, `{`, `⟨` and so on
- outdent at `}`, `⟩`, `;` and so on
- traverse function blocks by `]f` and `[f`
- traverse function headers by `]a` and `[a`
- traverse namespaces by `]t` and `[t`
- traverse comments by `]c` and `[c`
