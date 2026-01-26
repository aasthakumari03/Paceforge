# Study Urgency Engine (PaceForge)

PaceForge is a production-ready web application designed to create **artificial urgency**, **clear structure**, and **visible progress** for college students. It helps students tackle the lack of strict deadlines by assigning logic-based urgency scores to tasks.

## 🚀 Features

### Core Task & Urgency System
- **Auto-generated Urgency**: Tasks are scored (0-100) based on deadline proximity, priority, and rollover status.
- **Rollover Penalty**: Unfinished tasks gain higher urgency automatically.
- **Smart Reminders**: Context-aware reminders ("Still pending. Future you is watching.").

### Student-Focused Dashboard
- **Daily Focus View**: Only shows what matters today.
- **Subject Management**: Track subjects, syllabus, and target grades.
- **Visual Progress**: Weekly charts tracking assigned vs. completed tasks.

### Tech Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes (Serverless Node.js logic)
- **Database**: MongoDB (via Mongoose)
- **Auth**: Custom JWT Authentication (Secure, Lightweight)
- **Charts**: Chart.js

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Database (Local or Atlas URL)

### Installation

1. **Clone the repository** (if applicable) or navigate to project folder:
   ```bash
   cd paceforge
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/paceforge
   JWT_SECRET=your_super_secret_key_change_me
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Open Browser**:
   Navigate to `http://localhost:3000`.

## 📂 Project Structure

```
/src
  /app           # Next.js App Router Pages & API
    /api         # Backend Routes (Auth, Tasks, User)
    /auth        # Login / Register Pages
    /dashboard   # Main User Dashboard
    /profile     # Profile Setup
  /components    # Reusable UI (Buttons, Inputs, Charts)
  /lib           # Core Utilities (DB Connect, Auth)
  /models        # Mongoose Database Schemas
  /utils         # Urgency Algorithm & Helpers
```

## 🔮 Future Improvements
- **Gamification Expansion**: Unlockable badges for streaks.
- **Calendar Integration**: Sync with Google/Outlook Calendar.
- **Mobile App**: PWA or React Native port.

---
Built with ❤️ for Students.
