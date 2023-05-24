; Only select blocks as function definition
(block
  (CASE
    (HEAD)? @parameter.inside
    (BODY) @function.inside
  )
) @function.around

(subExpr
  (lhs)
  (ASGN (symbol_export))
  (subExpr) @class.around
)

; This selects a list surrounded by '⟨⟩' (or '[]' accidently)
(array) @test.around

(comment)+ @comment.around
(comment) @comment.inside
