import React, { useEffect } from "react";
import { DialogContent, DialogDescription, DialogHeader } from "../ui/dialog";
import { Edge } from "reactflow";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  EdgeOptionsSchema,
  EdgeOptionsSchemaType,
} from "@/schema/EdgeOptionsSchema";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  clickedEdge: Edge | null;
  openSheet: boolean;
  onSaveChange: (data: EdgeOptionsSchemaType) => void;
  onDeleteEdge: (edgeId: string) => void;
};

const EdgeOptions = ({
  clickedEdge,
  openSheet,
  onSaveChange,
  onDeleteEdge,
}: Props) => {
  const form = useForm<EdgeOptionsSchemaType>({
    resolver: zodResolver(EdgeOptionsSchema),
    defaultValues: {
      edgeId: "",
      label: "",
      type: "customBezier",
      animated: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = (data: EdgeOptionsSchemaType) => {
    onSaveChange(data);
  };

  useEffect(() => {
    if (openSheet) {
      form.reset({
        edgeId: clickedEdge?.id,
        label: clickedEdge?.data?.label.toString() ?? "",
        type:
          (clickedEdge?.type as
            | "customBezier"
            | "customStraight"
            | "customStepSharp"
            | "customStepRound") ?? "customBezier",
        animated: clickedEdge?.animated ?? false,
      });
    }
  }, [clickedEdge, form, openSheet]);
  return (
    <SheetContent className="md:w-[26rem] md:max-w-md">
      <ScrollArea className="h-full px-6">
        <SheetHeader>
          <SheetTitle>Edge Settings</SheetTitle>
          <SheetDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
            temporibus nemo omnis.
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">Label</Label>
            <Input
              placeholder="Add Label"
              className="bg-muted"
              {...register("label")}
            />
            {errors.label && (
              <span className="text-sm text-red-500">
                {errors.label.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">Edge Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="customBezier">Bezier</SelectItem>
                    <SelectItem value="customStepSharp">Step</SelectItem>
                    <SelectItem value="customStraight">Straight</SelectItem>
                    <SelectItem value="customStepRound">Smooth Step</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Controller
              control={control}
              name="animated"
              render={({ field }) => (
                <Checkbox
                  id="animated"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              )}
            />
            <Label
              htmlFor="animated"
              className="text-sm font-medium leading-none"
            >
              Animated
            </Label>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              type="submit"
              className="w-full max-w-md dark:text-white font-semibold"
            >
              Save
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              className="w-full max-w-md dark:text-white font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEdge(clickedEdge?.id as string);
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </ScrollArea>
    </SheetContent>
  );
};

export default EdgeOptions;
