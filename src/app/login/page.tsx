"use client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

import { Toaster, toast } from "react-hot-toast";

interface User {
  email: any;
  password: any;
}

interface Errors {
  email?: any;
  password?: any;
}

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validateInputs = () => {
    const newErrors: Errors = {};

    if (!user.email) {
      newErrors.email = "Please fill the email";
    }
    if (!user.password) {
      newErrors.password = "Please fill the password";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const onLogin = async () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        setLoading(false);

        return;
      }

      toast.success("Login success");

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange =
    (field: keyof User) => (e: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [field]: e.target.value });

      if (errors[field]) {
        setErrors((prevErrors) => {
          const { [field]: _, ...rest } = prevErrors;
          return rest;
        });
      }
    };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.900", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            color={"white"}
            mt={-1}
            fontSize={"4xl"}
            textAlign={"center"}
          >
            Login up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.400", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="text"
                value={user.email}
                onChange={handleInputChange("email")}
                placeholder="Enter Your Email"
                _placeholder={{ color: "black" }}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user.password}
                  onChange={handleInputChange("password")}
                  placeholder="Enter Your Password"
                  _placeholder={{ color: "black" }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText={"Logging.."}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onLogin}
                isLoading={loading}
                isDisabled={loading}
              >
                Login
              </Button>
            </Stack>
            <Stack align={"center"} pt={6}>
              <Text display={"flex"}>
                New Here?
                <Link href="/signup">Signup</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Toaster />
    </Flex>
  );
}
