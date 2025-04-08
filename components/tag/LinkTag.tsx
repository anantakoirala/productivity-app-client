"use client";
import { cn } from "@/lib/utils";
import { Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { buttonVariants } from "../ui/button";
import { Tag } from "@/types/Tag";

type Props = {
  tag: Tag;
};

enum CustomColors {
  PURPLE = "PURPLE",
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
  PINK = "PINK",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  CYAN = "CYAN",
  LIME = "LIME",
  EMERALD = "EMERALD",
  INDIGO = "INDIGO",
  FUCHSIA = "FUCHSIA",
}

const LinkTag = ({ tag }: Props) => {
  const tagColor = useMemo(() => {
    switch (tag.color) {
      case CustomColors.BLUE:
        return "text-blue-600 hover:text-blue-500";
      case CustomColors.EMERALD:
        return "text-emerald-600 hover:text-emerald-500";
      case CustomColors.LIME:
        return "text-lime-600 hover:text-lime-500";
      case CustomColors.ORANGE:
        return "text-orange-600 hover:text-orange-500";
      case CustomColors.PINK:
        return "text-pink-600 hover:text-pink-500";
      case CustomColors.YELLOW:
        return "text-yellow-600 hover:text-yellow-500";
      case CustomColors.RED:
        return "text-red-600 hover:text-red-500";
      case CustomColors.PURPLE:
        return "text-purple-600 hover:text-purple-500";
      case CustomColors.GREEN:
        return "text-green-600 hover:text-green-500";
      case CustomColors.CYAN:
        return "text-cyan-600 hover:text-cyan-500";
      case CustomColors.INDIGO:
        return "text-indigo-600 hover:text-indigo-500";
      case CustomColors.FUCHSIA:
        return "text-fuchsia-600 hover:text-fuchsia-500";
      default:
        return "text-blue-600 hover:text-blue-500";
    }
  }, [tag.color]);
  return (
    <Link
      href={""}
      className={cn(
        `${buttonVariants({
          variant: "outline",
          size: "sm",
        })} w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0.5 text-muted-foreground`
      )}
    >
      <TagIcon size={16} className={`mr-2 w-3 h-3 ${tagColor}`} />{" "}
      <span>{tag.name}</span>
    </Link>
  );
};

export default LinkTag;
