# Kick Stream Website - Project Planning

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Version Control: GitHub
- Deployment: Vercel

## Phase 1: Project Setup & Initialization
- [ ] Initialize the Next.js application with Tailwind CSS.
- [ ] Clean up the default Next.js boilerplate in `app/page.jsx` and `app/globals.css`.
- [ ] Configure a dark mode theme palette (e.g., zinc/slate colors) in `tailwind.config.js`.

## Phase 2: Core Components Development
- [ ] Build `components/Navbar.jsx`: A simple top navigation bar with a logo and social links.
- [ ] Build `components/KickPlayer.jsx`: A reusable component that takes a `channelName` prop and returns a responsive 16:9 iframe embedding the Kick stream.
- [ ] Build `components/KickChat.jsx` (Optional): A component to embed the Kick chat iframe.

## Phase 3: Main Page Assembly
- [ ] Update `app/page.jsx` to act as the main streaming hub.
- [ ] Integrate the `Navbar`.
- [ ] Create a responsive grid layout: 
    - Desktop: Stream player takes up 75% width, Chat takes 25%.
    - Mobile: Stream player is on top, Chat is stacked below.
- [ ] Add a "Live" UI indicator (e.g., a blinking red dot) above the player.

## Phase 4: Polish & Deployment
- [ ] Check responsiveness across mobile, tablet, and desktop viewports.
- [ ] Push the final code to the GitHub repository.
- [ ] Deploy the project seamlessly to Vercel.