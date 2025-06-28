# 🌐 Hades Web Interface Documentation

The **Hades Web Interface** is a modern, user-friendly dashboard designed to complement the Hades CLI and FastAPI backend. It provides a graphical interface for managing cybersecurity operations, visualizing data, and interacting with the AI-powered agent.

---

## 📋 Features

- **Authentication**: Secure login and signup functionality.
- **Dashboard**: Real-time metrics, API key management, and user-specific data.
- **UI Components**: Reusable and customizable components built with Tailwind CSS.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🛠️ Installation

### Prerequisites

- **Node.js**: v16+ is recommended.
- **npm** or **yarn**: For dependency management.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/NexorTech/hades.git
   cd hades/web
2. Install dependencies:
   ```bash
   npm install
3. Start dev server:
   ```bash
   npm run dev
4. Open the application in your browser:
   ```bash
   http://localhost:3000

### Project Structure

```text
web/
├── app/                     # Next.js app directory
│   ├── api/                 # API routes
│   ├── dashboard/           # Dashboard page
│   ├── signin/              # Sign-in page
│   ├── signup/              # Sign-up page
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   ├── Footer.tsx           # Footer component
│   ├── Navbar.tsx           # Navigation bar
│   ├── ui/                  # UI primitives (buttons, inputs, etc.)
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and libraries
├── public/                  # Static assets
├── styles/                  # Global styles
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🚀Key Pages

### **Sign-In Page**
- **Path**: `/signin`
- **Description**: Allows users to log in using email/password or third-party providers (Google, GitHub).
- **File**: `app/signin/page.tsx`

### **Sign-Up Page**
- **Path**: `/signup`
- **Description**: Enables new users to register with their details.
- **File**: `app/signup/page.tsx`

### **Dashboard**
- **Path**: `/dashboard`
- **Description**: Displays user-specific metrics, API key management, and other operational data.
- **File**: `app/dashboard/page.tsx`

---

## 🎨 UI Components

The web interface uses a modular component-based architecture. Key components include:

- **Button**: A customizable button component.  
  File: `components/ui/button.tsx`

- **Card**: A card layout for displaying grouped content.  
  File: `components/ui/card.tsx`

- **Toaster**: Notification system for user feedback.  
  File: `components/ui/toaster.tsx`

---

## 🧩 Configuration

The web interface uses Tailwind CSS for styling. Key configuration files:

- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`

---

## 📦 Deployment

### Build for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

---

## 📚 Resources

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## 🛠️ Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

---

## 📫 Support

For issues or questions, please open an issue on the GitHub repository or contact the maintainers.

---