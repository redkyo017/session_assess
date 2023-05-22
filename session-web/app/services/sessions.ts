import { ProgramShortTitle, ProgramStatus } from "../utils/sessions.enum";
import { buildQueryString } from "../utils/utils";

export async function GetSession({
  status,
  shortTitle,
}: {
  status: string;
  shortTitle: string;
}) {
  let endpoint = `http://localhost:3002/sessions`;
  const queryParams = [];
  if (status) {
    queryParams.push(buildQueryString("status", status));
  }
  if (shortTitle) {
    queryParams.push(buildQueryString("short_title", shortTitle));
  }
  if (queryParams.length > 0) {
    endpoint = `${endpoint}?${queryParams.join("&")}`;
  }
  const res = await fetch(endpoint);
  return res.json();
}
