import { Input } from "@/components/ui/input";
import React from "react";
import NodeWrapper from "./NodeWrapper";

type Props = {};

const InputNode = (props: Props) => {
  return (
    <NodeWrapper>
      <Input placeholder="hello" />
    </NodeWrapper>
  );
};

export default InputNode;
