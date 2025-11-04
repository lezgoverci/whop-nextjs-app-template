'use client';

import { useEffect } from 'react';

export default function FontProvider() {
    useEffect(() => {
        // Inject font styles AFTER frosted-ui styles load
        const style = document.createElement('style');
        style.innerHTML = `
            /* Use higher specificity with :where() to override frosted-ui fonts */
            :where(body.frosted-ui, .frosted-ui) {
                --default-font-family: var(--font-inter), Inter, sans-serif;
            }
            :where(.frosted-ui, .frosted-ui *) {
                font-family: var(--font-inter), Inter, sans-serif;
            }
            @supports (font-variation-settings: normal) {
                :where(body.frosted-ui, .frosted-ui) {
                    --default-font-family: var(--font-inter), InterVariable, sans-serif;
                }
                :where(.frosted-ui, .frosted-ui *) {
                    font-family: var(--font-inter), InterVariable, sans-serif;
                }
            }
        `;
        document.head.appendChild(style);

        console.log('FontProvider loaded');
    }, []);

    return null;
}