'use client';

import { useEffect } from 'react';

export default function TypographyProvider() {
    useEffect(() => {
        // Override typography tokens to match Storybook documentation exactly
        const style = document.createElement('style');
        style.innerHTML = `
            .frosted-ui {
                /* Font sizes (following Storybook guide) */
                --font-size-0: 10px;
                --font-size-1: 12px;
                --font-size-2: 14px;
                --font-size-3: 16px;
                --font-size-4: 18px;
                --font-size-5: 20px;
                --font-size-6: 24px;
                --font-size-7: 28px;
                --font-size-8: 35px;
                --font-size-9: 60px;

                /* Line heights (following Storybook guide) */
                --line-height-0: 16px;
                --line-height-1: 16px;
                --line-height-2: 20px;
                --line-height-3: 24px;
                --line-height-4: 26px;
                --line-height-5: 28px;
                --line-height-6: 30px;
                --line-height-7: 36px;
                --line-height-8: 40px;
                --line-height-9: 60px;

                /* Letter spacing (following Storybook guide) */
                --letter-spacing-0: 0.0025em;
                --letter-spacing-1: 0em;
                --letter-spacing-2: 0em;
                --letter-spacing-3: 0em;
                --letter-spacing-4: -0.0025em;
                --letter-spacing-5: -0.005em;
                --letter-spacing-6: -0.00625em;
                --letter-spacing-7: -0.0075em;
                --letter-spacing-8: -0.01em;
                --letter-spacing-9: -0.025em;

                /* Font weights (following Storybook guide - 4 weight scale) */
                --font-weight-light: 300;
                --font-weight-regular: 400;
                --font-weight-medium: 500;
                --font-weight-semi-bold: 500; /* Map semi-bold to medium per Storybook guide */
                --font-weight-bold: 700;
            }

            /* Update heading line heights to match Storybook guide */
            .frosted-ui {
                --heading-line-height-1: 16px;
                --heading-line-height-2: 20px;
                --heading-line-height-3: 24px;
                --heading-line-height-4: 26px;
                --heading-line-height-5: 28px;
                --heading-line-height-6: 30px;
                --heading-line-height-7: 36px;
                --heading-line-height-8: 40px;
                --heading-line-height-9: 60px;
            }
        `;
        document.head.appendChild(style);

        console.log('TypographyProvider: Storybook typography scale applied');
    }, []);

    return null;
}