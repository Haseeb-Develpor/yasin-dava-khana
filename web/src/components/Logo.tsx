import Link from "next/link";

export function Logo({
  href = "/",
  src = "/logo.jpg",
  className = "h-20 w-auto max-w-[168px] sm:h-24 sm:max-w-[200px]",
}: {
  href?: string | false;
  src?: string;
  className?: string;
}) {
  const img = (
    <img
      src={src}
      alt="Yasin Dava Khana Dunyapur"
      className={`${className} bg-white object-contain`}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} className="shrink-0">
      {img}
    </Link>
  );
}
