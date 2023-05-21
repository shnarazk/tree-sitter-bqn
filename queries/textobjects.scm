(block
  (CASE
    (HEAD) @parameter.inside
    (BODY) @function.inside
  )
) @function.around

(comment) @comment.inside
(comment)+ @comment.around
(atom) @atom.around
(Func) @Func.around
(Derv) @Derv.around
(subExpr) @EXPR.around
(FuncExpr) @EXPR.around
(EXPR) @EXPR.around
(STMT) @STMT.around

