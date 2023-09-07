import {
  hashPassword,
  generateToken,
  sendVerificationEmail,
} from "../../lib/auth";
import { saveUser, isEmailDuplicate } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ||
    password.length < 8
  ) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  try {
    if (await isEmailDuplicate(email)) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await saveUser({ email, password: hashedPassword });

    const verificationToken = generateToken(user);

    await sendVerificationEmail(email, verificationToken);

    res
      .status(201)
      .json({ message: "User registered, verification email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
