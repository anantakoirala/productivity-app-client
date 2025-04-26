"use client";
import ProjectList from "@/components/project/ProjectList";
import { handleApiError } from "@/lib/handleApiError";
import { useLazyGetIndividualProjectQuery } from "@/redux/Project/ProjectApi";
import { Task } from "@/types/Task";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Page = (props: Props) => {
  const { projectId, workspace_id } = useParams();
  const [projectName, setProjectName] = useState<string>("");
  const [trigger, { isLoading }] = useLazyGetIndividualProjectQuery();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        if (projectId && workspace_id) {
          const response = await trigger({
            projectId: projectId,
            workspaceId: workspace_id,
            page,
          }).unwrap();

          if (page === 1) {
            setProjectName(response.project.title);
            setTotalPages(response.pagination.totalPages);
            setTasks(response.project.tasks);
          } else {
            setTasks((prev) => [...prev, ...response.project.tasks]);
          }

          setHasMore(page < response.pagination.totalPages);
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoadingMore(false); // <-- always reset after fetch
      }
    };

    fetchProjectDetail();
  }, [projectId, workspace_id, page]);

  const loadMore = async () => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-col gap-2 min-h-screen w-full  pb-20">
      <div className="w-full font-semibold tracking-tight capitalize text-5xl">
        # {projectName}
      </div>
      {tasks &&
        tasks.map((task) => (
          <ProjectList
            task={task}
            key={task.id}
            workspace_id={workspace_id as string}
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

export default Page;
