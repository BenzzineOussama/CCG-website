# C-C-G - Site Web Vitrine

Site web moderne et responsive pour l'entreprise de plomberie C-C-G basée à Héricourt.

## 🚀 Technologies utilisées

- **Next.js 14+** - Framework React avec App Router
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes et personnalisables

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. Cloner le repository
```bash
git clone [url-du-repo]
cd ccg-website
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le serveur de développement
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 🏗️ Build pour la production

```bash
npm run build
npm start
```

## 📱 Fonctionnalités

- ✅ Design moderne et épuré
- ✅ Entièrement responsive (mobile, tablette, desktop)
- ✅ Animations fluides au scroll
- ✅ Formulaire de contact intégré
- ✅ Carte Google Maps
- ✅ Optimisé pour le SEO
- ✅ Performance optimale (Lighthouse)

## 🎨 Structure du projet

```
/
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
├── components/
│   ├── Navbar.tsx      # Navigation
│   ├── Hero.tsx        # Section héros
│   ├── TrustBar.tsx    # Bandeau de confiance
│   ├── Services.tsx    # Section services
│   ├── About.tsx       # Section à propos
│   ├── Contact.tsx     # Section contact
│   └── Footer.tsx      # Pied de page
├── public/             # Assets statiques
└── package.json        # Dépendances
```

## 🔧 Configuration

### Personnalisation des couleurs

Les couleurs principales sont définies dans `tailwind.config.ts`:
- `ccg-green`: #22C55E
- `ccg-dark`: #111827
- `ccg-light`: #F8F9FA

### Modification du contenu

Le contenu est directement modifiable dans les composants React correspondants.

## 📞 Contact

**C-C-G**  
8 Rue de Verlans  
70400 Héricourt  
Tél: 06 24 95 01 71

---

© 2024 C-C-G - Tous droits réservés