# Order Dashboard

Dashboard per la gestione degli ordini costruita con React, TypeScript e Vite.

## 🚀 Funzionalità

- **Autenticazione**: Sistema di login con protezione delle rotte private
- **Lista Ordini**: Visualizzazione tabellare di tutti gli ordini con cliente, importo, stato e data
- **Dettaglio Ordine**: Pagina dedicata per ogni singolo ordine
- **Lazy Loading**: Caricamento ottimizzato dei componenti per migliori performance

## 🛠️ Tecnologie

- **React 19** - Libreria UI
- **TypeScript** - Type safety
- **Vite** - Build tool veloce
- **React Router DOM** - Routing
- **TanStack Query** - Data fetching e caching
- **Vitest** - Testing
- **Docker** - Containerizzazione

## 📦 Installazione

```bash
# Clona il repository
git clone https://github.com/Siddha95/order-dashboard.git
cd order-dashboard

# Installa le dipendenze
npm install
```

## 🔧 Comandi Disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Anteprima build di produzione
npm run preview

# Esegui i test
npm test

# Test con interfaccia grafica
npm run test:ui

# Copertura dei test
npm run coverage

# Linting
npm run lint
```

## 🐳 Docker

```bash
# Build e avvio con Docker Compose
docker-compose up --build

# L'applicazione sarà disponibile su http://localhost:8080
```

## 📁 Struttura del Progetto

```
src/
├── components/       # Componenti riutilizzabili (es. PrivateRoute)
├── features/         # Feature modules
│   ├── auth/         # Autenticazione (Login, AuthContext)
│   └── orders/       # Gestione ordini (OrderList, OrderDetail)
├── services/         # Servizi API
├── tests/            # Test
├── types/            # Definizioni TypeScript
├── App.tsx           # Componente principale con routing
└── main.tsx          # Entry point
```

## 📄 Licenza

MIT
