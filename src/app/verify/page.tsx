"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/utils/trpc";

const VerifyPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verificationEmail");
    if (!storedEmail) {
      router.push("/signup");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const verifyOTP = trpc.user.verifyOTP.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Email verified successfully!",
      });
      localStorage.removeItem("verificationEmail");
      router.push("/interests");
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const resendOTP = trpc.user.generateOTP.useMutation({
    onSuccess: () => {
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your email.",
      });
      setTimeLeft(60); // Set 60 seconds cooldown
      setCode(""); // Clear the input
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleVerify = () => {
    if (code.length === 8) {
      setIsSubmitting(true);
      verifyOTP.mutate({ email, otp: code });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid verification code.",
      });
    }
  };

  const handleResendCode = () => {
    if (timeLeft > 0) return;
    resendOTP.mutate({ email });
  };

  const maskedEmail = email ? email.replace(/(.{3}).*(@.*)/, "$1***$2") : "";

  // if (!email) {
  //   return null; // or a loading state
  // }

  return (
    <div className="container max-w-xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 border-2">
        <h1 className="text-2xl font-bold text-center mb-2">
          Verify your email
        </h1>
        <div className="flex justify-center mb-8">
          <p className="text-center text-gray-600 w-80">
            Enter the 8 digit code you have received on {maskedEmail}
          </p>
        </div>

        <div className="flex flex-col sm:items-start items-center sm:mx-6 mb-10">
          <p className="text-sm font-semibold mb-2">Code</p>
          <InputOTP
            value={code}
            onChange={(value) => setCode(value)}
            maxLength={8}
            render={({ slots }) => (
              <InputOTPGroup className="">
                {slots.map((slot, index) => (
                  <React.Fragment key={index}>
                    <InputOTPSlot {...slot} />
                    {index < slots.length - 1 && <div className="sm:w-3" />}
                  </React.Fragment>
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <Button
          className="w-[calc(100%-50px)] flex justify-center items-center uppercase mx-auto"
          onClick={handleVerify}
          disabled={code.length !== 8 || isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>

        <div className="text-center">
          <Button
            variant="link"
            onClick={handleResendCode}
            disabled={timeLeft > 0}
            className="text-sm"
          >
            {timeLeft > 0
              ? `Resend code in ${timeLeft}s`
              : "Didn't receive the code? Resend"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
