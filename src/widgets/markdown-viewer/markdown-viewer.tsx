import { marked } from 'marked';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  const html = marked(content);

  return <div style={{ padding: '1rem' }} dangerouslySetInnerHTML={{ __html: html }} />;
};
