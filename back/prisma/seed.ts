import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Nettoyer la base de données
  console.log('🧹 Nettoyage de la base de données...');
  await prisma.questStockEquipment.deleteMany({});
  await prisma.equipmentStock.deleteMany({});
  await prisma.equipment.deleteMany({});
  await prisma.consumable.deleteMany({});
  await prisma.quest.deleteMany({});
  await prisma.adventurer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.equipmentType.deleteMany({});
  await prisma.consumableType.deleteMany({});
  await prisma.speciality.deleteMany({});
  await prisma.status.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.transaction.deleteMany({});

  console.log('✅ Base de données nettoyée');

  // Créer les rôles
  console.log('👥 Création des rôles...');
  const assistantRole = await prisma.role.create({
    data: { name: 'assistant' },
  });

  const clientRole = await prisma.role.create({
    data: { name: 'client' },
  });

  const questGiverRole = await prisma.role.create({
    data: { name: 'Quest Giver' },
  });

  console.log('✅ Rôles créés');

  // Créer les utilisateurs
  console.log('👤 Création des utilisateurs...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const assistantUser = await prisma.user.create({
    data: {
      name: 'Assistant User',
      email: 'assistant@guild.com',
      password: hashedPassword,
      roleId: assistantRole.id,
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      name: 'Jean Dupont',
      email: 'jean.dupont@guild.com',
      password: hashedPassword,
      roleId: clientRole.id,
    },
  });

  const questGiver = await prisma.user.create({
    data: {
      name: 'Marie Martin',
      email: 'marie.martin@guild.com',
      password: hashedPassword,
      roleId: questGiverRole.id,
    },
  });

  console.log('✅ Utilisateurs créés');

  // Créer les statuts de quêtes
  console.log('📋 Création des statuts...');
  const statusPending = await prisma.status.create({
    data: { name: 'En attente' },
  });

  const statusInProgress = await prisma.status.create({
    data: { name: 'En cours' },
  });

  const statusCompleted = await prisma.status.create({
    data: { name: 'Terminée' },
  });

  const statusCancelled = await prisma.status.create({
    data: { name: 'Annulée' },
  });

  console.log('✅ Statuts créés');

  // Créer les spécialités
  console.log('🎯 Création des spécialités...');
  const specialityWarrior = await prisma.speciality.create({
    data: { name: 'Guerrier' },
  });

  const specialityMage = await prisma.speciality.create({
    data: { name: 'Mage' },
  });

  const specialityRogue = await prisma.speciality.create({
    data: { name: 'Voleur' },
  });

  const specialityHealer = await prisma.speciality.create({
    data: { name: 'Soigneur' },
  });

  const specialityRanger = await prisma.speciality.create({
    data: { name: 'Rôdeur' },
  });

  console.log('✅ Spécialités créées');

  // Créer les types d'équipement
  console.log('⚔️ Création des types d\'équipement...');
  const equipTypeWeapon = await prisma.equipmentType.create({
    data: { name: 'Arme' },
  });

  const equipTypeArmor = await prisma.equipmentType.create({
    data: { name: 'Armure' },
  });

  const equipTypeShield = await prisma.equipmentType.create({
    data: { name: 'Bouclier' },
  });

  const equipTypeAccessory = await prisma.equipmentType.create({
    data: { name: 'Accessoire' },
  });

  console.log('✅ Types d\'équipement créés');

  // Créer les types de consommables
  console.log('🧪 Création des types de consommables...');
  const consumableTypePotion = await prisma.consumableType.create({
    data: { name: 'Potion' },
  });

  const consumableTypeFood = await prisma.consumableType.create({
    data: { name: 'Nourriture' },
  });

  const consumableTypeScroll = await prisma.consumableType.create({
    data: { name: 'Parchemin' },
  });

  console.log('✅ Types de consommables créés');

  // Créer les aventuriers
  console.log('🦸 Création des aventuriers...');
  const adventurerAragorn = await prisma.adventurer.create({
    data: {
      name: 'Aragorn',
      specialityId: specialityWarrior.id,
      dailyRate: 100,
      experience: 850,
      equipmentTypes: {
        connect: [{ id: equipTypeWeapon.id }, { id: equipTypeArmor.id }],
      },
      consumableTypes: {
        connect: [{ id: consumableTypePotion.id }, { id: consumableTypeFood.id }],
      },
    },
  });

  const adventurerGandalf = await prisma.adventurer.create({
    data: {
      name: 'Gandalf',
      specialityId: specialityMage.id,
      dailyRate: 150,
      experience: 1200,
      equipmentTypes: {
        connect: [{ id: equipTypeWeapon.id }, { id: equipTypeAccessory.id }],
      },
      consumableTypes: {
        connect: [{ id: consumableTypePotion.id }, { id: consumableTypeScroll.id }],
      },
    },
  });

  const adventurerLegolas = await prisma.adventurer.create({
    data: {
      name: 'Legolas',
      specialityId: specialityRanger.id,
      dailyRate: 90,
      experience: 720,
      equipmentTypes: {
        connect: [{ id: equipTypeWeapon.id }],
      },
      consumableTypes: {
        connect: [{ id: consumableTypeFood.id }],
      },
    },
  });

  const adventurerElrond = await prisma.adventurer.create({
    data: {
      name: 'Elrond',
      specialityId: specialityHealer.id,
      dailyRate: 120,
      experience: 950,
      equipmentTypes: {
        connect: [{ id: equipTypeAccessory.id }],
      },
      consumableTypes: {
        connect: [{ id: consumableTypePotion.id }, { id: consumableTypeScroll.id }],
      },
    },
  });

  const adventurerFrodon = await prisma.adventurer.create({
    data: {
      name: 'Frodon',
      specialityId: specialityRogue.id,
      dailyRate: 70,
      experience: 320,
      equipmentTypes: {
        connect: [{ id: equipTypeWeapon.id }],
      },
      consumableTypes: {
        connect: [{ id: consumableTypeFood.id }],
      },
    },
  });

  console.log('✅ Aventuriers créés');

  // Créer les équipements
  console.log('🛡️ Création des équipements...');
  const equipmentSword = await prisma.equipment.create({
    data: {
      name: 'Épée longue',
      equipmentTypeId: equipTypeWeapon.id,
      cost: 50,
      maxDurability: 100,
      currentDurability: 100,
    },
  });

  const equipmentBow = await prisma.equipment.create({
    data: {
      name: 'Arc elven',
      equipmentTypeId: equipTypeWeapon.id,
      cost: 75,
      maxDurability: 80,
      currentDurability: 80,
    },
  });

  const equipmentStaff = await prisma.equipment.create({
    data: {
      name: 'Bâton de mage',
      equipmentTypeId: equipTypeWeapon.id,
      cost: 100,
      maxDurability: 90,
      currentDurability: 90,
    },
  });

  const equipmentArmor = await prisma.equipment.create({
    data: {
      name: 'Armure de plates',
      equipmentTypeId: equipTypeArmor.id,
      cost: 120,
      maxDurability: 150,
      currentDurability: 150,
    },
  });

  const equipmentShield = await prisma.equipment.create({
    data: {
      name: 'Bouclier du courage',
      equipmentTypeId: equipTypeShield.id,
      cost: 60,
      maxDurability: 120,
      currentDurability: 120,
    },
  });

  const equipmentRing = await prisma.equipment.create({
    data: {
      name: 'Anneau de sagesse',
      equipmentTypeId: equipTypeAccessory.id,
      cost: 200,
      maxDurability: 999,
      currentDurability: 999,
    },
  });

  console.log('✅ Équipements créés');

  // Créer des stocks d'équipement
  console.log('📦 Création des stocks d\'équipement...');
  const stockSword1 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentSword.id,
      durability: 100,
    },
  });

  const stockSword2 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentSword.id,
      durability: 85,
    },
  });

  const stockBow1 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentBow.id,
      durability: 80,
    },
  });

  const stockStaff1 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentStaff.id,
      durability: 90,
    },
  });

  const stockArmor1 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentArmor.id,
      durability: 150,
    },
  });

  console.log('✅ Stocks d\'équipement créés');

  // Créer les consommables
  console.log('🍺 Création des consommables...');
  await prisma.consumable.create({
    data: {
      name: 'Potion de santé',
      consumableTypeId: consumableTypePotion.id,
      quantity: 50,
      cost: 10,
    },
  });

  await prisma.consumable.create({
    data: {
      name: 'Potion de mana',
      consumableTypeId: consumableTypePotion.id,
      quantity: 30,
      cost: 15,
    },
  });

  await prisma.consumable.create({
    data: {
      name: 'Pain elfique',
      consumableTypeId: consumableTypeFood.id,
      quantity: 100,
      cost: 5,
    },
  });

  await prisma.consumable.create({
    data: {
      name: 'Viande séchée',
      consumableTypeId: consumableTypeFood.id,
      quantity: 80,
      cost: 3,
    },
  });

  await prisma.consumable.create({
    data: {
      name: 'Parchemin de téléportation',
      consumableTypeId: consumableTypeScroll.id,
      quantity: 10,
      cost: 50,
    },
  });

  await prisma.consumable.create({
    data: {
      name: 'Parchemin de guérison',
      consumableTypeId: consumableTypeScroll.id,
      quantity: 20,
      cost: 25,
    },
  });

  console.log('✅ Consommables créés');

  // Créer les quêtes
  console.log('📜 Création des quêtes...');
  const quest1 = await prisma.quest.create({
    data: {
      name: 'Défendre le village de Bree',
      description: 'Des gobelins attaquent le village, il faut les repousser',
      finalDate: new Date('2025-12-20'),
      reward: 500,
      statusId: statusInProgress.id,
      estimatedDuration: 3,
      recommendedXP: 500,
      UserId: questGiver.id,
      adventurers: {
        connect: [{ id: adventurerAragorn.id }, { id: adventurerLegolas.id }],
      },
    },
  });

  const quest2 = await prisma.quest.create({
    data: {
      name: 'Récupérer l\'artefact ancien',
      description: 'Un puissant artefact a été volé, retrouvez-le dans les ruines',
      finalDate: new Date('2025-12-25'),
      reward: 1000,
      statusId: statusPending.id,
      estimatedDuration: 7,
      recommendedXP: 800,
      UserId: clientUser.id,
      adventurers: {
        connect: [{ id: adventurerGandalf.id }],
      },
    },
  });

  const quest3 = await prisma.quest.create({
    data: {
      name: 'Escorte de caravane',
      description: 'Protéger une caravane marchande jusqu\'à la ville voisine',
      finalDate: new Date('2025-12-15'),
      reward: 300,
      statusId: statusCompleted.id,
      estimatedDuration: 2,
      recommendedXP: 200,
      UserId: questGiver.id,
      adventurers: {
        connect: [{ id: adventurerFrodon.id }, { id: adventurerElrond.id }],
      },
    },
  });

  const quest4 = await prisma.quest.create({
    data: {
      name: 'Enquête sur la disparition',
      description: 'Des villageois ont disparu mystérieusement, enquêtez',
      finalDate: new Date('2025-12-30'),
      reward: 750,
      statusId: statusPending.id,
      estimatedDuration: 5,
      recommendedXP: 600,
      UserId: assistantUser.id,
      adventurers: {
        connect: [],
      },
    },
  });

  console.log('✅ Quêtes créées');

  // Associer des équipements aux quêtes
  console.log('🔗 Association des équipements aux quêtes...');
  await prisma.questStockEquipment.create({
    data: {
      questId: quest1.id,
      equipmentStockId: stockSword1.id,
      equipmentId: equipmentSword.id,
    },
  });

  await prisma.questStockEquipment.create({
    data: {
      questId: quest1.id,
      equipmentStockId: stockBow1.id,
      equipmentId: equipmentBow.id,
    },
  });

  await prisma.questStockEquipment.create({
    data: {
      questId: quest2.id,
      equipmentStockId: stockStaff1.id,
      equipmentId: equipmentStaff.id,
    },
  });

  console.log('✅ Équipements associés aux quêtes');

  // Créer quelques transactions
  console.log('💰 Création des transactions...');
  await prisma.transaction.create({
    data: {
      amount: 300,
      description: 'Paiement quête: Escorte de caravane',
      date: new Date('2025-12-10'),
      total: 300,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: -150,
      description: 'Achat d\'équipement: Épées longues',
      date: new Date('2025-12-09'),
      total: 150,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: -75,
      description: 'Achat de consommables',
      date: new Date('2025-12-08'),
      total: 75,
    },
  });

  console.log('✅ Transactions créées');

  console.log('\n✨ Seed terminé avec succès !');
  console.log('\n📊 Résumé:');
  console.log(`- ${await prisma.role.count()} rôles`);
  console.log(`- ${await prisma.user.count()} utilisateurs`);
  console.log(`- ${await prisma.status.count()} statuts`);
  console.log(`- ${await prisma.speciality.count()} spécialités`);
  console.log(`- ${await prisma.adventurer.count()} aventuriers`);
  console.log(`- ${await prisma.equipmentType.count()} types d'équipement`);
  console.log(`- ${await prisma.equipment.count()} équipements`);
  console.log(`- ${await prisma.equipmentStock.count()} stocks d'équipement`);
  console.log(`- ${await prisma.consumableType.count()} types de consommables`);
  console.log(`- ${await prisma.consumable.count()} consommables`);
  console.log(`- ${await prisma.quest.count()} quêtes`);
  console.log(`- ${await prisma.transaction.count()} transactions`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
