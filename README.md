# LB Thought Bubble
## Description
A popup on the homepage that can be dismissed which relays important information

## Installation
Download the zip from the releases tab and install using WordPress or WP-CLI

## Development

### Setup

1. Clone this repo either in your project or your plugins folder
2. Run `npm install` and `composer install`
3. Run `npm run start`
4. (optional) From your plugin folder, `ln -s /path/to/this/repo/blocks/thought-bubble thought-bubble`

### Updating a new version

1. Ensure the readme.txt version is updated
2. Ensure the plugin.json version is updated
3. Create a new tag for release either at github.com or using git tag v0.1.x -m "message"
4. Push the tag to github using `git push origin v0.1.x`

There is github action that will automatically build the zip file for release and create a new release. The zip file will be available in the release assets. Any site with the plugin installed will now be able to update the plugin.

