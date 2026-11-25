# Static Business Card Website

## Stack and Project Structure

- Use plain HTML, CSS, and JavaScript. Keep the site runnable without a build step.
- For a new project, use `index.html`, `styles.css`, and an `assets/` directory. Add `script.js` only when the site needs interactivity.
- Follow the existing file structure and conventions when editing an established project.
- Use relative paths for local assets so the site can be hosted in a subdirectory.

## HTML and Content

- Set the document language with `lang` and include a page title, meta description, and viewport tag.
- Use semantic HTML, one main heading, and a logical heading hierarchy.
- Use links for navigation and buttons for actions. Write meaningful alt text for informative images and use `alt=""` for decorative images.
- Use the contact details, prices, testimonials, and other facts supplied by the user. Clearly mark any missing content that needs to be filled in before publication.
- Add a contact form only when a working submission endpoint is available. Show a success message after the endpoint confirms submission and show an error if it fails.

## CSS and Responsive Layout

- Start with the mobile layout. Use Flexbox or Grid where appropriate.
- Keep text, images, and controls usable on phones, tablets, and desktops without horizontal scrolling.
- Reuse existing styles and use CSS custom properties for shared colors and spacing.
- Maintain readable contrast and visible keyboard focus. Respect `prefers-reduced-motion` when adding animations.
- Set image dimensions to reduce layout shifts. Lazy-load images below the fold.

## JavaScript

- Keep the main content and contact links usable with JavaScript disabled.
- Load external scripts with `defer` and register event handlers with `addEventListener`.
- Use a button for a collapsible menu and keep `aria-expanded` in sync with its state.
- Keep secrets and private API keys out of client-side code.

## Editing and Verification

- Make the requested change and keep the diff focused.
- Leave routine visual and functional review to the user. After an edit, briefly summarize what changed so the user can review it and report anything that needs adjustment.
- Run a targeted check only when the request calls for verification or when a specific issue needs diagnosis. Limit the check to the affected behavior.
- Run a full browser, responsive, accessibility, and interaction review only when the user explicitly requests one.
- Mention any checks you ran and any missing content or setup needed to use the change.
