document.getElementById('upload').addEventListener('change', handleFiles);
document.getElementById('sort-by').addEventListener('change', sortAndRenderCards);
 
const MIN_SGPA = 7.0;
let resumeResults = [];
 
let COMMON_SKILLS = [
    'javascript', 'html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'mongodb',
    'mysql', 'postgresql', 'python', 'django', 'flask', 'java', 'spring', 'c++', 'c#',
    'git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'linux', 'bash',
    'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'nlp', 'data science',
    'communication', 'teamwork', 'leadership', 'problem-solving', 'critical thinking',
    'time management', 'adaptability', 'creativity'
];
 
const skillSelect = new Choices('#skill-select', {
    removeItemButton: true,
    placeholderValue: 'Type and select skills...',
    duplicateItemsAllowed: false,
    searchEnabled: true,
    addItems: true,
    shouldSort: true,
    allowHTML: false,
    choices: COMMON_SKILLS.map(skill => ({ value: skill, label: skill }))
});
 
async function handleFiles(event) {
    const files = Array.from(event.target.files).filter(f =>
        f.type === 'application/pdf' || f.name.endsWith('.docx')
    );
    if (files.length === 0) return;
 
    resumeResults = [];
    document.getElementById('resume-cards').innerHTML = '';
 
    for (const file of files) {
        let fullText = '';
 
        if (file.type === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
 
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();
                const strings = content.items.map(item => item.str);
                fullText += strings.join(' ') + '\n';
            }
 
        } else if (file.name.endsWith('.docx')) {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            fullText = result.value || '';
        }
 
        analyzeCandidate(fullText);
        console.log("fullText: ", fullText);
    }
 
    sortAndRenderCards();
}
 
function extractLocations(text) {
    const locationPattern = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b/g;
    return [...text.matchAll(locationPattern)].map(match => match[0]);
}
 
function extractExperience(text) {
    const currentYear = new Date().getFullYear();
    let totalExperience = 0;
    const seen = new Set();
    text = text.replace(/–|—/g, '-');
 
    const experienceHeadings = [
        /work experience/i,
        /professional experience/i,
        /employment history/i,
        /experience/i,
        /career summary/i,
        /work history/i,
        /career history/i,
        /relevant experience/i,
        /job experience/i,
        /professional background/i,
        /employment experience/i,
        /career experience/i,
        /freelance experience/i,
        /contract experience/i,
        /industry experience/i,
        /project experience/i,
        /internship experience/i,
        /internship history/i,
        /internship/i,
        /intern/i,
        /developed/i,
        /developer/i,
        /contributed/i,
        /diagnosed/i,
        /led/i,
        /managed/i,
        /delivered/i,
        /designed/i,
        /created/i,
        /apprenticeship experience/i,
        /apprenticeship/i,
    ];
 
    const educationHeadings = [
        // Education-related
        /education/i,
        /educational background/i,
        /academic background/i,
        /academic qualifications/i,
        /academic history/i,
        /qualifications/i,
        /educational qualifications/i,
        /academic achievements/i,
        /scholastic background/i,
        /schooling/i,
        /higher education/i,
        /academic record/i,
 
        // Project-related
        /projects/i,
        /academic projects/i,
        /personal projects/i,
        /capstone project/i,
        /research projects/i,
        /technical projects/i,
        /project work/i,
        /engineering projects/i,
 
        // Certifications & Training
        /certifications/i,
        /certification/i,
        /professional certifications/i,
        /licenses and certifications/i,
        /certified courses/i,
        /training/i,
        /training programs/i,
        /online courses/i,
 
        // Course-related
        /courses/i,
        /coursework/i,
        /related coursework/i,
        /relevant coursework/i,
        /completed courses/i,
        /udemy courses/i,
        /coursera courses/i,
        /specializations/i,
 
        // Skills-related
        /skills/i,
        /technical skills/i,
        /key skills/i,
        /professional skills/i,
        /core competencies/i,
        /expertise/i,
        /areas of expertise/i
    ];
 
    let workSection = text;
    for (let heading of experienceHeadings) {
        const split = text.split(heading);
        if (split.length > 1) {
            workSection = split[1];
            break;
        }
        // Add any missing date ranges from the rest of the resume into workSection
        const allDateRanges = text.match(/(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?\.?\s*(\d{4})\s*[-–—]\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)?\.?\s*(\d{2,4}|present|current|till date)/gi);
        if (allDateRanges) {
            const notAlreadyIncluded = allDateRanges.filter(r => !workSection.includes(r));
            if (notAlreadyIncluded.length > 0) {
                workSection += '\n' + notAlreadyIncluded.join('\n');
            }
        }
    }
 
    // Include any additional work-related sections in case there are multiple job blocks
    const additionalSections = text.match(/(?:\d{4})\s*[-–—]\s*(?:\d{2,4}|present|current|till date)/gi);
    if (additionalSections) {
        workSection += '\n' + additionalSections.join('\n');
    }
 
    // Append all remaining date ranges in case workSection missed some entries
    const extraDateRanges = [...text.matchAll(/(?:\d{4})\s*[-–—]\s*(?:\d{2,4}|present|current|till date)/gi)]
        .map(m => m[0])
        .filter(range => !workSection.includes(range));
 
    if (extraDateRanges.length > 0) {
        workSection += '\n' + extraDateRanges.join('\n');
    }
 
    for (let eduHeading of educationHeadings) {
        const split = workSection.split(eduHeading);
        if (split.length > 1) {
            workSection = split[0]; // strip education from work section
            break;
        }
    }
 
    //FOR NORMALIZING NEWLINES AND EXTRA SPACES
    text = text.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ');
 
    // Extract project years and append to workSection
    const projectSectionMatch = text.match(/projects?(.*?)certifications?/is);
    if (projectSectionMatch && projectSectionMatch[1]) {
        workSection += '\n' + projectSectionMatch[1]; // Append project details to workSection
    }
 
    //const experiencePattern = /(\d{4})\s*-\s*(\d{2}|\d{4}|present|current|till date)/gi;
    const experiencePattern = /(\d{4})\s*[-–—]\s*(\d{4}|present|current|till date)/gi;
 
    // const experiencePatterns = [
    //     /\b(\d{4})\s*[-–—]\s*(\d{4}|present|current|till date)\b/gi,
    //     /\b(\d{2})\s*[-–—]\s*(\d{2}|present|current|till date)\b/gi,
    //     /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]\s+(\d{4})\s[-–—]\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+(\d{4}|present|current|till date)\b/gi
    // ];
    const matches = [...workSection.matchAll(experiencePattern)];
 
    matches.forEach(match => {
        let startYear = parseInt(match[1]);
        let endRaw = match[2].toLowerCase().trim();
        let endYear = ['current', 'present', 'till date'].includes(endRaw) ? currentYear : parseInt(endRaw);
        if (endRaw.length === 2) {
            endYear = Math.floor(startYear / 100) * 100 + endYear;
        }
 
        //THIS LINE WILL CONSOLE THE EXTRACTED RANGE FROM THE WORK SECTION
        console.log(`Extracted range: ${startYear} - ${endYear}`);
 
        const key = `${startYear}-${endYear}`;
        if (!seen.has(key) && !isNaN(startYear) && !isNaN(endYear) && endYear >= startYear) {
            totalExperience += endYear - startYear;
            seen.add(key);
        }
    });
 
    //THIS LINE WILL CONSOLE THE WHOLE WORK SECTION
    console.log("Final workSection for experience check:\n", workSection);
 
    return totalExperience;
}
 
function extractName(text) {
    const STOP_WORDS = ['engineer', 'software', 'associate', 'junior', 'street', 'location', 'greater', 'experienced', 'intern', 'contact', 'email', 'linkedin', 'phone', 'education', 'skills'];
    const words = text
        .slice(0, 300) // Only the top part of the resume
        .replace(/\s{2,}/g, ' ') // Normalize extra spaces
        .trim()
        .split(/\s+/);
 
    let nameParts = [];
 
    for (let i = 0; i < words.length; i++) {
        const word = words[i].replace(/[^A-Za-z]/g, '');
 
        if (!word) continue;
 
        const lower = word.toLowerCase();
        const isStopWord = STOP_WORDS.includes(lower);
        const isValidNamePart = /^[A-Z][a-z]*$/.test(word) || /^[A-Z]{2,}$/.test(word);
 
        if (isStopWord) break;
 
        if (isValidNamePart) {
            nameParts.push(word);
        } else if (nameParts.length > 0) {
            break;
        }
    }
 
    // Reconstruct spaced names like T I N A → TINA
    let combinedName = nameParts.join(' ').trim();
 
    // If the name looks like it's all single letters (e.g., T I N A C O O K), merge them
    if (/^([A-Z])(\s[A-Z]){2,}$/.test(combinedName)) {
        combinedName = combinedName.replace(/\s/g, '');
    }
 
    return combinedName || 'Unknown';
}
 
function getColorByScore(score) {
    if (score >= 0.8) return '#4caf50'; // green
    if (score >= 0.5) return '#ffc107'; // yellow
    return '#f44336'; // red
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
    const name = extractName(text);
 
    const userLocations = document.getElementById('location-input').value.split(',').map(loc => loc.trim().toLowerCase()).filter(Boolean);
    const expFrom = parseInt(document.getElementById('exp-from').value) || 0;
    const expTo = parseInt(document.getElementById('exp-to').value) || 50;
 
    const matchedLocations = userLocations.filter(userLoc =>
        extractedLocations.some(resumeLoc => resumeLoc.toLowerCase().includes(userLoc))
    );
 
    const locationMatch = matchedLocations.length > 0;
    const experienceMatch = (extractedExperience >= expFrom) && (extractedExperience <= expTo);
    const skillScore = COMMON_SKILLS.length > 0 ? matchedSkills.length / COMMON_SKILLS.length : 0;
 
    resumeResults.push({
        name,
        matchedSkills,
        sgpa,
        matchedLocations,
        extractedExperience,
        experienceMatch,
        skillScore
    });
}
 
function sortAndRenderCards() {
    const sortBy = document.getElementById('sort-by').value;
    if (sortBy === 'score') {
        resumeResults.sort((a, b) => b.skillScore - a.skillScore);
    } else if (sortBy === 'name') {
        resumeResults.sort((a, b) => a.name.localeCompare(b.name));
    }
 
    const container = document.getElementById('resume-cards');
    container.innerHTML = '';
 
    for (const r of resumeResults) {
        const card = document.createElement('div');
        card.style.background = getColorByScore(r.skillScore);
        card.style.padding = '15px';
        card.style.borderRadius = '12px';
        card.style.width = '280px';
        card.style.color = '#fff';
        card.style.boxShadow = '0 0 8px rgba(0,0,0,0.15)';
 
        card.innerHTML = `
      <h3>${r.name}</h3>
      <p><strong>Matched Skills:</strong> ${r.matchedSkills.join(', ') || 'None'}</p>
      <p><strong>SGPA:</strong> ${r.sgpa ?? 'Not Found'}</p>
      <p><strong>Experience:</strong> ${r.extractedExperience} yrs</p>
      <p><strong>Location Match:</strong> ${r.matchedLocations.join(', ') || 'None'}</p>
      <p><strong>Match Score:</strong> ${(r.skillScore * 100).toFixed(1)}%</p>
      <p><strong>Status:</strong> ${r.experienceMatch && (r.skillScore >= 0.5) ? '✅ Shortlisted' : '❌ Not Shortlisted'}</p>
    `;
 
        container.appendChild(card);
    }
}
 
window.addEventListener('load', () => {
    document.getElementById('upload').value = '';
    document.getElementById('resume-cards').innerHTML = '';
    document.getElementById('location-input').value = '';
    document.getElementById('exp-from').value = '';
    document.getElementById('exp-to').value = '';
});