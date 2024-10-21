from markdownify import markdownify


def to_markdown(html: str):
    return markdownify(
        html,
        code_language_callback=lambda el: get_language(el["class"]) if el.has_attr("class") else None,
    )


def get_language(class_list: list[str]):
    for class_name in class_list:
        if class_name.startswith("language-"):
            return class_name.removeprefix("language-")


def is_python(source: str):
    from ast import parse

    try:
        parse(source)
        return True
    except SyntaxError:
        return False
