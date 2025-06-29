# Guide des Animations Ultra-Modernes pour CCG Website

Ce guide détaille toutes les animations implémentées sur le site web CCG et comment les utiliser efficacement.

## 🎯 Vue d'ensemble

Le site utilise **Framer Motion** pour créer des animations fluides et performantes. Toutes les animations respectent les préférences utilisateur pour le mouvement réduit et sont optimisées pour les performances.

## 📦 Composants d'Animation

### 1. **AnimatedText**
Anime le texte mot par mot ou lettre par lettre avec des effets de révélation.

```tsx
import AnimatedText from '@/components/animations/AnimatedText'

<AnimatedText 
  text="Votre texte ici"
  variant="word" // ou "letter"
  className="text-4xl font-bold"
/>
```

### 2. **ParticleBackground**
Crée un fond animé avec des particules interactives qui réagissent à la souris.

```tsx
import ParticleBackground from '@/components/animations/ParticleBackground'

<ParticleBackground 
  particleCount={50}
  color="#22C55E"
  maxDistance={150}
/>
```

### 3. **AnimatedCard**
Cartes avec effets 3D au survol, brillance et ombres animées.

```tsx
import AnimatedCard from '@/components/animations/AnimatedCard'

<AnimatedCard className="p-6">
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte</p>
</AnimatedCard>
```

### 4. **AnimatedCounter**
Compteurs animés qui se déclenchent au scroll.

```tsx
import AnimatedCounter from '@/components/animations/AnimatedCounter'

<AnimatedCounter 
  end={100}
  duration={2}
  suffix="+"
  className="text-4xl font-bold"
/>
```

### 5. **ScrollAnimationWrapper**
Wrapper réutilisable pour animer n'importe quel élément au scroll.

```tsx
import ScrollAnimationWrapper from '@/components/animations/ScrollAnimationWrapper'

<ScrollAnimationWrapper animation="fadeUp" delay={0.2}>
  <div>Contenu animé</div>
</ScrollAnimationWrapper>
```

### 6. **AnimatedButton**
Boutons avec plusieurs variantes d'animation.

```tsx
import AnimatedButton, { MagneticButton, MorphingButton, GlitchButton, Button3D } from '@/components/AnimatedButton'

// Bouton standard
<AnimatedButton variant="primary" size="lg">
  Cliquez-moi
</AnimatedButton>

// Bouton magnétique
<MagneticButton>Effet magnétique</MagneticButton>

// Bouton morphing
<MorphingButton>Transformation</MorphingButton>

// Bouton glitch
<GlitchButton>Effet glitch</GlitchButton>

// Bouton 3D
<Button3D>Effet 3D</Button3D>
```

### 7. **LoadingScreen**
Écran de chargement animé avec logo et barre de progression.

```tsx
import LoadingScreen from '@/components/LoadingScreen'

<LoadingScreen />
```

### 8. **PageTransition**
Transitions fluides entre les pages.

```tsx
import PageTransition from '@/components/PageTransition'

<PageTransition>
  {children}
</PageTransition>
```

### 9. **SkeletonLoader**
Squelettes de chargement pour améliorer la perception de performance.

```tsx
import SkeletonLoader, { CardSkeleton, ServiceCardSkeleton } from '@/components/SkeletonLoader'

// Squelette simple
<SkeletonLoader variant="text" animation="shimmer" />

// Squelette de carte
<CardSkeleton />

// Squelette de carte service
<ServiceCardSkeleton />
```

### 10. **AnimatedNotification**
Notifications animées avec plusieurs styles.

```tsx
import { Notification, ToastNotification, SnackbarNotification } from '@/components/AnimatedNotification'

// Notification standard
<Notification 
  type="success"
  title="Succès!"
  message="Opération réussie"
/>

// Toast
<ToastNotification 
  type="info"
  title="Information"
  position="bottom-center"
/>

// Snackbar
<SnackbarNotification 
  type="warning"
  title="Attention"
  action="Annuler"
  onAction={() => {}}
/>
```

### 11. **AnimatedModal**
Modales et drawers animés.

```tsx
import AnimatedModal, { AnimatedDrawer, AnimatedPopover } from '@/components/AnimatedModal'

// Modal
<AnimatedModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Titre du modal"
  animation="scale"
>
  <p>Contenu du modal</p>
</AnimatedModal>

// Drawer
<AnimatedDrawer 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
>
  <p>Contenu du drawer</p>
</AnimatedDrawer>
```

### 12. **AnimatedCursor**
Curseurs personnalisés animés.

```tsx
import AnimatedCursor, { MagneticCursor, GlowCursor } from '@/components/AnimatedCursor'

// Curseur standard
<AnimatedCursor color="#22C55E" />

// Curseur magnétique
<MagneticCursor />

// Curseur lumineux
<GlowCursor />
```

## 🎨 Classes CSS Utilitaires

Le fichier `globals.css` contient de nombreuses classes d'animation réutilisables :

- `.animate-fade-in` - Fondu entrant
- `.animate-fade-up` - Fondu montant
- `.animate-slide-in-left` - Glissement depuis la gauche
- `.animate-slide-in-right` - Glissement depuis la droite
- `.animate-scale-in` - Zoom entrant
- `.animate-float` - Flottement continu
- `.animate-pulse-slow` - Pulsation lente
- `.animate-rotate-in` - Rotation entrante
- `.animate-morphing` - Transformation de forme
- `.animate-bounce` - Rebond
- `.animate-wave` - Vague

### Effets spéciaux :

- `.shimmer` - Effet de brillance
- `.gradient-animate` - Gradient animé
- `.hover-lift` - Soulèvement au survol
- `.text-gradient` - Texte en gradient
- `.glow-green` - Lueur verte
- `.neon-glow` - Effet néon
- `.glass` - Effet verre (glassmorphism)
- `.neumorphism` - Effet neumorphique
- `.card-3d` - Carte 3D

## 🪝 Hooks Personnalisés

### useReducedMotion
Détecte les préférences de mouvement réduit de l'utilisateur.

```tsx
import useReducedMotion from '@/hooks/useReducedMotion'

const prefersReducedMotion = useReducedMotion()

if (!prefersReducedMotion) {
  // Appliquer les animations
}
```

### useIntersectionAnimation
Déclenche des animations basées sur l'intersection avec le viewport.

```tsx
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation'

const [ref, isVisible] = useIntersectionAnimation({
  threshold: 0.3,
  triggerOnce: true
})

<div ref={ref} className={isVisible ? 'animate-fade-in' : 'opacity-0'}>
  Contenu
</div>
```

### useStaggeredAnimation
Anime plusieurs éléments avec un délai progressif.

```tsx
import { useStaggeredAnimation } from '@/hooks/useIntersectionAnimation'

const items = useStaggeredAnimation(itemCount)

{items.map(([ref, isVisible, index]) => (
  <div 
    key={index}
    ref={ref}
    className={isVisible ? 'animate-fade-up' : 'opacity-0'}
  >
    Item {index}
  </div>
))}
```

### useParallaxAnimation
Crée des effets de parallaxe au scroll.

```tsx
import { useParallaxAnimation } from '@/hooks/useIntersectionAnimation'

const [ref, offset] = useParallaxAnimation(0.5)

<div 
  ref={ref}
  style={{ transform: `translateY(${offset}px)` }}
>
  Élément parallaxe
</div>
```

## 🚀 Optimisation des Performances

### 1. **GPU Acceleration**
Toutes les animations utilisent `transform` et `opacity` pour bénéficier de l'accélération GPU.

### 2. **Lazy Loading**
Les composants d'animation sont chargés à la demande pour réduire le bundle initial.

### 3. **Intersection Observer**
Les animations ne se déclenchent que lorsque les éléments sont visibles.

### 4. **Reduced Motion**
Respect automatique des préférences système pour le mouvement réduit.

### 5. **Code Splitting**
Les animations complexes sont dans des composants séparés pour optimiser le chargement.

## 📱 Responsive Design

Toutes les animations sont adaptées pour mobile :
- Animations simplifiées sur petits écrans
- Touch-friendly interactions
- Performance optimisée pour les appareils mobiles

## 🎯 Meilleures Pratiques

1. **Ne pas surcharger** - Utilisez les animations avec parcimonie
2. **Cohérence** - Gardez un style d'animation cohérent
3. **Performance** - Testez sur différents appareils
4. **Accessibilité** - Toujours respecter `prefers-reduced-motion`
5. **Feedback** - Les animations doivent améliorer l'UX, pas la distraire

## 🔧 Configuration

Les animations peuvent être personnalisées via :
- Les props des composants
- Les variables CSS dans `globals.css`
- Les configurations Framer Motion

## 📊 Monitoring

Pour surveiller les performances :
1. Utilisez Chrome DevTools Performance tab
2. Vérifiez les Core Web Vitals
3. Testez avec Lighthouse
4. Surveillez le FPS pendant les animations

## 🆘 Dépannage

### Animation saccadée
- Vérifiez l'utilisation du GPU
- Réduisez la complexité de l'animation
- Utilisez `will-change` avec parcimonie

### Animation ne se déclenche pas
- Vérifiez les erreurs console
- Assurez-vous que Framer Motion est installé
- Vérifiez les conditions de déclenchement

### Performance mobile
- Désactivez les animations complexes
- Utilisez `transform` au lieu de propriétés layout
- Réduisez le nombre de particules/éléments animés

## 🎉 Conclusion

Ce système d'animation complet offre une expérience utilisateur moderne et engageante tout en maintenant d'excellentes performances. N'hésitez pas à expérimenter avec les différents composants et à les combiner pour créer des effets uniques !