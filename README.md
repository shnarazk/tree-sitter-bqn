# tree-sitter-bqn

- Specification [BQN grammar](https://mlochbaum.github.io/BQN/spec/grammar.html)
- [tree-sitter](https://tree-sitter.github.io/tree-sitter/creating-parsers)

# way to release

1. Phase1: quite simplified
2. (prensent phase) simplified
3. shaping
4. tedious
5. release (code name: 'Quite tedious')

## A configuration for Helix
Hey, are you a [Helix](https://helix-editor.com/) user? Then try me:

1. add the following to your $CONFIG/helix/languages.toml

```toml
[[language]]
name = "bqn"
scope = "source.bqn"

[[grammar]]
name = "bqn"
source.git = "https://github.com/shnarazk/tree-sitter-bqn"
source.rev = "9b17030cb785d1d7cc587c93631661bfa00e9fa6" or something new
```

2. run on shell:

```
$ hx -g fetch
$ hx -g build
```