import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Lucas Barbosa</Text>
          <Text color="gray.300" fontSize="small">
            email@email.com.br
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Lucas Barbosa"
        src="https://github.com/lucasbcosta92.png"
      ></Avatar>
    </Flex>
  );
}
