## UCU INN - Guest Rooms REACT DRAFT

## Deployment

### Using Bun

```bash
# Install dependencies
bun install

# Build the project
bun run build

# Deploy to GitHub Pages
bun run deploy
```

### Deployment Commands

- `bun run build` - Compiles TypeScript and builds the project to `dist/` folder
- `bun run predeploy` - Automatically runs `bun run build` before deployment
- `bun run deploy` - Deploys the build from `dist/` to GitHub Pages

### Full Deployment Process

```bash
# Complete deployment cycle
bun run build      # Type checking and project build
bun run deploy     # Publish to GitHub Pages
```

### Alternative (single command)
```bash
bun run deploy     # Automatically runs build before deployment
```

### How Deployment Works
- Project uses `gh-pages` package for deployment
- Build from `dist/` folder is published to `gh-pages` branch
- GitHub Pages is configured to serve the site from this branch

### Pre-deployment Checklist
1. Run `bun run preview` for local build verification
2. Ensure all changes are committed to `main` or `master` branch
3. Verify TypeScript compilation passes without errors (`bun run build` succeeds)