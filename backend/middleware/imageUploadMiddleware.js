import multer from 'multer';


// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File filter for images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png', 
    'image/gif',
    'image/webp',
    'application/pdf'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images (JPG, PNG, GIF, WebP) and PDF files are allowed'), false);
  }
};

// Initialize upload with memory storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max for PDFs
  },
  fileFilter: fileFilter
});

export const uploadLogo = upload.single('logo');
export const uploadVerificationDocument = upload.single('verificationDocument');
export const uploadClinicDocuments = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'verificationDocument', maxCount: 1 }
]);