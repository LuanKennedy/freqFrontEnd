import axios from "axios";
const useApi = () => {
  async function useGet(url) {
    const response = await axios.get("http://localhost:8080/api" + url);
    return response;
  }

  async function useDelete(url) {
    const response = await axios.delete("http://localhost:8080/api" + url);
    return response;
  }

  async function usePost(url, data) {
    const response = await axios.post("http://localhost:8080/api" + url, data);
    return response;
  }

  async function usePut(url, data) {
    const response = await axios.put("http://localhost:8080/api" + url, data);
    return response;
  }

  return {
    useGet,
    useDelete,
    usePost,
    usePut,
  };
};

export { useApi };
