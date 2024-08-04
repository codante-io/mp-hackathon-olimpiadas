import { useState, useEffect } from "react";
import { ApiResponse } from "../types/olimpic";

interface FetchingState<ApiResponse> {
  data: ApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<ApiResponse>(): FetchingState<T> {
  const [state, setState] = useState<FetchingState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const cachedData = localStorage.getItem("olympic-data");
    if (cachedData) {
      setState({ data: cachedData, isLoading: false, error: null });
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apis.codante.io/olympic-games/events"
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json(); // Ensure correct typing for 'data'
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error.message || "Unknown error",
        });
      }
      localStorage.setItem("olympic-data", JSON.stringify(state.data));
    };
    fetchData();
  }, []); // Refetch when the URL changes

  return state;
}
