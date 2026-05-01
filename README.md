# 📋 บันทึกการพัฒนา — Thai Unseen Agent

> อัปเดตล่าสุด: 1 พฤษภาคม 2569  
> เวอร์ชัน: 0.1.0 (MVP สำหรับ Super AI Hackathon)
> clone แล้ว pnpm install > pnpm run dev
---

## 🛠️ Tech Stack

| เทคโนโลยี | เวอร์ชัน | หมายเหตุ |
|---|---|---|
| Next.js | 16.2.4 | App Router |
| React | 19.2.4 | - |
| Tailwind CSS | v4 | ใช้ `@tailwindcss/postcss` |
| TypeScript | ^5 | - |
| Package Manager | pnpm | - |

---

## 📁 โครงสร้างโปรเจกต์

```
src/
├── app/                        # หน้าเว็บทั้งหมด (App Router)
│   ├── layout.tsx              # Layout หลัก (Navbar อยู่ที่นี่)
│   ├── page.tsx                # หน้าแรก (Landing Page)
│   ├── globals.css             # ธีมสี, Animations, Glass effects
│   ├── ai-route/page.tsx       # หน้า AI Route Planner
│   ├── buddies/page.tsx        # หน้า Travel Buddy Matcher
│   ├── guides/page.tsx         # หน้า Local Guide Finder
│   ├── transport/page.tsx      # หน้า Transparent Transport
│   └── unseen/page.tsx         # หน้า Unseen Destinations Gallery
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Navigation Bar (ใช้ร่วมกันทุกหน้า)
│   └── ui/
│       ├── button.tsx          # Button component (shadcn/ui style)
│       └── HeroSlideshow.tsx   # Slideshow สไลด์รูปภาพอัตโนมัติ
│
├── i18n/                       # ระบบแปลภาษา (Thai / English)
│   ├── DictionaryContext.tsx   # React Context สำหรับสลับภาษา
│   ├── en.ts                   # พจนานุกรมภาษาอังกฤษ
│   └── th.ts                   # พจนานุกรมภาษาไทย
│
└── lib/
    └── utils.ts                # Utility functions (cn helper)
```

---

## ✅ สิ่งที่ทำเสร็จแล้ว

### 1. Landing Page (หน้าแรก) — `src/app/page.tsx`

- **Hero Section**: สไลด์โชว์รูปภาพอัตโนมัติ (สลับทุก 5 วินาที) แบบเต็มจอ
  - มี Search Bar แบบ Floating สำหรับเลือกสถานที่ / สไตล์การเที่ยว / ระยะเวลา
  - ปุ่ม "สร้างแผนการเดินทาง" ลิงก์ไปหน้า `/ai-route`
- **Trending Unseen Section**: Bento Grid แสดงสถานที่แนะนำ 3 แห่ง มีรูปภาพพร้อม Hover effects
  - มี Parallax Background Image
- **Ecosystem Section**: การ์ด 3 ใบแนะนำฟีเจอร์หลัก (Guides / Buddy / Transport)
  - มี Parallax Background Image + Glassmorphism cards
- **Footer**: แสดง Copyright

### 2. AI Route Planner — `src/app/ai-route/page.tsx`

- แสดงตัวอย่าง Itinerary 2 วัน ในเชียงใหม่ (Cultural Immersion + Nature & Adventure)
- Timeline UI พร้อมรูปภาพแต่ละสถานที่
- แผนที่จำลอง (Mock Map) พร้อม Route pins
- ปุ่ม "แก้ไขความต้องการ" และ "บันทึกทริป"
- **⚠️ ยังเป็น Static Data — ยังไม่ได้เชื่อมต่อกับ AI จริง**

### 3. หน้าอื่น ๆ (UI พร้อมแล้ว)

| หน้า | Route | สถานะ |
|---|---|---|
| Local Guides | `/guides` | ✅ UI เสร็จ — แสดงไกด์ 3 คน |
| Travel Buddies | `/buddies` | ✅ UI เสร็จ — แสดง Buddy 3 คน + Filter |
| Unseen Places | `/unseen` | ✅ UI เสร็จ — Bento Grid Gallery |
| Transport | `/transport` | ✅ UI เสร็จ — Booking Form + Safety Info |

### 4. ระบบ 2 ภาษา (i18n)

- มีปุ่มลูกโลก 🌐 บน Navbar สำหรับสลับภาษา **ไทย ↔ อังกฤษ**
- ใช้ React Context (`DictionaryContext`) ทำให้สลับภาษาแบบ Real-time ไม่ต้อง Refresh หน้า
- **ทุกหน้า** รองรับ 2 ภาษาแล้ว (หัวข้อ, คำอธิบาย, ปุ่ม)

### 5. Design System

- **Color Palette**: สี Primary (ฟ้าทะเล `#0284c7`), Secondary (ทอง `#f59e0b`), Accent (เขียว `#10b981`)
- **Glass Effect**: `.glass` class ใน `globals.css` สำหรับ Glassmorphism
- **Animations**: `fadeInUp`, `slideInRight`, `float` พร้อม Staggered delays (100ms - 500ms)
- **Fonts**: Inter (ภาษาอังกฤษ) + Noto Sans Thai (ภาษาไทย)

### 6. Navbar

- อยู่ใน `layout.tsx` → แสดงบนทุกหน้าอัตโนมัติ
- หน้า Home: โปร่งใส + ตัวหนังสือสีขาว (ทับบนรูปภาพ)
- หน้าอื่น ๆ: พื้นหลังสีขาวทึบ + ตัวหนังสือสีเข้ม (อ่านง่าย)
- เลื่อนหน้าลง: เปลี่ยนเป็น Blur/Glassmorphism อัตโนมัติ
- รองรับ Mobile Menu (hamburger icon)

---

## ⚠️ สิ่งที่ยังต้องทำ / ปัญหาที่ต้องแก้

### 🔴 สำคัญมาก

1. **เปลี่ยนรูปภาพให้ตรงกับสถานที่จริง**
   - ตอนนี้รูปจาก Unsplash ยังไม่ตรง 100%
   - ดูตารางด้านล่างสำหรับรายการรูปที่ต้องเปลี่ยน

2. **เชื่อมต่อ AI Route Planner กับ Backend จริง**
   - ตอนนี้หน้า `/ai-route` ยังเป็น Static Data
   - ต้องสร้าง API Route ที่รับค่าจาก Search Bar → ส่งไป LLM → Return Itinerary

### 🟡 ควรทำ

3. **State Persistence สำหรับภาษา** — ปัจจุบันภาษารีเซ็ตเมื่อ Refresh หน้า ควรเก็บใน `localStorage` หรือ cookie
4. **Responsive Check** — ตรวจสอบ UI บนมือถือให้ดีอีกรอบ โดยเฉพาะ Bento Grid
5. **เพิ่มเนื้อหาภาษาไทยในหน้าย่อย** — หน้า guides, buddies, transport, unseen ยังมีบาง UI ที่ข้อความเป็นภาษาอังกฤษฮาร์ดโค้ดอยู่ (เช่น ชื่อไกด์, ชื่อ Buddy)

### 🟢 Nice to have

6. **Dark Mode Toggle** — CSS พร้อมแล้ว (มี `.dark` variables) แค่ยังไม่มีปุ่มสลับ
7. **SEO Metadata** — เพิ่ม meta tags สำหรับแต่ละหน้า
8. **Loading States & Error Boundaries**

---

## 🖼️ รายการรูปภาพที่ต้องเปลี่ยน

### วิธีหาลิงก์จาก Unsplash

1. ไปที่ `https://unsplash.com/s/photos/ชื่อสถานที่` (เช่น `khao-sok`)
2. คลิกรูปที่ชอบ → ดู URL เช่น `unsplash.com/photos/some-title-AbCdEfGhIjK`
3. เอา **ID ท้ายสุด** มาใส่ตามรูปแบบ:
   ```
   https://images.unsplash.com/photo-[ID]?q=80&w=1600&auto=format&fit=crop
   ```
   *(ห้ามใส่ `ixlib=...` เพราะ Adblocker จะบล็อก)*

### ตารางรูปภาพ

| # | ไฟล์ | บรรทัด | รูปที่ต้องการ |
|---|---|---|---|
| 1 | `src/components/ui/HeroSlideshow.tsx` | L7 | 🏝️ ทะเล/หมู่เกาะไทย |
| 2 | `src/components/ui/HeroSlideshow.tsx` | L8 | ⛰️ ภูเขา/ทะเลสาบ |
| 3 | `src/components/ui/HeroSlideshow.tsx` | L9 | 🛕 วัดไทย |
| 4 | `src/components/ui/HeroSlideshow.tsx` | L10 | 🍜 อาหารไทย / ตลาดกลางคืน |
| 5 | `src/app/page.tsx` | L11 | 🌿 อุทยานแห่งชาติเขาสก |
| 6 | `src/app/page.tsx` | L12 | ⛩️ วัดเฉลิมพระเกียรติ ลำปาง |
| 7 | `src/app/page.tsx` | L13 | 🏖️ เกาะกูด ตราด |
| 8 | `src/app/ai-route/page.tsx` | L13 | 🛕 วัดพระธาตุดอยสุเทพ |
| 9 | `src/app/ai-route/page.tsx` | L14 | 🍜 ข้าวซอย เชียงใหม่ |
| 10 | `src/app/ai-route/page.tsx` | L15 | 🏡 บ้านข้างวัด เชียงใหม่ |
| 11 | `src/app/ai-route/page.tsx` | L22 | ⛰️ อุทยานฯ ดอยอินทนนท์ |
| 12 | `src/app/ai-route/page.tsx` | L23 | 💧 น้ำตกวชิรธาร |
| 13 | `src/app/unseen/page.tsx` | L9 | 🌿 ทะเลสาบเขาสก |
| 14 | `src/app/unseen/page.tsx` | L10 | 🤍 วัดร่องขุ่น |
| 15 | `src/app/unseen/page.tsx` | L11 | 🏝️ เกาะหลีเป๊ะ |
| 16 | `src/app/unseen/page.tsx` | L12 | 🏛️ อุทยานประวัติศาสตร์พิมาย |

---

## 🚀 วิธีรันโปรเจกต์

```bash
# ติดตั้ง dependencies
pnpm install

# รันโหมด Development
pnpm run dev

# เปิดเบราว์เซอร์ที่
http://localhost:3000
```

---

## 📌 หมายเหตุสำหรับเพื่อนร่วมทีม

- **Navbar** อยู่ใน `layout.tsx` ไม่ต้องเพิ่มในหน้าใหม่ — แค่สร้างไฟล์ `page.tsx` ใน `src/app/[ชื่อหน้า]/` ก็จะมี Navbar ให้อัตโนมัติ
- ทุกหน้าย่อยต้องมี `"use client";` บรรทัดแรก เพราะใช้ `useDictionary()` (React Context)
- ถ้าจะเพิ่มข้อความใหม่ที่ต้องแปล → เพิ่มใน `src/i18n/en.ts` และ `src/i18n/th.ts` คู่กัน → แล้วเรียกใช้ผ่าน `dict.ชื่อKey`
- รูปภาพทั้งหมดใช้ `<img>` tag ธรรมดา (ไม่ใช้ `next/image`) เพื่อหลีกเลี่ยงปัญหา `remotePatterns` config
- ทุก `<img>` มี `onError` fallback ไปที่ `picsum.photos` เผื่อ Unsplash โหลดไม่ได้
