# tree-sitter-bqn
'finally, a BQN highlighting for your favorite editor'

- [Specification BQN grammar](https://mlochbaum.github.io/BQN/spec/grammar.html)
- [tree-sitter](https://tree-sitter.github.io/tree-sitter/creating-parsers)
- [target schema](https://github.com/helix-editor/helix/blob/53f47bc47771c94dab51626ca025be28e62eba0c/runtime/themes/solarized_light.toml#L1-L23)
- [textobjects](https://docs.helix-editor.com/guides/textobject.html)

```
$ cat check.bqn
(((+))(((⌜))))((˜))((↕)10)
$ tree-sitter parse check.bqn
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

# way to release

1. Phase1: quite simplified -- basic expressions
2. Phase2: simplified -- statements
3. Phase3: shaping -- modifiers
4. Phase4: tedious -- untyped blocks
5. ___current phase___ : 'Quite tedious'

# A configuration for Helix
Hey, are you a [Helix](https://helix-editor.com/) user? Then try me:

1. add the following to your $CONFIG/helix/languages.toml

```toml
[[language]]
name = "bqn"
scope = "source.bqn"

[[grammar]]
name = "bqn"
source.git = "https://github.com/shnarazk/tree-sitter-bqn"
source.rev = "e7ebc1e9efb688c9fc5e7a061ed9bad3c15a2640" or something new
```

2. run on shell:

```
$ hx -g fetch
$ hx -g build
```

3. copy queries:

```
$ cp -r queries $HELIX/runtime/queries/bqn
```
