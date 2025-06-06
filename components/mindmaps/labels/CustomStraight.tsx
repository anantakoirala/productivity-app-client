import { Button } from "@/components/ui/button";
import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from "reactflow";

type Props = {};

const CustomStraight = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,

    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} id={id} />
      <EdgeLabelRenderer>
        <div
          className="bg-orange-500 text-white text-sm px-3 py-1.5 rounded-sm max-w-[13rem]"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          {data?.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomStraight;
