document.getElementById('upload').addEventListener('change', handleFile);

let COMMON_SKILLS = [
  'javascript', 'html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'mongodb',
  'mysql', 'postgresql', 'python', 'django', 'flask', 'java', 'spring', 'c++', 'c#',
  'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'linux', 'bash',
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'nlp', 'data science',
  'communication', 'teamwork', 'leadership', 'problem-solving', 'critical thinking',
  'time management', 'adaptability', 'creativity'
];
const MIN_SGPA = 7.0;

// Choices.js dropdowns
const skillSelect = new Choices('#skill-select', {
  removeItemButton: true,
  placeholderValue: 'Type and select skills...',
  duplicateItemsAllowed: false,
  searchEnabled: true,
  addItems: true,
  shouldSort: true,
  allowHTML: false,
  choices: COMMON_SKILLS.map(skill => ({
    value: skill,
    label: skill
  }))
});

async function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n';
  }

  analyzeCandidate(fullText);
}

function extractLocations(text) {
  const locationPattern = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b/g;
  return [...text.matchAll(locationPattern)].map(match => match[0]);
}

function extractExperience(text) {
  const currentYear = new Date().getFullYear();
  let totalExperience = 0;
  const seen = new Set();

  // Normalize dash symbols
  text = text.replace(/–|—/g, '-');

  // Look for common headings
  const experienceHeadings = [
    /work experience/i,
    /professional experience/i,
    /employment history/i,
    /experience/i,
    /career summary/i,
    /work history/i
  ];

  // Try to extract only work section
  let workSection = text;
  for (let heading of experienceHeadings) {
    const split = text.split(heading);
    if (split.length > 1) {
      workSection = split[1];
      break;
    }
  }

  // Find matches like: "2016 - current", "2018 - 20", "2020 - 2023"
  const experiencePattern = /(\d{4})\s*-\s*(\d{2}|\d{4}|present|current|till date)/gi;
  const matches = [...workSection.matchAll(experiencePattern)];

  console.log("Matches found:", matches);

  matches.forEach(match => {
    let startYear = parseInt(match[1]);
    let endRaw = match[2].toLowerCase().trim();

    let endYear;

    if (['current', 'present', 'till date'].includes(endRaw)) {
      endYear = currentYear;
    } else {
      endYear = parseInt(endRaw);
      if (endRaw.length === 2) {
        endYear = Math.floor(startYear / 100) * 100 + endYear;
      }
    }

    const key = `${startYear}-${endYear}`;
    console.log("startYear:", startYear, "endRaw:", endRaw, "endYear:", endYear, "key:", key);

    if (!seen.has(key) && !isNaN(startYear) && !isNaN(endYear) && endYear >= startYear) {
      totalExperience += endYear - startYear;
      seen.add(key);
    }
  });

  console.log("Final seen set:", [...seen]);
  return totalExperience;
}



function analyzeCandidate(text) {
  const lowerText = text.toLowerCase();

  COMMON_SKILLS = skillSelect.getValue(true).map(skill => skill.toLowerCase());

  const matchedSkills = COMMON_SKILLS.filter(skill => lowerText.includes(skill));
  const sgpaMatch = text.match(/\b(?:sgpa|cgpa|gpa)[^\d]{0,5}(\d+(\.\d+)?)/i);
  const sgpa = sgpaMatch ? parseFloat(sgpaMatch[1]) : null;
  const sgpaOk = sgpa !== null && sgpa >= MIN_SGPA;

  const extractedLocations = extractLocations(text);
  const extractedExperience = extractExperience(text);

  const userLocations = document.getElementById('location-input').value.split(',').map(loc => loc.trim().toLowerCase()).filter(Boolean);
  const expFrom = parseInt(document.getElementById('exp-from').value) || 0;
  const expTo = parseInt(document.getElementById('exp-to').value) || 50;

  const matchedLocations = userLocations.filter(userLoc =>
    extractedLocations.some(resumeLoc => resumeLoc.toLowerCase().includes(userLoc))
  );

  const locationMatch = matchedLocations.length > 0;
  const experienceMatch = (extractedExperience >= expFrom) && (extractedExperience <= expTo);

  const skillScore = COMMON_SKILLS.length > 0 ? matchedSkills.length / COMMON_SKILLS.length : 0;

  const relocationContainer = document.getElementById('relocation-container');
  relocationContainer.style.display = locationMatch ? 'none' : 'block';

  if (!locationMatch) {
    document.getElementById('relocate-yes').onclick = () => finalizeShortlisting(true);
    document.getElementById('relocate-no').onclick = () => finalizeShortlisting(false);
    return; // Wait for relocation decision
  }

  finalizeShortlisting(locationMatch);

  function finalizeShortlisting(locationOk) {
    relocationContainer.style.display = 'none'; // Hide buttons
  
    let status = '';
  
    if (locationOk && experienceMatch) {
      status = '✅ Candidate Shortlisted (Ready to Relocate). Schedule Interview.';
    } else {
      status = (matchedSkills.length >= 5 && sgpaOk && experienceMatch)
        ? '✅ Candidate Shortlisted. Schedule Interview.'
        : '❌ Candidate Not Shortlisted.';
    }
  
    const result = `
  Matched Skills: ${matchedSkills.join(', ') || 'None'}
  Extracted SGPA: ${sgpa ?? 'Not Found'}
  Resume Match Score: ${(skillScore * 100).toFixed(2)}%
  Matched Locations: ${matchedLocations.join(', ') || 'None'}
  Extracted Experience: ${extractedExperience} years
  User Experience Range: ${expFrom} - ${expTo} years
  Experience Match: ${experienceMatch ? 'Yes' : 'No'}
  Status: ${status}
    `.trim();
  
    document.getElementById('skills-found').innerText = result;
    alert(status);
  
    console.log("Matched Skills:", matchedSkills);
    console.log("SGPA:", sgpa);
    console.log("Skill Match Score:", skillScore.toFixed(2));
    console.log("Matched Locations:", matchedLocations);
    console.log("Extracted Experience:", extractedExperience);
    console.log("Experience Match:", experienceMatch);
    console.log("Relocation Accepted:", locationOk);
  }
}

window.addEventListener('load', () => {
  document.getElementById('upload').value = '';
  document.getElementById('skills-found').textContent = '';
  document.getElementById('location-input').value='';
  document.getElementById('exp-from').value='';
  document.getElementById('exp-to').value='';
});
