# Musical Calendar Maintenance

This is a static HTML/CSS/JavaScript website, not a database-backed app. Keep the existing design, calendar, guides, public audience and domain. Do not add a backend, tracking, credentials, DNS records, or a second site for routine updates.

## Targets

- Public website: https://musical.ben2.win
- Public source backup: `benchen216/musical-cal`
- Requested recurring timing: daily at 07:00 Asia/Taipei. This file describes the process; it does not create or prove a schedule.

## Scope and evidence

Discover newly announced Taiwan musical-theatre productions and maintain verified upcoming performances across north, central and south Taiwan. The date range is defined in `STAGE_DATA.start` and `end`. Retain the current published range unless it needs to advance to cover newly verified upcoming performances; do not republish merely to move a range or timestamp on an otherwise unchanged day. Keep the two venue/company directories intact unless correcting verified facts.

Use the official venue, company, promoter, and primary ticketing pages linked from the data files, supplemented by new official announcements. Never manufacture sessions, presume a missing date/time, or copy claims from search snippets without checking the page. Record full official URLs and the date actually checked. Keep page text concise and original. Do not copy posters/logos without permission. Source citation alone is not image permission.

Only publish meaningful, verified changes: new or changed sessions, cancellations, newly announced on-sale times, early-bird eligibility/discount/period changes, or substantive corrections. Do not commit or deploy solely to refresh checked timestamps, reformat files, roll an unchanged date range, or log a no-change search. Preserve the last published per-record verification date when content is unchanged; a run's no-change check time belongs in its report, not a site-only edit.

## Data files

- `dist/events.js`: `window.STAGE_DATA`, including `start`, `end`, `checkedAt` and `productions`. Each run has a stable `id`, shared `productionId` for the same work, title, city, region (`north`, `central`, `south`), actual venue/hall, short summary, `sourceUrl`, `ticketUrl`, checked date and explicit sessions `{date:'YYYY-MM-DD', time:'HH:mm'}` in Asia/Taipei. Preserve cancellation/weather notices. Separate runs by city/venue if their ticket conditions differ. Check exact dates and times, not just a run's date span. Avoid duplicated run/session keys.
- `dist/ticket-data.js`: `window.STAGE_TICKETS`, keyed by existing run IDs. Store `onSaleAt` with `+08:00` only when the exact timestamp is known; otherwise `null` with an accurate `onSaleText`. Do not infer on-sale dates from performance dates or page publication dates. Include `saleStatusText`, `earlyBird`, `bookingUrl`, `checkedAt`, `sources`, and limitations in `notes`.
- Each early-bird entry has `label`, `window`, `discount`, `conditions`, `status` (`expired`, `current`, `upcoming`, or `unknown`) and exact `startsAt`/`endsAt` when known. Mark ended offers as expired. Do not imply current inventory or availability. Unknown discount/conditions remain explicit, not guessed. `ticket-model.js` also prevents an offer with a past end timestamp from being shown as current.
- `dist/guides-data.js`: verified venue and company selection, with maps search URLs using known venue names and addresses, official sources and checked dates. A company is not a venue. Do not infer company size from popularity or headquarters from tour cities.
- `dist/index.html`, `styles.css`, `app.js`, `model.js`, `guides.js`, `guides-model.js`, `ticket-model.js`: interface and presentation. Keep date labels consistent with the dataset. Ticket details must stay collapsed by default, keyboard accessible, and usable on phones.

## Safe update and publication

1. Read the latest published source and preserve unrelated edits. Keep the existing public website and repository.
2. Compare official facts against the existing data before writing. If no substantive change exists, stop without a commit, deployment or GitHub backup-only timestamp change.
3. Make the smallest data/code change needed, preserving unrelated edits. Keep a concise change summary with official evidence.
4. Run `node tests.cjs`, `node guides-tests.cjs`, and `node ticket-tests.cjs`; run `node --check` on changed JavaScript. Update assertions only when justified by verified content, not to hide a failed invariant. Inspect collapsed ticket disclosure, calendar day selection, city/region filters and both directory filters. Check the mobile layout when a supported viewport is available; do not claim unperformed device tests.
5. Publish the tested source to the existing website using its authorized deployment process. Do not create a second website or change DNS for content updates.
6. Verify successful publication at the public custom hostname. Check a changed record, the calendar and a ticket disclosure. A pending publication is not success.
7. For every changed publication, also sync sanitized source, data, tests, and this guide to `benchen216/musical-cal`, preserving unrelated repository files. Include `dist/`, the three `*-tests`/`tests.cjs` checks, and maintained documentation. Exclude `.git`, caches, local paths/archives, credentials, generated authentication data, and deployment-specific hosting configuration. Preserve repository visibility; do not create another repository.
8. Verify the GitHub returned commit and read back the changed files or manifest. Report website publication and backup separately. If one succeeds and the other fails, report partial completion and safely retry only the failed step after checking for an uncertain outcome; do not republish the Site just to retry its backup. Never overwrite unrelated changes or blindly retry writes.

## Report

For a changed run, briefly state new/corrected productions or ticket terms and both publication/backup outcomes, with the live URL and verified commit when relevant. If a source is inaccessible or facts conflict, retain the last supported data, identify the uncertainty, and do not claim it was refreshed. No-change runs do not need routine user messages unless requested. This static pipeline requires source changes and republication; it is not an unattended database writer or live ticket inventory feed.
