# tree-sitter-bqn

- Specification [BQN grammar](https://mlochbaum.github.io/BQN/spec/grammar.html)
- [tree-sitter](https://tree-sitter.github.io/tree-sitter/creating-parsers)

# way to release

1. (prensent status) quite simplified
2. simplified
3. shaping
4. tedious
5. release (code name: 'Quite tedious')

## A configuration for Helix
Hey, are you a [Helix](https://helix-editor.com/) user? Then try me:

1. add the following to your $CONFIG/helix/languages.toml

```toml
[[language]]
name = "bqn"
file-types = ["bqn"]
injection-regex = "bqn"
language-server = { command = "bqnlsp", language-id = "bqn" }
scope = "source.bqn"
roots = []
comment-token = "#"
indent = { tab-width = 2, unit = "  " }
shebangs = ["bqn", "cbqn"]

[[grammar]]
name = "bqn"
source.git = "https://github.com/shnarazk/tree-sitter-bqn"
source.rev = "20469f8dabf9c27270b1bb7ca25f2fa9beefbc54" # or something new
```

2. run on shell:

```
$ hx -g fetch
$ hx -g build
```