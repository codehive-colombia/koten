import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PrimitiveDocPage } from "../../components/doc-page";
import { loadPrimitiveDoc, type PrimitiveDoc } from "../../data/docs";
import { NotFoundPage } from "../not-found";

export function PrimitivePage() {
  const { slug } = useParams();
  const [doc, setDoc] = useState<PrimitiveDoc | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    setDoc(undefined);

    if (!slug) {
      setDoc(null);
      return;
    }

    loadPrimitiveDoc(slug).then((loaded) => {
      if (active) {
        setDoc(loaded);
      }
    });

    return () => {
      active = false;
    };
  }, [slug]);

  if (doc === undefined) {
    return <div aria-busy="true" className="min-h-[1400px]" data-slot="doc-fallback" />;
  }

  if (doc === null) {
    return <NotFoundPage />;
  }

  return <PrimitiveDocPage doc={doc} />;
}
