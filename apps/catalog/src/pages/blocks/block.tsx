import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BlockDocPage } from "../../components/doc-page";
import { type BlockDoc, isBlockCategory, loadBlockDoc } from "../../data/docs";
import { NotFoundPage } from "../not-found";

export function BlockPage() {
  const { category, slug } = useParams();
  const [doc, setDoc] = useState<BlockDoc | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    setDoc(undefined);

    if (!category || !slug || !isBlockCategory(category)) {
      setDoc(null);
      return;
    }

    loadBlockDoc(category, slug).then((loaded) => {
      if (active) {
        setDoc(loaded);
      }
    });

    return () => {
      active = false;
    };
  }, [category, slug]);

  if (doc === undefined) {
    return <div aria-busy="true" className="min-h-[1400px]" data-slot="block-fallback" />;
  }

  if (doc === null) {
    return <NotFoundPage />;
  }

  return <BlockDocPage doc={doc} />;
}
