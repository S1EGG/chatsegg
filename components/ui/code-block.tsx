import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
}

export function CodeBlock({ language = 'typescript', code, className }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn('relative group rounded-md', className)}>
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 p-2 rounded-md bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
} 