import { Box, Button, Center, Stack, Text } from "native-base";

export default function Dashboard() {
  return (
    <Stack>
      <Box bg="violet.600" w="full" h={80}>
        <Center flex={1}>
          <Button bg="white" _pressed={{ bg: "gray.200" }}>
            <Text fontSize={22} color="black" px={10}>
              Create note
            </Text>
          </Button>
        </Center>
      </Box>
      <Box p={5}>
        <Text fontSize={21} fontWeight="bold">
          Notes:
        </Text>
      </Box>
    </Stack>
  );
}
