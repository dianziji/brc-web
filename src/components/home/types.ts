export type CTAProps = {
  label: string;
  href: string;
  className?: string;
  ariaLabel?: string;
};

export type SectionHeaderProps = {
  title: string;
  cta?: CTAProps;
  className?: string;
  titleClassName?: string;
};

export type MediaCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  imageSrc: string;
  imageAlt: string;
};
