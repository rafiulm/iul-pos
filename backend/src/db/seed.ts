import { db } from "./connection.js";
import { products, categories } from "./schema.js";
import { randomUUID } from "crypto";
import { logInfo, logSuccess, logError } from "../middleware/logger.js";

// Real categories for Indonesian retail/food business
const categoryNames = [
  "Makanan Berat",
  "Makanan Ringan",
  "Minuman Dingin",
  "Minuman Panas",
  "Snack & Cemilan",
  "Roti & Kue",
  "Dairy & Susu",
  "Frozen Food",
  "Sembako",
  "Rokok & Vape",
];

// Real product data with Indonesian pricing (in thousands IDR, displayed as decimal)
const productData = [
  // Makanan Berat
  {
    name: "Nasi Goreng Spesial",
    price: "25000",
    category: "Makanan Berat",
    emoji: "🍚",
    stock: 50,
  },
  {
    name: "Mie Goreng Ayam",
    price: "22000",
    category: "Makanan Berat",
    emoji: "🍜",
    stock: 45,
  },
  {
    name: "Ayam Geprek",
    price: "20000",
    category: "Makanan Berat",
    emoji: "🍗",
    stock: 40,
  },
  {
    name: "Nasi Padang Komplit",
    price: "35000",
    category: "Makanan Berat",
    emoji: "🍛",
    stock: 30,
  },
  {
    name: "Soto Ayam",
    price: "18000",
    category: "Makanan Berat",
    emoji: "🥣",
    stock: 35,
  },
  {
    name: "Bakso Urat",
    price: "20000",
    category: "Makanan Berat",
    emoji: "🍲",
    stock: 40,
  },

  // Makanan Ringan
  {
    name: "Kentang Goreng",
    price: "15000",
    category: "Makanan Ringan",
    emoji: "🍟",
    stock: 60,
  },
  {
    name: "Pisang Goreng",
    price: "10000",
    category: "Makanan Ringan",
    emoji: "🍌",
    stock: 50,
  },
  {
    name: "Tahu Crispy",
    price: "8000",
    category: "Makanan Ringan",
    emoji: "🧈",
    stock: 55,
  },
  {
    name: "Cireng Isi",
    price: "12000",
    category: "Makanan Ringan",
    emoji: "🥟",
    stock: 45,
  },

  // Minuman Dingin
  {
    name: "Es Teh Manis",
    price: "5000",
    category: "Minuman Dingin",
    emoji: "🧊",
    stock: 100,
  },
  {
    name: "Es Jeruk",
    price: "7000",
    category: "Minuman Dingin",
    emoji: "🍊",
    stock: 90,
  },
  {
    name: "Es Kopi Susu",
    price: "15000",
    category: "Minuman Dingin",
    emoji: "☕",
    stock: 70,
  },
  {
    name: "Es Kelapa Muda",
    price: "12000",
    category: "Minuman Dingin",
    emoji: "🥥",
    stock: 40,
  },
  {
    name: "Coca Cola 390ml",
    price: "8000",
    category: "Minuman Dingin",
    emoji: "🥤",
    stock: 120,
  },
  {
    name: "Sprite 390ml",
    price: "8000",
    category: "Minuman Dingin",
    emoji: "🥤",
    stock: 100,
  },
  {
    name: "Aqua 600ml",
    price: "4000",
    category: "Minuman Dingin",
    emoji: "💧",
    stock: 200,
  },

  // Minuman Panas
  {
    name: "Kopi Hitam",
    price: "8000",
    category: "Minuman Panas",
    emoji: "☕",
    stock: 80,
  },
  {
    name: "Teh Hangat",
    price: "5000",
    category: "Minuman Panas",
    emoji: "🍵",
    stock: 90,
  },
  {
    name: "Milo Panas",
    price: "10000",
    category: "Minuman Panas",
    emoji: "🍫",
    stock: 60,
  },
  {
    name: "Jahe Susu",
    price: "12000",
    category: "Minuman Panas",
    emoji: "🥛",
    stock: 50,
  },

  // Snack & Cemilan
  {
    name: "Chitato 68g",
    price: "12000",
    category: "Snack & Cemilan",
    emoji: "🥔",
    stock: 80,
  },
  {
    name: "Pringles Original",
    price: "28000",
    category: "Snack & Cemilan",
    emoji: "🥔",
    stock: 40,
  },
  {
    name: "Oreo",
    price: "8000",
    category: "Snack & Cemilan",
    emoji: "🍪",
    stock: 100,
  },
  {
    name: "Tango Wafer",
    price: "6000",
    category: "Snack & Cemilan",
    emoji: "🧇",
    stock: 90,
  },
  {
    name: "Silverqueen 65g",
    price: "18000",
    category: "Snack & Cemilan",
    emoji: "🍫",
    stock: 60,
  },
  {
    name: "Indomie Goreng",
    price: "4000",
    category: "Snack & Cemilan",
    emoji: "🍜",
    stock: 150,
  },

  // Roti & Kue
  {
    name: "Roti Tawar Sari Roti",
    price: "16000",
    category: "Roti & Kue",
    emoji: "🍞",
    stock: 40,
  },
  {
    name: "Donat Coklat",
    price: "8000",
    category: "Roti & Kue",
    emoji: "🍩",
    stock: 35,
  },
  {
    name: "Roti Sobek",
    price: "22000",
    category: "Roti & Kue",
    emoji: "🥖",
    stock: 30,
  },
  {
    name: "Croissant",
    price: "15000",
    category: "Roti & Kue",
    emoji: "🥐",
    stock: 25,
  },
  {
    name: "Kue Lapis",
    price: "25000",
    category: "Roti & Kue",
    emoji: "🍰",
    stock: 20,
  },

  // Dairy & Susu
  {
    name: "Ultra Milk 250ml",
    price: "6000",
    category: "Dairy & Susu",
    emoji: "🥛",
    stock: 80,
  },
  {
    name: "Yakult 5pcs",
    price: "12000",
    category: "Dairy & Susu",
    emoji: "🧃",
    stock: 60,
  },
  {
    name: "Keju Kraft Singles",
    price: "28000",
    category: "Dairy & Susu",
    emoji: "🧀",
    stock: 35,
  },
  {
    name: "Yogurt Cimory",
    price: "15000",
    category: "Dairy & Susu",
    emoji: "🥄",
    stock: 45,
  },

  // Frozen Food
  {
    name: "Nugget Fiesta 500g",
    price: "45000",
    category: "Frozen Food",
    emoji: "🍗",
    stock: 30,
  },
  {
    name: "Sosis So Nice",
    price: "18000",
    category: "Frozen Food",
    emoji: "🌭",
    stock: 50,
  },
  {
    name: "Bakso Sapi 500g",
    price: "35000",
    category: "Frozen Food",
    emoji: "🍡",
    stock: 25,
  },
  {
    name: "Es Krim Walls",
    price: "15000",
    category: "Frozen Food",
    emoji: "🍦",
    stock: 40,
  },

  // Sembako
  {
    name: "Beras 5kg",
    price: "65000",
    category: "Sembako",
    emoji: "🌾",
    stock: 50,
  },
  {
    name: "Minyak Goreng 2L",
    price: "35000",
    category: "Sembako",
    emoji: "🫒",
    stock: 40,
  },
  {
    name: "Gula Pasir 1kg",
    price: "16000",
    category: "Sembako",
    emoji: "🍬",
    stock: 60,
  },
  {
    name: "Telur 10pcs",
    price: "28000",
    category: "Sembako",
    emoji: "🥚",
    stock: 45,
  },
  {
    name: "Kecap Manis ABC",
    price: "12000",
    category: "Sembako",
    emoji: "🍶",
    stock: 70,
  },

  // Rokok & Vape
  {
    name: "Gudang Garam Filter",
    price: "28000",
    category: "Rokok & Vape",
    emoji: "🚬",
    stock: 100,
  },
  {
    name: "Sampoerna Mild",
    price: "32000",
    category: "Rokok & Vape",
    emoji: "🚬",
    stock: 90,
  },
  {
    name: "Djarum Super",
    price: "26000",
    category: "Rokok & Vape",
    emoji: "🚬",
    stock: 80,
  },
  {
    name: "Pod Salt 30ml",
    price: "85000",
    category: "Rokok & Vape",
    emoji: "💨",
    stock: 30,
  },
];

async function seedCategories() {
  logInfo("Seeding categories...");

  let inserted = 0;
  for (const name of categoryNames) {
    try {
      await db.insert(categories).values({ name }).onConflictDoNothing();
      inserted++;
    } catch (error) {
      logError(`Failed to insert category "${name}"`, error);
    }
  }

  logSuccess("Categories seeded", {
    count: inserted,
    total: categoryNames.length,
  });
}

async function seedProducts() {
  logInfo("Seeding products...");

  let inserted = 0;
  for (const product of productData) {
    try {
      await db.insert(products).values({
        ...product,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any);
      inserted++;
    } catch (error) {
      logError(`Failed to insert product "${product.name}"`, error);
    }
  }

  logSuccess("Products seeded", { count: inserted, total: productData.length });
}

async function seed() {
  logInfo("Starting database seeding...");

  try {
    await seedCategories();
    await seedProducts();

    logSuccess("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    logError("Seeding failed", error);
    process.exit(1);
  }
}

seed();
