"use client";
import TagInput from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store";
import { useCreateInvitationMutation } from "@/redux/Workspace/workspaceApi";

import { Link2, UserPlus2 } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const InviteUser = (props: Props) => {
  const roles = ["viewer", "admin", "editor"];
  const [selectedRole, setSelectedRole] = useState<
    "viewer" | "admin" | "editor"
  >("editor");

  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [createInvitation, { isLoading }] = useCreateInvitationMutation();

  const [open, setIsOpen] = useState<boolean>(false);

  const [tags, setTags] = useState<string[]>([]);

  const sendInvitation = async () => {
    await createInvitation({
      tags: tags,
      role: selectedRole,
      id: activeWorkspaceId,
    });
    setTags([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="sm:bg-primary/10 sm:text-primary sm:font-semibold sm:hover:bg-primary sm:hover:text-white sm:h-9 sm:rounded-md sm:px-3 sm:w-auto sm:space-x-2"
          value={"ghost"}
        >
          <span className="hidden sm:inline">Invite</span>
          <UserPlus2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-2">
          <TagInput tags={tags} setTags={setTags} />
          <Select
            value={selectedRole}
            onValueChange={(value) =>
              setSelectedRole(value as "viewer" | "admin" | "editor")
            }
          >
            <SelectTrigger className="w-full mt-5">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {tags.length > 0 && (
            <button
              onClick={() => sendInvitation()}
              disabled={isLoading}
              className="w-20 mt-6 h-12 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
              type="button"
            >
              Submit
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
