# Ajay Choudhary — Chemistry

Website and admin panel for Ajay Choudhary Sir, Chemistry educator (Organic, Inorganic and Practical Chemistry; Class 11–12, JEE, NEET).

- **Live site:** https://pankaj2816.github.io/ajay-choudhary-chemistry/
- **Admin panel:** https://pankaj2816.github.io/ajay-choudhary-chemistry/admin

Built with Next.js (static export), TypeScript and Tailwind CSS, hosted free on GitHub Pages.

---

## How content updates work (no server, no database)

All site content (notices, question papers, solutions, study material, team, settings, subjects & chapters) lives in one file:

```
src/data/site-content.json
```

Uploaded PDFs and photos go to `public/uploads/`.

The admin panel edits these files **directly in this GitHub repository** using a GitHub access token:

1. Ajay Sir signs in at `/admin/login` with the access token he was given. The token is saved only in his own browser. It is **never** stored in the code.
2. When he saves something, the admin panel commits the change to the `main` branch.
3. The **Deploy to GitHub Pages** workflow runs automatically and the public site shows the change in about **1–2 minutes**.

Every change is a normal commit (message starts with `Admin:`), so anything can be reviewed or undone from the GitHub history.

> **Developers:** because the admin panel commits to `main`, always run `git pull` before you start working locally.

### Creating / renewing the admin access token

1. On GitHub (repository owner account): **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access:** *Only select repositories* → `ajay-choudhary-chemistry`.
3. **Permissions → Repository permissions → Contents:** *Read and write*. Leave everything else as *No access*.
4. Pick an expiry (e.g. 1 year), generate, and send the token privately to Ajay Sir.
5. He pastes it once on the admin sign-in page on each device he uses.

If a device is lost or the token leaks, delete the token on GitHub and create a new one. The token cannot change the deploy workflow or any other repository.

---

## Class pages

Each class has its own page that collects everything tagged for it (notes, books, papers, solutions and notices):

| Class | Link to share |
| :-- | :-- |
| Class 9 | https://pankaj2816.github.io/ajay-choudhary-chemistry/class-9 |
| Class 10 | https://pankaj2816.github.io/ajay-choudhary-chemistry/class-10 |
| Class 11 | https://pankaj2816.github.io/ajay-choudhary-chemistry/class-11 |
| Class 12 | https://pankaj2816.github.io/ajay-choudhary-chemistry/class-12 |

When uploading in the admin panel, choose the class in **Class / Target**. Items set to *All Classes* appear on every class page. The admin overview has copy and WhatsApp buttons for these links.

## Student enquiries

The contact form emails each enquiry (free, via [FormSubmit](https://formsubmit.co)) to the address set in **Admin → Settings → Where should student enquiries be emailed?** (falls back to the public contact email).

The first enquiry to a new address triggers a one-time confirmation email from FormSubmit. Click **Activate** in it. After that, enquiries arrive normally. Send a test enquiry yourself after changing the address.

---

## Local development

```bash
git clone https://github.com/pankaj2816/ajay-choudhary-chemistry.git
cd ajay-choudhary-chemistry
npm install
npm run dev        # http://localhost:3000
```

The admin panel also works locally: sign in with the token and changes are committed to GitHub (pull afterwards to get them locally).

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static site (`GITHUB_ACTIONS=true npm run build`, output in `out/`) and publishes it to GitHub Pages under `/ajay-choudhary-chemistry`.

## Design system

Clean white + blue: white pages (`paper`), navy text (`ink`) and one friendly blue (`accent`), with Instrument Sans for all text and Noto Sans Devanagari for Hindi. Tokens are in `src/app/globals.css`; older Tailwind colour classes on inner pages are remapped there to the same palette.
