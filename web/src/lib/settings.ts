import { prisma } from "./prisma";

export async function getSettings() {
  const existing = await prisma.setting.findUnique({ where: { id: "main" } });
  if (existing) return existing;
  return prisma.setting.create({
    data: {
      id: "main",
      aboutText:
        "Yasin Dava Khana Dunyapur is a traditional Unani hikmat clinic based on Qanoon-e-Mufrad Aaza and Tibb-e-Sabir. Herbal medicines and advice are available. Ask the Hakeem before using any medicine.",
    },
  });
}
