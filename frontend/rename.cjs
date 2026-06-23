const fs = require('fs');

const files = [
  'c:/Users/Lenovo/OneDrive/Desktop/Antigravity/Nalco Internship tracking portal/frontend/src/pages/Faculty/Dashboard.tsx',
  'c:/Users/Lenovo/OneDrive/Desktop/Antigravity/Nalco Internship tracking portal/frontend/src/pages/Student/Dashboard.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Alex Johnson/g, 'Samay');
    content = content.replace(/Sarah Smith/g, 'Somit');
    content = content.replace(/Rahul Verma/g, 'Slok');
    content = content.replace(/Sarah Jenkins/g, 'Naren');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
