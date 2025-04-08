import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { CustomColors } from "@/constants/CustomColors";
import { Label } from "../ui/label";
import clsx from "clsx";
import { Button } from "../ui/button";
import { EditTagEchemaType, EditTagSchema } from "@/schema/EditTagSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteTagMutation, useUpdateTagMutation } from "@/redux/Tag/tagApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";

type Props = {
  setTab: (tab: "list" | "newTag" | "editTag") => void;
  onUpdateActiveTags: (id: number, name: string, color: CustomColors) => void;
  onDeleteActiveTags: (tagId: number) => void;
};

const EditTag = ({ setTab, onUpdateActiveTags, onDeleteActiveTags }: Props) => {
  const [selectedColor, setSelectedColor] = useState<CustomColors>(
    CustomColors.BLUE
  );

  const { editTagInfo } = useSelector((state: RootState) => state.tag);
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [updateTag, { isLoading }] = useUpdateTagMutation();
  const [deleteTag, { isLoading: deleteTagLoading }] = useDeleteTagMutation();

  const tagColor = (providedColor: CustomColors) => {
    const base = "rounded-full w-6 h-6 border-2";
    switch (providedColor) {
      case CustomColors.BLUE:
        return `${base} bg-blue-600 border-blue-600`;
      case CustomColors.EMERALD:
        return `${base} bg-emerald-600 border-emerald-600`;
      case CustomColors.LIME:
        return `${base} bg-lime-600 border-lime-600`;
      case CustomColors.ORANGE:
        return `${base} bg-orange-600 border-orange-600`;
      case CustomColors.PINK:
        return `${base} bg-pink-600 border-pink-600`;
      case CustomColors.YELLOW:
        return `${base} bg-yellow-500 border-yellow-500`;
      case CustomColors.RED:
        return `${base} bg-red-600 border-red-600`;
      case CustomColors.PURPLE:
        return `${base} bg-purple-600 border-purple-600`;
      case CustomColors.GREEN:
        return `${base} bg-green-600 border-green-600`;
      case CustomColors.CYAN:
        return `${base} bg-cyan-600 border-cyan-600`;
      case CustomColors.INDIGO:
        return `${base} bg-indigo-600 border-indigo-600`;
      case CustomColors.FUCHSIA:
        return `${base} bg-fuchsia-600 border-fuchsia-600`;
      default:
        return `${base} bg-blue-600 border-blue-600`;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTagEchemaType>({
    resolver: zodResolver(EditTagSchema),
    defaultValues: {
      workspaceId: activeWorkspaceId,
      color: selectedColor,
      name: editTagInfo.name,
    },
  });

  const onSubmit = async (data: EditTagEchemaType) => {
    try {
      const finaldata = { ...data, color: selectedColor };
      await updateTag({ id: editTagInfo.id, data: finaldata }).unwrap();
      onUpdateActiveTags(editTagInfo.id, data.name, selectedColor);
      toast.success("Tag updated successfully");
      setTab("list");
    } catch (error) {
      handleApiError(error);
    }
  };

  const onDeleteTag = async (tagId: number) => {
    console.log("tagId", tagId);
    try {
      await deleteTag({ id: tagId, workspaceId: activeWorkspaceId }).unwrap();
      onDeleteActiveTags(tagId);
      toast.success("Tag deleted successfully");
      setTab("list");
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (editTagInfo.color) {
      setSelectedColor(editTagInfo.color);
    }
  }, [editTagInfo]);

  return (
    <form
      className="space-y-4 w-full max-w-[15rem]"
      id="edit-tag-form"
      onSubmit={(e) => {
        e.stopPropagation(); // ✅ Stops the event from bubbling up
        handleSubmit(onSubmit)(e); // Pass the event into handleSubmit
      }}
    >
      <div>
        <Input
          placeholder="name"
          className="bg-muted h-7 py-1.5 text-sm"
          {...register("name")}
          autoComplete="off"
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <RadioGroup
        className="grid grid-cols-6 gap-2"
        value={selectedColor}
        onValueChange={(val) => setSelectedColor(val as CustomColors)}
      >
        {Object.values(CustomColors).map((color) => (
          <Label
            key={color}
            className="flex items-center justify-center cursor-pointer"
          >
            <RadioGroupItem
              value={color}
              className="sr-only transition-colors duration-150"
            />
            <span
              className={clsx(
                tagColor(color as CustomColors),
                selectedColor === color && "ring-2 ring-offset-2 ring-ring"
              )}
            />
          </Label>
        ))}
      </RadioGroup>

      <div className="flex gap-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTag(editTagInfo.id);
          }}
          type="button"
          className="w-1/2 h-fit py-1.5 bg-red-700 hover:bg-red-600"
          size={"sm"}
          variant={"secondary"}
          disabled={deleteTagLoading}
        >
          Delete
        </Button>
        <Button
          disabled={isLoading}
          form="edit-tag-form"
          size={"sm"}
          type="submit"
          className="w-1/2 h-fit py-1.5 dark:text-white"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditTag;
