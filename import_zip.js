import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const baseDir = process.cwd();
const tempDir = path.join(baseDir, 'temp_import', 'Products');
const uploadsDir = path.join(baseDir, 'public', 'uploads', 'imported');
const dataDir = path.join(baseDir, 'src', 'data');
const zipPath = "/Users/nileshs/Downloads/Products-20260308T102432Z-3-001.zip";

import { execSync } from 'child_process';

if (!fs.existsSync(tempDir)) {
    console.log('Extraction directory missing. Unzipping...');
    const parentTemp = path.join(baseDir, 'temp_import');
    if (!fs.existsSync(parentTemp)) fs.mkdirSync(parentTemp, { recursive: true });
    execSync(`unzip "${zipPath}" -d "${parentTemp}"`);
}

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const categories = [];
const products = [];

let catId = 1;
let prodId = 1;

const categoryFolders = fs.readdirSync(tempDir);

for (const catName of categoryFolders) {
    const catPath = path.join(tempDir, catName);
    if (fs.lstatSync(catPath).isDirectory()) {
        const category = {
            id: catId++,
            name: catName,
            description: `Delicious assortment of ${catName.toLowerCase()}`,
            image: `/uploads/imported/cat_${catName.replace(/\s+/g, '_').toLowerCase()}.jpg` // placeholder, logic could be refined
        };
        categories.push(category);

        const productFiles = fs.readdirSync(catPath);
        let catImageSet = false;

        for (const prodFile of productFiles) {
            if (prodFile.toLowerCase().endsWith('.jpeg') || prodFile.toLowerCase().endsWith('.jpg') || prodFile.toLowerCase().endsWith('.png')) {
                const prodName = path.parse(prodFile).name.replace(/_/g, ' ');
                const destName = `${prodName.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.jpeg`;
                const destPath = path.join(uploadsDir, destName);

                fs.copyFileSync(path.join(catPath, prodFile), destPath);

                const product = {
                    id: prodId++,
                    category_id: category.id,
                    name: prodName,
                    description: `Premium quality ${prodName.toLowerCase()} from our ${category.name} series.`,
                    price: parseFloat((Math.random() * (49 - 5) + 5).toFixed(2)), // Random placeholder price
                    image: `/uploads/imported/${destName}`,
                    is_featured: prodId % 5 === 0 ? 1 : 0,
                    packaging_size: "Standard Pack",
                    shape: "Assorted",
                    packaging: "Plastic Wrap",
                    color: "Colorful",
                    per_piece_price: "₹1.00",
                    mrp: "₹120.00"
                };
                products.push(product);

                // Set the first product image as the category image
                if (!catImageSet) {
                    category.image = product.image;
                    catImageSet = true;
                }
            }
        }
    }
}

fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));

console.log('Successfully imported categories:', categories.length);
console.log('Successfully imported products:', products.length);
