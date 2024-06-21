package tree_sitter_bqn_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-bqn"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_bqn.Language())
	if language == nil {
		t.Errorf("Error loading Bqn grammar")
	}
}
