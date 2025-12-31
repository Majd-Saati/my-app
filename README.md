# 🚴 Munich Bike Theft Reports

A modern React application for browsing and searching stolen bike reports in the Munich area. Built with TypeScript, React Query, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Hooks](#hooks)
- [API Integration](#api-integration)
- [Configuration](#configuration)
- [Development](#development)
- [Usage Examples](#usage-examples)

## ✨ Features

### Core Functionality
- **Location-Based Search**: Default proximity search for stolen bikes within 10 miles of Munich
- **Full-Text Search**: Search by partial case title (e.g., bike brand, model, type)
- **URL State Management**: Search queries and pagination persist in URL for shareable/bookmarkable links
- **Debounced Search**: Optimized search input with 400ms debounce to reduce API calls
- **Pagination**: Navigate through results with smart pagination controls
- **Total Count Display**: Shows total number of stolen bikes matching current filters

### User Experience
- **Loading States**: Skeleton loaders during data fetching
- **Error Handling**: User-friendly error messages with retry functionality
- **Empty States**: Contextual messages when no results are found
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Accessibility**: ARIA labels and semantic HTML

### Technical Features
- **React Query**: Efficient data fetching with caching and background updates
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components
- **State Management**: URL-based state with React Router

## 🛠 Tech Stack

### Core
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.5** - Build tool and dev server

### State Management & Data Fetching
- **@tanstack/react-query 5.90.16** - Server state management
- **react-router-dom 7.11.0** - Routing and URL state management

### Styling
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### HTTP Client
- **Axios 1.13.2** - HTTP client with interceptors

### Icons
- **react-icons 5.5.0** - Icon library (Feather Icons, Font Awesome)

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (optional)
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://bikeindex.org/api/v3
   ```
   If not set, defaults to `https://bikeindex.org/api/v3`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
my-app/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # React components
│   │   ├── BikeCard/     # Bike card sub-components
│   │   └── ...            # Other UI components
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Library configurations
│   │   ├── axios.ts      # Axios client setup
│   │   └── queryClient.ts # React Query client
│   ├── pages/            # Page components
│   ├── services/         # API service functions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables (optional)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # This file
```

## 🧩 Key Components

### Pages

#### `BikeTheftListPage`
Main page component that orchestrates the bike theft list display.

**Features:**
- Manages search filters and pagination
- Coordinates data fetching
- Handles different UI states (loading, error, empty, success)

### Components

#### `SearchInput`
Debounced search input with clear functionality.

**Props:**
- `value: string` - Current search value
- `onChange: (value: string) => void` - Callback when value changes
- `placeholder?: string` - Input placeholder text
- `debounceMs?: number` - Debounce delay in milliseconds (default: 400)
- `isLoading?: boolean` - Loading state indicator

**Features:**
- 400ms debounce to reduce API calls
- Clear button appears when input has value
- Syncs with URL query parameters
- Loading indicator in search icon

#### `BikeCard`
Displays individual bike theft report information.

**Props:**
- `bike: Bike` - Bike data object

**Sub-components:**
- `BikeCardHeader` - Title and status badge
- `BikeCardImage` - Bike image or placeholder
- `BikeCardDescription` - Bike description
- `BikeCardInfo` - Theft details (date, location)

#### `BikeTheftListContent`
Manages content display based on data state.

**Props:**
- `state: DataState` - Current data state ('loading' | 'error' | 'empty' | 'success')
- `bikes: Bike[]` - Array of bike data
- `totalCount: number` - Total number of results
- `totalPages: number` - Total number of pages
- `startItem: number` - First item number on current page
- `endItem: number` - Last item number on current page
- `currentPage: number` - Current page number
- `searchQuery: string` - Current search query
- `errorMessage: string` - Error message if any
- `isLoading: boolean` - Loading state
- `onRetry: () => void` - Retry callback
- `onPageChange: (page: number) => void` - Page change callback

**State Handling:**
- Uses switch case for different states
- Renders appropriate component for each state

#### `TotalCountDisplay`
Displays total count of stolen bikes with loading state.

**Props:**
- `totalCount: number` - Total number of bikes
- `isLoading?: boolean` - Loading state
- `searchQuery?: string` - Current search query for context

#### `Pagination`
Pagination controls with smart page number display.

**Props:**
- `currentPage: number` - Current active page
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Page change handler
- `isLoading?: boolean` - Loading state to disable controls

**Features:**
- Shows ellipsis for large page counts
- Previous/Next buttons
- Disabled states during loading

#### `ResultsSummary`
Displays summary of current results.

**Props:**
- `totalCount: number` - Total number of results
- `startItem: number` - First item number
- `endItem: number` - Last item number
- `currentPage: number` - Current page
- `totalPages: number` - Total pages
- `searchQuery?: string` - Search query for context

#### `EmptyState`
Displays when no results are found.

**Props:**
- `searchQuery?: string` - Search query to show in message

#### `ErrorDisplay`
Displays error messages with retry option.

**Props:**
- `message: string` - Error message
- `onRetry: () => void` - Retry callback

## 🎣 Hooks

### `useBikeTheftData`
Main data fetching hook that coordinates bike and count queries.

**Parameters:**
```typescript
{
  currentPage: number;
  query?: string;
}
```

**Returns:**
```typescript
{
  bikes: Bike[];
  totalCount: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  handleRetry: () => void;
  refetch: () => void;
  countData?: BikeCountResponse;
}
```

### `useStolenBikes`
Fetches stolen bikes with React Query.

**Parameters:**
```typescript
{
  distance?: number;      // Default: 10
  page?: number;          // Default: 1
  perPage?: number;       // Default: 10
  query?: string;         // Default: ''
  enabled?: boolean;      // Default: true
}
```

**Returns:** React Query result with filtered bike data

### `useStolenBikesCount`
Fetches count of stolen bikes.

**Parameters:**
```typescript
{
  query?: string;         // Default: ''
  enabled?: boolean;      // Default: true
}
```

**Returns:** React Query result with count data

### `useSearchFilters`
Manages URL-based search filters and pagination.

**Returns:**
```typescript
{
  filters: SearchFilters;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
}
```

**SearchFilters:**
```typescript
{
  query: string;    // Search query from URL (?q=...)
  page: number;     // Current page from URL (?page=...)
}
```

### `useDebounce`
Debounces a value to reduce frequent updates.

**Parameters:**
- `value: T` - Value to debounce
- `delay: number` - Delay in milliseconds (default: 300)

**Returns:** Debounced value

## 🔌 API Integration

### API Base URL
The application uses the Bike Index API:
- **Base URL**: `https://bikeindex.org/api/v3`
- **Configurable**: Set via `VITE_API_BASE_URL` environment variable

### API Endpoints

#### Search Bikes
**Endpoint:** `GET /search`

**Parameters:**
- `query` (string, optional): Full-text search query
- `location` (string): Location for proximity search (e.g., "Munich")
- `distance` (number): Distance in miles from location
- `stolenness` (string): "proximity" or "stolen"
- `page` (number): Page number
- `per_page` (number): Items per page (max 100)

**Behavior:**
- **Without query**: Uses `location` + `stolenness: "proximity"` + `distance`
- **With query**: Uses `query` + `stolenness: "stolen"` (no location filter)

#### Get Count
**Endpoint:** `GET /search/count`

**Parameters:**
- Same as search endpoint (except pagination params)

**Returns:**
```typescript
{
  non: number;
  stolen: number;
  proximity: number;
  for_sale: number;
}
```

### API Client Configuration

Located in `src/lib/axios.ts`:

- **Base URL**: Configurable via environment variable
- **Timeout**: 10 seconds
- **Interceptors**:
  - Request: Can add auth tokens or modify requests
  - Response: Handles errors and formats error messages

### Error Handling

The API client handles:
- Network errors (no response)
- HTTP errors (4xx, 5xx)
- Timeout errors
- Generic errors

All errors are converted to user-friendly messages.

## ⚙️ Configuration

### Constants (`src/constants/index.ts`)

```typescript
export const ITEMS_PER_PAGE = 10;        // Items per page
export const SEARCH_DISTANCE = 10;       // Distance in miles
export const SKELETON_COUNT = 6;         // Loading skeleton count
export const SEARCH_LOCATION = 'Munich'; // Default search location
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Base URL (optional, defaults to Bike Index API)
VITE_API_BASE_URL=https://bikeindex.org/api/v3
```

**Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

### React Query Configuration

Located in `src/lib/queryClient.ts`:

- Default query options
- Cache configuration
- Retry logic
- Stale time settings

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Files are watched with HMR (Hot Module Replacement)
3. **Check linting**: `npm run lint`
4. **Build**: `npm run build` before deploying

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Formatting**: Follows standard React/TypeScript conventions

### Adding New Features

1. **Components**: Add to `src/components/`
2. **Hooks**: Add to `src/hooks/`
3. **Services**: Add API functions to `src/services/`
4. **Types**: Add TypeScript types to `src/types/`
5. **Utils**: Add utility functions to `src/utils/`

## 📖 Usage Examples

### Using Search Filters

```typescript
import { useSearchFilters } from '../hooks/useSearchFilters';

function MyComponent() {
  const { filters, setQuery, setPage } = useSearchFilters();
  const { query, page } = filters;

  // Set search query (updates URL)
  setQuery('Canyon');

  // Navigate to page 2 (updates URL)
  setPage(2);

  // Clear all filters
  clearFilters();
}
```

### Using Bike Theft Data Hook

```typescript
import { useBikeTheftData } from '../hooks/useBikeTheftData';

function MyComponent() {
  const {
    bikes,
    totalCount,
    isLoading,
    hasError,
    errorMessage,
    handleRetry,
  } = useBikeTheftData({ currentPage: 1, query: 'electric' });

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Error: {errorMessage}</div>;

  return (
    <div>
      <p>Found {totalCount} bikes</p>
      {bikes.map(bike => (
        <div key={bike.id}>{bike.title}</div>
      ))}
    </div>
  );
}
```

### Custom API Call

```typescript
import { fetchStolenBikesFromMunich } from '../services/bikeApi';

// Proximity search (default)
const bikes = await fetchStolenBikesFromMunich({
  page: 1,
  perPage: 10,
  distance: 10,
});

// Full-text search
const bikes = await fetchStolenBikesFromMunich({
  page: 1,
  perPage: 10,
  query: 'Canyon',
});
```

## 🔍 Search Behavior

### Default Behavior (No Search Query)
- **Mode**: Proximity search
- **Location**: Munich
- **Distance**: 10 miles
- **Stolenness**: "proximity"
- **Scope**: Only bikes stolen within 10 miles of Munich

### With Search Query
- **Mode**: Full-text search
- **Query**: User's search term
- **Stolenness**: "stolen"
- **Scope**: All stolen bikes (not limited to Munich)
- **Search**: Matches against bike titles, descriptions, etc.

## 📝 Notes

### URL Query Parameters
- `?q=searchterm` - Search query
- `?page=2` - Page number (defaults to 1 if not present)

### Pagination
- Resets to page 1 when search query changes
- Maintains page number when navigating between pages
- Scrolls to top on page change

### Data Filtering
- Only bikes with `stolen: true` and `status: 'stolen'` are displayed
- Filtering happens after API response

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use functional components with hooks
3. Maintain component modularity
4. Add proper TypeScript types
5. Follow existing code style
6. Test your changes thoroughly

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using React, TypeScript, and Vite**
