import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Constantes pour les rôles
const ROLES = {
  ASSISTANT: 'assistant',
  CLIENT: 'client',
};

// Constantes pour les statuts
const STATUSES = {
    STATUS_WAITING: 'En attente de validation',
    STATUS_VALIDATED: 'Validée',
    STATUS_STARTED: 'Commencée',
    STATUS_REFUSED: 'Refusée',
    STATUS_CANCELLED: 'Abandonnée'
};

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Nettoyer la base de données
  console.log('🧹 Nettoyage de la base de données...');
  await prisma.status.deleteMany({});
  await prisma.role.deleteMany({});

  console.log('✅ Base de données nettoyée');

  // Créer les rôles
  console.log('👥 Création des rôles...');
  await Promise.all([
    prisma.role.create({ data: { name: ROLES.ASSISTANT } }),
    prisma.role.create({ data: { name: ROLES.CLIENT } }),
  ]);

  console.log('✅ Rôles créés');

  // Créer les statuts de quêtes
  console.log('📋 Création des statuts...');
  await Promise.all([
    prisma.status.create({ data: { name: STATUSES.STATUS_WAITING } }),
    prisma.status.create({ data: { name: STATUSES.STATUS_VALIDATED } }),
    prisma.status.create({ data: { name: STATUSES.STATUS_STARTED } }),
    prisma.status.create({ data: { name: STATUSES.STATUS_REFUSED } }),
    prisma.status.create({ data: { name: STATUSES.STATUS_CANCELLED } }),
  ]);

  console.log('✅ Statuts créés');

  console.log('\n✨ Seed terminé avec succès !');
  console.log('\n📊 Résumé:');
  console.log(`- ${await prisma.role.count()} rôles`);
  console.log(`- ${await prisma.status.count()} statuts`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
