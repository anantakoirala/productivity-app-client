"use client";
import AssignedToMeTaskList from "@/components/tasks/AssignedToMeTaskList";
import { handleApiError } from "@/lib/handleApiError";
import { RootState } from "@/redux/store";
import { useLazyGetTaskAssignedToMeQuery } from "@/redux/task/taskApi";
import { Task } from "@/types/Task";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const { activeWorkspaceId } = useSelector(
    (state: RootState) => state.workspace
  );

  const [trigger, { isLoading }] = useLazyGetTaskAssignedToMeQuery();
  useEffect(() => {
    const fetchAssignedTask = async () => {
      try {
        if (activeWorkspaceId > 0) {
          const response = await trigger({
            workspaceId: activeWorkspaceId,
            page,
          }).unwrap();

          if (page === 1) {
            setTotalPages(response.pagination.totalPages);
            setTasks(response.tasks);
          } else {
            setTasks((prev) => [...prev, ...response.project.tasks]);
          }

          setHasMore(page < response.pagination.totalPages);
        }
      } catch (error) {
        handleApiError(error);
      }
    };
    fetchAssignedTask();
  }, [activeWorkspaceId, page]);

  const loadMore = async () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center">
        Loading...
      </div>
    );
  }

  // If there are no tasks, display a "No data to display" message
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col gap-2 min-h-screen w-full pb-20">
        <div className="w-full font-semibold tracking-tight capitalize text-2xl md:text-5xl">
          Assigned To Me
        </div>
        <div className="text-center mt-4">No data to display</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen w-full pb-20">
      <div className="w-full font-semibold tracking-tight capitalize text-2xl md:text-5xl">
        Assigned To Me
      </div>
      {tasks.map((task) => (
        <AssignedToMeTaskList
          task={task}
          key={task.id}
          workspace_id={activeWorkspaceId}
        />
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 mx-auto px-4 py-2 bg-primary text-white rounded-md"
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default page;
