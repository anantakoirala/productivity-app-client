"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleApiError } from "@/lib/handleApiError";
import { RootState } from "@/redux/store";
import {
  useChangeUserRoleMutation,
  useLazyGetWorkspaceSubscribersQuery,
  useRemoveUserFromWorkspaceMutation,
} from "@/redux/Workspace/workspaceApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  workspaceId: string;
};

const Members = ({ workspaceId }: Props) => {
  const roles = ["viewer", "admin", "editor"];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [userIdToBeRemoved, setUserIdToBeRemoved] = useState<number | null>(
    null
  );
  const [workspaceIdOfUser, setWorkspaceIdOfUser] = useState<number | null>(
    null
  );
  const [trigger, { isLoading }] = useLazyGetWorkspaceSubscribersQuery();
  const { workspaceSubscribers } = useSelector(
    (state: RootState) => state.workspace
  );

  const [changeUserRole, { isLoading: changeUserRoleLoading }] =
    useChangeUserRoleMutation();

  const [
    removeUserFromWorkspace,
    { isLoading: removeUserFromWorkspaceLoading },
  ] = useRemoveUserFromWorkspaceMutation();

  useEffect(() => {
    if (workspaceId) {
      trigger({ workspaceId });
    }
  }, [workspaceId]);

  const getRole = (role: string) => {
    if (role === "ADMIN") {
      return "admin";
    } else if (role === "CAN_EDIT") {
      return "editor";
    } else {
      return "viewer";
    }
  };

  const handleRoleChange = async (
    role: "admin" | "editor" | "viewer",
    userId: number,
    workspace_id: number
  ) => {
    try {
      const roleMap = {
        admin: "ADMIN",
        editor: "CAN_EDIT",
        viewer: "READ_ONLY",
      };

      const serverRole = roleMap[role];

      await changeUserRole({
        userId: userId,
        workspaceId: workspace_id,
        userRole: serverRole,
      }).unwrap();

      toast.success("Role changed successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleRemoveClick = (userId: number, workspace_id: number) => {
    setUserIdToBeRemoved(userId); // Set the userId to be removed
    setWorkspaceIdOfUser(workspace_id);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleRemoveConfirmation = async () => {
    if (userIdToBeRemoved) {
      // Call the function to remove the user (replace with actual removal logic)
      await removeUserFromWorkspace({
        userId: userIdToBeRemoved,
        workspaceId: workspaceIdOfUser,
      }).unwrap();
      toast.success(`User removed successfully`);
      setIsDialogOpen(false); // Close the dialog
      setUserIdToBeRemoved(null); // Reset userIdToBeRemoved
    }
  };
  return (
    <>
      <Card className="bg-background border-none shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Members
          </h1>
          <CardDescription className="text-base break-words">
            Here you can manage the members of the workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-muted rounded-md">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Username</th>
                  <th className="px-4 py-2 whitespace-nowrap">Role</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workspaceSubscribers.map((subscriber, index) => (
                  <tr className="border-t" key={index}>
                    <td className="px-4 py-2">{subscriber.name}</td>
                    <td className="px-4 py-2">{subscriber.userName}</td>
                    <td className="px-4 py-2 ">
                      <Select
                        disabled={changeUserRoleLoading}
                        value={getRole(subscriber.userRole)}
                        onValueChange={(newRole) =>
                          handleRoleChange(
                            newRole as "admin" | "editor" | "viewer",
                            subscriber.userId,
                            subscriber.workspaceId
                          )
                        }
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        disabled={removeUserFromWorkspaceLoading}
                        className=" bg-red-700 hover:bg-red-600"
                        onClick={() =>
                          handleRemoveClick(
                            subscriber.userId,
                            subscriber.workspaceId
                          )
                        }
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-sm text-muted-foreground tracking-tight">
              This action will remove user form workspace
            </p>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-700 text-white hover:bg-red-600"
              onClick={handleRemoveConfirmation}
            >
              Yes, Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Members;
