import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { User } from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "@/utils/emailService";

export const userRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      await connectDB();

      // Check if user already exists
      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      const generatedOtp = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      const userData = {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        otp: generatedOtp,
        otpExpiry: otpExpiry,
        verified: false,
        otpAttempts: 0,
        interests: [],
      };

      // console.log("User data to be saved:", userData);

      const newUser = new User(userData);
      await newUser.save();
      const addOtp = await User.findByIdAndUpdate(
        newUser._id,
        { $set: { otp: generatedOtp } },
        { new: true }
      );

      console.log("Created user with OTP:", addOtp);

      // Send OTP email
      await sendOTPEmail(input.email, generatedOtp, input.name);

      return {
        success: true,
        message:
          "User created successfully. Please verify your email with the OTP sent.",
        userData: {
          userId: newUser._id,
          username: newUser.name,
          interests: newUser.interests,
        },
      };
    }),

  /*   verifyEmail: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await connectDB();
      const user = await User.findOneAndUpdate(
        { verificationCode: input.code },
        { verified: true, verificationCode: null },
        { new: true }
      );

      if (!user) {
        throw new Error("Invalid verification code");
      }

      return { success: true, message: "Email verified successfully" };
    }), */

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await connectDB();
      const user = await User.findOne({ email: input.email });

      if (!user) {
        throw new Error("User not found");
      }

      const validPassword = await bcrypt.compare(input.password, user.password);
      if (!validPassword) {
        throw new Error("Invalid password");
      }

      if (!user.verified) {
        throw new Error("Please verify your email first");
      }

      return {
        success: true,
        userData: {
          userId: user._id,
          name: user.name,
          // email: user.email,
          interests: user.interests,
        },
      };
    }),
});
