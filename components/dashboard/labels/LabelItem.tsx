"use client";
import { Button } from "@/components/ui/button";
import { Tag } from "@/types/Tag";
import { Pencil, TagIcon, Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
import EditLabelDialog from "./EditLabelDialog";
import DeleteLabelDialog from "./DeleteLabelDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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

const LabelItem = ({ tag }: Props) => {
  const [editDialog, setEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const { userRoleForWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );

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
    <>
      <div className="w-full h-auto min-h-10 bg-muted  flex flex-row items-center justify-between px-2 py-2 rounded-sm gap-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <TagIcon size={20} className={`mr-2 w-6 h-6 ${tagColor}`} />{" "}
          <span className="text-lg">{tag.name}</span>
        </div>
        {/* options */}
        <div className="flex flex-row items-center gap-2">
          {userRoleForWorkspace !== "READ_ONLY" && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setEditDialog(true);
              }}
              size={"icon"}
              variant={"ghost"}
              className="sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-white sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2"
            >
              <Pencil />
            </Button>
          )}
          {(userRoleForWorkspace === "ADMIN" ||
            userRoleForWorkspace === "OWNER") && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteDialog(true);
              }}
              size={"icon"}
              variant={"ghost"}
              className="sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-red-600 sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2"
            >
              <Trash />
            </Button>
          )}
        </div>
      </div>
      {editDialog && (
        <EditLabelDialog
          editDialog={editDialog}
          setEditDialog={setEditDialog}
          tag={tag}
        />
      )}
      {openDeleteDialog && (
        <DeleteLabelDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          tag={tag}
        />
      )}
    </>
  );
};

export default LabelItem;
