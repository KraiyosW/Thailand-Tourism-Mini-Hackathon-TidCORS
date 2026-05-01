# 🇹🇭 Thai Unseen - Discover Thailand's Hidden Gems

**Thai Unseen** เป็นแพลตฟอร์มการท่องเที่ยวที่นำเทคโนโลยี AI มาช่วยให้นักท่องเที่ยวได้สัมผัสกับ "เสน่ห์ที่ซ่อนอยู่" (Hidden Gems) ของประเทศไทย โดยเน้นการสร้าง Ecosystem ที่ยั่งยืนระหว่างนักท่องเที่ยว, ไกด์ท้องถิ่น และชุมชน

---

## ✨ Key Features

### 🗺️ AI-Powered Unseen Discovery
- **Unseen Bento Grid**: รวบรวมสถานที่ท่องเที่ยวที่มหัศจรรย์ของประเทศไทย พร้อมการออกแบบ UI ที่ทันสมัยและน่าดึงดูด
- **AI Route Generator**: ระบบแนะนำเส้นทางท่องเที่ยวอัจฉริยะที่ช่วยวางแผนการเดินทางตามความสนใจส่วนบุคคล

### 🤝 Community & Connection
- **Verified Local Guides**: ตลาดกลางสำหรับค้นหาไกด์ท้องถิ่นที่มีตัวตนจริง พร้อมระบบ Chat จำลองเพื่อปรึกษาแผนการเดินทาง
- **Travel Buddies Matching**: ระบบหาเพื่อนร่วมทางสำหรับนักท่องเที่ยวที่ต้องการแชร์ค่าใช้จ่ายและสร้างมิตรภาพใหม่ๆ

### 🚗 Seamless Logistics
- **Transparent Transport**: ระบบจองยานพาหนะท้องถิ่น (เช่น รถตุ๊กตุ๊ก, เรือหางยาว) พร้อมราคากลางที่โปร่งใส มั่นใจไม่โดนโกงราคา

### 🌍 Universal Accessibility
- **Full Localization**: รองรับทั้งภาษาไทย (TH) และภาษาอังกฤษ (EN) อย่างสมบูรณ์แบบ เพื่อมอบประสบการณ์ที่ดีที่สุดให้กับทั้งคนไทยและชาวต่างชาติ

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) ด้วยประสิทธิภาพของ Turbopack
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) สำหรับ Modern & Responsive UI
- **State Management**: React Hooks & Context API
- **Animations**: Framer Motion & CSS Keyframes สำหรับ Micro-animations ที่ไหลลื่น
- **Localization**: Custom i18n Dictionary System
- **Icons**: Lucide React & Custom SVGs

---

## 🚀 Getting Started

หากต้องการรันโปรเจคนี้บนเครื่องของคุณ ให้ปฏิบัติตามขั้นตอนดังนี้:

### 1. Clone the repository
```bash
git clone https://github.com/KraiyosW/Thailand-Tourism-Mini-Hackathon-TidCORS.git
cd Thailand-Tourism-Mini-Hackathon-TidCORS
```

### 2. Install Dependencies
แนะนำให้ใช้ `pnpm` เพื่อความรวดเร็ว:
```bash
pnpm install
# หรือ
npm install
```

### 3. Setup Environment Variables
สร้างไฟล์ `.env.local` ใน Root directory และเพิ่ม Key ที่จำเป็น:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 4. Run Development Server
```bash
pnpm dev
# หรือ
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) บน Browser เพื่อดูผลลัพธ์

---

## 🏗️ Project Structure

- `/src/app`: โครงสร้างหน้าเว็บทั้งหมด (Routing)
- `/src/components`: UI Components ที่นำกลับมาใช้ใหม่ได้
- `/src/i18n`: ระบบจัดการภาษา (Dictionary TH/EN)
- `/src/lib`: คลาสเครื่องมือและ Configuration ต่างๆ (เช่น Supabase Client)
- `/public`: ไฟล์ Static assets เช่น รูปภาพและโลโก้

---

## 🎯 Goal

โปรเจคนี้สร้างขึ้นเพื่อเป็นส่วนหนึ่งของ **Thailand Tourism Mini Hackathon** โดยมีเป้าหมายเพื่อยกระดับการท่องเที่ยวไทยด้วย Digital Transformation และส่งเสริมเศรษฐกิจฐานรากผ่านการท่องเที่ยวอย่างสร้างสรรค์

---
**Developed with ❤️ for Thailand Tourism**
