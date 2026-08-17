// ================================
// Generate Global CSS
// ================================

function generateGlobalCSS() {

    return `

        /* Typography */

        --font-family:
            ${globalSettings.typography.fontFamily};


        --font-size-base:
            ${globalSettings.typography.base.size};

        --font-weight-base:
            ${globalSettings.typography.base.weight};

        --line-height-base:
            ${globalSettings.typography.base.lineHeight};


        --font-size-subtext:
            ${globalSettings.typography.subtext.size};

        --font-weight-subtext:
            ${globalSettings.typography.subtext.weight};

        --line-height-subtext:
            ${globalSettings.typography.subtext.lineHeight};


        --font-size-h1:
            ${globalSettings.typography.headings.h1.size};

        --font-weight-h1:
            ${globalSettings.typography.headings.h1.weight};

        --line-height-h1:
            ${globalSettings.typography.headings.h1.lineHeight};


        --font-size-h2:
            ${globalSettings.typography.headings.h2.size};

        --font-weight-h2:
            ${globalSettings.typography.headings.h2.weight};

        --line-height-h2:
            ${globalSettings.typography.headings.h2.lineHeight};


        --font-size-h3:
            ${globalSettings.typography.headings.h3.size};

        --font-weight-h3:
            ${globalSettings.typography.headings.h3.weight};

        --line-height-h3:
            ${globalSettings.typography.headings.h3.lineHeight};


        --font-size-h4:
            ${globalSettings.typography.headings.h4.size};

        --font-weight-h4:
            ${globalSettings.typography.headings.h4.weight};

        --line-height-h4:
            ${globalSettings.typography.headings.h4.lineHeight};


        --font-size-h5:
            ${globalSettings.typography.headings.h5.size};

        --font-weight-h5:
            ${globalSettings.typography.headings.h5.weight};

        --line-height-h5:
            ${globalSettings.typography.headings.h5.lineHeight};


        /* Radius */

        --radius-sm:
            ${globalSettings.radius.sm};

        --radius-md:
            ${globalSettings.radius.md};

        --radius-lg:
            ${globalSettings.radius.lg};


        /* Spacing */

        --space-xs:
            ${globalSettings.spacing.xs};

        --space-sm:
            ${globalSettings.spacing.sm};

        --space-md:
            ${globalSettings.spacing.md};

        --space-lg:
            ${globalSettings.spacing.lg};

        --space-xl:
            ${globalSettings.spacing.xl};

        --space-xxl:
            ${globalSettings.spacing.xxl};

    `;
}