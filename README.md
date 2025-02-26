# 🌦️ Meteo App

Aplikacja do pobierania i wyświetlania danych pogodowych.  
Projekt składa się z **trzech głównych części**:
- **`meteo-server`** – backend dostarczony przez rekrutera.
- **`frontend`** – aplikacja frontendowa napisana w czystym React z CSS.
- **`react-libraries`** – bardziej rozbudowana wersja frontendowa, wykorzystująca React Query, TailwindCSS, Shadcn UI, React Hook Form oraz Yup.

---

## 🚀 Instalacja i uruchomienie

### **1. Backend (`meteo-server`)**
Najpierw uruchom serwer, przechodząc do katalogu `meteo-server`:

```sh
cd meteo-server
npm install
npm start
```

Serwer powinien uruchomić się na domyślnym porcie (np. `http://localhost:8000/`).

---

### **2. Frontend – czysty React (`frontend`)**
Aby uruchomić podstawową wersję aplikacji:

```sh
cd frontend
npm install
npm start dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173/`.

---

### **3. Frontend – wersja z bibliotekami (`react-libraries`)**
Aby uruchomić bardziej rozbudowaną wersję:

```sh
cd react-libraries
npm install
npm start dev
```

Podobnie jak poprzednia wersja, aplikacja zostanie uruchomiona na `http://localhost:5173/`.

---

## 🛠 Technologie

### **Backend (`meteo-server`)**
- Node.js
- Express.js

### **Frontend (`frontend` – czysty React)**
- React.js
- CSS

### **Frontend (`react-libraries` – rozbudowana wersja)**
- React.js
- React Query – zarządzanie danymi i cachowanie
- TailwindCSS – szybkie i elastyczne stylowanie
- Shadcn UI – gotowe komponenty interfejsu użytkownika
- React Hook Form – obsługa formularzy
- Yup – walidacja formularzy

---

## 📌 Struktura projektu

```
/meteo-server       # Backend dostarczony przez rekrutera
/frontend           # Czysty React + CSS
/react-libraries    # Rozbudowany frontend z dodatkowymi bibliotekami
```

Każdy z projektów frontendowych wymaga uruchomienia serwera backend (`meteo-server`), aby poprawnie działać.
