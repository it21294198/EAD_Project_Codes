
## Author

```
IT21294648 - it21294648@my.sliit.lk
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Configure env files

Create a `.env.local` file in toor directory.
Add a public environment variable for Cloudinary Key and Server URL
Format is as below
```
PUBLIC_BASE_URL=xxx
CLOUDINARY_KEY=xxx
```


## Doesn't run ?
---
### Clear cache
### Make sure no other process runs inport 3000 (You can view this from the task manager)
### Make sure the `.env.local` file is correctly configured

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


