import { getMessagesCount } from "@/api/inbox";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["messagesCount"],
    queryFn: async () => {
      const response = await getMessagesCount();

      return response.data;
    },

    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <div>
      <h1 className="text-xl font-medium">Overview</h1>
      <div className="mt-4 flex flex-col gap-4 flex-wrap md:flex-row">
        <div className="border-2  p-2 sm:p-4 rounded-md grow">
          <h2 className="test-xl tracking-wide">Total Messages</h2>
          <p className="text-4xl font-medium mt-5 text-blue-500">
            {data?.totalMessages}
          </p>
        </div>
        <div className="border-2  p-2 sm:p-4 rounded-md grow">
          <h2 className="test-xl tracking-wide">Unread Messages</h2>
          <p className="text-4xl font-medium mt-5 text-blue-500">
            {data?.unreadMessages}
          </p>
        </div>
        <div className="border-2 p-2 sm:p-4 rounded-md grow">
          <h2 className="test-xl tracking-wide">Read Messages</h2>
          <p className="text-4xl font-medium mt-5 text-blue-500">
            {data?.readMessages}
          </p>
        </div>
      </div>
    </div>
  );
}
