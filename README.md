# User Management Dashboard

A modern, full-featured user management dashboard built with React, TypeScript, and Vite. Features include JWT authentication, CRUD operations, search/filter functionality, and a beautiful glass-morphism UI.

## Features

- 🔐 **JWT Authentication** - Secure login/signup with token-based auth
- 👥 **User Management** - Complete CRUD operations for users
- ✅ **Task Management** - Create, update, delete, and track tasks
- 🔍 **Search & Filter** - Real-time search and filtering capabilities
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI/UX** - Glass-morphism design with smooth animations
- 🔄 **Real-time Sync** - All operations sync with JSONPlaceholder API

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Custom CSS with glass-morphism effects
- **API**: JSONPlaceholder (mock backend)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd user-management
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Architecture

This project follows a scalable, layered architecture with clear separation of concerns. See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

**Key Features:**
- ✅ JWT Authentication Middleware
- ✅ Centralized Error Handling
- ✅ Input Validation
- ✅ Type-Safe API Client
- ✅ Custom Hooks
- ✅ Modular Structure

## Project Structure

```
user-management/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── style.css         # Global styles
├── public/               # Static assets
├── API_DOCS.md          # API documentation
├── postman_collection.json  # Postman collection
└── package.json
```

## API Documentation

Complete API documentation is available in [API_DOCS.md](./API_DOCS.md)

### Quick API Overview

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

**Users**
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

**Tasks**
- `GET /todos` - Get all tasks
- `GET /todos/:id` - Get task by ID
- `POST /todos` - Create task
- `PATCH /todos/:id` - Update task
- `DELETE /todos/:id` - Delete task

## Postman Collection

Import `postman_collection.json` into Postman to test all API endpoints.

**Steps:**
1. Open Postman
2. Click "Import"
3. Select `postman_collection.json`
4. Configure environment variables

## Features in Detail

### Authentication
- JWT-based authentication
- Persistent sessions with localStorage
- Protected routes
- Auto-redirect to login

### User Management
- View all users in a list
- Create new users with detailed information
- Edit user profiles
- Delete users
- View detailed user profiles
- Search users by name, email, or phone

### Task Management
- Create tasks with title and description
- Mark tasks as completed
- Edit task details
- Delete tasks
- Filter by status (All/Pending/Completed)
- Search tasks by title or description

### UI/UX
- Glass-morphism design
- Smooth animations and transitions
- Loading states
- Error handling with notifications
- Responsive layout
- Modal dialogs
- Empty states

## Environment Variables

No environment variables required for development. The app uses JSONPlaceholder as a mock backend.

For production, update API endpoints in:
- `src/services/api.ts`
- `src/services/taskApi.ts`
- `src/services/auth.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and questions, please open an issue on GitHub.
# User-managment-dashboard
