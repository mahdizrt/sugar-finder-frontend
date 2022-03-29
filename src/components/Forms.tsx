import { useLayoutEffect } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { HashLoader } from "react-spinners";
import { Box } from "@chakra-ui/react";
import { useState } from "@hookstate/core";

import { Form } from "./Form";
import { instant } from "../api/instant";
import { FormType } from "../@types/FormType";
import { messages } from "../nouns";
import { loadingState } from "../globalStates";
import { CenterCenter } from "./CenterCenter";

type FormsProps = {
  query?: string;
};

function Forms({ query = "" }: FormsProps) {
  const loading = useState(loadingState);

  const { data, isLoading, refetch, remove } = useQuery<
    AxiosResponse<FormType[]>
  >(
    "forms",
    () => {
      loading.set(true);
      return instant.get(`/forms${query}`);
    },
    {
      onSettled: () => loading.set(false),
    }
  );

  useLayoutEffect(() => {
    remove();
  }, []);

  if (isLoading)
    return (
      <CenterCenter>
        <HashLoader size={60} color="#F3E9DD" />
      </CenterCenter>
    );

  if (!data?.data.length)
    return <CenterCenter>{messages.SEARCH_FORM_NOT_FOUND_2}</CenterCenter>;

  return (
    <Box display="flex" flexWrap="wrap" gap="30px" p={7}>
      {data?.data.map((form) => (
        <Form form={form} key={form.id.toString()} refetch={refetch} />
      ))}
    </Box>
  );
}

export { Forms };
