import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";
import { Steps, Step } from "@/components/mdx/Steps";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    Steps,
    Step,
  };
}
