# FlowVerify - AI-powered Contract Assurance and eSignature Platform

A modern, intuitive React application for contract management, AI-powered document creation, and electronic signatures.

## 🚀 Features

### Dashboard
- **Quick Contract Creation**: AI-powered prompt-based contract generation
- **Contract Statistics**: Real-time overview of total, signed, pending, and expired contracts
- **Recent Documents**: Quick access to recently viewed/edited contracts
- **Template Library**: Pre-built contract templates for common use cases
- **Signing Queue**: Track contracts awaiting signatures

### My Drive
- **Document Repository**: Organize contracts in folders (NDA, Sales, Employment, etc.)
- **Grid & List Views**: Toggle between different viewing modes
- **Smart Upload**: Drag-and-drop file upload with support for PDF and DOCX
- **Multiple Creation Options**:
  - AI + Questionnaire (guided contract creation)
  - Template-based (start from pre-built templates)
  - Manual Writing (blank document)
- **Document Management**: Share, download, and manage contract status

### Sign Queue
- **Three-Way View**:
  - Sent for Signature: Track documents you've sent
  - Awaiting Your Signature: Documents requiring your signature
  - Completed: Fully executed contracts
- **Status Timeline**: Visual tracking of document journey (Created → Sent → Viewed → Signed)
- **Quick Actions**: Resend, remind, view, or cancel signature requests
- **Filter & Search**: Find documents by status, signer, or date

### Document Editor/Viewer
- **Dual Mode**:
  - Edit Mode: Rich text editing with formatting toolbar
  - Read Mode: Review-only with commenting capabilities
- **AI Assistant Drawer**: 
  - Clause explanations
  - Document Q&A
  - Edit suggestions
  - Compliance checks
- **Metadata Sidebar**: Document info, parties, version history, comments
- **Top Menu Bar**: File, Edit, and View operations
- **Export & Share**: Download as PDF, share with collaborators

### Memory
Central knowledge base for AI context:
- **About You**: Organization details and custom statements
- **Contacts**: CRM-integrated contact directory
- **Rules**: Contract creation rules and guidelines
- **Files**: Reference documents and policies
- **Templates**: Saved contract templates

### Settings
Comprehensive configuration:
- **General**: Profile, preferences, language, timezone, theme
- **Security**: Password management, 2FA, active sessions, API keys
- **Users**: Team member management with role-based access
- **Notifications**: Email and in-app notification preferences
- **Integrations**: Connect with Salesforce, Google Drive, Slack, DocuSign, etc.
- **Billing**: Plan management, payment methods, billing history

## 🎨 Design System

### Color Palette
- **Primary**: `#0A3746` (Deep teal/navy)
- **Accent**: `#10B981` (Emerald green)
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

### Typography
- System fonts: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- Document editor: Georgia serif for professional legal document feel

### Components
- **Tailwind CSS**: Utility-first styling
- **Ant Design**: Enterprise-grade UI components
- **Lucide React**: Modern, consistent icon set
- **Custom Cards**: Rounded corners, soft shadows, hover effects

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Ant Design 5** - Component library
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── MainLayout.jsx      # Main app layout with sidebar & header
│   └── AI/
│       └── AIChatDrawer.jsx    # AI assistant chat interface
├── pages/
│   ├── Dashboard.jsx           # Dashboard page
│   ├── MyDrive.jsx            # Document repository
│   ├── SignQueue.jsx          # Signature tracking
│   ├── DocumentEditor.jsx     # Document viewer/editor
│   ├── Memory.jsx             # Knowledge base
│   └── Settings.jsx           # Application settings
├── App.jsx                     # Main app component with routing
├── App.css                     # Custom styles
├── index.css                   # Global styles & Tailwind imports
└── main.jsx                    # App entry point
```

## 🎯 Key Features Implementation

### Navigation
- Persistent left sidebar with collapsible menu
- Active route highlighting
- Top header with global search
- Quick access to notifications and AI chat

### Document Management
- Multiple view modes (grid/list)
- Status tracking (draft, pending, signed, expired)
- File type icons and metadata
- Drag-and-drop upload

### AI Integration
- Global AI chat drawer (accessible from header)
- Document-specific AI assistant (in editor)
- Quick action suggestions
- Contextual help and explanations

### Responsive Design
- Mobile-friendly layouts
- Adaptive grid systems
- Touch-friendly buttons and controls
- Responsive tables and lists

## 🔐 Security Features (UI)
- Two-factor authentication toggle
- Active session management
- API key generation and management
- Role-based access control UI

## 🔗 Integration Placeholders
Ready for integration with:
- Salesforce (CRM sync)
- Google Drive (storage)
- Slack (notifications)
- DocuSign (e-signatures)
- Microsoft 365
- Zapier (automation)

## 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Customization

### Theme Configuration
Edit `tailwind.config.js` to customize:
- Color scheme
- Border radius
- Shadows
- Spacing

### Ant Design Theme
Modify in `App.jsx` ConfigProvider:
```jsx
theme={{
  token: {
    colorPrimary: '#0A3746',
    // ... other tokens
  }
}}
```

## 🚧 Future Enhancements
- Real-time collaboration
- Version control for documents
- Advanced analytics dashboard
- Mobile app
- Offline mode
- Advanced AI features (auto-drafting, risk analysis)

## 📄 License
Proprietary - FlowVerify Platform

## 👥 Support
For support, contact: support@flowverify.com

---

**Built with ❤️ using React, Tailwind CSS, and Ant Design**
