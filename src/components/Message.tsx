import { Link as RouteLink } from "react-router-dom";
import {
  Box,
  Link,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

import { MessageType } from "../@types/MessageType";
import { nouns } from "../nouns";

type MessageProps = {
  message: MessageType;
  inLink?: boolean;
};

function Message({ message, inLink = true }: MessageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pt={3} pr={5} display="flex" alignItems="center">
      <Link
        as={inLink ? RouteLink : "span"}
        {...(inLink
          ? { to: `/chats/${message.id}?users=${message.from},${message.to}` }
          : {})}
        color="blackAlpha.500"
        _hover={{ color: "black" }}
      >
        {message.from.toString(25)} {nouns.TO} {message.to.toString(25)} :{" "}
        <Text as="span" color="black" dir="rtl">
          {message.text}
        </Text>
      </Link>
      <br />
      {message.photo && (
        <Box mr={3} pl={5}>
          <Button colorScheme="telegram" onClick={onOpen}>
            {nouns.SHOW_IMAGE}
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ModalCloseButton />
              <Image
                src={message.photo}
                alt="avatar"
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
}

export { Message };
