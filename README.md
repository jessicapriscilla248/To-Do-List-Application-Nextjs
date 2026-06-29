# 📝 Aplikasi To Do List Next.js

Aplikasi to do list menggunakan **Next.js**, **React**, **Prisma ORM**, dan **MySQL**. Aplikasi ini berfungsi untuk mengelola daftar tugas.

## 🌟 Fitur Utama

- ✅ **Create** - Tambahkan tugas baru dengan judul dan deskripsi
- 📖 **Read** - Tampilkan daftar semua tugas dengan status (Pending, Selesai, Dihapus)
- ✏️ **Update** - Tandai tugas sebagai selesai atau pending
- 🗑️ **Delete** - Hapus tugas (soft delete)
- 🔄 **Sorting** - Tugas diurutkan berdasarkan status: Pending → Selesai → Dihapus
- 🎨 **UI Responsif** - Desain menggunakan Tailwind CSS
- ⚡ **Real time Updates** - Data diperbarui secara real time menggunakan SWR

## 🛠️ Tech Stack

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **Next.js** | 16.0.3 | Framework React dengan SSR dan App Router |
| **React** | 19.2.0 | Library UI untuk membuat komponen interaktif |
| **TypeScript** | - | Bahasa pemrograman dengan type safety |
| **Prisma ORM** | 6.19.0 | ORM untuk manajemen database MySQL |
| **MySQL** | - | Database relasional |
| **Tailwind CSS** | 4.x | Framework CSS untuk styling |
| **SWR** | 2.3.6 | Library untuk data fetching dan caching |
| **React Icons** | 5.5.0 | Icon library |

## 📦 Model Data

### Task
```prisma
model Task {
  id          Int       @id @default(autoincrement())
  title       String    // Judul tugas
  description String?   // Deskripsi tugas (opsional)
  isCompleted Boolean   @default(false) // Status selesai
  createdAt   DateTime  @default(now()) // Waktu dibuat
  updatedAt   DateTime  @updatedAt // Waktu diperbarui
  deletedAt   DateTime? // Waktu dihapus (soft delete)
}
```

## 🚀 Cara Run Aplikasi

### Prasyarat
- Node.js v18+ 
- npm atau yarn
- MySQL database

### Instalasi

1. **Clone atau buka repository**
   ```bash
   cd project_crud_agit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Buat file `.env.local` di root project:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"
   ```

4. **Setup database dengan Prisma**
   ```bash
   npx prisma migrate dev
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka browser**
   Akses aplikasi di [http://localhost:3000](http://localhost:3000)

## 📝 Perintah Tersedia

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Jalankan production server
npm start

# Lint code
npm run lint

# Setup/update database schema
npx prisma migrate dev

# Buka Prisma Studio (GUI database)
npx prisma studio
```

## 📂 Struktur Project

```
project_to_do_list_Nextjs/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       └── route.ts           # API endpoints untuk CRUD
│   ├── components/
│   │   ├── task-form.tsx          # Form untuk menambah tugas
│   │   ├── task-table.tsx         # Tabel tampilan tugas
│   │   └── buttons/
│   │       ├── DeleteButton.tsx   # Tombol hapus
│   │       └── UpdateButton.tsx   # Tombol update status
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Layout utama
│   └── page.tsx                   # Halaman utama (home)
├── lib/
│   ├── prisma.ts                  # Konfigurasi Prisma client
│   └── utils.ts                   # Utility functions
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

## 🔌 API Endpoints

### GET `/api/tasks`
Mengambil semua tugas
```bash
curl http://localhost:3000/api/tasks
```

### POST `/api/tasks`
Membuat tugas baru
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Belajar Next.js","description":"Pelajari Next.js 16"}'
```

### PUT `/api/tasks?id=1`
Update status tugas
```bash
curl -X PUT http://localhost:3000/api/tasks?id=1 \
  -H "Content-Type: application/json" \
  -d '{"isCompleted":true}'
```

### DELETE `/api/tasks?id=1`
Menghapus tugas
```bash
curl -X DELETE http://localhost:3000/api/tasks?id=1
```

## 💡 Fitur Khusus

- **Soft Delete** - Data tidak benar-benar dihapus, hanya ditandai dengan `deletedAt` timestamp
- **Otomatis Sorting** - Tugas diurutkan otomatis: Pending → Selesai → Dihapus
- **Real-time Sync** - Menggunakan SWR untuk sinkronisasi data otomatis
- **TypeScript** - Type safety untuk menghindari error saat development
- **Responsive Design** - Mobile-first approach dengan Tailwind CSS

## 🎨 Component Architecture

### `Task Form Component`
- Menerima input judul dan deskripsi
- Validasi input sebelum submit
- Loading state indicator

### `Task Table Component`
- Menampilkan daftar tugas dalam format tabel
- Aksi update dan delete untuk setiap tugas
- Status badge (Pending/Selesai/Dihapus)

### `Action Buttons`
- **Update Button** - Toggle status selesai
- **Delete Button** - Soft delete tugas

## 🌐 Deployment

Aplikasi ini dapat di-deploy ke berbagai platform:

### Deploy ke Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy ke Platform Lain
Aplikasi Next.js ini kompatibel dengan:
- Heroku
- Railway
- Render
- DigitalOcean

Pastikan untuk:
1. Setup environment variables di platform deployment
2. Jalankan migration database
3. Build aplikasi sebelum deployment

## 📚 Belajar Lebih Lanjut

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

## 📄 Lisensi

Project ini adalah bagian dari Technical Test AGIT.

## 👨‍💻 Author

Jessica - Project Technical Test AGIT
