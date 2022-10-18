import chalk from 'chalk';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateToken.js';
import userModel from '../models/userModel.js';


// USER SIGNUP
export const signUp = async (req, res) => {
    try {
        const { email, number, password } = req.body;

        // checking user already exist
        const user = await userModel.findOne({ email: email });

        if (user) {
            return res.status(403).json({
                status: false,
                error: 'Another account is using this email.',
            });
        }

        //password hashing
        const hashedPassword = await bcrypt.hash(password, 12);

        // saving to DB
        const newUser = new userModel({
            number: number,
            email: email,
            password: hashedPassword,
        });

        await newUser.save(async (err, result) => {
            if (err) {
                console.log(err.message);
                return res
                    .status(403)
                    .json({ status: false, error: err.message });
            }

            const token = await generateAccessToken(
                result.email,
                result.username,
                result._id
            );

            const refreshToken = await generateRefreshToken(
                result.email,
                result.username,
                result._id
            );

            return res.status(201).json({
                status: true,
                message: 'Register Successfully',
                token,
                refreshToken,
            });
        });
    } catch (error) {
        console.log(chalk.red(error.message));
        return res.status(404).json({ error: error.message });
    }
};
  

// USER SIGNIN
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // checking if user exist in DB
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                status: false,
                error: "The email you entered doesn't belong to an account. Please check your email and try again.",
            });
        }

        // Comparing plain password to hashed password
        await bcrypt.compare(password, user.password).then(async (status) => {
            if (!status) {
                return res.status(401).json({
                    status: false,
                    error: 'Your password was incorrect. Please double-check your password.',
                });
            }

            // Generating JWT token
            const token = await generateAccessToken(
                user.email,
                user.username,
                user._id
            );

            const refreshToken = await generateRefreshToken(
                user.email,
                user.username,
                user._id
            );

            await userModel.findByIdAndUpdate(
                { _id: user._id },
                { $set: { refreshToken: refreshToken } }
            );
            console.log(chalk.green('Login Successfully'));
            return res.status(200).json({
                status: 'ok',
                msg: 'Sign in Success',
                token,
                refreshToken,
            });
        });
    } catch (error) {
        console.log(chalk.red(error));
        return res.status(404).json(error);
    }
};


// USER FORGOT PASSWORD
export const ForgotPassword = async (req, res) => {
    try {
  
      // Checking if user exist
      const user = await userModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).json({
          status: false,
          error:
            "The email you entered doesn't belong to an account. Please check your email and try again.",
        });
      }
  
      // Generating reset token
      const token = await Jwt.sign(
        { id: user._id, name: user.username, email: user.email },
        process.env.JWT_RESET_PASSWORD_KEY,
        { expiresIn: "5m" }
      );

      try {
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          secure: true,
          auth: {
            user: process.env.GOOGLE_APP_EMAIL,
            pass: process.env.GOOGLE_APP_PASS,
          },
        });
  
        const mailOptions = {
          from: "mohamedsabithmp@gmail.com",
          to: req.body.email,
          subject: "Reset Account Password Link",
          html: `
          <h3>Please click the link below to reset your password</h3>
          <P>${process.env.CLIENT_URL}/resetPassword/${token}</P>
          `,
        };
  
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.log(chalk.red(error));
            return res.status(400).json({
              status: false,
              error: "Something went wrong. please try again later",
            });
          }
          console.log(chalk.green(`Email successfully sent ${req.body.email}`));
          return res.status(200).json({
            status: "ok",
            message: "Check your email for a link to reset your password",
            token,
          });
        });
      } catch (error) {
        console.log(chalk.red(error));
        return res.status(404).json(error);
      }
    } catch (error) {
      console.log(chalk.red(error));
      return res.status(404).json(error);
    }
  };
  

  // USER RESET PASSWORD
export const ResetPassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;
  
    try {
      Jwt.verify(
        token,
        process.env.JWT_RESET_PASSWORD_KEY,
        async (err, decodedToken) => {
          if (err) {
            return res.status(400).json({
              status: false,
              error: "Your password reset link has expired",
            });
          }
          const data = { password, confirmPassword };
          // Data Validation
          const dataValidation = await resetPasswordValidation(data);
  
          if (dataValidation.error) {
            return res.status(400).json({
              status: false,
              error: dataValidation.error.details[0].message,
            });
          }
  
          const hashedPassword = await bcrypt.hash(password, 12);
          await userModel
            .findByIdAndUpdate(
              { _id: decodedToken.id },
              { $set: { password: hashedPassword } }
            )
            .then(() =>
              res.status(200).json({
                status: "ok",
                msg: "Your password successfully changed.",
              })
            )
            // eslint-disable-next-line no-shadow
            .catch((err) => {
              console.log(chalk.red(err));
              return res.status(400).json({
                status: false,
                error: "Something went wrong. please try again later",
              });
            });
        }
      );
    } catch (error) {
      console.log(chalk.red(error));
      return res.status(404).json(error);
    }
  };
  