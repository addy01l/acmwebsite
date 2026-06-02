import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const newsletterSchema = z.object({
  email: z.string().email(),
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const body = contactSchema.parse(req.body);

    const message = await prisma.contactMessage.create({
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
        isRead: false,
      },
    });

    return res.status(201).json({
      message: 'Message sent successfully! We will get back to you shortly.',
      data: message,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Submit contact message error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Fetch messages error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const markMessageRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const messageExists = await prisma.contactMessage.findUnique({ where: { id } });
    if (!messageExists) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: !!isRead },
    });

    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Update message read state error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const body = newsletterSchema.parse(req.body);

    const existingSub = await prisma.newsletterSubscriber.findUnique({
      where: { email: body.email },
    });

    if (existingSub) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: body.email },
    });

    return res.status(201).json({ message: 'Subscribed to newsletter successfully!' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Newsletter subscribe error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getNewsletterSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
