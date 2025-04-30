import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/handleApiError";
import { useDeleteProjectMutation } from "@/redux/Project/ProjectApi";
import EditProjectDialog from "@/components/project/EditProjectDialog";

type Props = {
  project: any;
  workspaceId: number;
};

const deleteProjectSchema = z.object({
  workspaceId: z.number(),
  projectId: z.number(),
});

const OptionMenuProjectList = ({ project, workspaceId }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialoge] = useState<boolean>(false);
  const [opendEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // <<-- added dropdown open state
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const form = useForm<z.infer<typeof deleteProjectSchema>>({
    resolver: zodResolver(deleteProjectSchema),
    defaultValues: {
      workspaceId: workspaceId,
      projectId: project.id,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof deleteProjectSchema>) => {
    try {
      setOpenDeleteDialoge(false);
      await deleteProject(data).unwrap();
      toast.success("Project deleted");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      {/* Main Item */}
      <div className="flex hover:bg-accent rounded-sm cursor-pointer items-center w-full">
        <Link
          href={`/dashboard/workspace/${workspaceId}/projects/project/${project.id}`}
          className="flex flex-row gap-3 px-3 w-full h-8 items-center text-sm"
          key={project.id}
        >
          <span className="text-muted-foreground">#</span>
          <span className="truncate">{project.title}</span>
        </Link>

        {/* Controlled Dropdown */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="focus:outline-none p-2 rounded-sm hover:bg-accent"
            >
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="focus:outline-none">
            <DropdownMenuItem
              onClick={() => {
                setDropdownOpen(false); // close dropdown
                setOpenDeleteDialoge(true); // open delete dialog
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setDropdownOpen(false); // close dropdown
                setOpenEditDialog(true); // open edit dialog
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialoge}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground tracking-tight">
              This action cannot be undone. This will permanently delete your
              project and all tasks associated with it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialoge(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-700 text-white"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      {opendEditDialog && (
        <EditProjectDialog
          opendEditDialog={opendEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          project={project}
        />
      )}
    </>
  );
};

export default OptionMenuProjectList;
