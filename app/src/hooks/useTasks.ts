import { useCallback, useEffect, useState } from "react";
import { Task } from "../types/Task";
import { List, Pagination } from "../types/Pagination";
import { getTasks } from "../apis/tasks";

export default function useTasks(pagination: Pagination) {
  const [error, setError] = useState<unknown>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<List<Task>>({
    total: 0,
    data: [],
  });

  const getList = useCallback(async () => {
    console.log("requesting tasks");
    setIsLoading(true);
    try {
      const res = await getTasks(pagination);
      setList(res);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    getList();
  }, [getList]);

  const updateList = async () => {
    getList();
  };

  return {
    error,
    isLoading,
    ...list,
    updateList,
  };
}
