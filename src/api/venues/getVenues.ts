import useFetchAPI from "../fetch";

interface GetVenuesProps {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}
export default function GetVenues({
  page,
  limit,
  sortBy,
  sortOrder,
}: GetVenuesProps) {
  const url = `https://v2.api.noroff.dev/holidaze/venues?page=${page}&limit=${limit}&sort=${sortBy}&sortOrder=${sortOrder}`;

  return useFetchAPI({ url });
}
