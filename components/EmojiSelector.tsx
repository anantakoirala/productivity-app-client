import React, { useMemo, useState } from "react";
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Props = {
  setEmojiValue: (emoji: string) => void;
};

const EmojiSelector = ({ setEmojiValue }: Props) => {
  const { theme } = useTheme();
  const [selectedEmoji, setSelectedEmoji] = useState("🧠");
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-lg"
        )}
      >
        <Button variant="outline" className="text-lg w-10 h-10 p-2">
          {selectedEmoji}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="z-50 ">
          <Picker
            data={data}
            emojiSize={20}
            emojiButtonSize={32}
            theme={emojiTheme}
            onEmojiSelect={(emoji: any) => {
              setSelectedEmoji(emoji.native); // set selected emoji
              setEmojiValue(emoji.native);
              setIsOpen(false);
            }}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmojiSelector;
