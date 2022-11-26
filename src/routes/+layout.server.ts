import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const username = cookies.get("username");
  const userToken = cookies.get("userToken");
  return {
    username,
    userToken,
    // 'username': localStorage.getItem('username')
  };
};
