import { useState } from "@hookstate/core";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import { Box } from "@chakra-ui/react";

import { loadingState } from "../globalStates";
import { instant } from "../api/instant";
import { CenterCenter, Message } from "../components";
import { AxiosResponse } from "axios";
import { MessageType } from "../@types/MessageType";
import { messages } from "../nouns";

function Messages() {
  const loading = useState(loadingState);

  const { data, isLoading } = useQuery<AxiosResponse<MessageType[]>>(
    "messages",
    async () => {
      loading.set(true);
      return instant.get("/messages");
    },
    {
      onSettled: () => loading.set(false),
    }
  );

  if (isLoading)
    return (
      <CenterCenter>
        <HashLoader size={60} color="#F3E9DD" />
      </CenterCenter>
    );

  if (!data?.data.length)
    return <CenterCenter>{messages.SEARCH_CHAT_NOT_FOUND}</CenterCenter>;

  return (
    <Box display="flex" justifyContent="center">
      <Box
        bg="#5F7464"
        width={{
          sm: "85%",
          xl: "40%",
        }}
        borderRadius={10}
        mb={20}
        mt={5}
        pb={5}
      >
        {data?.data.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
    </Box>
  );
}

export { Messages };
