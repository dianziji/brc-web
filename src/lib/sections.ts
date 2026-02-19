// src/lib/sections.ts
export type SectionNode = {
    name: string;
    slug: string;
    parent: null | { node: { name: string; slug: string } };
  };
  
  export function pickLeafSection(sections: SectionNode[]): SectionNode | null {
    if (!sections?.length) return null;
  
    // 你現在會同時勾：Youth（parent=null）+ CHISTA（parent!=null）
    // 規則：優先選擇“有 parent 的”作為 leaf（更具體的那個）
    const withParent = sections.filter(s => s.parent?.node?.slug);
    if (withParent.length > 0) return withParent[0];
  
    // 如果只有頂層（極少），就用它
    return sections[0];
  }
  
  export function getTopSectionSlug(leaf: SectionNode | null): string | null {
    if (!leaf) return null;
    return leaf.parent?.node?.slug ?? leaf.slug;
  }