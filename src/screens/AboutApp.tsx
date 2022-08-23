import { Box, Center, Container, Heading, Link, Text } from "native-base";
import HeaderWithBackButton from "../components/HeaderWithBackButton";

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} style={{ transform: [{ translateY: 4 }] }}>
      {children}
    </Link>
  );
}

export default function AboutApp() {
  return (
    <>
      <Box px={5}>
        <HeaderWithBackButton returnTo="Settings" />
      </Box>
      <Center flex={1}>
        <Heading mb={5} textAlign="center" fontSize={27}>
          About App
        </Heading>

        <Container>
          <Text textAlign="center" fontSize={16} fontWeight={300}>
            This app was created by{" "}
            <ExternalLink href="https://josuenm-portfolio.vercel.app">
              Josué Mendonça
            </ExternalLink>
            , the app is a continuation of the web app. The purpose of creating
            this app was to practice my skills with React Native using Expo and{" "}
            <ExternalLink href="https://nativebase.io">
              Native Base
            </ExternalLink>
            .
          </Text>
        </Container>
      </Center>
    </>
  );
}
