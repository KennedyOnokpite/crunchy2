import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const username = cookies.get("username");
  return {
    username,
    // 'username': localStorage.getItem('username')
  };
};
