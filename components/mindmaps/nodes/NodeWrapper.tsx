"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NodeColors } from "@/types/NodeColors";
import { Check, MoreHorizontal } from "lucide-react";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

type Props = {
  children: React.ReactNode;
  className?: string;
  color?: NodeColors;
  id: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
};

const colors = [
  NodeColors.BLUE,
  NodeColors.CYAN,
  NodeColors.DEFAULT,
  NodeColors.EMERALD,
  NodeColors.FUSCHSIA,
  NodeColors.GREEN,
  NodeColors.INDIGO,
  NodeColors.LIME,
  NodeColors.ORANGE,
  NodeColors.PINK,
  NodeColors.PURPLE,
  NodeColors.RED,
];

const NodeWrapper = ({
  children,
  className,
  color,
  setIsEditing,
  id,
  isEditing,
}: Props) => {
  const [currentColor, setCurrentColor] = useState<NodeColors | undefined>(
    color
  );
  const { setNodes } = useReactFlow();

  const onColorSelect = useCallback((newColor: NodeColors) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                color: newColor,
              },
            }
          : node
      )
    );
    setCurrentColor(newColor);
  }, []);

  const nodeColor = useCallback((color: NodeColors) => {
    switch (color) {
      case NodeColors.PURPLE:
        return `bg-purple-600 hover:bg-purple-500 text-white`;
      case NodeColors.GREEN:
        return `bg-green-600 hover:bg-green-500 text-white`;
      case NodeColors.RED:
        return `bg-red-600 hover:bg-red-500 text-white`;
      case NodeColors.BLUE:
        return `bg-blue-600 hover:bg-blue-500 text-white`;
      case NodeColors.CYAN:
        return `bg-cyan-600 hover:bg-cyan-500 text-white`;
      case NodeColors.EMERALD:
        return `bg-emerald-600 hover:bg-emerald-500 text-white`;
      case NodeColors.INDIGO:
        return `bg-indigo-600 hover:bg-indigo-500 text-white`;
      case NodeColors.LIME:
        return `bg-lime-600 hover:bg-lime-500 text-white`;
      case NodeColors.ORANGE:
        return `bg-orange-600 hover:bg-orange-500 text-white`;
      case NodeColors.FUSCHSIA:
        return `bg-fuchsia-600 hover:bg-fuchsia-500 text-white`;
      case NodeColors.PINK:
        return `bg-pink-600 hover:bg-pink-500 text-white`;
      case NodeColors.YELLOW:
        return `bg-yellow-600 hover:bg-yellow-500 text-white`;
      default:
        return `bg-secondary hover:bg-secondary-500`;
    }
  }, []);
  return (
    <div
      className={cn(
        `min-w-[10rem] max-w-md text-xs px-3 py-1.5 rounded-sm shadow-sm flex items-start justify-between transition-colors duration-200 gap-2 ${nodeColor(
          currentColor!
        )}`,
        className
      )}
    >
      <div className={`${isEditing ? "w-full" : "w-[90%]"}`}>
        {children}

        <>
          <Handle
            type="target"
            position={Position.Left}
            className={`transition-colors border-popover duration-200 p-1`}
          />
          <Handle
            type="source"
            position={Position.Right}
            className={`transition-colors border-popover duration-200 p-1`}
          />
        </>
        {!isEditing && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className={`w-6 h-6 hover:bg-transparent ${
                  currentColor === NodeColors.DEFAULT
                    ? ""
                    : "text-white hover:text-white"
                }`}
              >
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={-10} align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setIsEditing((prev) => !prev)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <span>color</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent
                      sideOffset={10}
                      className="hover:bg-popover"
                    >
                      <DropdownMenuItem className="grid grid-cols-4 gap-2 focus:bg-popover">
                        {colors.map((clr, i) => (
                          <Button
                            key={i}
                            onClick={() => {
                              onColorSelect(clr);
                            }}
                            className={`w-5 h-5 p-1 rounded-full ${nodeColor(
                              clr
                            )}`}
                          >
                            {clr === currentColor && (
                              <Check
                                size={16}
                                className={`${
                                  clr !== NodeColors.DEFAULT ? "text-white" : ""
                                }`}
                              />
                            )}
                          </Button>
                        ))}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem className="cursor-pointer gap-2">
                More
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default NodeWrapper;
