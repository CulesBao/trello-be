# Trello Backend - Advanced

A powerful Trello-like project management API built with Node.js, TypeScript, Express, and TypeORM.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with Google OAuth2 support
- **Role-Based Access Control (RBAC)**: Comprehensive permission system with 6 different roles
- **Workspace Management**: Create and manage multiple workspaces
- **Board & List Management**: Organize work with boards and lists
- **Card Management**: Full CRUD operations with attachments, comments, checklists
- **Real-time Notifications**: Activity tracking and notifications
- **File Upload**: Cloudinary integration for attachments
- **Caching**: Redis for improved performance
- **Database**: MySQL with TypeORM migrations

## 🏗️ Architecture

### Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: TypeORM
- **Cache**: Redis
- **Authentication**: JWT + Passport.js (Google OAuth2)
- **File Storage**: Cloudinary
- **Logging**: Pino
- **Validation**: Joi

### Database Schema

- **Users**: User accounts with profile information
- **Roles & Permissions**: 6 roles with 83+ granular permissions
- **Workspaces**: Team collaboration spaces
- **Boards**: Project boards within workspaces
- **Lists**: Task organization within boards
- **Cards**: Individual tasks with rich features
- **Comments**: Card discussions
- **Attachments**: File attachments on cards
- **Checklists**: Task checklists on cards
- **Notifications**: System notifications
- **Activity Logs**: Audit trail of all actions

## 🎯 Role System

### Available Roles

1. **Admin** - System administrator with full access
2. **User** - Regular user with basic permissions
3. **Admin Workspace** - Workspace administrator
4. **Member Workspace** - Workspace member
5. **Admin Board** - Board administrator
6. **Member Board** - Board member

### Permission Categories

- User Management (Create, Read, Update, Delete, Assign Roles)
- Workspace Management (Full CRUD + Member Management)
- Board Management (Full CRUD + Member Management)
- Content Management (Lists, Cards, Comments, Attachments, Checklists)
- Notification & Activity Management

## 🛠️ Installation

### Prerequisites

- Node.js (v16+)
- Docker & Docker Compose
- MySQL 8.0
- Redis

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd be-advanced
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_DATABASE=trello
   DB_PORT=3307

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # JWT Configuration
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   ```

4. **Start Database Services**

   ```bash
   docker-compose up -d db redis
   ```

5. **Run Database Migrations**

   ```bash
   npm run typeorm:run
   ```

6. **Seed Initial Data**

   ```bash
   npm run seed
   ```

   This creates:

   - Admin account (admin@gmail.com / admin)
   - All roles and permissions
   - Role-permission mappings

7. **Start the Application**
   ```bash
   npm start
   ```

## 📝 Available Scripts

- `npm start` - Start development server with nodemon
- `npm run seed` - Seed database with initial data
- `npm run typeorm:generate -- --name=MigrationName` - Generate new migration
- `npm run typeorm:run` - Run pending migrations
- `npm run typeorm:revert-migration` - Revert last migration
- `npm run typeorm:create-migration -- --name=MigrationName` - Create empty migration

## 🔑 Default Admin Account

After running the seed script, you can login with:

- **Email**: admin@gmail.com
- **Password**: admin
- **Username**: admin

## 🌐 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/google` - Google OAuth login
- `POST /auth/logout` - User logout

### User Management

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Workspace Management

- `GET /workspaces` - Get user workspaces
- `POST /workspaces` - Create workspace
- `PUT /workspaces/:id` - Update workspace
- `DELETE /workspaces/:id` - Delete workspace
- `POST /workspaces/:id/members` - Add member to workspace

### Board Management

- `GET /boards` - Get user boards
- `POST /boards` - Create board
- `PUT /boards/:id` - Update board
- `DELETE /boards/:id` - Delete board
- `POST /boards/:id/members` - Add member to board

### Card Management

- `GET /cards` - Get cards
- `POST /cards` - Create card
- `PUT /cards/:id` - Update card
- `DELETE /cards/:id` - Delete card
- `POST /cards/:id/comments` - Add comment
- `POST /cards/:id/attachments` - Add attachment
- `POST /cards/:id/checklists` - Add checklist

## 🏃‍♂️ Development

### Project Structure

```
src/
├── app.ts                 # Application entry point
├── config/               # Configuration files
│   ├── data-source.ts    # TypeORM data source
│   ├── redis.config.ts   # Redis configuration
│   └── cloudinary.config.ts
├── common/               # Shared utilities
│   ├── base.entity.ts    # Base entity class
│   ├── enums/           # Enum definitions
│   └── utils/           # Utility functions
├── middleware/          # Express middlewares
├── modules/            # Feature modules
│   ├── auth/           # Authentication
│   ├── user/           # User management
│   ├── workspace/      # Workspace management
│   ├── board/          # Board management
│   ├── card/           # Card management
│   └── ...
├── routes/             # Route definitions
├── seeds/              # Database seeders
└── migration/          # TypeORM migrations
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Database Migrations

Create a new migration:

```bash
npm run typeorm:generate -- --name=AddNewFeature
```

Run migrations:

```bash
npm run typeorm:run
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation with Joi
- CORS protection
- Session management
- SQL injection prevention (TypeORM)

## 📈 Performance Features

- Redis caching
- Database indexing
- Optimized queries with TypeORM
- Background task processing
- File upload optimization

## 🚨 Error Handling

- Centralized error handling middleware
- Structured error responses
- Logging with Pino
- Validation error formatting

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 📄 License

This project is licensed under the ISC License.
