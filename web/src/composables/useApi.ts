import type { ApiResponse } from "@/config/http-client";
import { ref } from "vue";

type UseApiProps<Args extends unknown[], S, E> = {
  fn: (...args: Args) => Promise<ApiResponse<S, E>>;
  onSuccess?: (message: string, data: S) => void;
  onError?: (message: string, data: E) => void;
};

export function useApi<Args extends unknown[], S, E>({ fn, onSuccess, onError }: UseApiProps<Args, S, E>) {
  const data = ref<S>();
  const loading = ref(false);

  const execute = async (...args: Args) => {
    loading.value = true;
    try {
      const res = await fn(...args);

      if (res.resType === "success") {
        onSuccess?.(res.resData.message, res.resData.data);
        data.value = res.resData.data;
      } else if (res.resType === "error") {
        onError?.(res.resData.message, res.resData.data as E);
      }
    } catch (err: any) {
      onError?.(err.message || "Unknown error", null as any);
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, execute };
}
