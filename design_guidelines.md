# Travel Lost & Found Portal - Design Guidelines

## Design Approach
**Custom CSS-Based Modern Web Application**
This application uses custom CSS files (NO Tailwind) to create a complex, clean, modern, and professional UI suitable for a hackathon-winning project.

## Core Design Principles

### Visual Style
- **Glassmorphism effects** for overlays and cards
- **Neomorphic cards** for depth and modern aesthetic
- **Gradient backgrounds** throughout the application
- **Rounded corners** - Standard radius: **16px**
- **Soft shadows** for elevation and depth
- **Smooth hover transitions** on all interactive elements
- **Animated transitions** for state changes and page navigation

### Color Strategy
- Vibrant gradient backgrounds for hero sections
- Professional color palette balancing trust and modernity
- Clear status indicators (pending/checking/found/not_found)
- Distinct visual treatment for Passenger vs Driver interfaces

## Typography System
- Clean, modern sans-serif font families
- Clear hierarchy: H1 for page titles, H2 for sections, H3 for cards
- Readable body text with proper line-height
- Bold weights for CTAs and important actions

## Layout & Spacing
- **16px base unit** for consistent spacing
- Generous whitespace for breathing room
- Responsive grid layouts for dashboards
- Card-based layouts for requests and found items
- Fixed navbar with smooth scroll behavior

## Component Library

### Navigation
- Fixed top navbar with glassmorphism effect
- Logo + main navigation links
- User profile dropdown (when authenticated)
- Role indicator badge (Passenger/Driver)

### Hero Section (Home Page)
- Full-width gradient background
- Large heading with compelling copy
- "Search Lost Item" primary CTA button
- Transport mode category icons (Bus, Train, Auto, Cab, Metro) displayed prominently

### Cards
- Neomorphic card design with soft shadows
- 16px rounded corners
- Hover elevation effect
- Clear information hierarchy within cards
- Status badges (color-coded)

### Forms
- Modern input fields with soft borders
- Floating labels or clear placeholder text
- Radio buttons for role selection (Passenger/Driver)
- Dropdown selectors for transport modes
- File upload interface for driver photo submissions
- Clear validation states

### Buttons
- Primary: Gradient backgrounds with hover glow
- Secondary: Outlined with hover fill
- When placed over images: Blurred/frosted background effect
- Icons from React Icons library
- Smooth transition effects

### Dashboard Layouts
**Passenger Dashboard:**
- Request cards grid showing status, vehicle details, timestamps
- Notification panel (sticky sidebar or top banner)
- Quick actions: "Report New Lost Item", "View Conversations"
- Status filter tabs

**Driver Dashboard:**
- Incoming request cards with action buttons
- "Mark as Found" / "Mark as Not Found" CTAs
- Upload found item photo interface
- Notification center

### Chat System
**ConversationsCenter:**
- Two-column layout: Thread list (left) + active chat (right)
- User avatars, names, vehicle numbers visible
- Unread message indicators
- "Open Chat" action

**ChatWindow:**
- Message bubbles with timestamp
- Sender/receiver distinction via alignment and color
- Real-time message updates
- Typing indicators (if implemented)
- Input field with send button

### Notifications
- Toast notifications for real-time updates
- Badge counters on navigation icons
- Notification panel with seen/unseen states
- Color-coded by type (found item = green, new message = blue)

## Page-Specific Designs

### Home Page
- Hero with gradient + transport categories
- How It Works section (3-step visual flow)
- Features/Benefits cards
- Call-to-action section
- Footer with links and contact

### Categories Page
- Large clickable icon cards for each transport mode
- Hover effects with gentle scale/shadow
- Clear labels and subtle animations

### Location/Vehicle Search Pages
- Step-by-step form progression
- Visual indicators of current step
- Date/time pickers with modern styling
- Auto-complete for locations (if implemented)

### Driver Found Items Page
- Photo upload drag-and-drop zone
- Preview of uploaded image
- Form fields for description and location
- Submit button with loading state

## Images
**Hero Section:** Large background image of diverse travelers in transit (bus/train station) with overlay gradient for text readability. Buttons on hero use blurred/frosted glass background effect.

**Category Icons:** Transport mode icons (bus, train, auto, cab, metro) - use React Icons or custom SVG assets

**Dashboard/Cards:** Profile avatars, found item photos (user-uploaded via Supabase Storage)

## Animations & Transitions
- Page transitions: Fade in/slide up (300ms)
- Card hover: Lift effect with shadow expansion
- Button hover: Gradient shift or glow effect
- Notification entry: Slide in from top
- Loading states: Subtle pulse or skeleton screens
- Chat messages: Slide in from bottom

## Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators with custom styling
- Alt text for all images
- Sufficient color contrast ratios

## Future Enhancement UI Placeholders
- "AI Match" badge/section (disabled state with "Coming Soon")
- QR scanner button (show placeholder icon)
- GPS location icon (greyed out with tooltip)
- WhatsApp integration button (in contact reveal section)

## Mobile Responsiveness
- Responsive breakpoints: 320px, 768px, 1024px, 1440px
- Hamburger menu for mobile navigation
- Stacked layouts for cards on mobile
- Bottom navigation for dashboard actions
- Touch-friendly button sizes (minimum 44px)