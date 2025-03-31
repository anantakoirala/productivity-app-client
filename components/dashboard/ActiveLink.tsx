import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { buttonVariants } from "../ui/button";

type Props = {
  href: string; // Use lowercase 'string' type here
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | null;
  children?: React.ReactNode;
  include?: string;
};

const ActiveLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { href, children, className, include, size, variant, ...props }: Props,
    ref
  ) => {
    const pathName = usePathname();

    return (
      <Link
        href={href}
        className={cn(
          `${buttonVariants({ variant, size })} ${
            href === pathName ||
            (include && pathName.includes(include)
              ? "bg-secondary font-semibold" // Fixed typo here
              : "")
          }`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

ActiveLink.displayName = "ActiveLink";

export default ActiveLink;
