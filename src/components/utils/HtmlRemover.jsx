

export function stripHTML(htmlString) {
  if (!htmlString) return '';
  let text = htmlString.replace(/<[^>]*>?/gm, '');
  text = text.replace(/&nbsp;/gi, ' ');
  return text;
}


export function parseJobDescription(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  const sectionHeaders = [
    'Clearance',
    'Responsibilities:',
    'Required Qualifications:',
    'Preferred Qualifications:',
    'Benefits at Recro',
    'Working at Recro',
  ];

  const regex = new RegExp(`(${sectionHeaders.join('|')})`, 'g');
  const parts = rawText.split(regex).map((part) => part.trim()).filter(Boolean);

  const structured = [];

  // Step 1: Handle intro and currently sections
  const currentlyIndex = rawText.indexOf('Currently,');
  const clearanceIndex = rawText.indexOf('Clearance');

  if (currentlyIndex !== -1) {
    const intro = rawText.slice(0, currentlyIndex).trim();

    const currently = clearanceIndex !== -1
      ? rawText.slice(currentlyIndex, clearanceIndex).trim()
      : rawText.slice(currentlyIndex).trim();

    structured.push(
      { title: 'About Recro', content: intro },
      { title: 'Job Opening', content: currently }
    );
  }

  // Step 2: Parse remaining sections
  for (let i = 0; i < parts.length; i++) {
    const sectionTitle = parts[i];

    if (sectionHeaders.includes(sectionTitle)) {
      const nextContent = parts[i + 1] ?? '';
      const cleanTitle = sectionTitle.replace(/:$/, '');
      structured.push({
        title: cleanTitle,
        content: nextContent.trim(),
      });
      i++;
    }
  }

  return structured;
}

export function stripInlineStylesBrowser(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'));
  return div.innerHTML;
}
