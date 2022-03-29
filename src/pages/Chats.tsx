import { useEffect } from "react";
import { useState } from "@hookstate/core";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { HashLoader } from "react-spinners";
import { useSearchParams, useParams } from "react-router-dom";

import { CenterCenter, Message } from "../components";
import { loadingState } from "../globalStates";
import { instant } from "../api/instant";
import { MessageType } from "../@types/MessageType";
import { messages, nouns } from "../nouns";
import { Box, Heading, Text } from "@chakra-ui/react";

function Chats() {
  const loading = useState(loadingState);

  const [searchParams] = useSearchParams();
  const params = useParams();
  const id = params.id;
  const users = searchParams.get("users");

  const { data, isLoading, remove } = useQuery<
    AxiosResponse<{ messages: MessageType[]; users: string[] }>
  >(
    "chats",
    async () => {
      loading.set(true);
      return instant.get(`/messages/${id}?users=${users}`);
    },
    {
      onSettled: () => loading.set(false),
    }
  );

  useEffect(() => {
    return () => remove();
  }, []);

  if (isLoading)
    return (
      <CenterCenter>
        <HashLoader size={60} color="#F3E9DD" />
      </CenterCenter>
    );

  if (!data?.data.messages.length)
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
        <Text
          fontWeight="bold"
          fontStyle="italic"
          fontSize={20}
          color="telegram.300"
          mr={3}
          mt={3}
        >
          {data?.data.users[0]} {nouns.WITH} {data?.data.users[1]}
        </Text>
        {data?.data.messages.map((message) => (
          <Message key={message.id} message={message} inLink={false} />
        ))}
      </Box>
    </Box>
  );
}

export { Chats };
