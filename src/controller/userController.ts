import  { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import nodemailer from 'nodemailer';


class  UserController extends User{
  static  register =async (req: Request, res: Response) => {

    try {
      const userData: IUser = req.body;
      const newUser = new User(userData);
      await newUser.save();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userData.email,
        subject: 'Course Registration Confirmation',
        text: 'You have successfully registered for your favorite course!',
      };
  
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully!');
        }
      })
  
      res.status(201).json({ message: 'User registered successfully',redirectTo: 'register.html' });
      // res.render('success', { message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }
  static  getByEmail =async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
     
    } catch (error) {
      console.error('Error fetching emails:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  static  getByCourse =async (req: Request, res: Response) => {
    try {
      const course = req.params.course;
      const users = await User.find({ course });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}


export default UserController;
