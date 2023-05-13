import axios from "axios";
const useApi = () => {
  async function useGet(url) {
    const response = await axios.get("https://git.heroku.com/frontfreq.git" + url);
    return response;
  }

  async function useDelete(url) {
    const response = await axios.delete("https://git.heroku.com/frontfreq.git" + url);
    return response;
  }

  async function usePost(url, data) {
    const response = await axios.post("https://git.heroku.com/frontfreq.git    " + url, data);
    return response;
  }

  async function usePut(url, data) {
    const response = await axios.put("https://git.heroku.com/frontfreq.git    " + url, data);
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
