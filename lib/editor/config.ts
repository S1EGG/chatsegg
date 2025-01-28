/**
 * Editor Configuration Module
 * 
 * This module contains the configuration and utility functions for the
 * ProseMirror-based rich text editor implementation.
 */
import { textblockTypeInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import type { Transaction } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import type { MutableRefObject } from 'react';

import { buildContentFromDocument } from './functions';

/**
 * Custom document schema that extends the basic ProseMirror schema
 * Adds support for list nodes while maintaining the basic document structure
 */
export const documentSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});

/**
 * Creates an input rule for heading markdown syntax
 * Converts markdown-style headings (e.g., # for h1) into proper heading nodes
 * 
 * @param level - The heading level (1-6)
 * @returns Input rule for the specified heading level
 */
export function headingRule(level: number) {
  return textblockTypeInputRule(
    new RegExp(`^(#{1,${level}})\\s$`),
    documentSchema.nodes.heading,
    () => ({ level }),
  );
}

/**
 * Handles editor transactions and content updates
 * This function is responsible for:
 * - Updating the editor state
 * - Saving content changes
 * - Managing debounced saves for performance
 * 
 * @param transaction - The ProseMirror transaction to handle
 * @param editorRef - Reference to the editor view
 * @param saveContent - Function to save the updated content
 */
export const handleTransaction = ({
  transaction,
  editorRef,
  saveContent,
}: {
  transaction: Transaction;
  editorRef: MutableRefObject<EditorView | null>;
  saveContent: (updatedContent: string, debounce: boolean) => void;
}) => {
  if (!editorRef || !editorRef.current) return;

  // Apply the transaction to get the new state
  const newState = editorRef.current.state.apply(transaction);
  editorRef.current.updateState(newState);

  // Handle content changes and saving
  if (transaction.docChanged && !transaction.getMeta('no-save')) {
    const updatedContent = buildContentFromDocument(newState.doc);

    // Determine whether to use debounced saving
    if (transaction.getMeta('no-debounce')) {
      saveContent(updatedContent, false);
    } else {
      saveContent(updatedContent, true);
    }
  }
};
