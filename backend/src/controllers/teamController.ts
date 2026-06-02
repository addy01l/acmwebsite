import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';

const teamMemberSchema = z.object({
  name: z.string().min(2),
  position: z.string().min(2),
  department: z.string().min(2),
  category: z.enum([
    'Faculty Coordinator',
    'Executive Board',
    'Technical Team',
    'Design Team',
    'Management Team',
    'Research Team',
  ]),
  photo: z.string().url().or(z.string().min(1)),
  linkedin: z.string().url().optional().nullable().or(z.literal('')),
  github: z.string().url().optional().nullable().or(z.literal('')),
  email: z.string().email().optional().nullable().or(z.literal('')),
  order: z.number().int().default(0),
});

export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const where: any = {};
    if (category) {
      where.category = category as string;
    }

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    return res.status(200).json(members);
  } catch (error) {
    console.error('Fetch team members error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const body = teamMemberSchema.parse(req.body);

    const newMember = await prisma.teamMember.create({
      data: {
        name: body.name,
        position: body.position,
        department: body.department,
        category: body.category,
        photo: body.photo,
        linkedin: body.linkedin || null,
        github: body.github || null,
        email: body.email || null,
        order: body.order,
      },
    });

    return res.status(201).json(newMember);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Create team member error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = teamMemberSchema.partial().parse(req.body);

    const memberExists = await prisma.teamMember.findUnique({ where: { id } });
    if (!memberExists) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.position && { position: body.position }),
        ...(body.department && { department: body.department }),
        ...(body.category && { category: body.category }),
        ...(body.photo && { photo: body.photo }),
        ...(body.linkedin !== undefined && { linkedin: body.linkedin || null }),
        ...(body.github !== undefined && { github: body.github || null }),
        ...(body.email !== undefined && { email: body.email || null }),
        ...(body.order !== undefined && { order: body.order }),
      },
    });

    return res.status(200).json(updatedMember);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Update team member error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const memberExists = await prisma.teamMember.findUnique({ where: { id } });
    if (!memberExists) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await prisma.teamMember.delete({ where: { id } });
    return res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
