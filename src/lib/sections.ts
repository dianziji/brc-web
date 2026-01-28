// src/lib/sections.ts
export type SectionNode = {
    name: string;
    slug: string;
    parent: null | { node: { name: string; slug: string } };
  };
  
  export function pickLeafSection(sections: SectionNode[]): SectionNode | null {
    if (!sections?.length) return null;
  
    // 你现在会同时勾：Youth（parent=null）+ CHISTA（parent!=null）
    // 规则：优先选择“有 parent 的”作为 leaf（更具体的那个）
    const withParent = sections.filter(s => s.parent?.node?.slug);
    if (withParent.length > 0) return withParent[0];
  
    // 如果只有顶层（极少），就用它
    return sections[0];
  }
  
  export function getTopSectionSlug(leaf: SectionNode | null): string | null {
    if (!leaf) return null;
    return leaf.parent?.node?.slug ?? leaf.slug;
  }