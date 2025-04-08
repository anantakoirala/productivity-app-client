import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CommandItem } from "../ui/command";
import { Button } from "../ui/button";
import { Check, Pencil, Plus, Tag as TagIcon } from "lucide-react";
import { Tag } from "@/types/Tag";
import { useDispatch } from "react-redux";
import { setEditTagInfo } from "@/redux/Tag/tagSlice";

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

type Props = {
  tag: Tag;
  onSelectActiveTags: (tag: Tag) => void;
  currentActiveTags: Tag[];
  setTab: (tab: "list" | "newTag" | "editTag") => void;
};

const CommandTagItem = ({
  tag,
  onSelectActiveTags,
  currentActiveTags,
  setTab,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  const isActive = useMemo(() => {
    return (
      currentActiveTags.length > 0 &&
      currentActiveTags.find((activeTag) => activeTag.id === tag.id)
    );
  }, [currentActiveTags, tag.id]);

  const setEditInfo = (tag: Tag) => {
    setTab("editTag");
    dispatch(setEditTagInfo(tag));
  };

  const tagColor = useMemo(() => {
    switch (tag.color) {
      case CustomColors.BLUE:
        return "text-blue-600 hover:text-blue-500 border-blue-600 hover:border-blue-500";
      case CustomColors.EMERALD:
        return "text-emerald-600 hover:text-emerald-500 border-emerald-600 hover:border-emerald-500";
      case CustomColors.LIME:
        return "text-lime-600 hover:text-lime-500 border-lime-600 hover:border-lime-500";
      case CustomColors.ORANGE:
        return "text-orange-600 hover:text-orange-500 border-orange-600 hover:border-orange-500";
      case CustomColors.PINK:
        return "text-pink-600 hover:text-pink-500 border-pink-600 hover:border-pink-500";
      case CustomColors.YELLOW:
        return "text-yellow-600 hover:text-yellow-500 border-yellow-600 hover:border-yellow-500";
      case CustomColors.RED:
        return "text-red-600 hover:text-red-500 border-red-600 hover:border-red-500";
      case CustomColors.PURPLE:
        return "text-purple-600 hover:text-purple-500 border-purple-600 hover:border-purple-500";
      case CustomColors.GREEN:
        return "text-green-600 hover:text-green-500 border-green-600 hover:border-green-500";
      case CustomColors.CYAN:
        return "text-cyan-600 hover:text-cyan-500 border-cyan-600 hover:border-cyan-500";
      case CustomColors.INDIGO:
        return "text-indigo-600 hover:text-indigo-500 border-indigo-600 hover:border-indigo-500";
      case CustomColors.FUCHSIA:
        return "text-fuchsia-600 hover:text-fuchsia-500 border-fuchsia-600 hover:border-fuchsia-500";
      default:
        return "text-blue-600 hover:text-blue-500 border-blue-600 hover:border-blue-500";
    }
  }, [tag.color]);
  return (
    <CommandItem
      className="p-0 relative"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Button
        onClick={() => onSelectActiveTags(tag)}
        size={"sm"}
        variant={"ghost"}
        className={`w-full h-fit justify-between px-2 py-1.5 text-xs ${tagColor}`}
      >
        <p className="flex flex-row">
          <TagIcon className="mr-2" size={16} />
          <span className="text-secondary-foreground">{tag.name}</span>
        </p>
        {isActive && <Check size={16} />}
      </Button>
      {isHovered && (
        <Button
          className="absolute top-1/2 right-6 translate-y-[-50%] h-fit rounded-none z-20 bg-transparent hover:bg-transparent text-muted-foreground"
          onClick={(e) => {
            e.stopPropagation();
            setEditInfo(tag);
          }}
        >
          <Pencil size={16} />
        </Button>
      )}
    </CommandItem>
  );
};

export default CommandTagItem;
