# 🚀 Guide de Déploiement sur GitHub Pages

## Étapes pour déployer le site C-C-G

### 1. Créer un repository GitHub
1. Allez sur [github.com](https://github.com)
2. Créez un nouveau repository nommé `CCG-website`
3. Rendez-le **public** (important pour GitHub Pages)

### 2. Initialiser Git et pousser le code
```bash
# Dans le terminal, dans le dossier du projet
git init
git add .
git commit -m "Initial commit - Site C-C-G"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/CCG-website.git
git push -u origin main
```

### 3. Activer GitHub Pages
1. Allez dans **Settings** de votre repository
2. Descendez jusqu'à **Pages** dans le menu de gauche
3. Dans **Source**, sélectionnez **GitHub Actions**

### 4. Lancer le déploiement
Le déploiement se lancera automatiquement après le push. Vous pouvez suivre le progrès dans l'onglet **Actions**.

### 5. Accéder au site
Après quelques minutes, votre site sera accessible à :
```
https://VOTRE-USERNAME.github.io/CCG-website
```

## 📧 Message à envoyer au CEO

Une fois déployé, voici un message que vous pouvez envoyer :

---

**Objet : Votre nouveau site web C-C-G est en ligne**

Bonjour [Nom du CEO],

J'ai remarqué que C-C-G n'avait pas encore de présence en ligne, contrairement à vos concurrents. 

J'ai pris l'initiative de créer un site web moderne pour votre entreprise. Vous pouvez le voir ici :

👉 **[URL du site]**

**Points clés :**
- Design professionnel et moderne
- Optimisé pour mobile
- Formulaire de devis intégré
- Prêt à générer des leads 24/7

Vos concurrents captent actuellement des clients que vous pourriez avoir. Ce site peut changer cela immédiatement.

Puis-je vous appeler pour discuter de comment ce site peut développer votre activité ?

Cordialement,
[Votre nom]

---

## 🔧 Commandes utiles

### Pour tester localement avant déploiement :
```bash
npm run dev
```

### Pour construire le site :
```bash
npm run build
```

### Pour mettre à jour le site :
```bash
git add .
git commit -m "Mise à jour du site"
git push
```

## ⚠️ Important
- Le repository doit être **public** pour GitHub Pages gratuit
- Le déploiement prend 2-5 minutes
- Vérifiez l'onglet **Actions** pour voir le statut

## 🎯 Après le déploiement
1. Testez le site sur mobile et desktop
2. Vérifiez que tous les liens fonctionnent
3. Préparez votre pitch avec les documents fournis
4. Contactez le CEO avec l'URL

Bonne chance ! 🚀