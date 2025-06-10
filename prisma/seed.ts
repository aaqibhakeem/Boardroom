import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

// Realistic name data
const firstNames = {
  male: ["James", "Michael", "Robert", "John", "David", "William", "Richard", "Thomas", "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin"],
  female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle"]
};

const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Profile picture URLs (using placeholder services)
const maleProfilePics = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/men/8.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
  "https://randomuser.me/api/portraits/men/10.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
  "https://randomuser.me/api/portraits/men/13.jpg",
  "https://randomuser.me/api/portraits/men/14.jpg",
  "https://randomuser.me/api/portraits/men/15.jpg"
];

const femaleProfilePics = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/women/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/women/9.jpg",
  "https://randomuser.me/api/portraits/women/10.jpg",
  "https://randomuser.me/api/portraits/women/11.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/women/13.jpg",
  "https://randomuser.me/api/portraits/women/14.jpg",
  "https://randomuser.me/api/portraits/women/15.jpg"
];

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDateInWeek(): Date {
  // June 9-13, 2025 (Monday to Friday)
  const baseDate = new Date(2025, 5, 9); // Month is 0-indexed
  const randomDay = Math.floor(Math.random() * 5); // 0-4 for Mon-Fri
  return new Date(2025, 5, 9 + randomDay);
}

function getRandomTimeInWeek(): Date {
  const date = getRandomDateInWeek();
  const hour = Math.floor(Math.random() * 8) + 8; // 8 AM to 4 PM
  const minute = Math.random() > 0.5 ? 0 : 30;
  date.setHours(hour, minute, 0, 0);
  return date;
}

function addHours(date: Date, hours: number): Date {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
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

  // Create classes (after grades are created) using actual grade IDs
  const createdClasses = [];
  for (let i = 0; i < 6; i++) {
    const classData = await prisma.class.create({
      data: {
        name: `${i + 1}A`,
        gradeId: createdGrades[i].id, // Use actual grade ID
        capacity: Math.floor(Math.random() * (25 - 18 + 1)) + 18,
      },
    });
    createdClasses.push(classData);
  }

  console.log("Created classes...");

  // Create teachers with realistic data and profile pictures
  let maleTeacherCount = 0;
  let femaleTeacherCount = 0;

  const createdTeachers = [];
  for (let i = 1; i <= 15; i++) {
    const sex = i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE;
    const firstName = sex === UserSex.MALE 
      ? getRandomElement(firstNames.male) 
      : getRandomElement(firstNames.female);
    const lastName = getRandomElement(lastNames);
    
    let profilePic;
    if (sex === UserSex.MALE) {
      profilePic = maleProfilePics[maleTeacherCount % maleProfilePics.length];
      maleTeacherCount++;
    } else {
      profilePic = femaleProfilePics[femaleTeacherCount % femaleProfilePics.length];
      femaleTeacherCount++;
    }

    const age = Math.floor(Math.random() * 15) + 25; // 25-40 years old
    const birthday = new Date();
    birthday.setFullYear(birthday.getFullYear() - age);

    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: firstName,
        surname: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.edu`,
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'])} ${getRandomElement(['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane'])}, ${getRandomElement(['Springfield', 'Franklin', 'Georgetown', 'Madison', 'Riverside'])}`,
        bloodType: getRandomElement(bloodTypes),
        sex: sex,
        img: profilePic,
        subjects: { connect: [{ id: createdSubjects[(i - 1) % 10].id }] },
        classes: { connect: [{ id: createdClasses[(i - 1) % 6].id }] },
        birthday: birthday,
      },
    });
    createdTeachers.push(teacher);
  }

  console.log("Created teachers...");

  // Create lessons with proper time scheduling
  const createdLessons = [];
  for (let i = 1; i <= 30; i++) {
    const startTime = getRandomTimeInWeek();
    const endTime = addHours(startTime, 1); // 1-hour lessons

    const lesson = await prisma.lesson.create({
      data: {
        name: `${getRandomElement(['Advanced', 'Introduction to', 'Basic', 'Intermediate'])} ${subjectData[(i - 1) % 10].name}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: startTime,
        endTime: endTime,
        subjectId: createdSubjects[(i - 1) % 10].id,
        classId: createdClasses[(i - 1) % 6].id,
        teacherId: `teacher${((i - 1) % 15) + 1}`,
      },
    });
    createdLessons.push(lesson);
  }

  console.log("Created lessons...");

  // Create parents with realistic data
  const createdParents = [];
  for (let i = 1; i <= 25; i++) {
    const sex = i % 2 === 0 ? 'male' : 'female';
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
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement(['Oak', 'Maple', 'Pine', 'Cedar', 'Elm'])} ${getRandomElement(['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane'])}, ${getRandomElement(['Springfield', 'Franklin', 'Georgetown', 'Madison', 'Riverside'])}`,
      },
    });
    createdParents.push(parent);
  }

  console.log("Created parents...");

  // Create students with realistic data and profile pictures
  let maleStudentCount = 0;
  let femaleStudentCount = 0;

  const createdStudents = [];
  for (let i = 1; i <= 50; i++) {
    const sex = i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE;
    const firstName = sex === UserSex.MALE 
      ? getRandomElement(firstNames.male) 
      : getRandomElement(firstNames.female);
    const lastName = getRandomElement(lastNames);
    
    let profilePic;
    if (sex === UserSex.MALE) {
      profilePic = maleProfilePics[(maleStudentCount + 20) % maleProfilePics.length];
      maleStudentCount++;
    } else {
      profilePic = femaleProfilePics[(femaleStudentCount + 20) % femaleProfilePics.length];
      femaleStudentCount++;
    }

    const gradeIndex = (i - 1) % 6;
    const gradeLevel = gradeIndex + 1;
    const age = gradeLevel + 5; // Grade 1 = 6 years old, Grade 6 = 11 years old
    const birthday = new Date();
    birthday.setFullYear(birthday.getFullYear() - age);

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
        img: profilePic,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
        gradeId: createdGrades[gradeIndex].id,
        classId: createdClasses[gradeIndex].id,
        birthday: birthday,
      },
    });
    createdStudents.push(student);
  }

  console.log("Created students...");

  // Create exams scheduled for this week
  const createdExams = [];
  for (let i = 1; i <= 10; i++) {
    const startTime = getRandomTimeInWeek();
    const endTime = addHours(startTime, 2); // 2-hour exams

    const exam = await prisma.exam.create({
      data: {
        title: `${getRandomElement(['Midterm', 'Final', 'Quiz', 'Unit Test'])} - ${subjectData[(i - 1) % 10].name}`,
        startTime: startTime,
        endTime: endTime,
        lessonId: createdLessons[(i - 1) % 30].id,
      },
    });
    createdExams.push(exam);
  }

  console.log("Created exams...");

  // Create assignments due this week
  const createdAssignments = [];
  for (let i = 1; i <= 10; i++) {
    const startDate = getRandomDateInWeek();
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 3) + 1); // 1-3 days later

    const assignment = await prisma.assignment.create({
      data: {
        title: `${getRandomElement(['Research Paper', 'Lab Report', 'Essay', 'Problem Set', 'Project'])} - ${subjectData[(i - 1) % 10].name}`,
        startDate: startDate,
        dueDate: dueDate,
        lessonId: createdLessons[(i - 1) % 30].id,
      },
    });
    createdAssignments.push(assignment);
  }

  console.log("Created assignments...");

  // Create realistic results
  for (let i = 1; i <= 10; i++) {
    const score = Math.floor(Math.random() * 40) + 60; // Scores between 60-100

    await prisma.result.create({
      data: {
        score: score,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: createdExams[i - 1].id } : { assignmentId: createdAssignments[i - 6].id }),
      },
    });
  }

  // Create attendance records for this week
  for (let i = 1; i <= 50; i++) {
    const attendanceDate = getRandomDateInWeek();
    // 85% attendance rate
    const present = Math.random() > 0.15;

    await prisma.attendance.create({
      data: {
        date: attendanceDate,
        present: present,
        studentId: `student${((i - 1) % 50) + 1}`,
        lessonId: createdLessons[(i - 1) % 30].id,
      },
    });
  }

  console.log("Created attendance records...");

  // Create events for this week
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
    "Music Concert"
  ];

  for (let i = 1; i <= 10; i++) {
    const startTime = getRandomTimeInWeek();
    const endTime = addHours(startTime, Math.floor(Math.random() * 3) + 1); // 1-3 hours

    await prisma.event.create({
      data: {
        title: getRandomElement(eventTitles),
        description: `Join us for an exciting ${eventTitles[(i - 1) % eventTitles.length].toLowerCase()}. This event will provide students with valuable learning opportunities and memorable experiences.`,
        startTime: startTime,
        endTime: endTime,
        classId: createdClasses[(i - 1) % 6].id,
      },
    });
  }

  console.log("Created events...");

  // Create announcements for this week (June 9-13, 2025)
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
    "School Newsletter Published"
  ];

  for (let i = 1; i <= 10; i++) {
    const announcementDate = new Date(2025, 5, 9 + ((i - 1) % 5)); // June 9-13

    await prisma.announcement.create({
      data: {
        title: announcementTitles[(i - 1) % announcementTitles.length],
        description: `This is an important announcement regarding ${announcementTitles[(i - 1) % announcementTitles.length].toLowerCase()}. Please read carefully and take appropriate action if required. For questions, contact the school office.`,
        date: announcementDate,
        classId: createdClasses[(i - 1) % 6].id,
      },
    });
  }

  console.log("Created announcements...");

  console.log("Seeding completed successfully with realistic data!");
  console.log("- 15 teachers with profile pictures and realistic names");
  console.log("- 50 students with profile pictures and age-appropriate details");
  console.log("- 25 parents with realistic contact information");
  console.log("- Events scheduled for June 9-13, 2025");
  console.log("- Announcements dated within this week");
  console.log("- Attendance records for the current week");
  console.log("- Realistic exam and assignment schedules");
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