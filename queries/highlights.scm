;; Note: Helix uses the first match.
;; Probably coloring non-terminal nodes is not realistic because they are deeply
;; recursive. Categorizing them by the depth from the top node would be nice if
;; color themes provide good bg labels.

(symbol_export) @special
(ASGN) @tag
(system_value) @keyword
(symbol_sl) @constant.builtin
; (symbol_s) @constant
(symbol_Fl) @function.builtin
; (symbol_F) @function
(symbol__ml) @type.builtin
(symbol__m) @type
(symbol__cl_) @function.special
(symbol__c_) @function.special
(comment) @comment
(character) @constant
(number) @constant
(string) @string

"‿" @special
"⟨" @special
"⟩" @special
