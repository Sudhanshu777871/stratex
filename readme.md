# Stratex Backend Assignment

## Setup Instructions

1. Clone the repository
    ```bash
    git clone <repo_url>
    cd stratex-backend
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Setup the environment variables in a `.env` file
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/stratex"
    JWT_SECRET="your_jwt_secret"
    ```

4. Run database migrations and generate Prisma client
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

5. Start the server
    ```bash
    npm run dev
    ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user or seller
- `POST /api/auth/login` - Login as user or seller

### Users
- `GET /api/users/books` - Retrieve all books
- `GET /api/users/books/:id` - Retrieve book details by ID

### Sellers
- `POST /api/sellers/books` - Add books via CSV upload
- `GET /api/sellers/books` - Retrieve seller's books
- `PUT /api/sellers/books/:id` - Update a book
- `DELETE /api/sellers/books/:id` - Delete a book
