// seed.js
const { sequelize, User } = require('./models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    // Ensure tables exist
    await sequelize.sync({ alter: true });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    // Create or find user
    const [adminUser, created] = await User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        password: hashedPassword
      }
    });

    if (created) {
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

seed();
