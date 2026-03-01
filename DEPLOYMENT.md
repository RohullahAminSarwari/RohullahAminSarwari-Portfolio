# Portfolio Deployment Guide

This guide will help you deploy your enhanced portfolio to various hosting platforms.

## 🚀 Quick Start

### 1. Build the Project
```bash
npm run build
```

### 2. Preview Locally
```bash
npm run preview
```

## 📦 Deployment Options

### GitHub Pages (Recommended for Free Hosting)

1. **Install gh-pages** (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Your site will be available at: `https://yourusername.github.io/portfolio`

### Vercel (Recommended for Performance)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   npm run deploy:vercel
   ```

3. **Or use Vercel Dashboard**:
   - Connect your GitHub repository
   - Vercel will automatically deploy on every push

### Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy to Netlify**:
   ```bash
   npm run deploy:netlify
   ```

3. **Or use Netlify Dashboard**:
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

### Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```

3. **Build and Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Wiyar Ahmad Zai - Portfolio
VITE_APP_DESCRIPTION=Computer Science student and Full-Stack Developer
VITE_APP_URL=https://yourdomain.com
```

### Custom Domain
1. **For GitHub Pages**:
   - Add a `CNAME` file in the `public` folder with your domain
   - Configure DNS settings with your domain provider

2. **For Vercel**:
   - Go to project settings
   - Add your domain in the "Domains" section
   - Configure DNS as instructed

3. **For Netlify**:
   - Go to site settings
   - Add your domain in the "Domain management" section
   - Configure DNS as instructed

## 📊 Performance Optimization

### Bundle Analysis
```bash
npm run analyze
```

### Lighthouse Audit
1. Open your deployed site
2. Open Chrome DevTools
3. Go to "Lighthouse" tab
4. Run audit for Performance, Accessibility, Best Practices, and SEO

## 🛠️ Troubleshooting

### Common Issues

1. **404 Error on Refresh**:
   - Add `_redirects` file in `public` folder with: `/* /index.html 200`
   - Or configure server to serve `index.html` for all routes

2. **Images Not Loading**:
   - Check image paths are relative to the `public` folder
   - Ensure images are optimized (use WebP format when possible)

3. **Build Fails**:
   - Check for TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed: `npm install`

4. **Slow Loading**:
   - Enable gzip compression on your server
   - Use a CDN for static assets
   - Optimize images and use lazy loading

### Performance Tips

1. **Image Optimization**:
   - Use WebP format for images
   - Implement lazy loading
   - Compress images before adding to project

2. **Code Splitting**:
   - Already configured in `vite.config.js`
   - Consider lazy loading routes

3. **Caching**:
   - Set appropriate cache headers
   - Use service workers for offline functionality

## 📱 Mobile Optimization

The portfolio is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🔍 SEO Optimization

The portfolio includes:
- Meta tags for social sharing
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Semantic HTML
- Proper heading hierarchy

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your primary colors
  }
}
```

### Content
- Update personal information in `src/pages/Home.jsx`
- Modify project data in respective page components
- Update contact information

### Styling
- Modify `src/index.css` for global styles
- Update component-specific styles in individual files

## 📈 Analytics

### Google Analytics
1. Get your GA4 measurement ID
2. Add it to your `.env` file:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. The tracking code will be automatically included

### Other Analytics
- Vercel Analytics (if using Vercel)
- Netlify Analytics (if using Netlify)
- Custom analytics solutions

## 🔒 Security

### HTTPS
- All major hosting platforms provide HTTPS by default
- Ensure your custom domain also uses HTTPS

### Content Security Policy
Add CSP headers to your server configuration:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';
```

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console for errors
3. Test locally with `npm run dev`
4. Check the build output with `npm run build`

## 🎉 Success!

Once deployed, your portfolio will be:
- ✅ Fully responsive
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Accessible
- ✅ Modern and professional
- ✅ Ready for hosting

Happy coding! 🚀
