import { Box, Button, Flex, Tooltip, useToast } from "@chakra-ui/react";
import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "@emotion/styled";
import { QueryObserverResult, useMutation } from "react-query";
import { useState } from "@hookstate/core";

import { FormType } from "../@types/FormType";
import { nouns } from "../nouns";
import { instant } from "../api/instant";
import { loadingState } from "../globalStates";
import { AxiosResponse } from "axios";

type FormProps = {
  form: FormType;
  refetch: () => Promise<
    QueryObserverResult<AxiosResponse<FormType[], any>, unknown>
  >;
};

const Code = styled.span`
  font-style: italic;
  user-select: none;
  :hover {
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

function Form({ form, refetch }: FormProps) {
  const loading = useState(loadingState);
  const toast = useToast();

  const deleteForm = useMutation(async () => {
    loading.set(true);
    await instant.delete(`/forms/${form.id}`);
    await refetch();
    loading.set(false);
  });

  const confirmForm = useMutation(async () => {
    loading.set(true);
    await instant
      .put(`/forms/${form.id}/confirmed`, {})
      .then(() => (form.confirmed = true));

    loading.set(false);
  });

  const copyCode = () => {
    toast({
      title: nouns.CODE_COPIED,
      status: "info",
      isClosable: true,
      containerStyle: {
        direction: "ltr",
      },
    });
  };

  return (
    <Box bg="telegram.700" p={3} width="300px" borderRadius={8}>
      <Flex alignItems="center" pb={2}>
        {"📝"}
        {nouns.SPECIFICATIONS}: #{form.type}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🆔"}
        {nouns.CODE}:
        <Tooltip label={nouns.CLICK_TO_COPY}>
          <Box>
            <CopyToClipboard text={form.code} onCopy={copyCode}>
              <Code>{form.code}</Code>
            </CopyToClipboard>
          </Box>
        </Tooltip>
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"📛"}
        {nouns.NAME}: {form.name}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🚺"}
        {"🚹"}
        {nouns.GANDER}: {form.gender}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"⚪️"}
        {nouns.AGE}: {form.age}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"📘"}
        {nouns.EDUCATION}: {form.education}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🟠"}
        {nouns.JOB}: {form.job}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"💰"}
        {nouns.EARNINGS_PER_MONTH}: {form.salary}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🟢"}
        {nouns.HEIGHT}: {form.height}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🟣"}
        {nouns.WEIGHT}: {form.weight}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🏠"}
        {nouns.CITY}: {form.location}
      </Flex>
      <Flex alignItems="center" pb={2}>
        {"🔅"}
        {nouns.CONDITIONS}: {form.conditions}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Button
          colorScheme="red"
          rightIcon={<DeleteIcon />}
          onClick={() => deleteForm.mutate()}
          disabled={deleteForm.isLoading}
        >
          {nouns.DELETE}
        </Button>
        {!form.confirmed && (
          <Button
            colorScheme="blue"
            rightIcon={<CheckCircleIcon />}
            onClick={() => confirmForm.mutate()}
            disabled={confirmForm.isLoading}
          >
            {nouns.CONFIRM}
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export { Form };
