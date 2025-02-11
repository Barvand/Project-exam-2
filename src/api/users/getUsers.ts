import useFetchAPI from "../fetch";

// GET ALL PROFILES? NOT SURE IF I WILL USE IT -- DO NOT FORGET
interface GetProfilesProp {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}
export default function GetUsers({
  page,
  limit,
  sortBy,
  sortOrder,
}: GetProfilesProp) {
  const url = `https://v2.api.noroff.dev/holidaze/profiles?page=${page}&limit=${limit}&sort=${sortBy}&sortOrder=${sortOrder}`;

  return useFetchAPI({ url });
}
