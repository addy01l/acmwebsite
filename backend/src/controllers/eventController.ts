import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(['Hackathons', 'Workshops', 'Seminars', 'Coding Contests', 'Research Events']),
  date: z.string().transform((str) => new Date(str)),
  venue: z.string().min(2),
  banner: z.string().url().or(z.string().min(1)), // URL or local path
  regLink: z.string().url().optional().nullable(),
  isUpcoming: z.boolean().default(true),
});

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const { category, isUpcoming } = req.query;

    const where: any = {};
    if (category) {
      where.category = category as string;
    }
    if (isUpcoming !== undefined) {
      where.isUpcoming = isUpcoming === 'true';
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      include: { gallery: true },
    });

    return res.status(200).json(events);
  } catch (error) {
    console.error('Fetch events error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { gallery: true },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error('Fetch event by ID error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const body = eventSchema.parse(req.body);
    
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        date: body.date,
        venue: body.venue,
        banner: body.banner,
        regLink: body.regLink,
        isUpcoming: body.isUpcoming,
      },
    });

    return res.status(201).json(event);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Create event error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = eventSchema.partial().parse(req.body);

    const eventExists = await prisma.event.findUnique({ where: { id } });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.category && { category: body.category }),
        ...(body.date && { date: body.date }),
        ...(body.venue && { venue: body.venue }),
        ...(body.banner && { banner: body.banner }),
        ...(body.regLink !== undefined && { regLink: body.regLink }),
        ...(body.isUpcoming !== undefined && { isUpcoming: body.isUpcoming }),
      },
    });

    return res.status(200).json(updatedEvent);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Update event error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eventExists = await prisma.event.findUnique({ where: { id } });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await prisma.event.delete({ where: { id } });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const addGalleryImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }

    const eventExists = await prisma.event.findUnique({ where: { id } });
    if (!eventExists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newGalleryItem = await prisma.eventGallery.create({
      data: {
        imageUrl,
        eventId: id,
      },
    });

    return res.status(201).json(newGalleryItem);
  } catch (error) {
    console.error('Add gallery image error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response) => {
  try {
    const { galleryId } = req.params;

    const galleryItemExists = await prisma.eventGallery.findUnique({ where: { id: galleryId } });
    if (!galleryItemExists) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await prisma.eventGallery.delete({ where: { id: galleryId } });
    return res.status(200).json({ message: 'Gallery image removed successfully' });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getDomains = async (req: Request, res: Response) => {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { name: 'asc' },
    });
    return res.status(200).json(domains);
  } catch (error) {
    console.error('Fetch domains error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
