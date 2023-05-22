;; Note: Helix uses the first match.
;; Probably coloring non-terminal nodes is not realistic because they are deeply
;; recursive. Categorizing them by the depth from the top node would be nice if
;; color themes provide good bg labels.

[(symbol_export) "⋄"] @keyword.directive
["‿" "⟨" "⟩"] @type
(ASGN) @tag

(comment) @comment
(character) @constant
(number) @number
(string) @string

[(specialname_s) "·" (symbol_s)] @attribute
[(specialname_F) (symbol_Fl) (symbol_F) (system_F)] @function
[(specialname__m) (symbol__ml) (symbol__m) (system__m)] @special
[(specialname__c_) (symbol__cl_) (symbol__c_) (system__c_)] @function.special

; [(Func (FuncExpr))] @function
; [(mod_1 (m1_Expr))] @special
; [(mod_2_ (m2_Expr_))] @function.special
