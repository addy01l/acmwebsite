import { Request, Response } from 'express';
import prisma from '../config/db';
import { z } from 'zod';
import ExcelJS from 'exceljs';
import path from 'path';

// Schema for membership submission (validation happens on strings before conversion)
const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  branch: z.string().min(2),
  year: z.string().transform((val) => parseInt(val, 10)),
  enrollmentNo: z.string().min(5),
  skills: z.string().min(2),
});

export const submitApplication = async (req: Request, res: Response) => {
  try {
    // Validate fields
    const parsedData = applicationSchema.parse(req.body);

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // Check if email or enrollment number is already registered
    const existingApplication = await prisma.membershipApplication.findFirst({
      where: {
        OR: [
          { email: parsedData.email },
          { enrollmentNo: parsedData.enrollmentNo },
        ],
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'An application has already been submitted with this email or enrollment number.',
      });
    }

    // Path relative to web access (e.g. static served folder `/uploads/resumes/...`)
    const resumePath = `/uploads/resumes/${req.file.filename}`;

    const application = await prisma.membershipApplication.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        branch: parsedData.branch,
        year: parsedData.year,
        enrollmentNo: parsedData.enrollmentNo,
        skills: parsedData.skills,
        resumeUrl: resumePath,
        status: 'pending',
      },
    });

    return res.status(201).json({
      message: 'Application submitted successfully!',
      application,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error('Submit application error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const where: any = {};
    if (status) {
      where.status = status as string;
    }

    const applications = await prisma.membershipApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(applications);
  } catch (error) {
    console.error('Fetch applications error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await prisma.membershipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApplication = await prisma.membershipApplication.update({
      where: { id },
      data: { status },
    });

    // If status is updated to approved, add to the Member directory
    if (status === 'approved') {
      const existingMember = await prisma.member.findUnique({
        where: { email: application.email },
      });

      if (!existingMember) {
        await prisma.member.create({
          data: {
            name: application.name,
            email: application.email,
            phone: application.phone,
            branch: application.branch,
            year: application.year,
            enrollmentNo: application.enrollmentNo,
          },
        });
      }
    } else {
      // If downgraded from approved or rejected, remove from Members if exists
      const existingMember = await prisma.member.findUnique({
        where: { email: application.email },
      });

      if (existingMember) {
        await prisma.member.delete({
          where: { email: application.email },
        });
      }
    }

    return res.status(200).json({
      message: `Application status updated to ${status}`,
      application: updatedApplication,
    });
  } catch (error) {
    console.error('Update application status error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: { name: 'asc' },
    });
    return res.status(200).json(members);
  } catch (error) {
    console.error('Fetch members error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const member = await prisma.member.findUnique({ where: { id } });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await prisma.member.delete({ where: { id } });
    
    // Set matching application status back to pending or rejected
    await prisma.membershipApplication.updateMany({
      where: { email: member.email },
      data: { status: 'pending' },
    });

    return res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Delete member error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const exportApplicationsToExcel = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const where: any = {};
    if (status) {
      where.status = status as string;
    }

    const applications = await prisma.membershipApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ACM Membership Applications');

    // Define columns
    worksheet.columns = [
      { header: 'S.No', key: 'sno', width: 8 },
      { header: 'Full Name', key: 'name', width: 25 },
      { header: 'Email Address', key: 'email', width: 30 },
      { header: 'Phone Number', key: 'phone', width: 15 },
      { header: 'Branch/Department', key: 'branch', width: 20 },
      { header: 'Current Year', key: 'year', width: 12 },
      { header: 'Enrollment Number', key: 'enrollmentNo', width: 20 },
      { header: 'Skills & Tech Stack', key: 'skills', width: 40 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Submitted Date', key: 'createdAt', width: 20 },
      { header: 'Resume URL', key: 'resumeUrl', width: 40 },
    ];

    // Style Header Row
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '007BFF' }, // ACM Blue accent
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 11,
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    headerRow.height = 25;

    // Add rows
    applications.forEach((app, idx) => {
      worksheet.addRow({
        sno: idx + 1,
        name: app.name,
        email: app.email,
        phone: app.phone,
        branch: app.branch,
        year: app.year,
        enrollmentNo: app.enrollmentNo,
        skills: app.skills,
        status: app.status.toUpperCase(),
        createdAt: app.createdAt.toISOString().split('T')[0],
        resumeUrl: app.resumeUrl,
      });
    });

    // Style body cells
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
          cell.border = {
            top: { style: 'thin', color: { argb: 'E2E8F0' } },
            left: { style: 'thin', color: { argb: 'E2E8F0' } },
            bottom: { style: 'thin', color: { argb: 'E2E8F0' } },
            right: { style: 'thin', color: { argb: 'E2E8F0' } },
          };
        });
      }
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=acm_applications_${status || 'all'}_${Date.now()}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Excel export error:', error);
    return res.status(500).json({ message: 'Server error exporting data' });
  }
};
