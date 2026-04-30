import Image, { type ImageProps } from "next/image";
import { getMediaAlt, getMediaSrc, type MediaKey } from "@/content/media";
import type { Locale } from "@/lib/i18n";

type AppImageWithMedia = Omit<ImageProps, "src" | "alt"> & {
  mediaKey: MediaKey;
  locale?: Locale;
  alt?: string;
};

type AppImageWithSrc = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
  mediaKey?: never;
  locale?: Locale;
};

type AppImageProps = AppImageWithMedia | AppImageWithSrc;

export default function AppImage(props: AppImageProps) {
  if ("mediaKey" in props && props.mediaKey) {
    const { mediaKey, locale = "zh", alt, ...rest } = props;
    const imageProps = { ...rest, sizes: rest.fill ? (rest.sizes ?? "100vw") : rest.sizes };
    return <Image src={getMediaSrc(mediaKey)} alt={alt || getMediaAlt(mediaKey, locale)} {...imageProps} />;
  }

  const { src, alt, ...rest } = props;
  const imageProps = { ...rest, sizes: rest.fill ? (rest.sizes ?? "100vw") : rest.sizes };
  return <Image src={src} alt={alt} {...imageProps} />;
}
