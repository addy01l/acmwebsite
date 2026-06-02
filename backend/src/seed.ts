import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  // 1. Seed Admin User
  const adminEmail = 'admin@acmshivalik.org';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword123', salt);
    await prisma.user.create({
      data: {
        name: 'ACM Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('Admin user seeded (admin@acmshivalik.org / adminpassword123)');
  } else {
    console.log('Admin user already exists');
  }

  // 2. Seed 9 ACM Domains
  const domains = [
    {
      name: 'Tech',
      description: 'Web development, mobile apps, DevOps, and cloud systems. We build and maintain all digital platforms for the chapter.',
      skills: ['React', 'Next.js', 'Node.js', 'Docker', 'AWS', 'Git'],
      teamLeads: 'Aarav Sharma & Rohit Negi',
      icon: 'Code',
    },
    {
      name: 'Competitive Programming',
      description: 'Focuses on data structures, algorithms, problem-solving, and preparing students for ICPC, CodeChef, and LeetCode challenges.',
      skills: ['C++', 'Java', 'Algorithms', 'Data Structures', 'Greedy', 'Dynamic Programming'],
      teamLeads: 'Ishita Rawat',
      icon: 'Cpu',
    },
    {
      name: 'Design',
      description: 'Creating stunning visuals, posters, branding, UI/UX designs, and motion graphics for all ACM events and communications.',
      skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'UI/UX', 'Typography'],
      teamLeads: 'Kabir Thapa',
      icon: 'Palette',
    },
    {
      name: 'Management',
      description: 'The operational backbone. Handles event permissions, logistics, anchors, registrations, sponsorships, and budgeting.',
      skills: ['Event Planning', 'Public Speaking', 'Budgeting', 'Resource Management', 'Leadership'],
      teamLeads: 'Aditi Joshi & Divyansh Semwal',
      icon: 'Briefcase',
    },
    {
      name: 'Research',
      description: 'Fosters academic publications, exploring new technologies (AI/ML, Web3, IoT), writing research papers, and technical writing.',
      skills: ['Machine Learning', 'AI', 'LaTeX', 'Data Analysis', 'Research Methodology'],
      teamLeads: 'Dr. Sandeep Kumar & Ananya Sen',
      icon: 'BookOpen',
    },
    {
      name: 'Community',
      description: 'Handles student engagement, Discord moderation, outreach, social services, collaborations, and alumni networking.',
      skills: ['Public Relations', 'Community Building', 'Networking', 'Discord Ops'],
      teamLeads: 'Pooja Bhatt',
      icon: 'Users',
    },
    {
      name: 'Seminars',
      description: 'Organizes tech talks, industry expert interactions, alumni mentorship panels, and career guidance seminars.',
      skills: ['Speaker Management', 'Content Creation', 'Anchor Management', 'Webinar Tools'],
      teamLeads: 'Manas Kothari',
      icon: 'Presentation',
    },
    {
      name: 'Conferences',
      description: 'Arranges large-scale technical symposia, research presentations, and national-level student convocations.',
      skills: ['Abstract Review', 'Event Hosting', 'Academic Scheduling', 'PR'],
      teamLeads: 'Dr. Sandeep Kumar',
      icon: 'Globe',
    },
    {
      name: 'Startups',
      description: 'Incubating entrepreneurial ideas, pitch-deck guidance, business analysis, and connecting student founders with mentors.',
      skills: ['Business Model Canvas', 'Pitching', 'Finance', 'Market Research'],
      teamLeads: 'Siddharth Dobhal',
      icon: 'Rocket',
    },
  ];

  for (const d of domains) {
    await prisma.domain.upsert({
      where: { name: d.name },
      update: {
        description: d.description,
        skills: d.skills.join(', '),
        teamLeads: d.teamLeads,
        icon: d.icon,
      },
      create: {
        name: d.name,
        description: d.description,
        skills: d.skills.join(', '),
        teamLeads: d.teamLeads,
        icon: d.icon,
      },
    });
  }
  console.log('Seeded 9 ACM Domains');

  // 3. Seed initial Team Members
  const teamMembers = [
    {
      name: 'Dr. Sandeep Kumar',
      position: 'Faculty Coordinator',
      department: 'Computer Science & Engineering',
      category: 'Faculty Coordinator',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com/in/sandeep-kumar',
      github: 'https://github.com/sandeepkumar',
      email: 'sandeep.kumar@shivalikcollege.edu.in',
      order: 1,
    },
    {
      name: 'Aarav Sharma',
      position: 'Chairperson',
      department: 'Computer Science & Engineering',
      category: 'Executive Board',
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com/in/aaravsharma',
      github: 'https://github.com/aaravsharma',
      email: 'aarav.sharma.acm@gmail.com',
      order: 2,
    },
    {
      name: 'Ishita Rawat',
      position: 'Vice-Chairperson & CP Lead',
      department: 'Computer Science & Engineering',
      category: 'Executive Board',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com/in/ishitarawat',
      github: 'https://github.com/ishitarawat',
      email: 'ishita.rawat.acm@gmail.com',
      order: 3,
    },
    {
      name: 'Rohit Negi',
      position: 'Technical Lead',
      department: 'Computer Science & Engineering',
      category: 'Technical Team',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com/in/rohitnegi',
      github: 'https://github.com/rohitnegi',
      email: 'rohit.negi.acm@gmail.com',
      order: 4,
    },
    {
      name: 'Kabir Thapa',
      position: 'Design Lead',
      department: 'Computer Science & Engineering',
      category: 'Design Team',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      linkedin: 'https://linkedin.com/in/kabirthapa',
      github: 'https://github.com/kabirthapa',
      email: 'kabir.thapa.acm@gmail.com',
      order: 5,
    },
  ];

  await prisma.teamMember.deleteMany({});
  for (const tm of teamMembers) {
    await prisma.teamMember.create({
      data: tm,
    });
  }
  console.log('Seeded Team Members');

  // 4. Seed initial Events
  const events = [
    {
      title: 'Shivalik Hack-a-thon 2026',
      description: 'A 36-hour non-stop hackathon challenging student developers to solve real-world problems in Healthcare, FinTech, and Smart Education.',
      category: 'Hackathons',
      date: new Date('2026-10-15T09:00:00Z'),
      venue: 'Main Auditorium, SCE Dehradun',
      banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      regLink: 'https://forms.gle/shivalikhack2026',
      isUpcoming: true,
    },
    {
      title: 'Hands-on Web Dev Workshop',
      description: 'Learn modern full-stack web development using Next.js 15, Tailwind CSS, and Prisma ORM. From absolute scratch to cloud deployment.',
      category: 'Workshops',
      date: new Date('2026-03-12T10:00:00Z'),
      venue: 'Lab 4, CSE Department',
      banner: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
      regLink: null,
      isUpcoming: false,
    },
    {
      title: 'Competitive Programming Masterclass',
      description: 'A deep-dive seminar exploring graph algorithms and dynamic programming patterns to crack top product-company interviews.',
      category: 'Seminars',
      date: new Date('2026-02-05T11:00:00Z'),
      venue: 'Seminar Hall 2, SCE Dehradun',
      banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      regLink: null,
      isUpcoming: false,
    },
  ];

  await prisma.event.deleteMany({});
  for (const e of events) {
    const createdEvent = await prisma.event.create({
      data: e,
    });

    // Seed mock gallery images for past events
    if (!e.isUpcoming) {
      await prisma.eventGallery.createMany({
        data: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400',
            eventId: createdEvent.id,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400',
            eventId: createdEvent.id,
          },
        ]
      });
    }
  }
  console.log('Seeded Events and Gallery');
  
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
