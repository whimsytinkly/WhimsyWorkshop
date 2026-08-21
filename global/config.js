// Global configuration

// ================================
// Font Configuration
// ================================

const fontList = {
    system: {
        label: "System UI",
        value:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },

    sansSerif: [
        {
            label: "Arial",
            value: "Arial, Helvetica, sans-serif"
        },
        {
            label: "Helvetica",
            value: "Helvetica, Arial, sans-serif"
        },
        {
            label: "Verdana",
            value: "Verdana, Geneva, sans-serif"
        },
        {
            label: "Trebuchet MS",
            value: '"Trebuchet MS", Arial, sans-serif'
        }
    ],

    serif: [
        {
            label: "Georgia",
            value: 'Georgia, "Times New Roman", serif'
        },
        {
            label: "Times New Roman",
            value: '"Times New Roman", Times, serif'
        },
        {
            label: "Garamond",
            value: 'Garamond, "Times New Roman", serif'
        }
    ],

    monospace: [
        {
            label: "Courier New",
            value: '"Courier New", Courier, monospace'
        },
        {
            label: "Consolas",
            value: 'Consolas, "Courier New", monospace'
        }
    ]
};


// ================================
// Global Settings
// ================================

const globalSettings = {

    typography: {

        fontFamily:
            fontList.system.value,

        base: {
            size: "16px",
            weight: "400",
            lineHeight: "1.5"
        },

        subtext: {
            size: "14px",
            weight: "400",
            lineHeight: "1.5"
        },

        headings: {

            h1: {
                size: "32px",
                weight: "700",
                lineHeight: "1.2"
            },

            h2: {
                size: "24px",
                weight: "700",
                lineHeight: "1.25"
            },

            h3: {
                size: "20px",
                weight: "700",
                lineHeight: "1.3"
            },

            h4: {
                size: "18px",
                weight: "700",
                lineHeight: "1.35"
            },

            h5: {
                size: "16px",
                weight: "700",
                lineHeight: "1.4"
            }
        }
    },

    // Global radius
    radius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px"
    },

    spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px"
    }
};

const sizeLabels = {
    none: "None",
    xs: "Extra Small",
    sm: "Small",
    md: "Medium",
    lg: "Large",
    xl: "Extra Large",
    xxl: "Extra Extra Large"
};

const globalSections = [
    {
        id: "typography",
        label: "Typography",
        type: "typography"
    },
    {
        id: "radius",
        label: "Radius",
        type: "fields"
    },
    {
        id: "spacing",
        label: "Spacing",
        type: "fields"
    }
];