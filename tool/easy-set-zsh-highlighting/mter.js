/*
 * @encode: utf-8
 * @Date: 2026-01-01 12:59:21
 * @LastEditTime: 2026-01-02 22:35:40
 * @FilePath: /easy-set-zsh-highlighting/source/mter.js
 */

const color_options_dict = {
    "command": "普通命令名",
    "unknown-token": "错误命令或者语法",
    "alias": "普通别名",
    "builtin": "内置命令(pwd, shift)",
    "reserved-word": "保留词(if, for)",
    "path": "已存在的文件名",
    "single-hyphen-option": "单短横选项(-o)",
    "double-hyphen-option": "双短横选项(--option)",
    "redirection": "重定向符号(>, <)",
    "comment": "注释(例如 echo # foo)",
    "commandseparator": "命令分隔符(;, &&)",
    "precommand": "命令前修饰符(noglob, builtin)",
    "function": "函数名",
    // "hashed-command": "Zsh hash table的命令(不可用,详细见help.html)(不可用)",
    "globbing": "通配符表达式(*.txt)",
    "reg-http-url": "以http或者https开头的url",
    "autodirectory": "AUTO_CD 开启时命令位置的目录名",
    // "process-substitution": "进程替换(<(echo foo))(不可用)",
    "process-substitution-delimiter": "进程替换分隔符(<( 和 ))",
    "arithmetic-expansion": "算术展开($((42)))",
    "history-expansion": "历史命令展开(!foo, ^foo^bar)",
    // "command-substitution": "命令替换($(echo foo))(不可用)",
    // "command-substitution-unquoted": "未加引号的命令替换(不可用)",
    // "command-substitution-quoted": "加引号的命令替换(\"$(echo foo)\")(不可用)",
    "command-substitution-delimiter": "命令替换分隔符($( 和 ))",
    // "command-substitution-delimiter-unquoted": "未加引号的命令替换分隔符",
    "command-substitution-delimiter-quoted": "加双引号的命令替换分隔符(\"$( 和 )\")",
    // "back-quoted-argument": "反引号命令替换(`foo`)(不可用)",
    // "back-quoted-argument-unclosed": "未闭合反引号命令替换(`foo)(不可用)",
    "back-quoted-argument-delimiter": "反引号分隔符(`)",
    "single-quoted-argument": "单引号参数('foo')",
    "single-quoted-argument-unclosed": "未闭合单引号参数('foo)",
    "double-quoted-argument": "双引号参数(\"foo\")",
    "double-quoted-argument-unclosed": "未闭合双引号参数(\"foo)",
    "dollar-quoted-argument": "$'foo' 类型参数",
    "dollar-quoted-argument-unclosed": "未闭合 $'foo' 参数",
    // "rc-quote": "单引号中两个连续单引号('foo''bar')(不可用)",
    "dollar-double-quoted-argument": "双引号中的参数展开($foo)",
    "back-double-quoted-argument": "双引号中反斜杠转义(\"foo\\\"bar\")",
    "back-dollar-quoted-argument": "$'...' 中反斜杠转义($'\\x48')",
    "assign": "参数赋值(x=foo 或 x=(1 2 3))",
    "named-fd": "命名文件描述符({fd} in echo foo {fd}>&2)",
    "numeric-fd": "数字文件描述符(2 in echo foo {fd}>&2)",
    "suffix-alias": "后缀别名",
    "global-alias": "全局别名",
    // "arg0": "除命令、函数、别名、内置命令外的命令字(不可用)",
    "default": "其他未分类内容"
};

const other_options_dict = {
    "bold": "加粗",
    "standout": "醒目",
    "underline": "下划线",
    "italic": "斜体",
    "blink": "闪烁"
}

var now_syles = {
    "unknown-token": { "color": "#fe1024", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "reserved-word": { "color": "#cdd6f4", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "reg-http-url": { "color": "#336d88", "bold": false, "standout": false, "underline": true, "italic": false, "blink": false },
    "alias": { "color": "#89b4fa", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "suffix-alias": { "color": "#f9e2af", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "global-alias": { "color": "#f9e2af", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "builtin": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "function": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "command": { "color": "#a6e3a1", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "precommand": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "commandseparator": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "hashed-command": { "color": "#89b4fa", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "autodirectory": { "color": "#f9e2af", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "path": { "color": "#a6e3a1", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "path_pathseparator": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "path_prefix": { "color": "#a6e3a1", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "path_prefix_pathseparator": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "globbing": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "history-expansion": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "command-substitution": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "command-substitution-unquoted": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "command-substitution-quoted": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "command-substitution-delimiter": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "command-substitution-delimiter-unquoted": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "command-substitution-delimiter-quoted": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "process-substitution": { "color": "#f9e2af", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "process-substitution-delimiter": { "color": "#f9e2af", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "arithmetic-expansion": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "single-hyphen-option": { "color": "#cdd6f4", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "double-hyphen-option": { "color": "#cdd6f4", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "back-quoted-argument": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "back-quoted-argument-unclosed": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "back-quoted-argument-delimiter": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "single-quoted-argument": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "single-quoted-argument-unclosed": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "double-quoted-argument": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "double-quoted-argument-unclosed": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "dollar-quoted-argument": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "dollar-quoted-argument-unclosed": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "rc-quote": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "dollar-double-quoted-argument": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "back-double-quoted-argument": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "back-dollar-quoted-argument": { "color": "#fab387", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "assign": { "color": "#89b4fa", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "redirection": { "color": "#f38ba8", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "comment": { "color": "#585b70", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "named-fd": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "numeric-fd": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    // "arg0": { "color": "#f5c2e7", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false },
    "default": { "color": "#585b70", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false }
};

function getCurrentFunctionName() {
    const stack = new Error().stack;
    if (!stack) return undefined;

    // 栈格式示例（Chrome/Edge）：
    // Error
    //    at myFunction (file.js:10:5)
    //    at <anonymous>:1:1
    const lines = stack.split("\n");

    if (lines.length < 3) return undefined; // 栈太短，无法获取

    // 第2行通常是当前函数信息
    const match = lines[2].match(/at (\S+)/);
    if (match && match[1]) {
        return match[1];
    }
    return undefined;
}


function zsh_Style_To_Html(zshStyle) {
    if (!zshStyle) return '';

    const styles = zshStyle.split(',');
    const htmlStyles = [];

    for (let s of styles) {
        s = s.trim();
        if (s.startsWith('fg=')) {
            htmlStyles.push(`color:${s.slice(3)};`);
        } else if (s == 'bold') {
            htmlStyles.push('font-weight:bold');
        } else if (s == 'underline') {
            htmlStyles.push('text-decoration:underline');
        } else if (s == 'reverse') {
            // 反转颜色：可选实现
            htmlStyles.push('filter:invert(100%)');
        } else if (s == 'blink') {
            htmlStyles.push('text-decoration:blink'); // 注意：大部分浏览器不支持
        } else if (s == 'standout') {
            htmlStyles.push('font-weight:bold'); // 近似效果
        } else if (s == 'italic') {
            htmlStyles.push('font-style:italic');
        }
    }
    return htmlStyles.join(';') + ';';
}

function zsh_Style_To_dict(zshStyle) {
    if (!zshStyle) return '';

    const styles = zshStyle.split(',');
    let dict_tyles = { "color": "#ffffff", "bold": false, "standout": false, "underline": false, "italic": false, "blink": false };

    for (let s of styles) {
        s = s.trim();
        if (s.startsWith('fg=')) {
            dict_tyles["color"] = s.slice(3);
        } else if (s in other_options_dict) {
            dict_tyles[s] = true;
        }
    }
    return dict_tyles;
}

function dict_style_to_zsh(dict_style) {
    let zsh_styles = []
    traverse_dict(dict_style, (target_dict, key) => {
        if (key == 'color') { zsh_styles.push(`fg=${target_dict[key]}`) }
        else if (key in other_options_dict && target_dict[key]) {
            zsh_styles.push(key)
        }
    })
    return zsh_styles.join(',')
}

function html_style_to_zsh(html_style) {
    if (!html_style) return '';

    const styles = html_style.split(';')
    let zsh_styles = []

    for (let s of styles) {
        s = s.trim()

        if (s.startsWith("color:")) {
            zsh_styles.push(`fg=${s.slice(6)}`)
        } else if (s.startsWith("background-color:")) {
            zsh_styles.push(`bg=${s.slice(17)}`)
        } else if (s == "font-weight:bold") {
            zsh_styles.push("bold")
        } else if (s == "text-decoration:underline") {
            zsh_styles.push("underline")
        } else if (s == "filter:invert(100%)") {
            zsh_styles.push("reverse")
        } else if (s == "text-decoration:blink") {
            zsh_styles.push("blink")
        } else if (s == "font-style:italic") {
            zsh_styles.push(italic)
        }
    }

    return zsh_styles.join(',')
}

function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const H = String(date.getHours()).padStart(2, '0');
    const M = String(date.getMinutes()).padStart(2, '0');
    const S = String(date.getSeconds()).padStart(2, '0');
    return `${y}.${m}.${d}.${H}.${M}.${S}`;
}

function save_zsh_file() {

    let zsh_sy_list = [
        "ZSH_HIGHLIGHT_HIGHLIGHTERS=(main cursor regexp)",
        "typeset -gA ZSH_HIGHLIGHT_STYLES"
    ]

    for (let key in now_syles) {
        if (now_syles.hasOwnProperty(key) && !key.startsWith("reg-")) {
            zsh_sy_list.push(`ZSH_HIGHLIGHT_STYLES[${key}]='${dict_style_to_zsh(now_syles[key])}'`)
        }
    }

    zsh_sy_list.push("\ntypeset -A ZSH_HIGHLIGHT_REGEXP")

    for (let key in now_syles) {
        if (now_syles.hasOwnProperty(key) && key.startsWith("reg-")) {
            if (key == "reg-http-url") {
                zsh_sy_list.push(`ZSH_HIGHLIGHT_REGEXP+=('http\S*' ${dict_style_to_zsh(now_syles[key])})`)
            }
        }
    }

    let zsh_file_text = zsh_sy_list.join('\n')

    const blob = new Blob([zsh_file_text], { type: "text/plain" });

    // 创建一个下载链接
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `zsh_highlighting.${formatDate(new Date())}.zsh`;
    document.body.appendChild(a);
    a.click(); // 自动点击下载
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

function print_html_terminal(terminal, target_text) {
    const p = document.createElement('p');
    p.innerHTML = target_text;
    p.style.margin = "0"; // 去掉段落默认间距
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight; // 自动滚动到底部
}

function traverse_dict(target_dict, func) {
    for (let key in target_dict) {
        if (target_dict.hasOwnProperty(key)) {
            func(target_dict, key)
        }
    }
}

function dict_to_html_style(target_dict) {
    let out_html_style = []
    traverse_dict(target_dict, (target_dict, key) => {
        if (target_dict[key]) {
            if (key == "color") { out_html_style.push(`color:${target_dict[key]}`) }
            else if (key == "bold") { out_html_style.push("font-weight:bold") }
            else if (key == "standout") { out_html_style.push("font-weight:bold") }
            else if (key == "underline") { out_html_style.push("text-decoration:underline") }
            else if (key == "italic") { out_html_style.push("font-style: italic;") }
            else if (key == "blink") { out_html_style.push("text-decoration:blink") }
            else { console.warn(`in func ${getCurrentFunctionName()}: noknown style ${key}`) }
        }
    })
    return out_html_style.join(';') + ';'
}


function get_style_html_line(text, target_style) {
    return `<span style="${dict_to_html_style(target_style)}">${text}</span>`;
}

function update_terminal() {
    const terminal = document.getElementById('terminal');
    terminal.innerText = ""; // 清空终端

    // 普通命令 文件路径
    print_html_terminal(terminal, `$: ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("$HOME", now_syles["default"])} ${get_style_html_line(";", now_syles["commandseparator"])} ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("o.txt", now_syles["path"])}`);
    // 错误命令 + URL
    print_html_terminal(terminal, `$: ${get_style_html_line("curllll", now_syles["unknown-token"])} ${get_style_html_line("http://www.bing.com", now_syles["reg-http-url"])}`);
    // 别名
    print_html_terminal(terminal, `$: ${get_style_html_line("alias", now_syles["command"])}  ${get_style_html_line("la=", now_syles["default"])}${get_style_html_line("'ls -A'", now_syles["single-quoted-argument"])}`);
    print_html_terminal(terminal, `$: ${get_style_html_line("la", now_syles["alias"])}`);
    // 后缀别名
    print_html_terminal(terminal, `$: ${get_style_html_line("alias", now_syles["command"])} ${get_style_html_line("-s", now_syles["single-hyphen-option"])} ${get_style_html_line("txt=less", now_syles["default"])}`);
    print_html_terminal(terminal, `$: ${get_style_html_line("a.txt", now_syles["suffix-alias"])}`);
    // 内置命令
    print_html_terminal(terminal, `$: ${get_style_html_line("pwd", now_syles["builtin"])} ${get_style_html_line(";", now_syles["commandseparator"])} ${get_style_html_line("ps", now_syles["command"])} ${get_style_html_line("aux", now_syles["default"])} ${get_style_html_line("G", now_syles["global-alias"])} ${get_style_html_line("root", now_syles["default"])}`);
    // 保留字
    print_html_terminal(terminal, `$: ${get_style_html_line("for", now_syles["reserved-word"])} ${get_style_html_line("i in 1 2 3", now_syles["default"])}${get_style_html_line(";", now_syles["commandseparator"])} ${get_style_html_line("do", now_syles["reserved-word"])} ${get_style_html_line("echo", now_syles["builtin"])} ${get_style_html_line("$i", now_syles["default"])}${get_style_html_line(";", now_syles["commandseparator"])} ${get_style_html_line("done", now_syles["reserved-word"])}`);
    // 单短横选项 双短横选项
    print_html_terminal(terminal, `$: ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("-l", now_syles["single-hyphen-option"])} ${get_style_html_line(";", now_syles["commandseparator"])} ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("--reverse", now_syles["double-hyphen-option"])}`);
    // 命令前修饰符
    print_html_terminal(terminal, `$: ${get_style_html_line("noglob", now_syles["precommand"])} ${get_style_html_line("echo", now_syles["command"])} ${get_style_html_line("*.txt", now_syles["default"])}`);
    // 函数名
    print_html_terminal(terminal, `$: ${get_style_html_line("my_func", now_syles["function"])} ${get_style_html_line("arg1 arg2", now_syles["default"])}`);
    // 参数赋值 命名文件描述符
    print_html_terminal(terminal, `$: ${get_style_html_line("x=", now_syles["assign"])}${get_style_html_line("41", now_syles["default"])} ${get_style_html_line(";", now_syles["commandseparator"])} ${get_style_html_line("exec", now_syles["command"])}${get_style_html_line("{out}", now_syles["named-fd"])}${get_style_html_line(">&", now_syles["redirection"])}${get_style_html_line("1", now_syles["numeric-fd"])}`);
    // 命令替换
    print_html_terminal(terminal, `$: ${get_style_html_line("echo", now_syles["builtin"])} ${get_style_html_line("$(", now_syles["command-substitution-delimiter"])}${get_style_html_line("date", now_syles["command"])}${get_style_html_line(")", now_syles["command-substitution-delimiter"])} ${get_style_html_line('"', now_syles["double-quoted-argument"])}${get_style_html_line("$(", now_syles["command-substitution-delimiter-quoted"])}${get_style_html_line("date", now_syles["command"])}${get_style_html_line(")", now_syles["command-substitution-delimiter-quoted"])}${get_style_html_line('"', now_syles["double-quoted-argument"])} ${get_style_html_line('$\'', now_syles["dollar-quoted-argument"])}${get_style_html_line('\\x48\\x65\\x6C\\x6C\\x6F', now_syles["back-dollar-quoted-argument"])}${get_style_html_line('\'', now_syles["dollar-quoted-argument"])}`);
    // 单引号、双引号
    print_html_terminal(terminal, `$: ${get_style_html_line("echo", now_syles["builtin"])} ${get_style_html_line("'single quoted'", now_syles["single-quoted-argument"])} ${get_style_html_line('"double quoted"', now_syles["double-quoted-argument"])} ${get_style_html_line('"', now_syles["double-quoted-argument"])}${get_style_html_line('\\\\', now_syles["back-double-quoted-argument"])}${get_style_html_line('"', now_syles["double-quoted-argument"])} ${get_style_html_line('""Hello', now_syles["double-quoted-argument"])}${get_style_html_line('$USER', now_syles["dollar-double-quoted-argument"])}${get_style_html_line('"', now_syles["double-quoted-argument"])}`);
    print_html_terminal(terminal, `$: ${get_style_html_line("echo", now_syles["builtin"])} ${get_style_html_line("'single quoted unclosed", now_syles["single-quoted-argument-unclosed"])}`);
    print_html_terminal(terminal, `$: ${get_style_html_line("echo", now_syles["builtin"])} ${get_style_html_line('"double quoted unclosed', now_syles["double-quoted-argument-unclosed"])}`);
    // 重定向
    print_html_terminal(terminal, `$: ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line(">", now_syles["redirection"])} ${get_style_html_line("out.txt", now_syles["default"])}`);
    // 注释
    print_html_terminal(terminal, `$: ${get_style_html_line("echo", now_syles["builtin"])} ${get_style_html_line("hello", now_syles["default"])} ${get_style_html_line("# this is a comment", now_syles["comment"])}`);
    // 历史命令展开
    print_html_terminal(terminal, `$: ${get_style_html_line("!!", now_syles["history-expansion"])}`);
    // 通配符
    print_html_terminal(terminal, `$: ${get_style_html_line("*", now_syles["globbing"])}${get_style_html_line(".txt", now_syles["default"])}`);
    // 进程替换
    print_html_terminal(terminal, `$: ${get_style_html_line("diff", now_syles["command"])}  ${get_style_html_line("<(", now_syles["process-substitution-delimiter"])} ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("dir1", now_syles["default"])}${get_style_html_line(") <(", now_syles["process-substitution-delimiter"])}${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("dir2", now_syles["default"])}${get_style_html_line(")", now_syles["process-substitution-delimiter"])}`);
    // AUTO_CD
    print_html_terminal(terminal, `$: ${get_style_html_line("..", now_syles["autodirectory"])}`);
    // 算术展开
    print_html_terminal(terminal, `$: ${get_style_html_line("$((42))", now_syles["arithmetic-expansion"])}`);
    // 未加引号的命令替换
    print_html_terminal(terminal, `$: ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line("$(", now_syles["command-substitution-delimiter"])}${get_style_html_line("echo", now_syles["command"])} ${get_style_html_line(".", now_syles["default"])}${get_style_html_line(")", now_syles["command-substitution-delimiter"])} ${get_style_html_line("`", now_syles["back-quoted-argument-delimiter"])}${get_style_html_line("echo", now_syles["command"])} ${get_style_html_line("-l", now_syles["single-hyphen-option"])}${get_style_html_line("`", now_syles["back-quoted-argument-delimiter"])}`);
    // 加引号的命令替换
    print_html_terminal(terminal, `$: ${get_style_html_line("ls", now_syles["command"])} ${get_style_html_line('$\'foo\'', now_syles["dollar-quoted-argument"])} ${get_style_html_line('$\'foo', now_syles["dollar-quoted-argument-unclosed"])}`);
}


function add_color_options() {
    const color_options = document.getElementById('color_options');

    for (let key in color_options_dict) {
        if (color_options_dict.hasOwnProperty(key)) {
            // 创建
            let d = document.createElement("div")
            let d_other_options = document.createElement("div")
            let d_other_options_labels = document.createElement("div")
            let p = document.createElement("p")
            let i_color = document.createElement("input")
            let a = document.createElement("span")
            // 添加属性
            d.setAttribute('name', 'color_options_node');
            p.setAttribute('name', 'color_options_node_p');
            i_color.setAttribute('name', 'color_options_node_input_color');
            d_other_options.setAttribute("class", "other_options")
            a.className = "arrow"
            d_other_options_labels.className = "other_options_labels"
            p.innerText = color_options_dict[key]
            i_color.className = key
            i_color.type = "color"
            i_color.value = now_syles[key]["color"]
            a.innerText = "➤"
            // 处理关系
            d.appendChild(p)
            d.appendChild(i_color)
            d_other_options.appendChild(a)
            d_other_options.appendChild(d_other_options_labels)
            d.appendChild(d_other_options)
            color_options.appendChild(d)

            // 其他字体的选项 使用for快速添加
            for (let key2 in other_options_dict) {
                if (other_options_dict.hasOwnProperty(key2)) {
                    let l = document.createElement("label");
                    l.innerHTML = `${other_options_dict[key2]}<input type=\"checkbox\" class=\"${key}\" name=\"${key2}\" >`
                    d_other_options_labels.appendChild(l)
                }
            }
        }
    }
}


function set_m_option(key, target_dict) {
    const container = document.getElementById("color_options");
    const inputs = container.querySelectorAll("input");

    for (const input of inputs) {
        if (input.className == key) {
            if (input.name == "color_options_node_input_color") {
                input.value = target_dict["color"]
                return;
            } else if (input.name in other_options_dict) {
                input.value = target_dict[input.name]
                return;
            }
        }
    }
    console.warn(`in func ${getCurrentFunctionName()}: inputs does not have key ${key}`);
}


function start_listener_all_input() {
    // 不包括文件输入
    const container = document.getElementById("color_options");
    const inputs = container.querySelectorAll("input");

    for (let input of inputs) {
        if (input.name == "color_options_node_input_color") {
            input.addEventListener('input', () => {
                if (now_syles.hasOwnProperty(input.className)) {
                    now_syles[input.className]["color"] = now_syles[input.className]["color"].replace(/#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?/, input.value);
                } else {
                    console.warn(`in func ${getCurrentFunctionName()}: now_syles does not have key ${input.id}`);
                }
                update_terminal()
            })
        } else if (input.name in other_options_dict) {
            input.addEventListener('change', () => {
                now_syles[input.className][input.name] = input.checked
                update_terminal()
            })
        } else if (input.id == "zsh-file") { continue; }
        else {
            console.warn(`in func ${getCurrentFunctionName()}: noknown input id=${input.id} name=${input.name}`)
        }
    }
}

function apply_option_dict_to_input() {
    traverse_dict(now_syles, (target_dict, key) => {
        set_m_option(key, target_dict[key])
    });
}

function start_listen_f() {
    const input_file = document.getElementById('zsh-file')
    input_file.addEventListener('change', e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const lines = reader.result.split(/\r?\n/);
            lines.forEach((line, i) => {
                line = line.trim()
                if (line.startsWith('#')) {return;}
                let match_out = line.match(/ZSH_HIGHLIGHT_STYLES\[([a-zA-Z0-9\-]+)\]=['"]?([a-zA-Z0-9,=#]+)['"]?/)
                if (match_out) {
                    now_syles[match_out[1]] = zsh_Style_To_dict(match_out[2])
                }
                input_file.value = "";
            });
            apply_option_dict_to_input()
            update_terminal()
        };
        reader.readAsText(file);
    });

}

function start_listen_save() {
    document.getElementById("save-zsh-file").addEventListener("click", save_zsh_file)
}

add_color_options()     // 添加选项列表
update_terminal()       // 初始显示
start_listen_f()        // 监听导入的配置
start_listener_all_input()    // 监听选项的更改
start_listen_save()