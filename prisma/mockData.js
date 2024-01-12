const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const initialUserData = [
  {
    color: "#4e42f5",
    name: "Sleep",
    icon: "🌙",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#FFA500",
    name: "Work",
    icon: "🔨",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#FFC0CB",
    name: "Rest",
    icon: "🍹",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#ADD8E6",
    name: "Eat",
    icon: "🥩",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#FF0000",
    name: "Inst Grat",
    icon: "💊",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#FFFF00",
    name: "Antientropy",
    icon: "🧹",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#90EE90",
    name: "Study",
    icon: "📚",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#800080",
    name: "Projects",
    icon: "💡",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
  {
    color: "#40E0D0",
    name: "Exercise",
    icon: "🏋️‍♂️",
    pointsPerHour: 0,
    secondsFree: 0,
    usersId: "5f7b20bd-2432-4b96-83e0-c2e3bf9d48ef",
  },
];

async function loadInitialData() {
  // Insert initial user data
  await prisma.activities.createMany({
    data: initialUserData,
  });

  // Add more insert operations for other tables/models if needed

  console.log("Initial data loaded successfully!");
}

// Run the function
loadInitialData()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    // Disconnect Prisma Client after inserting data
    await prisma.$disconnect();
  });
