# Hades Web Interface

The Hades Web Interface is a modern, responsive React application that serves as the frontend for the Hades cybersecurity automation platform. Built with React, TypeScript, and Tailwind CSS, it provides an intuitive user interface for interacting with Hades AI agents and managing cybersecurity workflows.

🌐 **Live Demo**: [https://hades.nexortech.dev/](https://hades.nexortech.dev/)

## Features

- **Landing Page**: Modern cybersecurity-themed landing page showcasing Hades capabilities
- **Chat Interface**: Interactive chat interface for communicating with Hades AI agents
- **Responsive Design**: Fully responsive design optimized for desktop and mobile devices
- **Modern UI/UX**: Cyberpunk-inspired design with smooth animations and gradients
- **Real-time Communication**: WebSocket-based chat functionality with the backend AI agents
- **Multi-page Navigation**: React Router-based navigation between landing and chat interfaces

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development environment
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Lucide React**: Beautiful icon library

## Architecture Overview

The web interface connects to the Hades Agent backend to provide:
1. **Landing Experience**: Showcases Hades features, benefits, and download options
2. **Chat Interface**: Direct communication with cybersecurity AI agents
3. **User Dashboard**: Management interface for security workflows (future enhancement)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Hades/web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev`: Start development server with hot module replacement
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check code quality

## Project Structure

```
web/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and other assets
│   ├── components/        # Reusable React components
│   │   ├── Navbar.tsx     # Navigation bar component
│   │   ├── Hero.tsx       # Hero section with CTA
│   │   ├── Features.tsx   # Features showcase
│   │   ├── Reviews.tsx    # User testimonials
│   │   ├── Download.tsx   # Download section
│   │   └── Footer.tsx     # Footer component
│   ├── pages/             # Page components
│   │   ├── LandingPage.tsx # Main landing page
│   │   └── ChatInterface.tsx # Chat interface with AI agents
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles and Tailwind imports
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Component Overview

### Landing Page Components

- **Navbar**: Responsive navigation bar with mobile menu support
- **Hero**: Eye-catching hero section with cybersecurity theming and call-to-action
- **Features**: Showcases key Hades capabilities and features
- **Reviews**: User testimonials and social proof
- **Download**: Download links and installation instructions
- **Footer**: Site links and contact information

### Chat Interface

- **Real-time Chat**: Interactive chat interface for communicating with Hades AI
- **Message History**: Persistent conversation history
- **Typing Indicators**: Visual feedback during AI response generation
- **Responsive Design**: Mobile-optimized chat experience

## Styling and Theming

The application uses a cybersecurity-inspired dark theme with:
- **Color Palette**: Dark backgrounds with cyan/purple accent colors
- **Typography**: Modern, clean fonts optimized for readability
- **Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts

### Custom Tailwind Configuration

The project includes custom Tailwind CSS utilities for:
- Cyberpunk-inspired color schemes
- Gradient backgrounds and text effects
- Animation classes for interactive elements
- Responsive grid layouts

## API Integration

The web interface communicates with the Hades Agent backend through:
- RESTful API endpoints for chat functionality
- WebSocket connections for real-time updates
- Error handling and loading states
- Session management for multi-turn conversations

## Development Guidelines

### Code Style

- Use TypeScript for all components and utilities
- Follow React best practices with functional components and hooks
- Implement proper error boundaries and loading states
- Use semantic HTML and accessible design patterns

### Performance Considerations

- Lazy load components where appropriate
- Optimize images and assets for web delivery
- Implement efficient state management
- Use React.memo() for expensive components

## Deployment

### Live Website

The Hades Web Interface is currently deployed and accessible at:
**[https://hades.nexortech.dev/](https://hades.nexortech.dev/)**

### Production Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

Configure the following environment variables for production:

```env
VITE_API_BASE_URL=<backend-api-url>
VITE_WS_URL=<websocket-url>
```

## Integration with Hades Ecosystem

The web interface is part of the larger Hades cybersecurity platform:

- **Backend Integration**: Connects to the FastAPI backend in `../Agent/server.py`
- **CLI Integration**: Complements the Go-based CLI tool in `../cli/`
- **Agent Communication**: Interfaces with various specialized agents:
  - Control Agent for workflow management
  - Penetration Testing Agent for security assessments
  - SQL Injection Agent for database security testing
  - XSS Agent for web application security

## Contributing

1. Follow the existing code style and TypeScript conventions
2. Add proper type definitions for all new components
3. Include responsive design considerations for mobile devices
4. Test components across different browsers and screen sizes
5. Update this README when adding new features or components

## Future Enhancements

- Dashboard for managing security workflows
- Real-time notifications and alerts
- Integration with additional cybersecurity tools
- Advanced analytics and reporting features
- Multi-user support with role-based access control

## Support

For issues, questions, or contributions related to the web interface, please refer to the main Hades project documentation or create an issue in the project repository.
