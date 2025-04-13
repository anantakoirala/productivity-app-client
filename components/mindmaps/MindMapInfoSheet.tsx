import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import {
  MindMapInfoSchema,
  MindMapInfoSchemaType,
} from "@/schema/MindMapInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiSelector from "../EmojiSelector";
import TextareaAutosize from "react-textarea-autosize";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateMindMapInfoMutation } from "@/redux/MindMap/mindMapApi";
import { handleApiError } from "@/lib/handleApiError";
import toast from "react-hot-toast";

type Props = {
  openMindMapInfoSheet: boolean;
  setIsOpenMindMapInfoSheet: Dispatch<SetStateAction<boolean>>;
};

const MindMapInfoSheet = ({
  openMindMapInfoSheet,
  setIsOpenMindMapInfoSheet,
}: Props) => {
  const { theme } = useTheme();
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🧠");

  const { mindMap } = useSelector((state: RootState) => state.mindmap);

  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [updateInfo, { isLoading }] = useUpdateMindMapInfoMutation();

  const form = useForm<MindMapInfoSchemaType>({
    resolver: zodResolver(MindMapInfoSchema),
    defaultValues: {
      title: mindMap.title as string,
      emoji: mindMap.emoji as string,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const emojiTheme = useMemo(() => {
    switch (theme) {
      case "dark":
        return "dark";
      case "light":
        return "light";
      case "System":
        return "light";
    }
  }, [theme]);

  const onSubmit = async (data: MindMapInfoSchemaType) => {
    try {
      await updateInfo({
        workspaceId: activeWorkspaceId,
        mindMapId: mindMap.id,
        data,
      }).unwrap();

      toast.success("Info updated");
      setIsOpenMindMapInfoSheet(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    if (mindMap.emoji) {
      setSelectedEmoji(mindMap.emoji);
      setValue("emoji", mindMap.emoji);
      setValue("title", mindMap.title as string);
    }
  }, [mindMap]);

  return (
    <Sheet open={openMindMapInfoSheet} onOpenChange={setIsOpenMindMapInfoSheet}>
      <SheetContent className="md:w-[26rem] md:max-w-md">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 w-full flex flex-col gap-8">
          <div className="flex flex-row gap-2">
            {/* Emoji picker */}
            <DropdownMenu
              open={dropdownMenuOpen}
              onOpenChange={setDropdownMenuOpen}
            >
              <DropdownMenuTrigger
                asChild
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-lg"
              >
                <Button variant={"outline"} className="text-lg w-10 h-10 p-2">
                  {selectedEmoji}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <Picker
                  data={data}
                  emojiSize={20}
                  theme={emojiTheme}
                  emojiButtonSize={32}
                  onEmojiSelect={(emoji: any) => {
                    setSelectedEmoji(emoji.native);
                    setValue("emoji", emoji.native);
                    setDropdownMenuOpen(false);
                  }}
                />
              </DropdownMenuContent>
            </DropdownMenu>
            <TextareaAutosize
              {...register("title")}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              placeholder="Editor content"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none"
            />
          </div>
          <Button
            disabled={isLoading}
            type="button"
            className="w-full max-w-md dark:text-white font-semibold"
            onClick={(e) => {
              handleSubmit(onSubmit)();
            }}
          >
            Update
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MindMapInfoSheet;
