["?" ";" ":" "⋄"] @keyword.directive
["‿" "⟨" "⟩"] @type
(ASGN) @tag

(comment) @comment
(character) @constant
(number) @number
(string) @string

[(specialname_s) "·" "𝕨" "𝕩" "𝕣"] @type.builtin
["·" (symbol_s)] @attribute
[(specialname_F) "𝔽" "𝔾" (symbol_Fl) (symbol_F) (system_F)] @function
[(specialname__m) (symbol__ml) (symbol__m) (system__m)] @special
[(specialname__c_) (symbol__cl_) (symbol__c_) (system__c_)] @function.special

; [(Func (FuncExpr))] @function
; [(mod_1 (m1_Expr))] @special
; [(mod_2_ (m2_Expr_))] @function.special
