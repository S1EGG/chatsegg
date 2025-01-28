import { Children, isValidElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './ui/code-block';

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        pre({ children, ...props }) {
          const childNode = children && Children.toArray(children)[0];
          if (!isValidElement(childNode)) {
            return <pre {...props}>{children}</pre>;
          }

          const code = childNode.props.children || '';
          const className = childNode.props.className || '';
          const match = /language-(\w+)/.exec(className);
          const language = match ? match[1] : 'text';

          return (
            <CodeBlock
              language={language}
              code={typeof code === 'string' ? code : Array.isArray(code) ? code.join('') : ''}
              className="my-4"
            />
          );
        },
        code({ children, className, ...props }) {
          if (className?.includes('language-')) {
            return <>{children}</>;
          }
          return <code className="px-1.5 py-0.5 rounded-md bg-muted/50" {...props}>{children}</code>;
        },
        p({ children }) {
          return <p className="my-2">{children}</p>;
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
