import styled from "@emotion/styled";
import {
  Progress,
  Flex,
  Image,
  Heading,
  Link,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useState } from "@hookstate/core";
import { Link as ReactRouterLink } from "react-router-dom";

import { loadingState } from "../globalStates";

import logoUrl from "../assets/img/logo.png";
import { nouns } from "../nouns";
import { HamburgerIcon } from "@chakra-ui/icons";

const FixedTop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

function Header() {
  const loading = useState(loadingState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <>
      <FixedTop>
        <Progress size="xs" isIndeterminate={loading.get()} />
      </FixedTop>
      <HamburgerIcon
        mr={3}
        w={10}
        h={10}
        color="facebook.400"
        display={{ base: "block", md: "none" }}
        onClick={handleToggle}
        cursor="pointer"
        _hover={{ color: "facebook.500" }}
      />
      <Box display={{ base: isOpen ? "block" : "none", md: "block" }}>
        <Flex alignItems="center" flexDirection={{ base: "column", md: "row" }}>
          <Link
            as={ReactRouterLink}
            to="/"
            display="flex"
            alignItems="center"
            color="blue.400"
          >
            <Image
              src={logoUrl}
              boxSize="12"
              objectFit="contain"
              alt={nouns.LOGO}
            />
            <Heading as="h3" size="lg" pr={2}>
              {nouns.BOT}
            </Heading>
          </Link>
          <Link
            to="/"
            as={ReactRouterLink}
            color="blue.400"
            mr={5}
            width={{ base: "100%", sm: "unset" }}
            textAlign={{ base: "center", sm: "unset" }}
            pt={2}
            pb={2}
          >
            {nouns.ALL}
          </Link>
          <Link
            to="/confirmed"
            as={ReactRouterLink}
            color="blue.400"
            mr={5}
            width={{ base: "100%", sm: "unset" }}
            textAlign={{ base: "center", sm: "unset" }}
            pt={2}
            pb={2}
          >
            {nouns.CONFIRMED}
          </Link>
          <Link
            as={ReactRouterLink}
            to="/unconfirmed"
            color="blue.400"
            mr={5}
            width={{ base: "100%", sm: "unset" }}
            textAlign={{ base: "center", sm: "unset" }}
            pt={2}
            pb={2}
          >
            {nouns.UNCONFIRMED}
          </Link>
          <Link
            as={ReactRouterLink}
            to="/messages"
            color="blue.400"
            mr={5}
            width={{ base: "100%", sm: "unset" }}
            textAlign={{ base: "center", sm: "unset" }}
            pt={2}
            pb={2}
          >
            {nouns.CHATS}
          </Link>
        </Flex>
      </Box>
    </>
  );
}

export { Header };
