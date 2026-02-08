# WP All Import Tutorial (Archive Ministries)

This guide imports `docs/archive-ministry-import.csv` into WordPress as archive ministries.

## Prerequisites
- WP All Import Pro
- WP All Import ACF Add‑On
- Custom Post Type (CPT) created: `archive_ministry`
- ACF field group attached to `archive_ministry`

## ACF Fields (Recommended)
- `titleZh`, `titleEn`
- `summaryZh`, `summaryEn`
- `categoryZh`, `categoryEn`
- `subcategoryZh`, `subcategoryEn`
- `dateRaw` (string)
- `dateStart` (date, optional)
- `dateEnd` (date, optional)
- `status` (select: `ongoing`, `ended`, `archived`)
- `imageUrl` (url)
- `videoUrl` (url)
- `linkUrl` (url)

## Step‑by‑Step Import
1. Go to **All Import → New Import**
2. Upload file: `docs/archive-ministry-import.csv`
3. Choose **New Items → Custom Post Type → archive_ministry**
4. Click **Continue to Step 2**

### Step 2: Drag & Drop Mapping
Map these fields:
- **Post Title** → `post_title`
- **ACF: titleZh** → `title_zh`
- **ACF: titleEn** → `title_en`
- **ACF: summaryZh** → `summary_zh`
- **ACF: summaryEn** → `summary_en`
- **ACF: categoryZh** → `category_zh`
- **ACF: categoryEn** → `category_en`
- **ACF: subcategoryZh** → `subcategory_zh`
- **ACF: subcategoryEn** → `subcategory_en`
- **ACF: dateRaw** → `date_raw`
- **ACF: dateStart** → `date_start` (optional)
- **ACF: dateEnd** → `date_end` (optional)
- **ACF: status** → `status`
- **ACF: imageUrl** → `image_url`
- **ACF: videoUrl** → `video_url`
- **ACF: linkUrl** → `link`

### Step 3: Media Handling (Optional)
If you want WordPress to download images instead of just saving the URL:
- Use **Images → Download images from URLs**
- Source field: `image_url`

### Step 4: Unique Identifier
Set **Unique Identifier** to `link` (or `title_en` if link is empty).
This avoids duplicate posts on re‑import.

### Step 5: Run Import
Click **Confirm & Run Import**.

## After Import
- Check a few `archive_ministry` posts to confirm fields.
- If using auto‑archive rule: ensure `status` is `archived`.

## Re‑Import / Updates
When you update the CSV:
- Re‑run import using the same Unique Identifier
- Choose **Update existing items**.

## Troubleshooting
- Missing images: verify `image_url` is reachable.
- Wrong language fields: double‑check ACF field names and mapping.
- Date formatting issues: keep `date_raw` as text, parse later if needed.
