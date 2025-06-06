```markdown
# 💬 WhatsApp Quiz Bot – Frontend

[![React](https://img.shields.io/badge/React-18.x-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend%20Bundler-yellow)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20With-TailwindCSS-0ea5e9)](https://tailwindcss.com/)

> React-based frontend for WhatsApp Quiz Bot — shows real-time user flow, step analytics, and simulates the WhatsApp-style experience.

---

## 📁 Project Structure

````

frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components (QuizPreview, Layouts, etc.)
│   ├── pages/               # Simulate and Analytics views
│   ├── App.js              # Route configuration
│   ├── index.js            # Main entry
│   └── index.css            # Tailwind CSS
├── .env                     # port etc.
├── tailwind.config.js
````

---

## ⚙️ Setup Instructions

### 1. Clone the repo & install

```bash
git clone https://github.com/mishravibhav/whatsapp-quiz-bot-frontend.git
cd whatsapp-quiz-bot-frontend
npm install
````

### 2. Configure environment

Create a `.env` file:

```
PORT=5000
```

### 3. Start dev server

```bash
npm run dev
```

Frontend will be accessible at `http://localhost:5000`.

---

## 🧪 Features

* 🟢 WhatsApp-style quiz simulation
* 📊 Per-question user analytics
* 📡 Real-time updates using socket.io
* 📁 see real time aggrigated report

---

## 🚀 Deployment (Vercel)

1. Import this repo into [Vercel](https://vercel.com)
2. Set build command: `npm run build`
3. Output directory: `dist`
4. Add environment variable:

   ```
   PORT=5000
   ```

---

## 🖼️ Preview

![Quiz Preview UI](https://via.placeholder.com/700x400?text=Quiz+UI+Preview)

---

## 📄 License

MIT © [Vibhav Mishra](https://github.com/mishravibhav)

```

---

