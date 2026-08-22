// ================================
// Format JavaScript
// ================================

function formatJS(js) {

    if (!js) {
        return "";
    }


    const tokens =
        tokenizeJS(js);


    let output = [];

    let line = "";

    let depth = 0;

    let noSpaceBeforeNext = false;

    let previousToken = null;


    function write(text) {

        line += text;

    }


    function flush() {

        const trimmed =
            line.trim();


        if (trimmed) {

            output.push(
                "    ".repeat(depth) +
                trimmed
            );

        }


        line = "";

    }


    function addSpace() {

        if (
            line.length &&
            !line.endsWith(" ")
        ) {

            write(" ");

        }

    }


    tokens.forEach((token, index) => {

        const type =
            token.type;

        const value =
            token.value;


        const nextToken =
            tokens[index + 1];


        // =========================
        // Comments
        // =========================

        if (
            type === "block-comment"
        ) {

            flush();

            const commentLines =
                value
                    .split("\n")
                    .map(
                        comment =>
                            "    ".repeat(depth) +
                            comment.trim()
                    );


            output.push(
                ...commentLines
            );

            previousToken = token;

            return;

        }


        if (
            type === "line-comment"
        ) {

            if (line.trim()) {

                addSpace();

            }

            write(
                value.trim()
            );

            flush();

            previousToken = token;

            return;

        }


        // =========================
        // Whitespace
        // =========================

        if (
            type === "whitespace"
        ) {

            /*
             * Do not blindly preserve whitespace.
             *
             * Only create a space when the
             * previous and next tokens are
             * things that normally need
             * separation.
             */

            if (
                !previousToken ||
                !nextToken ||
                noSpaceBeforeNext
            ) {

                return;

            }


            const previousType =
                previousToken.type;

            const nextType =
                nextToken.type;


            const previousValue =
                previousToken.value;

            const nextValue =
                nextToken.value;


            const previousNeedsSpace =
                previousType === "word" ||
                previousType === "number" ||
                previousType === "string" ||
                previousType === "template";


            const nextNeedsSpace =
                nextType === "word" ||
                nextType === "number" ||
                nextType === "string" ||
                nextType === "template";


            /*
             * word + whitespace + word
             *
             * const tabs
             * return value
             * if condition
             */

            if (
                previousNeedsSpace &&
                nextNeedsSpace
            ) {

                addSpace();

            }


            /*
             * Keywords before opening
             * parentheses:
             *
             * if (
             * while (
             * for (
             * switch (
             * catch (
             */

            if (
                previousType === "word" &&
                nextValue === "(" &&
                (
                    previousValue === "if" ||
                    previousValue === "for" ||
                    previousValue === "while" ||
                    previousValue === "switch" ||
                    previousValue === "catch" ||
                    previousValue === "with"
                )
            ) {

                addSpace();

            }


            previousToken = token;

            return;

        }


        // =========================
        // Opening brace
        // =========================

        if (
            value === "{"
        ) {

            addSpace();

            write("{");

            flush();

            depth++;

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Closing brace
        // =========================

        if (
            value === "}"
        ) {

            flush();

            depth =
                Math.max(
                    0,
                    depth - 1
                );


            output.push(
                "    ".repeat(depth) +
                "}"
            );

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Semicolon
        // =========================

        if (
            value === ";"
        ) {

            write(";");

            flush();

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Comma
        // =========================

        if (
            value === ","
        ) {

            write(",");

            addSpace();

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Unary operators
        // =========================

        if (
            value === "!" ||
            value === "~" ||
            value === "++" ||
            value === "--"
        ) {

            write(value);

            noSpaceBeforeNext = true;

            previousToken = token;

            return;

        }


        // =========================
        // Operators
        // =========================

        if (
            type === "operator"
        ) {

            /*
             * Optional chaining:
             *
             * object?.value
             */

            if (
                value === "?."
            ) {

                write(value);

                noSpaceBeforeNext = true;

                previousToken = token;

                return;

            }


            /*
             * Arrow function:
             *
             * value => {
             */

            if (
                value === "=>"
            ) {

                addSpace();

                write("=>");

                addSpace();

                noSpaceBeforeNext = false;

                previousToken = token;

                return;

            }


            /*
             * Normal binary / assignment
             * operators:
             *
             * = + - === && ||
             */

            addSpace();

            write(value);

            addSpace();

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Opening parenthesis
        // =========================

        if (
            value === "("
        ) {

            /*
             * Function calls:
             *
             * foo(
             *
             * Control statements:
             *
             * if (
             */

            if (
                previousToken &&
                previousToken.type === "word" &&
                (
                    previousToken.value === "if" ||
                    previousToken.value === "for" ||
                    previousToken.value === "while" ||
                    previousToken.value === "switch" ||
                    previousToken.value === "catch" ||
                    previousToken.value === "with"
                )
            ) {

                addSpace();

            }


            write("(");

            noSpaceBeforeNext = true;

            previousToken = token;

            return;

        }


        // =========================
        // Closing parenthesis
        // =========================

        if (
            value === ")"
        ) {

            line =
                line.trimEnd();

            write(")");

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Opening square bracket
        // =========================

        if (
            value === "["
        ) {

            write("[");

            noSpaceBeforeNext = true;

            previousToken = token;

            return;

        }


        // =========================
        // Closing square bracket
        // =========================

        if (
            value === "]"
        ) {

            line =
                line.trimEnd();

            write("]");

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Colon
        // =========================

        if (
            value === ":"
        ) {

            line =
                line.trimEnd();

            write(": ");

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Dot
        // =========================

        if (
            value === "."
        ) {

            line =
                line.trimEnd();

            write(".");

            noSpaceBeforeNext = true;

            previousToken = token;

            return;

        }


        // =========================
        // Question mark
        // =========================

        if (
            value === "?"
        ) {

            addSpace();

            write("?");

            addSpace();

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Strings
        // =========================

        if (
            type === "string" ||
            type === "template"
        ) {

            if (
                !noSpaceBeforeNext &&
                previousToken &&
                (
                    previousToken.type === "word" ||
                    previousToken.type === "number" ||
                    previousToken.type === "string" ||
                    previousToken.type === "template"
                )
            ) {

                addSpace();

            }


            write(value);

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Words / numbers
        // =========================

        if (
            type === "word" ||
            type === "number"
        ) {

            if (
                !noSpaceBeforeNext &&
                previousToken &&
                (
                    previousToken.type === "word" ||
                    previousToken.type === "number" ||
                    previousToken.type === "string" ||
                    previousToken.type === "template"
                )
            ) {

                addSpace();

            }


            write(value);

            noSpaceBeforeNext = false;

            previousToken = token;

            return;

        }


        // =========================
        // Other symbols
        // =========================

        write(value);

        noSpaceBeforeNext = false;

        previousToken = token;

    });


    flush();


    // ================================
    // Join closing callback syntax
    // ================================

    for (
        let i = 0;
        i < output.length - 1;
        i++
    ) {

        if (
            output[i].trim() === "}" &&
            output[i + 1].trim() === ");"
        ) {

            output[i] += ");";

            output.splice(
                i + 1,
                1
            );

        }

    }


    // ================================
    // Final cleanup
    // ================================

    return output

        .join("\n")

        .replace(
            /\n{3,}/g,
            "\n\n"
        )

        .trim();

}


// ================================
// JavaScript Tokenizer
// ================================

function tokenizeJS(js) {

    const tokens = [];

    let i = 0;


    while (
        i < js.length
    ) {

        const char =
            js[i];


        // =========================
        // Whitespace
        // =========================

        if (
            /\s/.test(char)
        ) {

            let value = "";

            while (
                i < js.length &&
                /\s/.test(js[i])
            ) {

                value += js[i];

                i++;

            }

            tokens.push({
                type: "whitespace",
                value
            });

            continue;

        }


        // =========================
        // Line comment
        // =========================

        if (
            char === "/" &&
            js[i + 1] === "/"
        ) {

            let value = "";

            while (
                i < js.length &&
                js[i] !== "\n"
            ) {

                value += js[i];

                i++;

            }

            tokens.push({
                type: "line-comment",
                value
            });

            continue;

        }


        // =========================
        // Block comment
        // =========================

        if (
            char === "/" &&
            js[i + 1] === "*"
        ) {

            let value =
                "/*";

            i += 2;


            while (
                i < js.length
            ) {

                if (
                    js[i] === "*" &&
                    js[i + 1] === "/"
                ) {

                    value += "*/";

                    i += 2;

                    break;

                }


                value += js[i];

                i++;

            }


            tokens.push({
                type: "block-comment",
                value
            });

            continue;

        }


        // =========================
        // Strings
        // =========================

        if (
            char === '"' ||
            char === "'"
        ) {

            const quote =
                char;

            let value =
                quote;

            i++;


            while (
                i < js.length
            ) {

                const current =
                    js[i];


                value += current;

                i++;


                if (
                    current === "\\" &&
                    i < js.length
                ) {

                    value += js[i];

                    i++;

                    continue;

                }


                if (
                    current === quote
                ) {

                    break;

                }

            }


            tokens.push({
                type: "string",
                value
            });

            continue;

        }


        // =========================
        // Template literals
        // =========================

        if (
            char === "`"
        ) {

            let value =
                "`";

            i++;


            while (
                i < js.length
            ) {

                const current =
                    js[i];


                value += current;

                i++;


                if (
                    current === "\\" &&
                    i < js.length
                ) {

                    value += js[i];

                    i++;

                    continue;

                }


                if (
                    current === "`"
                ) {

                    break;

                }

            }


            tokens.push({
                type: "template",
                value
            });

            continue;

        }


        // =========================
        // Words / identifiers
        // =========================

        if (
            /[A-Za-z_$]/.test(char)
        ) {

            let value = "";

            while (
                i < js.length &&
                /[A-Za-z0-9_$]/.test(js[i])
            ) {

                value += js[i];

                i++;

            }

            tokens.push({
                type: "word",
                value
            });

            continue;

        }


        // =========================
        // Numbers
        // =========================

        if (
            /[0-9]/.test(char)
        ) {

            let value = "";

            while (
                i < js.length &&
                /[0-9A-Za-z._]/.test(js[i])
            ) {

                value += js[i];

                i++;

            }

            tokens.push({
                type: "number",
                value
            });

            continue;

        }


        // =========================
        // Multi-character operators
        // =========================

        const operators = [

            "===",
            "!==",
            ">>>",
            "**=",
            "&&=",
            "||=",
            "??=",
            "=>",
            "==",
            "!=",
            "<=",
            ">=",
            "&&",
            "||",
            "??",
            "++",
            "--",
            "+=",
            "-=",
            "*=",
            "/=",
            "%=",
            "**",
            "?."
        ];


        const operator =
            operators.find(
                op =>
                    js.startsWith(
                        op,
                        i
                    )
            );


        if (operator) {

            tokens.push({
                type: "operator",
                value: operator
            });

            i += operator.length;

            continue;

        }


        // =========================
        // Single operators
        // =========================

        if (
            "+-*/%=<>!&|^~".includes(
                char
            )
        ) {

            tokens.push({
                type: "operator",
                value: char
            });

            i++;

            continue;

        }


        // =========================
        // Everything else
        // =========================

        tokens.push({
            type: "symbol",
            value: char
        });

        i++;

    }


    return tokens;

}



function generateJS() {

    const tabsJS =
        generateTabsJS();


    js = `
        ${tabsJS}
    `.trim();

    document.querySelector("#generated-js").textContent = formatJS(js);
}


