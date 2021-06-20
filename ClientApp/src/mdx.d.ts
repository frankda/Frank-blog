declare module '*.mdx' {
  const MDXComponent: () => JSX.Element;
  export default MDXComponent;
  export const attributes: Record<string, string>;
}
