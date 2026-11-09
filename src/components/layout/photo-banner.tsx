import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/**
 * Full-width decorative photo. Optional children sit in a yellow box: below
 * the photo on phones, over its bottom left corner from md up. The box keeps
 * the text readable whatever the photo shows.
 */
export function PhotoBanner({
  src,
  children,
  priority,
  position = "object-center",
}: {
  src: StaticImageData;
  /** Which part of the photo stays in frame when it is cropped. */
  position?: "object-center" | "object-bottom" | "object-top";
  children?: ReactNode;
  priority?: boolean;
}) {
  return (
    <div className="relative">
      <Image
        src={src}
        alt=""
        priority={priority}
        placeholder="blur"
        sizes="100vw"
        className={`h-56 w-full object-cover sm:h-72 md:h-96 ${position}`}
      />
      {children && (
        <div className="bg-brand md:absolute md:inset-x-0 md:bottom-8 md:bg-transparent">
          <div className="container-site">
            <div className="max-w-xl bg-brand py-5 text-brand-foreground md:p-6">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
