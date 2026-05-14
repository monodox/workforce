# Contributing to Workforce

Thank you for your interest in contributing to Workforce! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`
5. Start the development server: `npm run dev`

## Development Setup

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

```bash
git clone https://github.com/your-username/workforce.git
cd workforce
npm install
cp .env.example .env.local
npm run dev
```

## Making Changes

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add user profile page
fix: resolve login redirect issue
docs: update API documentation
refactor: simplify auth middleware
```

### Code Style

- Follow the existing code patterns and conventions
- Use TypeScript for all new files
- Use Tailwind CSS for styling
- Run `npm run lint` before committing
- Ensure all components are accessible (WCAG 2.1 AA)

## Pull Request Process

1. Update documentation if needed
2. Ensure `npm run build` passes without errors
3. Ensure `npm run lint` passes without errors
4. Fill out the PR template completely
5. Request review from at least one maintainer

## Reporting Bugs

Please use GitHub Issues to report bugs. Include:

- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

## Suggesting Features

We welcome feature suggestions! Please open a GitHub Issue with:

- A clear description of the feature
- The problem it solves
- Any proposed implementation details

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
