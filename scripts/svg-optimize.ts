// import * as SVGO from 'svgo';
// import * as fs from 'fs';
// import * as glob from 'glob';

// const svgo = new SVGO({
//     plugins: [
//         {
//             cleanupAttrs: true
//         },
//         {
//             removeDoctype: true
//         },
//         {
//             removeXMLProcInst: true
//         },
//         {
//             removeComments: true
//         },
//         {
//             removeMetadata: true
//         },
//         {
//             removeTitle: true
//         },
//         {
//             removeDesc: true
//         },
//         {
//             removeUselessDefs: true
//         },
//         {
//             removeEditorsNSData: true
//         },
//         {
//             removeEmptyAttrs: true
//         },
//         {
//             removeHiddenElems: true
//         },
//         {
//             removeEmptyText: true
//         },
//         {
//             removeEmptyContainers: true
//         },
//         {
//             removeViewBox: false
//         },
//         {
//             cleanupEnableBackground: true
//         },
//         {
//             convertStyleToAttrs: true
//         },
//         {
//             convertColors: true
//         },
//         {
//             convertPathData: true
//         },
//         {
//             convertTransform: true
//         },
//         {
//             removeUnknownsAndDefaults: true
//         },
//         {
//             removeNonInheritableGroupAttrs: true
//         },
//         {
//             removeUselessStrokeAndFill: true
//         },
//         {
//             removeUnusedNS: true
//         },
//         {
//             cleanupIDs: true
//         },
//         {
//             cleanupNumericValues: true
//         },
//         {
//             moveElemsAttrsToGroup: true
//         },
//         {
//             moveGroupAttrsToElems: true
//         },
//         {
//             collapseGroups: true
//         },
//         {
//             removeRasterImages: false
//         },
//         {
//             mergePaths: true
//         },
//         {
//             convertShapeToPath: true
//         },
//         {
//             sortAttrs: true
//         },
//         {
//             removeDimensions: false
//         }
//     ]
// });

// const allFiles = glob.sync('./assets/**/*.svg');
// let size = 0;
// let sizeOptimized = 0;

// function processFile(files: string[], index = 0) {
//     if (index === files.length) {
//         console.log(`Size ${Math.round((size / 1024) * 100) / 100}kb`);
//         console.log(`Optimized ${Math.round((sizeOptimized / 1024) * 100) / 100}kb`);
//         return;
//     }

//     const fileData = fs.readFileSync(files[index], 'utf8');
//     size += Buffer.byteLength(fileData);

//     svgo.optimize(fileData).then(result => {
//         sizeOptimized += Buffer.byteLength(result.data);

//         fs.writeFileSync(files[index], result.data, 'utf8');
//         processFile(files, index + 1);
//     });
// }

// processFile(allFiles);
