# Manios - Man U OS

A monorepo for building games and mobile applications using React Native and Expo.

## Structure

```
manios/
├── apps/           # Applications (React Native, Expo, Web)
├── packages/       # Shared packages and libraries
├── package.json    # Root package.json with workspaces
└── tsconfig.json   # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

### Creating a New App

#### React Native/Expo App

```bash
cd apps
npx create-expo-app my-app
cd my-app
# Link to workspace packages
npm install
```

#### Web App

```bash
cd apps
npx create-react-app my-web-app --template typescript
cd my-web-app
npm install
```

### Creating a Shared Package

```bash
cd packages
mkdir my-package
cd my-package

# Initialize package
npm init -y

# Create package.json with workspace configuration
```

Example `packages/my-package/package.json`:

```json
{
  "name": "@manios/my-package",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

### Scripts

```bash
# Run builds across all workspaces
npm run build

# Run tests across all workspaces
npm run test

# Lint code
npm run lint

# Format code with Prettier
npm run format

# Type check
npm run type-check
```

### Workspace Management

This monorepo uses npm workspaces. To run commands in specific workspaces:

```bash
# Install dependency in specific workspace
npm install <package> -w apps/my-app

# Run script in specific workspace
npm run dev -w apps/my-app

# Run command in all workspaces
npm run build --workspaces
```

## Development

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React Native and TypeScript
- **Prettier**: Consistent code formatting

### Best Practices

1. Keep shared code in `packages/`
2. Use workspace references for internal dependencies
3. Follow the naming convention: `@manios/<package-name>`
4. Write tests for shared packages
5. Document public APIs

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

MIT
