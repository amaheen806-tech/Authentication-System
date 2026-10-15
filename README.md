# 🔐 User Authentication System

A secure user authentication system built with **Django's built-in authentication framework**, featuring registration, login, logout, and comprehensive form validation on both frontend and backend.

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-4.2-green?logo=django&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## ✨ Features

- **User Registration** — Sign up with first name, last name, username, email, and password
- **User Login** — Secure authentication with session management
- **User Logout** — Session cleanup with redirect
- **Protected Dashboard** — `@login_required` decorator for route protection
- **Frontend Validation** — Real-time JavaScript validation with visual feedback
- **Backend Validation** — Django form validation with custom validators
- **Password Strength Meter** — Live strength indicator (Weak → Very Strong)
- **Password Requirements Checklist** — Visual checklist for password rules
- **Password Toggle** — Show/hide password with eye icon
- **Toast Notifications** — Auto-dismissing success/error/info messages
- **CSRF Protection** — Django's built-in cross-site request forgery protection
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## 🎨 UI Design

- **Dark glassmorphism theme** with floating animated gradient orbs
- **Inter** font from Google Fonts
- Custom SVG icons (no external icon library needed)
- Smooth entrance animations and micro-interactions
- Fully responsive down to 480px

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Python 3.13** | Backend language |
| **Django 4.2** | Web framework & authentication |
| **SQLite** | Database |
| **HTML5** | Page structure & semantic markup |
| **CSS3** | Styling with CSS variables, glassmorphism, animations |
| **JavaScript** | Frontend form validation |

---

## 📁 Project Structure

```
Authentication-System/
├── accounts/                    # Django authentication app
│   ├── forms.py                 # Custom RegisterForm & LoginForm
│   ├── views.py                 # register, login, logout, dashboard views
│   └── urls.py                  # URL routing
├── authproject/                 # Django project configuration
│   ├── settings.py              # Project settings
│   └── urls.py                  # Root URL configuration
├── templates/
│   ├── base.html                # Base layout (animated orbs, toasts)
│   └── accounts/
│       ├── login.html           # Login page
│       ├── register.html        # Registration page with password meter
│       └── dashboard.html       # Protected user dashboard
├── static/
│   ├── css/style.css            # Complete design system
│   └── js/validation.js         # Frontend validation engine
├── .gitignore
├── manage.py
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amaheen806-tech/Authentication-System.git
   cd Authentication-System
   ```

2. **Install Django**
   ```bash
   pip install django
   ```

3. **Run migrations**
   ```bash
   python manage.py migrate
   ```

4. **Start the development server**
   ```bash
   python manage.py runserver
   ```

5. **Open in browser**
   ```
   http://127.0.0.1:8000/
   ```

---

## 🔒 Security Features

| Feature | Description |
|---------|------------|
| **CSRF Token** | Hidden token in every form to prevent cross-site attacks |
| **Password Hashing** | PBKDF2 algorithm — passwords never stored in plain text |
| **4 Password Validators** | Min length, common password check, numeric check, similarity check |
| **Session Authentication** | Secure session cookie created on login |
| **@login_required** | Dashboard protected — redirects unauthenticated users |
| **Dual Validation** | Frontend (JavaScript) + Backend (Django) validation |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
