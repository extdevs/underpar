
# HTML Boilerplate

## Setup

### Prerequisites
You will need [nvm](https://heynode.com/tutorial/install-nodejs-locally-nvm/) set up to manage your Node version, or alternatively be using the version of Node that is contained in the .nvmrc file.

### Starting a new project
Clone this repo, `cd` into the folder, run `nvm use` to switch to the proper node version for this project, and run `npm install`.

## Commands
`npm run dev` will spin up a localhost serving your pages from system memory. This means your files do not compile when you run this. Hot Module Replacement is set up by default, so development should be super fast.

`npm run build` will build your files for production. All of the minification, image compression, and compilation happens here. Your files will be output into the `/dist/` folder, which is the folder you should point Netlify to if you are pushing it up there, or this is the folder you should copy to a client's server if you are making it live somewhere else. 

`npm run preview` this will load up your compiled files into the browser so you can see what has been compiled.

## How it works

This boilerplate utilises Vite as a bundler. Rollup plugins can be used out of the box in Vite, so some of these are used as part of the build process - specifically to generate our responsive images.

The input file for the bundler is the src/index.html file (and any others you reference in the vite.config.js). This file has a the main.js file loaded, but notice there are no css files referenced in our input file.

Any of the pages you wish to include in the project should go inside the `/src/` folder inside a subfolder named with the page slug. We have a few example pages in there under `/free-ebook/` `/questionnaire/` and `/thank-you/`. These pages have basic layouts that utilise Bootstrap. Please remove any of these pages that are not in use from your final file.

The `template-sections.html` file inside the root folder has some prebuilt templates that utilise Bootstrap and some custom functions inside our `/src/assets/js/` and  `/src/assets/css/` folders respectively.

Check out the features below for some info on how to embed inline SVGs, how to structure your image paths, and add new pages to your project.


## Features

### Lean Bootstrap
We have removed some of the Bootstrap classes that we find we do not use often. For this reason you may find there are some classes that do not work. 

### Automatic inline SVGs
Place your SVGs in the src/images folder, and reference your svg files like this `<icon src="FILENAME.svg"></icon>`. <ins>You don't need to reference the folder before your filename as this gets added by postHTML.</ins> If you want to load your SVG like an image, you can just reference it as you would an image with an `<img>` tag.

### Automatic image processing
Place your images in the src/images folder, and reference your image files like this `<img src="FILENAME.png" />`. <ins>You don't need to reference the folder before your filename as this gets added by postHTML.</ins> There is some additional HTML added in postHTML, wrapping the `<img>` in `<picture>` tags- this is done so that we can serve .webp's to all browsers.

To disable lazyloading for a specific image, add the attribute 'nolazy'- eg. `<img src="FILENAME.png" nolazy/>`
To load an SVG via an `<img>` tag, the SVG must be added to the /src/public folder eg. `<img src="svg-img.svg"/>`

### Adding new pages
In the vite.config.js file update the build.rollupOptions.input to include your additional HTML files. This will allow Vite to parse these in addition to the defaults. Additional pages can be accessed using a trailing `/`- so if you add `/thank-you`, in the browser it must be accessed via `localhost:3000/thank-you/`.

### Templated Sections
Navigating to /sections/ will display the templated sections page. These sections are pre-built modules that may assist in building some commonly seen design elements.


## Packages Used

**rollup-plugin-generate-image-sizes**
This is used to read the /dist/assets folder after it has been generated, and generates webp and image sizes from the image files in the directory. This happens at the end of the regular vite process.

**vite-plugin-compress**
Compresses assets generated by vite and assets from the public directory with Brotli, svgo, imagemin for pngs.

**postcss.config.js**
Postcss is configured to remove unused css using purgeCSS. It looks for any HTML files in the /src folder and only includes CSS that applies to them. If you need to stop purgeCSS from purging something, use the safelist functions here: https://purgecss.com/safelisting.html

**vite-plugin-posthtml**
This plugin processes the HTML after vite has compiled everything. 

**vite-plugin-posthtml**
This plugin allows post processing of the HTML generated by Vite.

**posthtml-inline-svg**
Replaces `<icon>` tags with svg src with inline svgs. See above section on how to use this. 

**posthtml-plugin-picture-srcset**
This is a custom posthtml plugin that was started to process the HTML and output picture tags along with the image height and width attributes. Currently it only functions if clearing the dist folder is turned off, and the files already exist.
