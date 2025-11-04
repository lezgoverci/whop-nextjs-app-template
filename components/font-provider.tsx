'use client';

import { useEffect } from 'react';

export default function FontProvider() {
    useEffect(() => {
        // Inject font styles to match Storybook documentation guide
        const style = document.createElement('style');
        style.innerHTML = `
            /* Override font families to match Storybook guide */
            .frosted-ui {
                --default-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI (Custom)', Roboto, 'Helvetica Neue', 'Open Sans (Custom)', system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
                --heading-font-family: var(--default-font-family);
                --strong-font-family: var(--default-font-family);
                --em-font-family: 'Times New Roman', 'Times', serif;
                --quote-font-family: 'Times New Roman', 'Times', serif;
                --code-font-family: 'Menlo', 'Consolas (Custom)', 'Bitstream Vera Sans Mono', monospace, 'Apple Color Emoji', 'Segoe UI Emoji';
            }
        `;
        document.head.appendChild(style);

        console.log('FontProvider: Storybook font families applied');
    }, []);

    return null;
}