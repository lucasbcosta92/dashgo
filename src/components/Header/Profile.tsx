import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Lucas Barbosa</Text>
        <Text color="gray.300" fontSize="small">
          email@email.com.br
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Lucas Barbosa"
        src="https://github.com/lucasbcosta92.png"
      ></Avatar>
    </Flex>
  );
}
