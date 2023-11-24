export function extractTextFromComponent(component) {
  if (typeof component === "string") {
    return component;
  }

  if (Array.isArray(component)) {
    return component.map(extractTextFromComponent).join(" ");
  }

  if (component.props && component.props.children) {
    return extractTextFromComponent(component.props.children);
  }

  return "";
}
