# FlowVerify - Quick Start Guide

## 🚀 Getting Started

### 1. Installation & Setup

```bash
# Navigate to project directory
cd /Users/deepakchandola/deepSea/projects_dc/labs-deeref/flowverify/app/mockups/fv-cursor-21oct2025

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The application will be available at: **http://localhost:5173**

---

## 📍 Navigation Guide

### Main Pages

1. **Dashboard** (`/`)
   - Quick contract creation with AI
   - View contract statistics
   - Access recent documents
   - Browse templates
   - Check signing queue

2. **My Drive** (`/drive`)
   - Browse all documents and folders
   - Toggle between grid and list views
   - Upload files via drag-and-drop
   - Create new documents (AI, Template, or Manual)

3. **Sign Queue** (`/sign-queue`)
   - Track sent documents
   - Sign documents awaiting your signature
   - View completed contracts

4. **Document Editor** (`/editor` or `/document/:id`)
   - Edit or read documents
   - Use AI assistant for help
   - View document metadata
   - Export and share

5. **Memory** (`/memory`)
   - Manage organization details (About You)
   - Maintain contact directory
   - Set contract creation rules
   - Upload reference files
   - Manage templates

6. **Settings** (`/settings`)
   - Update profile and preferences
   - Configure security settings
   - Manage team members
   - Set notification preferences
   - Connect integrations
   - View billing information

---

## 🎨 Key Features to Explore

### 1. AI-Powered Contract Creation

**From Dashboard:**
1. Type a description in the large input field (e.g., "Create an NDA for a tech partnership")
2. Click the "→" button or press Enter
3. You'll be taken to the document editor

**Alternative Methods:**
- Click "Use AI to Draft" button
- Use the "+" button in My Drive → Select "Use AI + Questionnaire"

### 2. Document Management

**Upload Documents:**
1. Go to My Drive
2. Drag files into the upload zone
3. Or click the zone to browse files

**Organize Documents:**
1. Click folder cards to filter documents
2. Use search bar to find specific files
3. Toggle between grid/list views
4. Click documents to open in editor

### 3. Signature Workflow

**Send for Signature:**
1. Open a document in the editor
2. Click "Send for Signature" button
3. (Modal would appear for recipient details)

**Sign Documents:**
1. Go to Sign Queue
2. Navigate to "Awaiting Your Signature" tab
3. Click "Sign Now" on any document

### 4. AI Assistant

**Global AI Chat:**
- Click the chat icon (💬) in the top header
- Drawer opens from the right
- Ask questions about contracts
- Get AI assistance

**Document AI:**
- Open any document in editor
- Click "AI Assistant" in toolbar
- Use quick actions or ask custom questions
- Get clause explanations and suggestions

### 5. Memory Management

**Add Organization Info:**
1. Go to Memory
2. Click "About You" tab
3. Click "Edit Details" or "Add Statement"

**Manage Contacts:**
1. Memory → Contacts tab
2. Click "Add Contact"
3. Fill in contact details
4. Tag contacts appropriately

**Set Contract Rules:**
1. Memory → Rules tab
2. Click "Add Rule"
3. Define rule with priority and category

---

## 🎯 Common Workflows

### Creating a New Contract

**Option 1: AI-Powered (Recommended)**
1. Dashboard → Type description → Create
2. AI generates initial draft
3. Edit in document editor
4. Send for signature

**Option 2: Template-Based**
1. My Drive → "+" button → "Use Template"
2. Select template
3. Customize content
4. Send for signature

**Option 3: Manual**
1. My Drive → "+" button → "Write Manually"
2. Start with blank document
3. Write contract
4. Send for signature

### Tracking Signature Status

1. Go to Sign Queue
2. Find your document in "Sent for Signature"
3. View timeline showing progress
4. Use actions menu to:
   - View document
   - Resend request
   - Send reminder
   - Cancel request

### Team Collaboration

1. Settings → Users tab
2. Click "Invite User"
3. Set appropriate role (Admin/Editor/Viewer)
4. User receives invitation

---

## 💡 Tips & Tricks

### Keyboard Shortcuts (Simulated)
- `Ctrl/Cmd + S` - Save document (in editor)
- `Ctrl/Cmd + F` - Search (in header search bar)

### Search Tips
- Use the header search to find anything
- Search in My Drive to filter documents
- Filter Sign Queue by status

### Customization
- Settings → General → Toggle dark mode
- Settings → General → Change language/timezone
- Settings → Notifications → Customize alerts

### Quick Access
- Sidebar can be collapsed for more space
- Recent docs on Dashboard for quick access
- Floating "+" button in My Drive for new docs

---

## 🎨 UI Elements

### Color Coding

- **Green Tags** - Signed/Completed/Success
- **Orange Tags** - Pending/Warning
- **Red Tags** - Expired/High Priority/Danger
- **Blue Tags** - Informational/Categories
- **Primary Blue-Green** - Main actions and branding

### Status Indicators

- ✅ **Signed** - Document fully executed
- ⏱️ **Pending** - Awaiting action
- 📝 **Draft** - Still being edited
- ❌ **Expired** - Past due date
- 👁️ **Viewed** - Recipient has seen
- 📤 **Sent** - Delivered to recipient

### Icons Guide

- 📊 Dashboard
- 📁 My Drive / Folders
- ✍️ Sign Queue / Signatures
- 🧠 Memory / Knowledge
- ⚙️ Settings
- 🤖 AI Chat / Assistant
- 🔔 Notifications
- 👤 User Profile

---

## 🔍 Demo Data

The application comes pre-loaded with sample data:

- **24 total contracts** (15 signed, 7 pending, 2 expired)
- **4 folders** (NDA, Sales, Employment, Vendor)
- **6 documents** in My Drive
- **3 templates** ready to use
- **3 contacts** in directory
- **4 contract rules** configured
- **3 team members** (various roles)
- **6 integrations** available

---

## 🛠️ Customization

### Change Primary Color

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#YourColor',
    // ... other shades
  }
}
```

### Modify Ant Design Theme

Edit `src/App.jsx`:
```javascript
theme={{
  token: {
    colorPrimary: '#YourColor',
  }
}}
```

---

## 📱 Responsive Design

The app is fully responsive:
- **Desktop**: Full layout with sidebar
- **Tablet**: Collapsible sidebar
- **Mobile**: Stacked layout with hamburger menu

---

## 🐛 Troubleshooting

### Development Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build
```

### Port Already in Use
The dev server will automatically use the next available port or you can specify:
```bash
npm run dev -- --port 3000
```

---

## 📚 Next Steps

1. ✅ Explore all pages and features
2. ✅ Test different workflows
3. ✅ Customize colors and branding
4. 🔄 Connect to backend API
5. 🔄 Implement authentication
6. 🔄 Add real AI integration
7. 🔄 Set up file storage
8. 🔄 Configure e-signature service

---

## 🎓 Learning Resources

- **React**: https://react.dev
- **Ant Design**: https://ant.design
- **Tailwind CSS**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **Lucide Icons**: https://lucide.dev

---

**Happy Building! 🚀**

For questions or issues, refer to README.md or FEATURES.md

