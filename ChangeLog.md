# Changelog and Loadmap

### Release 0.2.3

-(highlight) change some token categories
  - '@' is `@character` (was `@constant.builtin`)
  - `character` is `@character`(was `@constant.character`)
  - `number` is `@numeric` (was `@constant.numeric`)
  - `𝕊` in `HEAD` is `@function`
  - `⇐` in `EXPORT` is `@keyword.directive`

### Release 0.2.2

- (highlight) render modifiers as `@special`

### Release 0.2.1
- (grammar) categorize `@` as a character

### Release 0.2.0

- (query) better textobjects and auto indents

### Release 0.1.0

- provide misc queries

### Prereleases

1. Phase1: quite simplified -- basic expressions
2. Phase2: simplified -- statements
3. Phase3: shaping -- modifiers
4. Phase4: tedious -- untyped blocks
5. Phase5: 'Quite tedious' -- fix errors, give up a better grammar

