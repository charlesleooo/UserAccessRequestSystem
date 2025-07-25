# 🚀 ABU IT User Access Request (UAR) System

A web-based system for managing user access requests within the Alsons Agribusiness Unit (ABU).  
Built with **Laravel 12** and **React (Breeze + Inertia)**, it supports both **manual** and **digital approval processes**.

---

## ✅ What This System Does

- Lets employees request access to systems or applications.
- Sends the request through multiple approvers (supervisor, IT, process owner).
- Tracks the status and logs all actions for audit purposes.

---

## 👥 Who Uses It

| Role               | What They Do                         |
|--------------------|--------------------------------------|
| Requestor          | Submits a new access request         |
| Supervisor         | Reviews and recommends the request   |
| IT Service Desk    | Assigns it to technical team         |
| Process Owner      | Approves or denies app-specific access |
| Technical Support  | Sets up access, tests functionality  |
| System Admin       | Applies configurations and backups   |
| IT Leader          | Gives final approval and closes it   |

---

## 🔄 How the Approval Process Works

1. **Employee** submits a request.
2. **Supervisor** approves or rejects.
3. **IT Service Desk** routes to the right person.
4. **Process Owner** reviews app-specific requests.
5. **Tech Support** sets up access and tests it.
6. **Requestor** confirms everything works.
7. **System Admin** finalizes setup and backups.
8. **IT Leader** gives the final sign-off.

A request is marked as **served** only when:
- All tech steps are done
- The requestor confirms it's working
- The IT Leader approves
- It’s logged or archived

---

## 🛠 Tech Stack

- Laravel 12 (PHP Framework)
- React + Inertia.js (Frontend)
- Tailwind CSS (Styling)
- MySQL or SQLite (Database)
- Node.js + Vite (Asset bundler)

---

## ⚙️ Installation Guide (Local Setup)

### 🔧 Requirements

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL or SQLite
- Git

### 📦 Steps to Install

```bash
# 1. Clone the project
git clone https://github.com/charlesleooo/UserAccessRequestSystem.git
cd UserAccessRequestSystem

# 2. Install backend dependencies
composer install

# 3. Install frontend dependencies
npm install

# 4. Set up your environment
cp .env.example .env

# 5. Generate the app key
php artisan key:generate

# 6. Set your DB config in .env

# 7. Run migrations
php artisan migrate

# 8. Build frontend assets
npm run dev

# 9. Start the Laravel server
php artisan serve
