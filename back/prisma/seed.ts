import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Configuration
const SEED_PASSWORD = process.env.SEED_PASSWORD || 'password123';
const SEED_ASSISTANT_EMAIL = process.env.SEED_ASSISTANT_EMAIL || 'jean.dupont@guild.com';
const SEED_ASSISTANT_NAME = process.env.SEED_ASSISTANT_NAME || 'Jean Dupont';
const SEED_CLIENT_EMAIL = process.env.SEED_CLIENT_EMAIL || 'marie.martin@guild.com';
const SEED_CLIENT_NAME = process.env.SEED_CLIENT_NAME || 'Marie Martin';

// Constantes pour les rôles
const ROLES = {
  ASSISTANT: 'assistant',
  CLIENT: 'client',
};

// Constantes pour les statuts
const STATUSES = {
  PENDING: 'En attente',
  IN_PROGRESS: 'En cours',
  COMPLETED: 'Terminée',
  CANCELLED: 'Annulée',
};

// Constantes pour les spécialités
const SPECIALITIES = {
  WARRIOR: 'Guerrier',
  MAGE: 'Mage',
  ROGUE: 'Voleur',
  HEALER: 'Soigneur',
  RANGER: 'Rôdeur',
};

// Constantes pour les types d'équipement
const EQUIPMENT_TYPES = {
  WEAPON: 'Arme',
  ARMOR: 'Armure',
  SHIELD: 'Bouclier',
  ACCESSORY: 'Accessoire',
};

// Constantes pour les types de consommables
const CONSUMABLE_TYPES = {
  POTION: 'Potion',
  FOOD: 'Nourriture',
  SCROLL: 'Parchemin',
};

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Nettoyer la base de données
  console.log('🧹 Nettoyage de la base de données...');
  await prisma.questStockEquipment.deleteMany({});
  await prisma.equipmentStock.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.quest.deleteMany({});
  await prisma.adventurer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.equipment.deleteMany({});
  await prisma.consumable.deleteMany({});
  await prisma.equipmentType.deleteMany({});
  await prisma.consumableType.deleteMany({});
  await prisma.speciality.deleteMany({});
  await prisma.status.deleteMany({});
  await prisma.role.deleteMany({});

  console.log('✅ Base de données nettoyée');

  // Créer les rôles
  console.log('👥 Création des rôles...');
  const [assistantRole, clientRole] = await Promise.all([
    prisma.role.create({ data: { name: ROLES.ASSISTANT } }),
    prisma.role.create({ data: { name: ROLES.CLIENT } }),
  ]);

  console.log('✅ Rôles créés');

  // Créer les utilisateurs
  console.log('👤 Création des utilisateurs...');
  const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);

  const assistantUser = await prisma.user.create({
    data: {
      name: SEED_ASSISTANT_NAME,
      email: SEED_ASSISTANT_EMAIL,
      password: hashedPassword,
      roleId: assistantRole.id,
    },
  });

  const clientUser = await prisma.user.create({
    data: {
      name: SEED_CLIENT_NAME,
      email: SEED_CLIENT_EMAIL,
      password: hashedPassword,
      roleId: clientRole.id,
    },
  });

  console.log('✅ Utilisateurs créés');

  // Créer les statuts de quêtes
  console.log('📋 Création des statuts...');
  const [statusPending, statusInProgress, statusCompleted, statusCancelled] = await Promise.all([
    prisma.status.create({ data: { name: STATUSES.PENDING } }),
    prisma.status.create({ data: { name: STATUSES.IN_PROGRESS } }),
    prisma.status.create({ data: { name: STATUSES.COMPLETED } }),
    prisma.status.create({ data: { name: STATUSES.CANCELLED } }),
  ]);

  console.log('✅ Statuts créés');

  // Créer les spécialités
  console.log('🎯 Création des spécialités...');
  const [specialityWarrior, specialityMage, specialityRogue, specialityHealer, specialityRanger] = await Promise.all([
    prisma.speciality.create({ data: { name: SPECIALITIES.WARRIOR } }),
    prisma.speciality.create({ data: { name: SPECIALITIES.MAGE } }),
    prisma.speciality.create({ data: { name: SPECIALITIES.ROGUE } }),
    prisma.speciality.create({ data: { name: SPECIALITIES.HEALER } }),
    prisma.speciality.create({ data: { name: SPECIALITIES.RANGER } }),
  ]);

  console.log('✅ Spécialités créées');

  // Créer les types d'équipement
  console.log('⚔️ Création des types d\'équipement...');
  const [equipTypeWeapon, equipTypeArmor, equipTypeShield, equipTypeAccessory] = await Promise.all([
    prisma.equipmentType.create({ data: { name: EQUIPMENT_TYPES.WEAPON } }),
    prisma.equipmentType.create({ data: { name: EQUIPMENT_TYPES.ARMOR } }),
    prisma.equipmentType.create({ data: { name: EQUIPMENT_TYPES.SHIELD } }),
    prisma.equipmentType.create({ data: { name: EQUIPMENT_TYPES.ACCESSORY } }),
  ]);

  console.log('✅ Types d\'équipement créés');

  // Créer les types de consommables
  console.log('🧪 Création des types de consommables...');
  const [consumableTypePotion, consumableTypeFood, consumableTypeScroll] = await Promise.all([
    prisma.consumableType.create({ data: { name: CONSUMABLE_TYPES.POTION } }),
    prisma.consumableType.create({ data: { name: CONSUMABLE_TYPES.FOOD } }),
    prisma.consumableType.create({ data: { name: CONSUMABLE_TYPES.SCROLL } }),
  ]);

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

  const stockShield1 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentShield.id,
      durability: 120,
    },
  });

  const stockRing1 = await prisma.equipmentStock.create({
    data: {
      equipmentId: equipmentRing.id,
      durability: 999,
    },
  });

  console.log('✅ Stocks d\'équipement créés');

  // Créer les consommables
  console.log('🍺 Création des consommables...');
  await Promise.all([
    prisma.consumable.create({
      data: {
        name: 'Potion de santé',
        consumableTypeId: consumableTypePotion.id,
        quantity: 50,
        cost: 10,
      },
    }),
    prisma.consumable.create({
      data: {
        name: 'Potion de mana',
        consumableTypeId: consumableTypePotion.id,
        quantity: 30,
        cost: 15,
      },
    }),
    prisma.consumable.create({
      data: {
        name: 'Pain elfique',
        consumableTypeId: consumableTypeFood.id,
        quantity: 100,
        cost: 5,
      },
    }),
    prisma.consumable.create({
      data: {
        name: 'Viande séchée',
        consumableTypeId: consumableTypeFood.id,
        quantity: 80,
        cost: 3,
      },
    }),
    prisma.consumable.create({
      data: {
        name: 'Parchemin de téléportation',
        consumableTypeId: consumableTypeScroll.id,
        quantity: 10,
        cost: 50,
      },
    }),
    prisma.consumable.create({
      data: {
        name: 'Parchemin de guérison',
        consumableTypeId: consumableTypeScroll.id,
        quantity: 20,
        cost: 25,
      },
    }),
  ]);

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
      UserId: clientUser.id,
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
      UserId: assistantUser.id,
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
      UserId: clientUser.id,
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

  const quest5 = await prisma.quest.create({
    data: {
      name: 'Chasse au dragon',
      description: 'Mission annulée en raison de conditions météorologiques extrêmes',
      finalDate: new Date('2025-12-05'),
      reward: 2000,
      statusId: statusCancelled.id,
      estimatedDuration: 10,
      recommendedXP: 1500,
      UserId: clientUser.id,
      adventurers: {
        connect: [{ id: adventurerGandalf.id }, { id: adventurerAragorn.id }],
      },
    },
  });

  console.log('✅ Quêtes créées');

  // Associer des équipements aux quêtes
  console.log('🔗 Association des équipements aux quêtes...');
  await Promise.all([
    prisma.questStockEquipment.create({
      data: {
        questId: quest1.id,
        equipmentStockId: stockSword1.id,
        equipmentId: equipmentSword.id,
      },
    }),
    prisma.questStockEquipment.create({
      data: {
        questId: quest1.id,
        equipmentStockId: stockBow1.id,
        equipmentId: equipmentBow.id,
      },
    }),
    prisma.questStockEquipment.create({
      data: {
        questId: quest2.id,
        equipmentStockId: stockStaff1.id,
        equipmentId: equipmentStaff.id,
      },
    }),
    prisma.questStockEquipment.create({
      data: {
        questId: quest3.id,
        equipmentStockId: stockArmor1.id,
        equipmentId: equipmentArmor.id,
      },
    }),
    prisma.questStockEquipment.create({
      data: {
        questId: quest4.id,
        equipmentStockId: stockShield1.id,
        equipmentId: equipmentShield.id,
      },
    }),
    prisma.questStockEquipment.create({
      data: {
        questId: quest5.id,
        equipmentStockId: stockRing1.id,
        equipmentId: equipmentRing.id,
      },
    }),
  ]);

  console.log('✅ Équipements associés aux quêtes');

  // Créer quelques transactions
  console.log('💰 Création des transactions...');
  await Promise.all([
    prisma.transaction.create({
      data: {
        amount: 300,
        description: 'Paiement quête: Escorte de caravane',
        date: new Date('2025-12-10'),
        total: 300,
      },
    }),
    prisma.transaction.create({
      data: {
        amount: -150,
        description: 'Achat d\'équipement: Épées longues',
        date: new Date('2025-12-09'),
        total: 150,
      },
    }),
    prisma.transaction.create({
      data: {
        amount: -75,
        description: 'Achat de consommables',
        date: new Date('2025-12-08'),
        total: 75,
      },
    }),
  ]);

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
  console.log('\n🔑 Comptes créés:');
  console.log(`   Assistant: ${SEED_ASSISTANT_EMAIL}`);
  console.log(`   Client: ${SEED_CLIENT_EMAIL}`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
