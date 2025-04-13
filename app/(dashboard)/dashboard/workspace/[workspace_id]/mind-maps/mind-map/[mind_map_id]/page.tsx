"use client";
import EmojiSelector from "@/components/EmojiSelector";
import MindMap from "@/components/mindmaps/MindMap";
import { handleApiError } from "@/lib/handleApiError";
import { useLazyGetMindMapQuery } from "@/redux/MindMap/mindMapApi";
import { RootState } from "@/redux/store";
import {
  MindMapInfoSchema,
  MindMapInfoSchemaType,
} from "@/schema/MindMapInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

const Page = () => {
  const { mind_map_id, workspace_id } = useParams();
  const [pageNotFound, setPageNotFound] = useState(false);
  const [mindMapLoaded, setMindMapLoaded] = useState(false); // new state
  const [emoji, setEmoji] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>("");

  const { activeWorkSpaceName } = useSelector(
    (state: RootState) => state.workspace
  );

  const { mindMap } = useSelector((state: RootState) => state.mindmap);

  const [getMindMap, { isLoading }] = useLazyGetMindMapQuery();

  useEffect(() => {
    if (mind_map_id && workspace_id) {
      const fetchMindMap = async () => {
        try {
          const response = await getMindMap({
            mindMapId: mind_map_id,
            workspaceId: workspace_id,
          }).unwrap();

          setMindMapLoaded(true);
        } catch (error: any) {
          if (error?.status === 404) {
            setPageNotFound(true);
          }
          handleApiError(error);
        }
      };

      fetchMindMap();
    }
  }, [mind_map_id, workspace_id]);

  useEffect(() => {
    if (mindMap.emoji || mindMap.title) {
      setEmoji(mindMap.emoji);
      setTitle(mindMap.title);
    }
  }, [mindMap.emoji, mindMap.title]);

  if (pageNotFound) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      {!isLoading && (
        <>
          <div
            className={`flex flex-row gap-2 items-center ${
              title ? "justify-center" : "justify-start"
            }`}
          >
            {emoji}

            <div className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none">
              {title}
            </div>
          </div>
          {mindMapLoaded ? (
            <MindMap />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Loading...
            </div>
          )}{" "}
          {/* Only show when data is ready */}
        </>
      )}
    </div>
  );
};

export default Page;
