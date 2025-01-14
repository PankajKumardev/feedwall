
# FeedWall

![Stars](https://img.shields.io/github/stars/PankajKumardev/feedwall?style=social) ![Forks](https://img.shields.io/github/forks/PankajKumardev/feedwall?style=social) ![Issues](https://img.shields.io/github/issues/PankajKumardev/feedwall)

## 🌟 Overview

FeedWall allows users to embed a feedback widget into their projects and receive feedback directly from their site visitors. The feedback is stored in a central database, and users can view, sort, and analyze feedback easily. With AI-powered insights, users can get a summarized view of the pros and cons of their feedback, and even select specific feedback to showcase with an embed code.

---

## 🚀 Features

### 📝 Feedback Widgets

- Embed customizable feedback widgets into any project.
- Collect and display feedback from visitors directly on your website.

### 🔍 Feedback Management

- View, sort, and filter feedback by name, date, and rating.
- Download feedback in CSV format for offline analysis.

### 🤖 AI-Powered Insights

- Get AI-generated summaries of feedback, highlighting pros and cons.
- Select specific feedback (1-6 entries) to showcase with an embed code.

### 🌐 Deployment

- Hosted on **Vercel**.

---

## 💻 Tech Stack

| **Category**   | **Technology**                      |
| -------------- | ----------------------------------- |
| Frontend       | Next.js, TailwindCSS                |
| Backend        | Next.js API, Prisma, PostgreSQL     |     
| AI Integration | Gemini API                          |
| Tools          | TypeScript, Zod, Docker             |
| Authentication | NextAuth                            |
| Deployment     | Vercel                              |

---

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PankajKumardev/feedwall.git
   cd feedwall
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`.
   - Add required keys.
4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🤝 Contribution Guidelines

### 🌱 How to Get Involved

1. **Fork the repository** by clicking the "Fork" button.
2. **Clone your fork:**
   ```bash
   git clone https://github.com/pankajkumardev/feedwall.git
   ```
3. **Create a new branch:**
   ```bash
   git checkout -b feature/<feature-name>
   ```
4. **Make changes** and commit:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```
5. **Push changes:**
   ```bash
   git push origin <your-branch-name>
   ```
6. Open a pull request.

### 📌 Suggested Contributions

- Enhance widget customization features.
- Add more AI-driven feedback analysis options.
- Improve feedback sorting and filtering mechanisms.

---

## 🌟 Stargazers & Forkers

We appreciate your support! 🌟🍴

[![Stargazers](https://img.shields.io/github/stars/PankajKumardev/feedwall)](https://github.com/PankajKumardev/feedwall/stargazers) [![Forks](https://img.shields.io/github/forks/PankajKumardev/feedwall)](https://github.com/PankajKumardev/feedwall/network/members)

---

## 🛡 License

FeedWall is available under the MIT License. Feel free to use and modify responsibly.

---

## 📖 Changelog

Refer to [`CHANGELOG.md`](https://github.com/PankajKumardev/feedwall/blob/main/CHANGELOG.md) for updates.

---

## 📬 Contact

For queries or collaborations:

- Email: [pankajams1234@gmail.com](mailto:pankajams1234@gmail.com)
- LinkedIn: [Pankaj Kumar](https://www.linkedin.com/in/pankajkumardev0/)
- Twitter: [@pankajkumar_dev](https://x.com/pankajkumar_dev)
