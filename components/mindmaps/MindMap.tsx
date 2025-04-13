"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import EdgeOptions from "./EdgeOptions";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeTypes,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Panel,
  ReactFlowInstance,
  ReactFlowJsonObject,
} from "reactflow";
import TextNode from "./nodes/TextNode";
import "reactflow/dist/style.css";
import InputNode from "./nodes/InputNode";
import CustomBezier from "./labels/CustomBezier";
import CustomStraight from "./labels/CustomStraight";
import CustomStepSharp from "./labels/CustomStepSharp";
import CustomStepRounded from "./labels/CustomStepRounded";
import { Sheet } from "../ui/sheet";
import { EdgeOptionsSchemaType } from "@/schema/EdgeOptionsSchema";
import {
  useUpdateMindMapMutation,
  useUpdateMindMapTagsMutation,
} from "@/redux/MindMap/mindMapApi";
import { useParams } from "next/navigation";
import { handleApiError } from "@/lib/handleApiError";
import { Pencil, PlusSquare, Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import DeleteAllNodes from "./DeleteAllNodes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
import { NodeColors } from "@/types/NodeColors";
import MindMapTagSelector from "./MindMapTagSelector";
import { Separator } from "../ui/separator";
import TagSelector from "../tag/TagSelector";
import { Tag } from "@/types/Tag";
import { CustomColors } from "@/constants/CustomColors";
import LinkTag from "../tag/LinkTag";
import { ScrollArea } from "../ui/scroll-area";
import MindMapInfoSheet from "./MindMapInfoSheet";

type Props = {};

// const initialNodes: Node[] = [
//   { id: "1", data: { label: "Node 1" }, position: { x: 5, y: 5 } },
//   { id: "2", data: { label: "Node 2" }, position: { x: 134, y: 342 } },
//   {
//     id: "3",
//     type: "textNode",
//     data: { value: 123 },
//     position: { x: 50, y: 59 },
//   },
// ];

// const initialEdges: Edge[] = [
//   {
//     id: "1-2",
//     source: "1",
//     target: "2",
//     type: "customBezier",
//     animated: true,
//     data: { label: "label" },
//   },
// ];

const nodeTypes = {
  textNode: TextNode,
  inputNode: InputNode,
};

const edgeTypes: EdgeTypes = {
  customBezier: CustomBezier,
  customStraight: CustomStraight,
  customStepSharp: CustomStepSharp,
  customStepRound: CustomStepRounded,
};

const MindMap = (props: Props) => {
  const { mind_map_id, workspace_id } = useParams();
  const [clickedEdge, setClickedEdge] = useState<Edge | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [openMindMapInfoSheet, setIsOpenMindMapInfoSheet] =
    useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [currentActiveTags, setCurrentActiveTags] = useState<Tag[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const hasMounted = useRef(false);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<null | ReactFlowInstance>(null);

  const [updateMindMap, { isLoading }] = useUpdateMindMapMutation();
  const [updateMindMapTags, { isLoading: updateMindMapTagsLoading }] =
    useUpdateMindMapTagsMutation();

  const { mindMap, mindMapTags } = useSelector(
    (state: RootState) => state.mindmap
  );

  const { userRoleForWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );

  // Add active tags
  const onSelectActiveTags = (tag: Tag) => {
    setCurrentActiveTags((prev) => {
      const checkAvailability = prev.find((p) => p.id === tag.id);
      if (checkAvailability) {
        return prev;
      } else {
        return [...prev, tag];
      }
    });
  };

  // Update active tags while updating tags
  const onUpdateActiveTags = (
    id: number,
    name: string,
    color: CustomColors
  ) => {
    setCurrentActiveTags((prev) => {
      return prev.map((pre) => (pre.id === id ? { ...pre, name, color } : pre));
    });
  };

  // Delete active tags
  const onDeleteActiveTags = (tagId: number) => {
    setCurrentActiveTags((prevTags) => {
      return prevTags.filter((prev) => prev.id !== tagId);
    });
  };

  // Update mindmap
  const onSave = useCallback(async () => {
    if (!reactFlowInstance) {
      console.warn("ReactFlow instance not yet initialized");
      return;
    }

    const flow = reactFlowInstance.toObject();

    try {
      await updateMindMap({
        id: mind_map_id,
        data: {
          workspaceId: +workspace_id,
          content: flow,
        },
      }).unwrap();

      toast.success("Updated successfully");
    } catch (error) {
      handleApiError(error);
      console.error("Failed to save mind map:", error);
    }
  }, [reactFlowInstance, mind_map_id, workspace_id, updateMindMap]);

  // Add nodes
  const onAddNode = useCallback(() => {
    setNodes((prev) => {
      return [
        ...prev,
        {
          id: Math.random().toString(),
          type: "textNode",
          position: { x: 0, y: 0 },
          data: { text: "Write something", color: NodeColors.DEFAULT },
        },
      ];
    });
  }, []);

  const onNodesChange: OnNodesChange = useCallback((changes: any) => {
    setNodes((nds) => {
      return applyNodeChanges(changes, nds);
    });
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback((changes: any) => {
    setEdges((edges) => {
      return applyEdgeChanges(changes, edges);
    });
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setClickedEdge(edge);
    setOpenSheet(true);
  }, []);

  const onConnect: OnConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Changeing edge details from the sheet
  const onSaveChange = useCallback((data: EdgeOptionsSchemaType) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === data.edgeId
          ? {
              ...edge,

              type: data.type,
              animated: data.animated,
              data: { ...edge.data, label: data.label },
            }
          : edge
      )
    );
    setOpenSheet(false); // close the sheet on save
  }, []);

  // Deleting edge
  const onDeleteLabelEdge = useCallback((edgeId: string) => {
    setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edgeId));
    setOpenSheet(false); // close the side sheet
  }, []);

  // Set database content to the reactflow
  useEffect(() => {
    const { content } = mindMap;
    if (content) {
      const { nodes = [], edges = [] } =
        content as unknown as ReactFlowJsonObject;
      setNodes(nodes);
      setEdges(edges);
    }
  }, [mindMap, mindMap.id, workspace_id]);

  // Check if the user can edit or not
  useEffect(() => {
    if (userRoleForWorkspace) {
      switch (userRoleForWorkspace) {
        case "ADMIN":
          setIsEditable(true);
          break;
        case "CAN_EDIT":
          setIsEditable(false);
        case "READ_ONLY":
          setIsEditable(false);
        default:
          setIsEditable(false);
          break;
      }
    }
  }, [userRoleForWorkspace]);

  useEffect(() => {
    if (mindMapTags.length > 0) {
      setCurrentActiveTags(mindMapTags);
    }
  }, [mindMapTags]);

  // useEffect(() => {
  //   if (!hasMounted.current) {
  //     hasMounted.current = true;
  //     return; // ⛔️ Skip on first render
  //   }

  //   const updateMindmaptags = async () => {
  //     try {
  //       const activeTagIds = Array.isArray(currentActiveTags)
  //         ? currentActiveTags.map((active) => active.id)
  //         : [];

  //       const finalData = {
  //         activeTagIds,
  //       };
  //       await updateMindMapTags({
  //         workspaceId: workspace_id,
  //         mindMapId: mind_map_id,
  //         data: finalData,
  //       }).unwrap();
  //     } catch (error) {
  //       handleApiError(error);
  //     }
  //   };
  //   updateMindmaptags();
  // }, [currentActiveTags, mind_map_id, workspace_id]);

  // Populate active tags

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  return (
    <div className="w-full h-full flex flex-col ">
      {clickedEdge && (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <EdgeOptions
            clickedEdge={clickedEdge}
            openSheet={openSheet}
            onSaveChange={onSaveChange}
            onDeleteEdge={onDeleteLabelEdge}
          />
        </Sheet>
      )}

      <div className="h-full">
        <ReactFlow
          onInit={setReactFlowInstance}
          fitView
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          connectOnClick={isEditable}
          edgesUpdatable={isEditable}
          edgesFocusable={isEditable}
          nodesDraggable={isEditable}
          nodesConnectable={isEditable}
          nodesFocusable={isEditable}
          elementsSelectable={isEditable}
        >
          <Panel
            position="top-left"
            className="bg-secondary/30 z-50 shadow-sm rounded-sm py-0.5 px-3 flex items-center "
          >
            <div className="flex flex-row gap-2 w-full items-center justify-center flex-wrap">
              {/* Add Node */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={onAddNode} variant={"ghost"} size={"icon"}>
                      <PlusSquare size={22} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add Node</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Save */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onSave}
                      variant={"ghost"}
                      size={"icon"}
                      disabled={isLoading}
                    >
                      <Save size={22} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Delete all nodes */}
              <DeleteAllNodes />
              {/* Edit Info */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => setIsOpenMindMapInfoSheet(true)}
                    >
                      <Pencil size={22} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="h-8">
                <Separator orientation="vertical" />
              </div>
              <TagSelector
                onSelectActiveTags={onSelectActiveTags}
                currentActiveTags={currentActiveTags}
                onUpdateActiveTags={onUpdateActiveTags}
                onDeleteActiveTags={onDeleteActiveTags}
                className="border-none h-9"
                plusIconSize={22}
              />

              <ScrollArea className="sm:block max-w-[15rem] md:max-w-[24rem]">
                {currentActiveTags.map((activeTag) => (
                  <LinkTag key={activeTag.id} tag={activeTag} />
                ))}
              </ScrollArea>
            </div>
          </Panel>
          <Background />
        </ReactFlow>
      </div>
      {openMindMapInfoSheet && (
        <MindMapInfoSheet
          openMindMapInfoSheet={openMindMapInfoSheet}
          setIsOpenMindMapInfoSheet={setIsOpenMindMapInfoSheet}
        />
      )}
    </div>
  );
};

export default MindMap;
