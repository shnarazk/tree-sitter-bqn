;; Note: Helix uses the first match.
;; Probably coloring non-terminal nodes is not realistic because they are deeply
;; recursive. Categorizing them by the depth from the top node would be nice if
;; color themes provide good bg labels.

(symbol_export) @special
(ASGN) @tag

[(system_F) (system__m) (system__c_)] @keyword

[(specialname_s) (symbol_sl)] @constant.builtin
; (symbol_s) @constant

[(specialname_F) (symbol_Fl)] @function.builtin
(symbol_F) @function

[(specialname__m) (symbol__ml)] @type.builtin
(symbol__m) @type

[(specialname__c_) (symbol__cl_)] @function.special
(symbol__c_) @function.special

(comment) @comment
(character) @constant
(number) @constant
(string) @string

"‿" @special
"⟨" @special
"⟩" @special

(Func (FuncExpr)) @function
(mod_1 (m1_Expr)) @type
(mod_2_ (m2_Expr_)) @function
