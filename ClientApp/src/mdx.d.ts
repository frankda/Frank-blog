declare module '*.mdx' {
  const MDXComponent: () => JSX.Element;
  export default MDXComponent;
  export const metaData: object;
}
