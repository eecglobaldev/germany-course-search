/**
 * Text utility functions for rendering text with clickable links
 */

import React from 'react';

/**
 * Detects URLs in text and converts them to clickable links
 * Supports http://, https://, and www. patterns
 */
export function renderTextWithLinks(text: string): React.ReactNode[] {
  if (!text) return [];

  // URL regex pattern - matches http://, https://, and www. URLs
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Extract the URL
    let url = match[0];
    
    // Add protocol if it starts with www.
    if (url.startsWith('www.')) {
      url = 'https://' + url;
    }

    // Add the clickable link
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline break-all"
      >
        {match[0]}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // If no URLs were found, return the original text
  if (parts.length === 0) {
    return [text];
  }

  return parts;
}
