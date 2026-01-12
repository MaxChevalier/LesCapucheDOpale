# Script d'initialisation de la base de données

Ce script initialise la base de données avec des données de test pour le projet Guild Backend.

## Utilisation

### Option 1 : Initialisation complète (recommandée)

```bash
npm run db:init
```

Cette commande :

1. Applique toutes les migrations Prisma
2. Exécute le script de seed automatiquement

### Option 2 : Seed uniquement

```bash
npm run prisma:seed
```

Lance uniquement le script de seed sans appliquer les migrations.

### Option 3 : Reset complet

```bash
npm run prisma:reset
```

⚠️ **ATTENTION** : Cette commande supprime toutes les données de la base !

1. Supprime la base de données
2. Recrée la base vide
3. Applique toutes les migrations
4. Exécute le script de seed

### accéder aux données sur le navigateur

```bash 
npm prisma studio
```

## Données créées

Le script crée les données suivantes :

### 👥 Utilisateurs

- **Assistant** : jean.dupont@guild.com / password123
- **Client** : marie.martin@guild.com / password123

### 🦸 Aventuriers

- Aragorn (Guerrier) - 850 XP
- Gandalf (Mage) - 1200 XP
- Legolas (Rôdeur) - 720 XP
- Elrond (Soigneur) - 950 XP
- Frodon (Voleur) - 320 XP

### 🎯 Spécialités

- Guerrier
- Mage
- Voleur
- Soigneur
- Rôdeur

### ⚔️ Équipements

- Épée longue
- Arc elven
- Bâton de mage
- Armure de plates
- Bouclier du courage
- Anneau de sagesse

### 🧪 Consommables

- Potions de santé et mana
- Pain elfique et viande séchée
- Parchemins de téléportation et guérison

### 📜 Quêtes

- Défendre le village de Bree (En cours)
- Récupérer l'artefact ancien (En attente)
- Escorte de caravane (Terminée)
- Enquête sur la disparition (En attente)

### 📋 Statuts

- En attente
- En cours
- Terminée
- Annulée

## Structure du script

Le script `prisma/seed.ts` :

1. ✅ Nettoie la base de données existante
2. ✅ Crée les rôles et utilisateurs
3. ✅ Crée les statuts de quêtes
4. ✅ Crée les spécialités d'aventuriers
5. ✅ Crée les types d'équipement et de consommables
6. ✅ Crée les aventuriers avec leurs relations
7. ✅ Crée les équipements et leurs stocks
8. ✅ Crée les consommables
9. ✅ Crée les quêtes avec les aventuriers assignés
10. ✅ Associe les équipements aux quêtes
11. ✅ Crée des transactions d'exemple

## Prérequis

- Node.js installé
- Dépendances installées (`npm install`)
- Variable d'environnement `DATABASE_URL` configurée dans `.env`

## Notes

- Les mots de passe sont hashés avec bcrypt
- Le script affiche un résumé détaillé à la fin
- Deux rôles disponibles : Assistant et Client (le donneur de quêtes)
