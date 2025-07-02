
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: './server/.env' });

// Load models
const User = require('./models/User');
const Course = require('./models/Course');
const BlogPost = require('./models/BlogPost');
const Challenge = require('./models/Challenge');
const DataPoint = require('./models/DataPoint');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const courses = [
    { title: "Les bases du changement climatique", level: "Primaire", duration: "15 min", students: 1203, image: "https://picsum.photos/seed/climate1/400/300" },
    { title: "La biodiversité en danger", level: "Collège", duration: "25 min", students: 854, image: "https://picsum.photos/seed/climate2/400/300" },
    { title: "Le cycle de l'eau et sa préservation", level: "Collège", duration: "20 min", students: 978, image: "https://picsum.photos/seed/climate3/400/300" },
    { title: "Les énergies renouvelables expliquées", level: "Lycée", duration: "30 min", students: 642, image: "https://picsum.photos/seed/climate4/400/300" },
    { title: "Comprendre l'empreinte carbone", level: "Lycée", duration: "20 min", students: 711, image: "https://picsum.photos/seed/climate5/400/300" },
    { title: "Quiz: Reconnaître les éco-gestes", level: "Primaire", duration: "10 min", students: 2150, image: "https://picsum.photos/seed/climate6/400/300" },
];

const blogPosts = [
    { date: "2024-04-16T10:00:00.000Z", title: "5 gestes pour sauver l'environnement", tag: "Éducation", description: "Aopûmantale: prt-lopatdens' gestes simples pour un impact majeur.", imageUrl: "https://picsum.photos/seed/plant/400/300", details: "Lire la suite" },
    { date: "2024-04-19T10:00:00.000Z", title: "L'importance des cycles de l'eau", tag: "Science", description: "Manôtiane ant mris tever cante dicéoertimatees.", imageUrl: "https://picsum.photos/seed/water/400/300", details: "Lire la suite" },
    { date: "2024-04-24T10:00:00.000Z", title: "Les écoles rurales face au climat", tag: "Impact", description: "Constìu un iip surtant un proisset iécp. divie it.", imageUrl: "https://picsum.photos/seed/rural/400/300", details: "Lire la suite" },
    { date: "2024-05-02T10:00:00.000Z", title: "Solutions basées sur la nature", tag: "Solutions", description: "Découvrez comment la nature elle-même peut nous aider à lutter contre le changement climatique.", imageUrl: "https://picsum.photos/seed/nature/400/300", details: "Lire la suite" },
    { date: "2024-05-10T10:00:00.000Z", title: "Comprendre la neutralité carbone", tag: "Science", description: "Un guide complet pour comprendre ce que signifie la neutralité carbone et comment l'atteindre.", imageUrl: "https://picsum.photos/seed/carbon/400/300", details: "Lire la suite" },
    { date: "2024-05-18T10:00:00.000Z", title: "Agir localement: un potager à l'école", tag: "Éducation", description: "Comment un simple potager peut devenir un puissant outil d'éducation à l'environnement.", imageUrl: "https://picsum.photos/seed/garden/400/300", details: "Lire la suite" },
];

const challenges = [
    { title: "Défi Zéro Déchet", duration: "7 jours", category: "Communauté", icon: { type: 'emoji', value: '🗑️' } },
    { title: "Mobilité Douce", duration: "1 mois", category: "Transport", icon: { type: 'emoji', value: '🚲' } },
    { title: "Végétalisons nos Villes", duration: "Projet", category: "Biodiversité", icon: { type: 'component', value: 'LeafIcon' } },
    { title: "Économies d'Énergie", duration: "Continu", category: "Énergie", icon: { type: 'emoji', value: '💡' } },
];

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Course.deleteMany();
        await BlogPost.deleteMany();
        await Challenge.deleteMany();
        await DataPoint.deleteMany();

        // Create users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: 'admin' },
            { name: 'Regular User', email: 'user@example.com', password: hashedPassword, role: 'user' }
        ]);
        
        console.log('Users Imported!');
        
        // Insert content data
        await Course.insertMany(courses);
        console.log('Courses Imported!');
        
        await BlogPost.insertMany(blogPosts);
        console.log('Blog Posts Imported!');
        
        await Challenge.insertMany(challenges);
        console.log('Challenges Imported!');

        // Create a sample data point associated with the regular user
        await DataPoint.create({
            temperature: 27.5,
            rain: 2,
            user: users[1]._id // Regular User
        });
        console.log('Sample Data Point Imported!');

        console.log('--------------------');
        console.log('Data seeding complete!');
        console.log('Admin credentials: admin@example.com / password123');
        console.log('User credentials: user@example.com / password123');
        console.log('--------------------');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Course.deleteMany();
        await BlogPost.deleteMany();
        await Challenge.deleteMany();
        await DataPoint.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
