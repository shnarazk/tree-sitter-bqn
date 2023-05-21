; Only select defintions as blocks
(block
  (CASE
    (HEAD) @parameter.inside
    (BODY) @function.inside
  )
) @function.around

; Only select defintions as blocks
(block
  (CASE
    (BODY) @function.inside
  )
) @function.around

(subExpr
  (lhs)
  (ASGN (symbol_export))
  (subExpr) @class.around
)

(comment)+ @comment.around
(comment) @comment.inside
