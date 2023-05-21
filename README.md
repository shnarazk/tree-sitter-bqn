# tree-sitter-bqn

- Specification [BQN grammar](https://mlochbaum.github.io/BQN/spec/grammar.html)
- [tree-sitter](https://tree-sitter.github.io/tree-sitter/creating-parsers)
- [target scheme](https://github.com/helix-editor/helix/blob/53f47bc47771c94dab51626ca025be28e62eba0c/runtime/themes/solarized_light.toml#L1-L23)

# way to release

1. Phase1: quite simplified -- basic expressions
2. Phase2: simplified -- statements
3. Phase3: shaping -- modifiers
4. Phase4: tedious
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
