import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

process.env.DATABASE_URL ??= "file:./prisma/dev.db";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({ url: process.env.DATABASE_URL }),
});

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@yasindawakhana.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "YasinAdmin123!";
  const hash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { password: hash },
    create: { email, password: hash, name: "ایڈمن" },
  });

  const settingData = {
    clinicNameUrdu: "یٰسین دواخانہ دنیا پور",
    clinicNameEn: "Yasin Dava Khana Dunyapur",
    tagline: "Center for Qanoon-e-Mufrad Aaza · Tibb-e-Sabir",
    phone1: "0301-4185965",
    phone2: "0344-7014392",
    whatsapp1: "923014185965",
    whatsapp2: "923447014392",
    address: "Dunyapur",
    hours: "Daily 9:00 AM – 8:00 PM",
    logoUrl: "/logo.jpg",
    heroIntro: "Tibb-e-Sabir · Dunyapur",
    aboutText:
      "Yasin Dava Khana Dunyapur is a traditional Unani hikmat clinic based on Qanoon-e-Mufrad Aaza and Tibb-e-Sabir. Herbal medicines and advice are available. Ask the Hakeem before using any medicine. Call or WhatsApp for details and orders.",
    footerDisclaimer:
      "Traditional Unani / herbal information only. Not a hospital diagnosis. In an emergency go to the nearest hospital. Use medicine only as advised by the Hakeem.",
  };

  await prisma.setting.upsert({
    where: { id: "main" },
    update: settingData,
    create: { id: "main", ...settingData },
  });

  const cats = [
    { slug: "men", name: "Men's Health" },
    { slug: "women", name: "Women's Health" },
    { slug: "kidney", name: "Kidney Care" },
    { slug: "sugar", name: "Diabetes / Sugar" },
    { slug: "stones", name: "Stones" },
    { slug: "fever", name: "Fever Care" },
    { slug: "stomach", name: "Stomach Care" },
    { slug: "pain", name: "Pain & Joints" },
  ];

  const catIds: Record<string, string> = {};
  for (const c of cats) {
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
    catIds[c.slug] = row.id;
  }

  const products = [
    {
      slug: "hab-waram-gurda",
      name: "حب ورم گردہ",
      nameEn: "Hab-e-Waram-e-Gurda",
      category: "kidney",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-waram-gurda.jpg",
      featured: true,
      unaniNote: "غدی اعصابی",
      description: "گردوں کی سوزش، ورم اور پیشاب کی بندش کے لیے خاص دوا۔",
      benefits:
        "گردوں کی سوزش اور ورم میں مفید\nگردوں کے سکڑنے میں مفید\nبندشِ بول میں مفید\nدردِ گردہ ریحی میں مفید",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "قہوہ: زیرہ سفید، سونف، ملٹھی",
      forWhom: "both",
      sortOrder: 1,
    },
    {
      slug: "hab-shugarnil",
      name: "حب شوگرنل",
      nameEn: "Hab-e-Shugarnil",
      category: "sugar",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-shugarnil.jpg",
      featured: true,
      unaniNote: "غدی عضلاتی",
      description: "شوگر لیول کم کرنے اور بار بار پیشاب آنے کے لیے۔",
      benefits:
        "شوگر لیول کم کرتی ہے\nبار بار پیشاب آنا روکتی ہے\nسوئیاں چبھنا میں مفید ہے\nٹانگوں کی کمزوری کم کرتی ہے",
      usage: "ایک ایک ٹیبلٹ دن میں دو بار، بعد از غذا۔",
      takenWith: "عرقِ شوگر نل ۵ چمچ پانی میں ملا کر",
      forWhom: "both",
      sortOrder: 2,
    },
    {
      slug: "pathri-tod",
      name: "پتھری توڑ",
      nameEn: "Pathri Tod",
      category: "stones",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/pathri-tod.jpg",
      featured: true,
      unaniNote: "غدی اعصابی",
      description: "گردے اور پتے کی پتھری توڑنے اور خارج کرنے کے لیے۔",
      benefits:
        "گردے کے درد اور پتھری میں مفید\nپتے کے درد اور پتھری میں مفید\nقے روکتی ہے\nپتھری توڑ کر خارج کرنے میں مدد",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "قہوہ: زیرہ سفید، سونف، اسٹون ڈوس",
      forWhom: "both",
      sortOrder: 3,
    },
    {
      slug: "sang-shikan",
      name: "سنگ شکن",
      nameEn: "Sang Shikan",
      category: "stones",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/sang-shikan.jpg",
      featured: false,
      unaniNote: "",
      description: "گردہ، مثانہ اور پتے کی پتھری کے لیے سنگ شکن۔",
      benefits: "گردہ، مثانہ اور پتے کی پتھری میں مفید\nلو بلڈ پریشر میں مفید",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار۔",
      takenWith: "قہوہ: سونف، زیرہ سفید، الائچی سبز",
      forWhom: "both",
      sortOrder: 4,
    },
    {
      slug: "bukhar-rok",
      name: "بخار روک",
      nameEn: "Bukhar Rok",
      category: "fever",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/bukhar-rok.jpg",
      featured: true,
      unaniNote: "",
      description: "ہر قسم کے بخار، نمونیا، ٹائیفائیڈ اور ملیریا میں مفید۔",
      benefits:
        "جنرل ٹانک ہے\nہر قسم کے بخاروں میں مفید ہے\nنمونیا، ٹائیفائیڈ، ملیریا کے لیے\nدرد اور جسم ٹوٹنا میں مفید ہے",
      usage: "ایک ایک ٹیبلٹ صبح، دوپہر، شام۔",
      takenWith: "تازہ پانی، بعد از غذا",
      forWhom: "both",
      sortOrder: 5,
    },
    {
      slug: "anti-pus-cells",
      name: "اینٹی پس سیلز",
      nameEn: "Anti Pus Cells",
      category: "men",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/anti-pus-cells.jpg",
      featured: false,
      unaniNote: "اعصابی غدی",
      description: "منی اور پیشاب میں پس سیلز ختم کرنے کے لیے۔",
      benefits:
        "منی میں پس سیلز ختم کرتی ہے\nپیشاب میں پس سیلز ختم کرتی ہے\nسپرم ڈیڈ ہونے سے بچاتی ہے",
      usage: "ایک ایک ٹیبلٹ صبح، دوپہر، شام۔",
      takenWith: "تازہ پانی، بعد از غذا",
      forWhom: "men",
      sortOrder: 6,
    },
    {
      slug: "taryaq-e-maida",
      name: "تریاقِ معدہ",
      nameEn: "Taryaq-e-Maida",
      category: "stomach",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/taryaq-e-maida.jpg",
      featured: true,
      unaniNote: "غدی عضلاتی",
      description: "ہاضمہ، قبض، گیس اور ڈکار کے لیے معدے کی دوا۔",
      benefits: "ہاضمہ کی خرابی کے لیے مفید ہے\nقبض، گیس، ڈکاروں کے لیے مفید ہے",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار۔",
      takenWith: "قہوہ: سونف، زیرہ سفید، الائچی سبز",
      forWhom: "both",
      sortOrder: 7,
    },
    {
      slug: "pechesh-stop",
      name: "پیچش سٹاپ",
      nameEn: "Pechesh Stop",
      category: "stomach",
      quantity: "سفوف / کیپسول",
      form: "سفوف / کیپسول",
      imageUrl: "/products/pechesh-stop.jpg",
      featured: false,
      unaniNote: "اعصابی غدی",
      description: "پیچش، پیٹ میں درد اور جلن کے لیے۔",
      benefits:
        "بار بار رفع حاجت اور پیٹ میں مروڑ میں مفید\nرفع حاجت کے وقت جلن میں مفید\nزرد پاخانہ میں مفید",
      usage: "ایک ایک چمچ صبح، دوپہر، شام تازہ پانی کے ساتھ۔",
      takenWith: "تازہ پانی",
      forWhom: "both",
      sortOrder: 8,
    },
    {
      slug: "hab-arq-un-nisa",
      name: "حب عرق النساء",
      nameEn: "Hab-e-Arq-un-Nisa (Sciatica)",
      category: "pain",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-arq-un-nisa.jpg",
      featured: true,
      unaniNote: "غدی اعصابی",
      description: "شیاٹیکا، کولہے اور ٹانگ کے درد کی دوا۔",
      benefits:
        "شیاٹیکا کے درد میں مفید\nکولہے کے درد میں مفید\nٹانگ میں چلتا ہوا درد\nقبض کشائی کرتی ہے\nمہروں کے درد میں مفید",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "تازہ پانی",
      forWhom: "both",
      sortOrder: 9,
    },
    {
      slug: "hab-e-gathia",
      name: "حب گٹھیا",
      nameEn: "Hab-e-Gathia",
      category: "pain",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-e-gathia.jpg",
      featured: true,
      unaniNote: "عضلاتی غدی",
      description: "جوڑوں، سوزش اور مہروں کے درد کی دوا۔",
      benefits:
        "جوڑوں کے درد میں مفید ہے\nسوزش اور ورمی درد میں مفید ہے\nاٹھتے بیٹھتے درد میں مفید ہے\nبخار اور سر درد میں مفید ہے\nمہروں کے درد میں مفید ہے",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "تازہ پانی",
      forWhom: "both",
      sortOrder: 10,
    },
    {
      slug: "anti-uric-acid",
      name: "اینٹی یورک ایسڈ",
      nameEn: "Anti Uric Acid",
      category: "pain",
      quantity: "100 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/anti-uric-acid.jpg",
      featured: false,
      unaniNote: "غدی اعصابی",
      description: "یورک ایسڈ، جوڑوں کے درد اور ایچ پائلوری کے لیے۔",
      benefits:
        "یورک ایسڈ ختم کرتی ہے\nجوڑوں کے درد میں مفید\nایچ پائلوری ختم کرتی ہے\nدل کے مریضوں کے لیے مفید",
      usage: "ایک ایک ٹیبلٹ صبح، دوپہر، شام۔",
      takenWith: "قہوہ: ادرک، زیرہ سفید، اجوائن دیسی",
      forWhom: "both",
      sortOrder: 11,
    },
    {
      slug: "hab-mueen-hamal",
      name: "حب معین حمل",
      nameEn: "Hab Mueen Hamal",
      category: "women",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-mueen-hamal.jpg",
      featured: false,
      unaniNote: "",
      description: "خواتین کے لیے حمل کو قائم رکھنے اور خون روکنے میں مدد۔",
      benefits:
        "حمل کو قائم رکھتی ہے\nاسقاط حمل سے بچاتی ہے\nخون آنا روکتی ہے\nلو بلڈ پریشر نارمل کرتی ہے\nحمل کی قے روکتی ہے\nلیکوریا روکتی ہے",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "دہی کی لسی",
      forWhom: "women",
      sortOrder: 12,
    },
    {
      slug: "hab-mudir-e-haiz",
      name: "حب مدر حیض",
      nameEn: "Habbe Mudir-e-Haiz",
      category: "women",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-mudir-e-haiz.jpg",
      featured: false,
      unaniNote: "عضلاتی غدی",
      description: "خواتین کے لیے ماہواری کھولنے اور لیکوریا میں مفید۔",
      benefits: "رطوبتی بندش حیض میں مفید ہے\nلیکوریا میں مفید ہے\nماہواری کھولتی ہے",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "قہوہ اجوائن دیسی اور پودینہ",
      forWhom: "women",
      sortOrder: 13,
    },
    {
      slug: "jarian-rok",
      name: "جریان روک",
      nameEn: "Jarian Rok",
      category: "men",
      quantity: "کیپسول",
      form: "کیپسول",
      imageUrl: "/products/jarian-rok.jpg",
      featured: false,
      unaniNote: "عضلاتی اعصابی",
      description: "مرد و خواتین کے لیے پیشاب کے قطرے اور جریان روکنے کی دوا۔",
      benefits:
        "پیشاب کے قطرے آنا روکتا ہے\nلیکوریا، احتلام، لیسدار قطرے روکتا ہے\nمرد و خواتین کے لیے یکساں مفید",
      usage: "ایک ایک کیپسول تازہ پانی کے ساتھ، بعد از غذا۔",
      takenWith: "تازہ پانی",
      forWhom: "both",
      sortOrder: 14,
    },
    {
      slug: "sperm-up",
      name: "سپر اپ سفوف",
      nameEn: "Sperm Up Safof",
      category: "men",
      quantity: "100 گرام",
      form: "سفوف",
      imageUrl: "/products/sperm-up.jpg",
      featured: true,
      unaniNote: "",
      description: "سپرم کی تعداد بڑھانے اور منی گاڑھی کرنے کا قدرتی سفوف۔",
      benefits:
        "سپرم کی تعداد بڑھاتا ہے\nپس سیلز ختم کرنے میں مفید\nخصیوں کا درجہ حرارت نارمل کرتا ہے\nمنی زیادہ اور گاڑھی پیدا کرتا ہے",
      usage: "ایک ایک چمچ صبح و شام، بعد از غذا۔",
      takenWith: "تازہ پانی یا دودھ",
      forWhom: "men",
      sortOrder: 15,
    },
    {
      slug: "sada-jawani",
      name: "سدا جوانی سفوف",
      nameEn: "Sada Jawani Safof",
      category: "men",
      quantity: "100 گرام",
      form: "سفوف",
      imageUrl: "/products/sada-jawani.jpg",
      featured: false,
      unaniNote: "عضلاتی اعصابی",
      description: "سپرم بڑھانے، سستی ختم کرنے اور طاقت کے لیے سفوف۔",
      benefits:
        "منی میں سپرم میں اضافہ کرتا ہے\nسلگش سپرم کو ایکٹو کرتا ہے\nسپرم کو ڈیڈ ہونے سے بچاتا ہے\nمنی زیادہ پیدا کرتا اور گاڑھا کرتا ہے\nطاقت اور جوش میں اضافہ",
      usage: "ایک ایک چمچ صبح و شام، بعد از غذا۔",
      takenWith: "تازہ پانی",
      forWhom: "men",
      sortOrder: 16,
    },
    {
      slug: "asrar-e-bah",
      name: "اسرارِ باہ",
      nameEn: "Asrar-e-Bah",
      category: "men",
      quantity: "کیپسول / 100 گرام",
      form: "کیپسول",
      imageUrl: "/products/asrar-e-bah.jpg",
      featured: false,
      unaniNote: "عضلاتی غدی",
      description: "مردانہ طاقت، سستی اور شوگر کے مریضوں کے لیے کیپسول۔",
      benefits:
        "مردانہ طاقت بڑھاتی ہے\nسستی اور نامردی میں مفید\nجسمانی ڈھیلے پن کو ختم کرتی ہے\nشوگر کے مریضوں کے لیے مفید\nٹائمنگ / استقامت بڑھاتی ہے",
      usage: "ایک کیپسول صبح، ایک شام۔",
      takenWith: "تازہ پانی",
      forWhom: "men",
      sortOrder: 17,
    },
    {
      slug: "hab-e-rasooli",
      name: "حب رسولی",
      nameEn: "Hab-e-Rasooli",
      category: "pain",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-e-rasooli.jpg",
      featured: true,
      unaniNote: "غدی اعصابی",
      description: "گلٹیوں اور رسولیوں کے لیے حب رسولی۔",
      benefits:
        "رسولی رحم میں مفید\nرسولی دماغ میں مفید\nرسولی جلد کو تحلیل کرتی ہے\nدردِ رسولی میں مفید\nبلیڈنگ میں مفید\nہائی بلڈ پریشر میں مفید",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار، بعد از غذا۔",
      takenWith: "تازہ پانی",
      forWhom: "both",
      sortOrder: 18,
    },
    {
      slug: "akseer-e-waram",
      name: "اکسیر ورم",
      nameEn: "Akseer-e-Waram",
      category: "kidney",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/akseer-e-waram.jpg",
      featured: true,
      unaniNote: "اعصابی غدی",
      description: "چہرہ، ہاتھ پاؤں کی سوزش اور ورم کی دوا۔",
      benefits:
        "چہرہ، ہاتھ پاؤں کی سوزش ورم ختم کرتی ہے\nگردوں کا فعل تیز کرتی ہے\nہائی بلڈ پریشر اور پیشاب کی جلن کم کرتی ہے",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار۔",
      takenWith: "قہوہ: سونف، زیرہ سفید، الائچی سبز",
      forWhom: "both",
      sortOrder: 19,
    },
    {
      slug: "hab-e-nariman",
      name: "حب نریمن",
      nameEn: "Hab-e-Nariman",
      category: "men",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-e-nariman.png",
      featured: false,
      unaniNote: "",
      description: "حب نریمن — پیک میں ۴۵ گولیاں، پندرہ دن کی خوراک۔ حکیم سے مشورہ لازمی۔",
      benefits: "پیک میں پینتالیس گولیاں\nپندرہ دن کی خوراک",
      usage: "حکیم کی ہدایت کے مطابق استعمال کریں۔",
      takenWith: "",
      forWhom: "men",
      sortOrder: 20,
    },
    {
      slug: "hab-e-narina",
      name: "حب نرینہ",
      nameEn: "Hab-e-Narina",
      category: "men",
      quantity: "45 ٹیبلٹ",
      form: "ٹیبلٹ",
      imageUrl: "/products/hab-e-narina.jpg",
      featured: false,
      unaniNote: "",
      description: "حب نرینہ گولڈن — مدت کورس ۱۵ دن، ۴۵ ٹیبلٹ۔ حکیم سے مشورہ لازمی۔",
      benefits: "مدت کورس: ۱۵ دن\n۴۵ ٹیبلٹ پیک میں",
      usage: "ایک ایک ٹیبلٹ دن میں تین بار۔ حکیم کی ہدایت کے مطابق۔",
      takenWith: "",
      forWhom: "men",
      sortOrder: 21,
    },
  ];

  for (const p of products) {
    const { category, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...data, categoryId: catIds[category] },
      create: { ...data, categoryId: catIds[category] },
    });
  }

  const books = [
    {
      slug: "qanoon-e-mufrad-aaza",
      title: "Kulliyat-e-Qanoon Mufrad Aaza",
      description: "Kulliyat of Qanoon-e-Mufrad Aaza by Hakeem Muhammad Yasin Dunyapuri and Hakeem Muhammad Sharif Dunyapuri. Compiled by Hakeem Muhammad Tahir Yasin. Ask price on WhatsApp.",
      imageUrl: "/books/qanoon-e-mufrad-aaza.jpg",
      price: 0,
      featured: true,
      sortOrder: 1,
    },
    {
      slug: "rahbar-nazariya-mufrad-aaza",
      title: "Rahbar-e-Nazariya Mufrad Aaza",
      description: "Guide to the theory of Mufrad Aaza in question-and-answer form. By Hakeem Muhammad Yasin and Hakeem Muhammad Sharif Dunyapuri. Ask price on WhatsApp.",
      imageUrl: "/books/rahbar-nazariya-mufrad-aaza.jpg",
      price: 0,
      featured: true,
      sortOrder: 2,
    },
    {
      slug: "rahbar-nazria-sawal-jawab",
      title: "Rahbar Nazria — Sawal Jawab",
      description: "Mufrad Aaza explained in a simple question-and-answer style. Ask price on WhatsApp.",
      imageUrl: "/books/rahbar-nazria-sawal-jawab.jpg",
      price: 0,
      featured: true,
      sortOrder: 3,
    },
    {
      slug: "ilm-ul-amraaz",
      title: "Ilm-ul-Amraaz (Bayaz-e-Yasin)",
      description: "Diseases from head to toe — signs and Unani treatment. By Hakeem Muhammad Yasin Dunyapuri. Ask price on WhatsApp.",
      imageUrl: "/books/ilm-ul-amraaz.jpg",
      price: 0,
      featured: true,
      sortOrder: 4,
    },
    {
      slug: "mera-matab",
      title: "Mera Matab (Part 1)",
      description: "A treasury of classical hikmat notes from the clinic. Ask price on WhatsApp.",
      imageUrl: "/books/mera-matab.jpg",
      price: 0,
      featured: true,
      sortOrder: 5,
    },
    {
      slug: "ghiza-se-ilaj",
      title: "Ghiza se Ilaj",
      description: "Treatment through food — Mera Matab. By Hakeem Muhammad Yasin Dunyapuri. Ask price on WhatsApp.",
      imageUrl: "/books/ghiza-se-ilaj.jpg",
      price: 0,
      featured: true,
      sortOrder: 6,
    },
    {
      slug: "tashrih-ul-adwiyah",
      title: "Tashrih-ul-Adwiyah",
      description: "Istifsarat on Unani medicines. By Hakeem Muhammad Yasin Dunyapuri. Ask price on WhatsApp.",
      imageUrl: "/books/tashrih-ul-adwiyah.jpg",
      price: 0,
      featured: false,
      sortOrder: 7,
    },
    {
      slug: "tahqeeqat-asrar-un-nabz",
      title: "Tahqeeqat-e-Asrar-un-Nabz",
      description: "Research on the secrets of the pulse (nabz). Ask price on WhatsApp.",
      imageUrl: "/books/tahqeeqat-asrar-un-nabz.jpg",
      price: 0,
      featured: false,
      sortOrder: 8,
    },
    {
      slug: "tap-e-diq-sil-dama",
      title: "Tap-e-Diq, Sil & Dama",
      description: "TB, consumption, and asthma — medicine methods under Qanoon-e-Mufrad Aaza. Ask price on WhatsApp.",
      imageUrl: "/books/tap-e-diq-sil-dama.jpg",
      price: 0,
      featured: false,
      sortOrder: 9,
    },
    {
      slug: "tehqiqat-e-aids",
      title: "Tehqiqat-e-AIDS",
      description: "Unani research notes on AIDS by Hakeem Muhammad Yasin and Hakeem Muhammad Sharif Dunyapuri. Ask price on WhatsApp.",
      imageUrl: "/books/tehqiqat-e-aids.jpg",
      price: 0,
      featured: false,
      sortOrder: 10,
    },
    {
      slug: "tibb-e-sabir",
      title: "Tibb-e-Sabir",
      description: "Tried Unani methods from Tibb-e-Sabir. Ask the clinic for price and availability.",
      imageUrl: "/books/tibb-e-sabir.jpg",
      price: 0,
      featured: false,
      sortOrder: 11,
    },
    {
      slug: "hikmat-nama",
      title: "Hikmat Nama",
      description: "Home hikmat and natural care notes. Ask price on WhatsApp.",
      imageUrl: "/books/hikmat-nama.jpg",
      price: 0,
      featured: false,
      sortOrder: 12,
    },
  ];

  for (const b of books) {
    await prisma.book.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }

  const eldersEn = [
    { name: "Hakeem Muhammad Yasin Dunyapuri", title: "Yasin Dava Khana, Dunyapur", photoUrl: "/elders/hakeem-yasin-oval.png", sortOrder: 1 },
    { name: "Hakeem Yunus Yasin Dunyapuri", title: "Karachi", photoUrl: "/elders/hakeem-yunus.png", sortOrder: 2 },
  ];
  await prisma.elder.deleteMany();
  await prisma.elder.createMany({ data: eldersEn });

  const offerEn = {
    title: "New herbal offer",
    description:
      "Fresh herbal medicines from Yasin Dava Khana, Dunyapur. WhatsApp 0301-4185965 or 0344-7014392 for price and packing.",
    imageUrl: "/logo-mark.jpg",
    active: true,
    sortOrder: 1,
  };
  if ((await prisma.offer.count()) === 0) {
    await prisma.offer.create({ data: offerEn });
  } else {
    const first = await prisma.offer.findFirst({ orderBy: { sortOrder: "asc" } });
    if (first && /[ء-ی]/.test(first.title + first.description)) {
      await prisma.offer.update({ where: { id: first.id }, data: offerEn });
    }
  }

  const blogs = [
    {
      slug: "qanoon-e-mufrad-aaza-kya-hai",
      title: "What is Qanoon-e-Mufrad Aaza?",
      category: "Hikmat",
      imageUrl: "/qanoon-chart.jpg",
      excerpt: "A short note on the special method used at Yasin Dava Khana.",
      content:
        "Qanoon-e-Mufrad Aaza is a hikmat method that focuses on simple organs of the body. Yasin Dava Khana, Dunyapur follows this method together with Tibb-e-Sabir.\n\nAsk the Hakeem before using any medicine. This article is general information, not a hospital diagnosis.",
    },
    {
      slug: "gurdon-ki-hifazat",
      title: "Simple care for the kidneys",
      category: "Health advice",
      imageUrl: "/products/hab-waram-gurda.jpg",
      excerpt: "Water, salt, and when to ask the Hakeem.",
      content:
        "The kidneys help the body remove waste. Drink enough water, avoid too much salt, and use herbal medicine only as advised.\n\nIf there is burning urine, stones, or swelling, contact the Hakeem or a doctor at once.",
    },
    {
      slug: "monthly-mufred-aza",
      title: "Monthly Mufred Aza — Dunyapur",
      category: "Magazine",
      imageUrl: "/magazine/mufred-aza.png",
      excerpt: "Monthly magazine of Yasin Dava Khana and Tibbi Kutub Khana, Dunyapur.",
      content:
        "Monthly Mufred Aza is the magazine of Yasin Dava Khana Wa Tibbi Kutub Khana, Railway Road, Dunyapur (Lodhran).\n\nFor copies or ads, WhatsApp 0301-4185965 or 0344-7014392. Email: mufradaza786@gmail.com.",
    },
    {
      slug: "herbal-medicine-se-faida",
      title: "When is herbal medicine useful?",
      category: "Magazine",
      imageUrl: "/magazine/mufred-aza-2.png",
      excerpt: "How to use natural medicine carefully.",
      content:
        "Herbal medicines are natural, but the dose is decided by the Hakeem. Do not take extra on your own.\n\nIn pregnancy, diabetes, or heart disease, message Yasin Dava Khana before starting any powder or tablet.",
    },
  ];

  for (const post of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const galleryPics = [
    { imageUrl: "/logo.jpg", caption: "یٰسین دواخانہ", sortOrder: 0 },
    { imageUrl: "/products/hab-waram-gurda.jpg", caption: "حب ورم گردہ", sortOrder: 1 },
    { imageUrl: "/products/hab-shugarnil.jpg", caption: "حب شوگرنل", sortOrder: 2 },
    { imageUrl: "/products/pathri-tod.jpg", caption: "پتھری توڑ", sortOrder: 3 },
    { imageUrl: "/products/sang-shikan.jpg", caption: "سنگ شکن", sortOrder: 4 },
    { imageUrl: "/products/bukhar-rok.jpg", caption: "بخار روک", sortOrder: 5 },
    { imageUrl: "/products/anti-pus-cells.jpg", caption: "اینٹی پس سیلز", sortOrder: 6 },
    { imageUrl: "/products/taryaq-e-maida.jpg", caption: "تریاقِ معدہ", sortOrder: 7 },
    { imageUrl: "/products/pechesh-stop.jpg", caption: "پیچش سٹاپ", sortOrder: 8 },
    { imageUrl: "/products/hab-arq-un-nisa.jpg", caption: "حب عرق النساء", sortOrder: 9 },
    { imageUrl: "/products/hab-e-gathia.jpg", caption: "حب گٹھیا", sortOrder: 10 },
    { imageUrl: "/products/anti-uric-acid.jpg", caption: "اینٹی یورک ایسڈ", sortOrder: 11 },
    { imageUrl: "/products/hab-mueen-hamal.jpg", caption: "حب معین حمل", sortOrder: 12 },
    { imageUrl: "/products/hab-mudir-e-haiz.jpg", caption: "حب مدر حیض", sortOrder: 13 },
    { imageUrl: "/products/jarian-rok.jpg", caption: "جریان روک", sortOrder: 14 },
    { imageUrl: "/products/sperm-up.jpg", caption: "سپر اپ سفوف", sortOrder: 15 },
    { imageUrl: "/products/sada-jawani.jpg", caption: "سدا جوانی سفوف", sortOrder: 16 },
    { imageUrl: "/products/asrar-e-bah.jpg", caption: "اسرارِ باہ", sortOrder: 17 },
  ];

  if ((await prisma.galleryImage.count()) === 0) {
    await prisma.galleryImage.createMany({ data: galleryPics });
  }

  const sitePics = [
    { slot: "hero", group: "header", label: "Home banner", imageUrl: "/hero-banner.png", sortOrder: 1 },
    { slot: "logo", group: "header", label: "Logo", imageUrl: "/logo.jpg", sortOrder: 2 },
    { slot: "hakeem-yasin", group: "hakeem", label: "Hakeem Yasin photo", imageUrl: "/elders/hakeem-yasin-oval.png", sortOrder: 1 },
    { slot: "hakeem-yunus", group: "hakeem", label: "Hakeem Yunus photo", imageUrl: "/elders/hakeem-yunus.png", sortOrder: 2 },
    { slot: "hakeem-pair", group: "hakeem", label: "Both Hakeems photo", imageUrl: "/elders/hakeems.png", sortOrder: 3 },
    { slot: "sabir", group: "hakeem", label: "Hazrat Sabir Multani", imageUrl: "/elders/sabir-multani.png", sortOrder: 4 },
    { slot: "magazine-1", group: "magazine", label: "Magazine page 1", imageUrl: "/magazine/mufred-aza.png", sortOrder: 1 },
    { slot: "magazine-2", group: "magazine", label: "Magazine page 2", imageUrl: "/magazine/mufred-aza-2.png", sortOrder: 2 },
    { slot: "qanoon", group: "magazine", label: "Qanoon chart", imageUrl: "/qanoon-chart.jpg", sortOrder: 3 },
    { slot: "purity-bg", group: "purity", label: "Purity section background", imageUrl: "/ingredients/jari-booti-fresh.png", sortOrder: 1 },
    { slot: "purity-pure", group: "purity", label: "Pure products background", imageUrl: "/ingredients/jari-booti-fresh.png", sortOrder: 2 },
    { slot: "purity-fake", group: "purity", label: "Artificial products background", imageUrl: "/ingredients/jari-booti-dried.png", sortOrder: 3 },
    { slot: "ing-1", group: "ingredients", label: "Chamomile", imageUrl: "/ingredients/booti-01.png", sortOrder: 1 },
    { slot: "ing-2", group: "ingredients", label: "Dried flowers", imageUrl: "/ingredients/booti-02.png", sortOrder: 2 },
    { slot: "ing-3", group: "ingredients", label: "Herbal roots", imageUrl: "/ingredients/booti-03.png", sortOrder: 3 },
    { slot: "ing-4", group: "ingredients", label: "Dried stems", imageUrl: "/ingredients/booti-04.png", sortOrder: 4 },
    { slot: "ing-5", group: "ingredients", label: "Jari booti", imageUrl: "/ingredients/booti-05.png", sortOrder: 5 },
    { slot: "ing-6", group: "ingredients", label: "Fresh & dry herbs", imageUrl: "/ingredients/booti-06.png", sortOrder: 6 },
    { slot: "ing-8", group: "ingredients", label: "Honeycomb", imageUrl: "/ingredients/booti-08.png", sortOrder: 8 },
    { slot: "ing-9", group: "ingredients", label: "Medicinal herbs", imageUrl: "/ingredients/booti-09.png", sortOrder: 9 },
    { slot: "ing-10", group: "ingredients", label: "Rose petals", imageUrl: "/ingredients/booti-10.png", sortOrder: 10 },
    { slot: "ing-11", group: "ingredients", label: "Red booti", imageUrl: "/ingredients/booti-11.png", sortOrder: 11 },
  ];
  for (const pic of sitePics) {
    await prisma.siteImage.upsert({
      where: { slot: pic.slot },
      update: {},
      create: pic,
    });
  }

  console.log("Seed complete.");
  console.log("Admin login:", email);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
