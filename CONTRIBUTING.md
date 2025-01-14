
# Contributing to Feed-Wall

We welcome contributions to **Feed-Wall** and appreciate the effort made by every contributor. If you're interested in improving the project, here's how you can get involved:

## Table of Contents
- [How to Contribute](#how-to-contribute)
- [Contributing Guidelines](#contributing-guidelines)
- [Suggested Contributions](#suggested-contributions)
- [Code of Conduct](#code-of-conduct)

## How to Contribute

### Fork the Repository
1. Fork the repository by clicking the "Fork" button on the [FlowPay GitHub page](https://github.com/PankajKumardev/Flowpay).
2. Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/pankajkumardev/feedwall.git
   cd ui-unify
   ```

### Set Up Your Development Environment
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables by copying the .env.example file to .env and filling in the necessary details.
4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Create a New Branch
1. Create a new branch to work on your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Make Changes
- Write your code and make sure it adheres to the coding standards of this project.
- Test your changes locally and ensure everything works as expected.

### Commit and Push Changes
1. Add your changes:
   ```bash
   git add .
   ```
2. Commit your changes with a clear and descriptive message:
   ```bash
   git commit -m "Add your commit message here"
   ```
3. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

### Open a Pull Request
- Open a pull request to the `main` branch of this repository. Provide a clear description of the changes you’ve made and any additional information.

---

## Contributing Guidelines

### Code Standards
- Follow best practices for writing clean, readable, and maintainable code.
- Use **ESLint** and **Prettier** to ensure consistent code formatting. Check if the project’s `.eslint.json` and `.prettierrc` configurations are in place.
  
### Commit Messages
- Write **clear** and **concise** commit messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/) style guide if possible.

### Pull Request Reviews
- Be open to feedback and make requested changes before merging your pull request.

---

## Suggested Contributions

We appreciate contributions in the following areas:

- **Bug Fixes**: Help fix any issues found in the project. Check the [open issues](https://github.com/PankajKumardev/feedwall/issues) for details.
- **Features**: Add new features to enhance the functionality of FeedWall.
  - For example, improving feedback analysis or adding new feedback sorting options.
  - Integration with additional third-party services.
- **UI/UX Enhancements**: Improve the user interface, accessibility, and design of the feedback widget and user dashboard.
- **Documentation**: Help improve the documentation by fixing typos, improving readability, or adding missing information.

---


## Code of Conduct

Please be respectful and follow the [Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) while contributing to this project.

---

Thank you for contributing to Feed-Wall! Your help is truly appreciated! 🚀
