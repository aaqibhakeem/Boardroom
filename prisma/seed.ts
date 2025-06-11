import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

// Realistic name data
const firstNames = {
  male: ["James", "Michael", "Robert", "John", "David", "William", "Richard", "Thomas", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Ryan", "Brian", "Jason", "Justin", "Brandon"],
  female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Emily", "Emma", "Olivia", "Sophia", "Isabella"]
};

const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris"];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDateInMonth(year: number, month: number): Date {
  const daysInMonth = new Date(year, month, 0).getDate();
  const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
  return new Date(year, month - 1, randomDay);
}

function getAllSchoolDaysInJune2025(): Date[] {
  const schoolDays = [];
  const year = 2025;
  const month = 6; // June
  
  // Get all weekdays in June 2025 (excluding weekends)
  for (let day = 1; day <= 30; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    
    // Only include Monday (1) through Friday (5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      schoolDays.push(date);
    }
  }
  
  return schoolDays;
}

function getRandomTimeInDay(): { hour: number, minute: number } {
  const hour = Math.floor(Math.random() * 8) + 8; // 8 AM to 4 PM
  const minute = Math.random() > 0.5 ? 0 : 30;
  return { hour, minute };
}

function createDateWithTime(date: Date, hour: number, minute: number): Date {
  const newDate = new Date(date);
  newDate.setHours(hour, minute, 0, 0);
  return newDate;
}

function addHours(date: Date, hours: number): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
}

// Generate more realistic gender distribution (closer to 50/50)
function generateGenderDistribution(total: number): UserSex[] {
  const genders: UserSex[] = [];
  const maleCount = Math.floor(total * 0.52); // Slightly more males (52%)
  const femaleCount = total - maleCount;
  
  // Add males
  for (let i = 0; i < maleCount; i++) {
    genders.push(UserSex.MALE);
  }
  
  // Add females
  for (let i = 0; i < femaleCount; i++) {
    genders.push(UserSex.FEMALE);
  }
  
  // Shuffle to randomize order
  for (let i = genders.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [genders[i], genders[j]] = [genders[j], genders[i]];
  }
  
  return genders;
}

// Generate realistic attendance (higher on Mon-Wed, lower on Fri)
function getAttendanceProbability(date: Date): number {
  const dayOfWeek = date.getDay();
  
  switch (dayOfWeek) {
    case 1: // Monday
      return 0.88;
    case 2: // Tuesday
      return 0.92;
    case 3: // Wednesday
      return 0.91;
    case 4: // Thursday
      return 0.89;
    case 5: // Friday
      return 0.85;
    default:
      return 0.90; // Default fallback
  }
}

async function main() {
  // Clear existing data in the correct order (respecting foreign key constraints)
  console.log("Clearing existing data...");
  
  await prisma.result.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.parent.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.admin.deleteMany({});

  console.log("Creating fresh data...");

  // Create admins
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2", 
      username: "admin2",
    },
  });

  console.log("Created admins...");

  // Create grades first and store their IDs
  const createdGrades = [];
  for (let i = 1; i <= 6; i++) {
    const grade = await prisma.grade.create({
      data: {
        level: i,
      },
    });
    createdGrades.push(grade);
  }

  console.log("Created grades...");

  // Create subjects
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  const createdSubjects = [];
  for (const subject of subjectData) {
    const createdSubject = await prisma.subject.create({ data: subject });
    createdSubjects.push(createdSubject);
  }

  console.log("Created subjects...");

  // Create classes with more realistic capacities
  const createdClasses = [];
  for (let i = 0; i < 6; i++) {
    const classData = await prisma.class.create({
      data: {
        name: `${i + 1}A`,
        gradeId: createdGrades[i].id,
        capacity: Math.floor(Math.random() * (28 - 22 + 1)) + 22, // 22-28 students per class
      },
    });
    createdClasses.push(classData);
  }

  console.log("Created classes...");

  // Generate realistic gender distribution for teachers
  const teacherGenders = generateGenderDistribution(15);

  // Create teachers with realistic data (no profile pictures)
  const createdTeachers = [];
  for (let i = 1; i <= 15; i++) {
    const sex = teacherGenders[i - 1];
    const firstName = sex === UserSex.MALE 
      ? getRandomElement(firstNames.male) 
      : getRandomElement(firstNames.female);
    const lastName = getRandomElement(lastNames);

    const age = Math.floor(Math.random() * 15) + 25; // 25-40 years old
    const birthday = new Date();
    birthday.setFullYear(birthday.getFullYear() - age);
    birthday.setMonth(Math.floor(Math.random() * 12));
    birthday.setDate(Math.floor(Math.random() * 28) + 1);

    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: firstName,
        surname: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@school.edu`, // Added ${i} for uniqueness
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'])} ${getRandomElement(['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane'])}, ${getRandomElement(['Springfield', 'Franklin', 'Georgetown', 'Madison', 'Riverside'])}`,
        bloodType: getRandomElement(bloodTypes),
        sex: sex,
        subjects: { connect: [{ id: createdSubjects[(i - 1) % 10].id }] },
        classes: { connect: [{ id: createdClasses[(i - 1) % 6].id }] },
        birthday: birthday,
      },
    });
    createdTeachers.push(teacher);
  }

  console.log("Created teachers...");

  // Create lessons with proper scheduling - same schedule for all classes, no overlaps
  const createdLessons = [];
  const schoolDays = getAllSchoolDaysInJune2025();
  
  // Define a consistent weekly schedule (time slots that don't overlap)
  const timeSlots = [
    { hour: 8, minute: 0 },   // 8:00 AM
    { hour: 9, minute: 30 },  // 9:30 AM  
    { hour: 11, minute: 0 },  // 11:00 AM
    { hour: 1, minute: 30 },  // 1:30 PM
    { hour: 3, minute: 0 },   // 3:00 PM
  ];
  
  // Create the same lesson schedule for each class
  for (let classIndex = 0; classIndex < createdClasses.length; classIndex++) {
    const currentClass = createdClasses[classIndex];
    
    // Create lessons for each school day
    for (let dayIndex = 0; dayIndex < Math.min(schoolDays.length, 10); dayIndex++) { // Limit to first 10 school days
      const currentDay = schoolDays[dayIndex];
      
      // Create lessons for each time slot
      for (let slotIndex = 0; slotIndex < timeSlots.length; slotIndex++) {
        const timeSlot = timeSlots[slotIndex];
        const startTime = createDateWithTime(currentDay, timeSlot.hour, timeSlot.minute);
        const endTime = addHours(startTime, 1); // 1-hour lessons
        
        // Use subjects in rotation
        const subjectIndex = (dayIndex * timeSlots.length + slotIndex) % createdSubjects.length;
        const teacherIndex = subjectIndex % createdTeachers.length;
        
        const lesson = await prisma.lesson.create({
          data: {
            name: `${subjectData[subjectIndex].name} - Class ${currentClass.name}`,
            day: Day[Object.keys(Day)[currentDay.getDay() - 1] as keyof typeof Day],
            startTime: startTime,
            endTime: endTime,
            subjectId: createdSubjects[subjectIndex].id,
            classId: currentClass.id,
            teacherId: createdTeachers[teacherIndex].id,
          },
        });
        createdLessons.push(lesson);
      }
    }
  }

  console.log("Created lessons...");

  // Create parents with realistic data
  const createdParents = [];
  for (let i = 1; i <= 40; i++) { // More parents to account for single parents and families with multiple children
    const sex = Math.random() > 0.5 ? 'male' : 'female';
    const firstName = sex === 'male' 
      ? getRandomElement(firstNames.male) 
      : getRandomElement(firstNames.female);
    const lastName = getRandomElement(lastNames);

    const parent = await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parent${i}`,
        name: firstName,
        surname: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`, // Added ${i} for uniqueness
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'])} ${getRandomElement(['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane'])}, ${getRandomElement(['Springfield', 'Franklin', 'Georgetown', 'Madison', 'Riverside'])}`,
      },
    });
    createdParents.push(parent);
  }

  console.log("Created parents...");

  // Generate realistic gender distribution for students
  const studentGenders = generateGenderDistribution(120); // More students for better distribution

  // Create students with realistic data (no profile pictures)
  const createdStudents = [];
  for (let i = 1; i <= 120; i++) {
    const sex = studentGenders[i - 1];
    const firstName = sex === UserSex.MALE 
      ? getRandomElement(firstNames.male) 
      : getRandomElement(firstNames.female);
    const lastName = getRandomElement(lastNames);

    const gradeIndex = (i - 1) % 6;
    const gradeLevel = gradeIndex + 1;
    const age = gradeLevel + 5; // Grade 1 = 6 years old, Grade 6 = 11 years old
    const birthday = new Date();
    birthday.setFullYear(birthday.getFullYear() - age);
    birthday.setMonth(Math.floor(Math.random() * 12));
    birthday.setDate(Math.floor(Math.random() * 28) + 1);

    const student = await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: firstName,
        surname: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@student.school.edu`,
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'])} ${getRandomElement(['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane'])}, ${getRandomElement(['Springfield', 'Franklin', 'Georgetown', 'Madison', 'Riverside'])}`,
        bloodType: getRandomElement(bloodTypes),
        sex: sex,
        parentId: `parentId${(Math.floor((i - 1) / 3) % 40) + 1}`, // 2-3 children per parent on average
        gradeId: createdGrades[gradeIndex].id,
        classId: createdClasses[gradeIndex].id,
        birthday: birthday,
      },
    });
    createdStudents.push(student);
  }

  console.log("Created students...");

  // Create exams scheduled throughout June 2025
  const createdExams = [];
  for (let i = 1; i <= 20; i++) {
    const randomSchoolDay = getRandomElement(schoolDays);
    const timeSlot = getRandomTimeInDay();
    const startTime = createDateWithTime(randomSchoolDay, timeSlot.hour, timeSlot.minute);
    const endTime = addHours(startTime, 2); // 2-hour exams

    const exam = await prisma.exam.create({
      data: {
        title: `${getRandomElement(['Midterm', 'Final', 'Quiz', 'Unit Test'])} - ${subjectData[(i - 1) % 10].name}`,
        startTime: startTime,
        endTime: endTime,
        lessonId: createdLessons[(i - 1) % 50].id,
      },
    });
    createdExams.push(exam);
  }

  console.log("Created exams...");

  // Create assignments due throughout June 2025
  const createdAssignments = [];
  for (let i = 1; i <= 30; i++) {
    const startDate = getRandomElement(schoolDays);
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 7) + 1); // 1-7 days later

    const assignment = await prisma.assignment.create({
      data: {
        title: `${getRandomElement(['Research Paper', 'Lab Report', 'Essay', 'Problem Set', 'Project', 'Worksheet', 'Presentation'])} - ${subjectData[(i - 1) % 10].name}`,
        startDate: startDate,
        dueDate: dueDate,
        lessonId: createdLessons[(i - 1) % 50].id,
      },
    });
    createdAssignments.push(assignment);
  }

  console.log("Created assignments...");

  // Create realistic results
  for (let i = 1; i <= 50; i++) {
    const score = Math.floor(Math.random() * 35) + 65; // Scores between 65-100 (more realistic distribution)
    const studentIndex = (i - 1) % 120;

    await prisma.result.create({
      data: {
        score: score,
        studentId: `student${studentIndex + 1}`,
        ...(i <= 20 ? { examId: createdExams[(i - 1) % 20].id } : { assignmentId: createdAssignments[(i - 21) % 30].id }),
      },
    });
  }

  console.log("Created results...");

  // Create comprehensive attendance records for all school days in June 2025
  console.log("Creating attendance records for all school days in June 2025...");
  
  let attendanceCount = 0;
  for (const schoolDay of schoolDays) {
    const attendanceProbability = getAttendanceProbability(schoolDay);
    
    // Create attendance for each student for each school day
    for (let studentIndex = 0; studentIndex < 120; studentIndex++) {
      const present = Math.random() < attendanceProbability;
      const randomLesson = getRandomElement(createdLessons);
      
      await prisma.attendance.create({
        data: {
          date: schoolDay,
          present: present,
          studentId: `student${studentIndex + 1}`,
          lessonId: randomLesson.id,
        },
      });
      
      attendanceCount++;
    }
  }

  console.log(`Created ${attendanceCount} attendance records...`);

  // Create events throughout June 2025 - using your original working approach
  const eventTitles = [
    "Science Fair",
    "Math Competition", 
    "Art Exhibition",
    "Sports Day",
    "Parent-Teacher Conference",
    "School Assembly",
    "Library Workshop",
    "Career Day",
    "Field Trip to Museum",
    "Music Concert",
    "Drama Performance",
    "Graduation Ceremony",
    "Awards Day",
    "Book Fair",
    "International Day"
  ];

  const createdEvents = [];
  for (let i = 1; i <= 10; i++) {
    const randomSchoolDay = getRandomElement(schoolDays);
    const timeSlot = getRandomTimeInDay();
    const startTime = createDateWithTime(randomSchoolDay, timeSlot.hour, timeSlot.minute);
    const endTime = addHours(startTime, Math.floor(Math.random() * 3) + 1); // 1-3 hours

    const event = await prisma.event.create({
      data: {
        title: getRandomElement(eventTitles), // Using your original approach
        description: `Join us for an exciting ${eventTitles[(i - 1) % eventTitles.length].toLowerCase()}. This event will provide students with valuable learning opportunities and memorable experiences.`,
        startTime: startTime,
        endTime: endTime,
        classId: createdClasses[(i - 1) % 6].id,
      },
    });
    createdEvents.push(event);
  }

  console.log("Created events...");

  // Create announcements throughout June 2025
  const announcementTitles = [
    "Important: School Schedule Changes",
    "Reminder: Parent-Teacher Meetings", 
    "New Library Books Available",
    "Upcoming Field Trip Permission Slips",
    "Cafeteria Menu Updates",
    "Weather Alert: Indoor Recess",
    "Lost and Found Items",
    "After School Activities Sign-up",
    "Uniform Policy Reminder",
    "School Newsletter Published",
    "Summer Reading Program",
    "End of Year Procedures",
    "Graduation Information",
    "Report Card Distribution",
    "Summer Camp Registration"
  ];

  const createdAnnouncements = [];
  for (let i = 1; i <= 15; i++) {
    // Use a more spread out approach for announcements
    const announcementDate = new Date(2025, 5, i + 2); // June 2025, spread across the month

    const announcement = await prisma.announcement.create({
      data: {
        title: announcementTitles[i - 1],
        description: `This is an important announcement regarding ${announcementTitles[i - 1].toLowerCase()}. Please read carefully and take appropriate action if required. For questions, contact the school office.`,
        date: announcementDate,
        classId: createdClasses[(i - 1) % 6].id,
      },
    });
    createdAnnouncements.push(announcement);
  }

  console.log("Created announcements...");

  const schoolDaysCount = schoolDays.length;
  const maleStudentCount = studentGenders.filter(gender => gender === UserSex.MALE).length;
  const femaleStudentCount = studentGenders.filter(gender => gender === UserSex.FEMALE).length;
  const totalLessons = createdLessons.length;

  console.log("Seeding completed successfully with realistic data!");
  console.log(`- 15 teachers with realistic gender distribution`);
  console.log(`- 120 students (${maleStudentCount} male, ${femaleStudentCount} female)`);
  console.log(`- 40 parents with realistic family structures`);
  console.log(`- ${schoolDaysCount} school days in June 2025`);
  console.log(`- ${attendanceCount} attendance records with realistic patterns`);
  console.log(`- ${createdEvents.length} events distributed throughout June 2025`);
  console.log(`- ${createdAnnouncements.length} announcements distributed throughout June 2025`);
  console.log(`- ${totalLessons} lessons with synchronized schedules across all classes (no overlaps)`);
  console.log(`- 20 exams and 30 assignments`);
  console.log(`- 50 student results with realistic score distribution`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });