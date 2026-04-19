// ========================
// TRUTHLENS - MAIN SCRIPT
// ========================

// Sample News Data
const samples = {
    fake1: `BREAKING: Scientists at unnamed 
research institute claim that drinking 
bleach mixed with lemon juice can cure 
COVID-19 in just 24 hours! This miracle 
cure has been SUPPRESSED by Big Pharma 
for years! Share this before they DELETE 
it! The government doesn't want you to 
know this SECRET remedy that has cured 
THOUSANDS of people worldwide! SHARE 
IMMEDIATELY before this gets taken down!`,

    fake2: `SHOCKING: Bill Gates admits 
in leaked video that 5G towers are 
being used to control human minds 
through microchips in COVID vaccines! 
Anonymous sources confirm that the 
New World Order is planning to 
ELIMINATE 90% of the population 
by 2025! Wake up sheeple! The TRUTH 
they're hiding from you! Forward to 
everyone you know RIGHT NOW before 
it's too late! This is NOT a drill!`,

    real1: `Scientists at Oxford University 
have published a new peer-reviewed study 
in the journal Nature Medicine examining 
the effectiveness of mRNA vaccines. 
The research, conducted over 18 months 
with 45,000 participants across 12 
countries, found that the vaccines 
showed 94% effectiveness against 
severe disease. Dr. Sarah Johnson, 
lead researcher, stated that the 
results are promising but further 
long-term studies are needed. The 
WHO has reviewed and endorsed these 
findings pending additional research.`,

    real2: `The Reserve Bank of India 
announced today that the inflation 
rate has decreased to 4.2% in 
November 2024, down from 6.1% in 
October. This is the first time 
inflation has fallen within the 
RBI's target range of 2-6% in 
eight months. Governor Shaktikanta 
Das attributed this to improved 
food supply chains and reduced 
crude oil prices. Economists from 
CRISIL and ICICI Securities have 
confirmed these figures align with 
their projections for Q3 2024.`
};

// Fake News Keywords
const fakeKeywords = [
    'share immediately', 'wake up',
    'they dont want', 'secret',
    'suppressed', 'big pharma',
    'miracle cure', 'shocking',
    'breaking', 'eliminated',
    'before they delete', 'sheeple',
    'anonymous sources', 'leaked',
    'forward to everyone', 'not a drill',
    'new world order', 'government hiding',
    'conspiracy', 'cover up',
    'urgent', 'before its too late',
    'deep state', 'mainstream media lies'
];

const realKeywords = [
    'peer reviewed', 'study',
    'published', 'journal',
    'researchers', 'university',
    'according to', 'data shows',
    'evidence', 'confirmed',
    'participants', 'months',
    'scientists', 'experts',
    'analysis', 'report',
    'statistics', 'official',
    'government', 'announced'
];

const emotionalWords = [
    'shocking', 'urgent', 'breaking',
    'wake up', 'sheeple', 'eliminated',
    'suppressed', 'secret', 'miracle',
    'immediately', 'before', 'delete',
    'truth', 'hiding', 'never',
    'always', 'everyone', 'everything'
];

// Sources Data
const trustedSources = [
    {
        name: "Reuters",
        type: "International Wire",
        icon: "📡",
        url: "https://reuters.com",
        color: "#ff7700"
    },
    {
        name: "BBC News",
        type: "British Broadcasting",
        icon: "🏛️",
        url: "https://bbc.com/news",
        color: "#bb0000"
    },
    {
        name: "AP News",
        type: "Associated Press",
        icon: "📰",
        url: "https://apnews.com",
        color: "#0066cc"
    },
    {
        name: "Snopes",
        type: "Fact Checker",
        icon: "🔍",
        url: "https://snopes.com",
        color: "#336699"
    },
    {
        name: "FactCheck.org",
        type: "Fact Checker",
        icon: "✅",
        url: "https://factcheck.org",
        color: "#006633"
    },
    {
        name: "PolitiFact",
        type: "Fact Checker",
        icon: "⚖️",
        url: "https://politifact.com",
        color: "#cc6600"
    }
];

// ========================
// TAB FUNCTIONALITY
// ========================
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        document.querySelectorAll('.tab')
            .forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content')
            .forEach(c => c.classList.remove('active'));

        // Add active to clicked tab
        tab.classList.add('active');
        const tabId = tab.dataset.tab + '-tab';
        document.getElementById(tabId)
            .classList.add('active');
    });
});

// ========================
// CHAR COUNT
// ========================
document.getElementById('newsText')
    .addEventListener('input', function () {
        const count = this.value.length;
        document.getElementById('charCount')
            .textContent = count + ' characters';
    });

// ========================
// LOAD SAMPLES
// ========================
function loadSample(type) {
    // Switch to text tab
    document.querySelectorAll('.tab')
        .forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content')
        .forEach(c => c.classList.remove('active'));
    document.querySelector('[data-tab="text"]')
        .classList.add('active');
    document.getElementById('text-tab')
        .classList.add('active');

    // Load sample text
    const textarea = document.getElementById('newsText');
    textarea.value = samples[type];
    document.getElementById('charCount')
        .textContent = textarea.value.length +
        ' characters';
}

// ========================
// CLEAR INPUT
// ========================
function clearInput() {
    document.getElementById('newsText').value = '';
    document.getElementById('charCount')
        .textContent = '0 characters';
}

// ========================
// ANALYZE NEWS - MAIN FUNCTION
// ========================
function analyzeNews() {
    // Get input text
    let text = '';
    const activeTab = document.querySelector(
        '.tab.active'
    ).dataset.tab;

    if (activeTab === 'text') {
        text = document.getElementById('newsText')
            .value.trim();
    } else if (activeTab === 'url') {
        text = document.getElementById('newsUrl')
            .value.trim();
        if (!text) {
            showToast('Please enter a URL!', 'error');
            return;
        }
        // Simulate URL fetch
        text = "URL content analysis simulation";
    } else {
        text = document.getElementById('newsHeadline')
            .value.trim();
    }

    // Validate input
    if (!text || text.length < 10) {
        showToast(
            'Please enter at least 10 characters!',
            'error'
        );
        return;
    }

    // Hide results, show loading
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('analyzeBtn').disabled = true;

    // Reset loading steps
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active', 'done');
    });

    // Animate loading steps
    animateSteps(text);
}

// ========================
// ANIMATE LOADING STEPS
// ========================
function animateSteps(text) {
    const steps = ['step1', 'step2',
        'step3', 'step4'];
    let currentStep = 0;

    function nextStep() {
        if (currentStep > 0) {
            const prevStep = document.getElementById(
                steps[currentStep - 1]
            );
            prevStep.classList.remove('active');
            prevStep.classList.add('done');
            prevStep.querySelector('i').className =
                'fas fa-check';
        }

        if (currentStep < steps.length) {
            document.getElementById(steps[currentStep])
                .classList.add('active');
            currentStep++;
            setTimeout(nextStep, 700);
        } else {
            // Analysis complete
            setTimeout(() => {
                showResults(text);
            }, 500);
        }
    }

    nextStep();
}

// ========================
// SHOW RESULTS
// ========================
function showResults(text) {
    // Calculate scores
    const analysis = analyzeText(text);

    // Hide loading
    document.getElementById('loading').style.display = 'none';
    document.getElementById('analyzeBtn').disabled = false;

    // Show results
    const resultsEl = document.getElementById('results');
    resultsEl.style.display = 'flex';
    resultsEl.style.animation = 'fadeInUp 0.5s ease';

    // Update score circle
    updateScoreCircle(analysis.credibilityScore);

    // Update verdict
    updateVerdict(analysis);

    // Update bars
    animateBars(analysis);

    // Update lists
    updateRedFlags(analysis.redFlags);
    updateGreenFlags(analysis.greenFlags);
    updateKeywords(analysis.keywords);
    updateRecommendations(analysis);

    // Update sources
    updateSources();

    // Scroll to results
    setTimeout(() => {
        resultsEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// ========================
// ANALYZE TEXT ALGORITHM
// ========================
function analyzeText(text) {
    const textLower = text.toLowerCase();
    let score = 50; // Start at 50
    let redFlags = [];
    let greenFlags = [];
    let foundKeywords = [];
    let fakeCount = 0;
    let realCount = 0;

    // Check fake keywords
    fakeKeywords.forEach(keyword => {
        if (textLower.includes(keyword)) {
            fakeCount++;
            redFlags.push(
                capitalizeFirst(keyword) +
                ' detected in content'
            );
            foundKeywords.push({
                word: keyword,
                type: 'red'
            });
        }
    });

    // Check real keywords
    realKeywords.forEach(keyword => {
        if (textLower.includes(keyword)) {
            realCount++;
            foundKeywords.push({
                word: keyword,
                type: 'green'
            });
        }
    });

    // Check emotional words
    let emotionalCount = 0;
    emotionalWords.forEach(word => {
        if (textLower.includes(word)) {
            emotionalCount++;
        }
    });

    // Check for citations
    if (textLower.includes('according to')) {
        greenFlags.push('Contains citations or references');
        score += 8;
    }

    // Check for experts
    if (textLower.includes('dr.') ||
        textLower.includes('professor') ||
        textLower.includes('researcher')) {
        greenFlags.push('References expert sources');
        score += 8;
    }

    // Check for publications
    if (textLower.includes('journal') ||
        textLower.includes('published') ||
        textLower.includes('study')) {
        greenFlags.push('References published research');
        score += 10;
    }

    // Check for statistics
    if (/\d+%/.test(text) ||
        /\d+,\d+/.test(text)) {
        greenFlags.push('Contains specific data and statistics');
        score += 8;
    }

    // Check for dates
    if (/20\d\d/.test(text) ||
        textLower.includes('today') ||
        textLower.includes('announced')) {
        greenFlags.push('Contains time-specific information');
        score += 5;
    }

    // Check uppercase
    const upperCount = (text.match(/[A-Z]{3,}/g) || []).length;
    if (upperCount > 3) {
        redFlags.push('Excessive use of CAPITAL LETTERS (emotional manipulation)');
        score -= 15;
    }

    // Check exclamation marks
    const exclamCount = (text.match(/!/g) || []).length;
    if (exclamCount > 2) {
        redFlags.push(
            `${exclamCount} exclamation marks (urgency manipulation)`
        );
        score -= 10;
    }

    // Adjust for fake keywords
    score -= (fakeCount * 8);

    // Adjust for real keywords
    score += (realCount * 3);

    // Adjust for emotional words
    if (emotionalCount > 3) {
        redFlags.push('High emotional language detected');
        score -= 10;
    }

    // Check text length
    if (text.length < 100) {
        redFlags.push('Very short content - insufficient information');
        score -= 10;
    } else if (text.length > 500) {
        greenFlags.push('Detailed content with sufficient information');
        score += 5;
    }

    // Check for anonymous sources
    if (textLower.includes('anonymous') ||
        textLower.includes('unnamed')) {
        redFlags.push('Relies on anonymous or unnamed sources');
        score -= 12;
    }

    // Check for verified sources
    if (textLower.includes('reuters') ||
        textLower.includes('associated press') ||
        textLower.includes('bbc') ||
        textLower.includes('who') ||
        textLower.includes('university')) {
        greenFlags.push('References credible news organizations');
        score += 15;
    }

    // Clamp score
    score = Math.max(5, Math.min(98, score));

    // Calculate other metrics
    const biasLevel = Math.min(95,
        (emotionalCount * 10) + (fakeCount * 8)
    );
    const emotionalTone = Math.min(95,
        emotionalCount * 12
    );

    // Limit lists
    redFlags = redFlags.slice(0, 5);
    greenFlags = greenFlags.slice(0, 5);
    foundKeywords = foundKeywords.slice(0, 10);

    // Add default messages if empty
    if (redFlags.length === 0) {
        redFlags.push('No major red flags detected');
    }
    if (greenFlags.length === 0) {
        greenFlags.push('Limited credibility signals found');
    }

    return {
        credibilityScore: Math.round(score),
        biasLevel: Math.round(biasLevel),
        emotionalTone: Math.round(emotionalTone),
        redFlags,
        greenFlags,
        keywords: foundKeywords,
        fakeCount,
        realCount
    };
}

// ========================
// UPDATE SCORE CIRCLE
// ========================
function updateScoreCircle(score) {
    const circle = document.getElementById('scoreCircle');
    const scoreNum = document.getElementById('scoreNum');
    const scoreLabel = document.getElementById('scoreLabel');

    // Set color based on score
    let color;
    let label;
    if (score >= 70) {
        color = '#00cc88';
        label = 'Credible';
    } else if (score >= 40) {
        color = '#ffaa00';
        label = 'Questionable';
    } else {
        color = '#ff4444';
        label = 'Likely Fake';
    }

    circle.style.stroke = color;

    // Animate circle
    const circumference = 339;
    const offset = circumference -
        (score / 100) * circumference;

    setTimeout(() => {
        circle.style.transition =
            'stroke-dashoffset 1.5s ease';
        circle.style.strokeDashoffset = offset;
    }, 100);

    // Animate number
    let current = 0;
    const interval = setInterval(() => {
        current += 2;
        if (current >= score) {
            current = score;
            clearInterval(interval);
        }
        scoreNum.textContent = current + '%';
        scoreNum.style.color = color;
    }, 30);

    scoreLabel.textContent = label;
    scoreLabel.style.color = color;
}

// ========================
// UPDATE VERDICT
// ========================
function updateVerdict(analysis) {
    const score = analysis.credibilityScore;
    const verdictIcon = document.getElementById('verdictIcon');
    const verdictTitle = document.getElementById('verdictTitle');
    const verdictDesc = document.getElementById('verdictDesc');
    const verdict = document.getElementById('verdict');

    if (score >= 70) {
        verdictIcon.textContent = '✅';
        verdictTitle.textContent = 'Likely Credible';
        verdictTitle.style.color = '#00cc88';
        verdictDesc.textContent =
            'This article shows strong credibility signals. However, always verify with multiple sources.';
        verdict.style.background =
            'rgba(0,204,136,0.1)';
        verdict.style.borderColor =
            'rgba(0,204,136,0.3)';
    } else if (score >= 40) {
        verdictIcon.textContent = '⚠️';
        verdictTitle.textContent = 'Questionable Content';
        verdictTitle.style.color = '#ffaa00';
        verdictDesc.textContent =
            'This article has mixed credibility signals. Verify carefully before sharing.';
        verdict.style.background =
            'rgba(255,170,0,0.1)';
        verdict.style.borderColor =
            'rgba(255,170,0,0.3)';
    } else {
        verdictIcon.textContent = '🚫';
        verdictTitle.textContent = 'Likely Fake News!';
        verdictTitle.style.color = '#ff4444';
        verdictDesc.textContent =
            'This article shows multiple fake news indicators. Do NOT share without verification!';
        verdict.style.background =
            'rgba(255,68,68,0.1)';
        verdict.style.borderColor =
            'rgba(255,68,68,0.3)';
    }
}

// ========================
// ANIMATE BARS
// ========================
function animateBars(analysis) {
    setTimeout(() => {
        // Credibility bar
        document.getElementById('credBar')
            .style.width = analysis.credibilityScore + '%';
        document.getElementById('credVal')
            .textContent = analysis.credibilityScore + '%';

        // Bias bar
        document.getElementById('biasBar')
            .style.width = analysis.biasLevel + '%';
        document.getElementById('biasVal')
            .textContent = analysis.biasLevel + '%';

        // Emotional bar
        document.getElementById('emotBar')
            .style.width = analysis.emotionalTone + '%';
        document.getElementById('emotVal')
            .textContent = analysis.emotionalTone + '%';
    }, 300);
}

// ========================
// UPDATE RED FLAGS
// ========================
function updateRedFlags(flags) {
    const list = document.getElementById('redFlagsList');
    list.innerHTML = '';
    flags.forEach(flag => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            ${flag}
        `;
        list.appendChild(li);
    });
}

// ========================
// UPDATE GREEN FLAGS
// ========================
function updateGreenFlags(flags) {
    const list = document.getElementById('greenFlagsList');
    list.innerHTML = '';
    flags.forEach(flag => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${flag}
        `;
        list.appendChild(li);
    });
}

// ========================
// UPDATE KEYWORDS
// ========================
function updateKeywords(keywords) {
    const container = document.getElementById('keywordsList');
    container.innerHTML = '';

    if (keywords.length === 0) {
        container.innerHTML =
            '<span style="color:var(--text-muted);font-size:0.85rem">No significant keywords found</span>';
        return;
    }

    keywords.forEach(kw => {
        const span = document.createElement('span');
        span.className = `keyword ${kw.type}`;
        span.textContent = kw.word;
        container.appendChild(span);
    });
}

// ========================
// UPDATE RECOMMENDATIONS
// ========================
function updateRecommendations(analysis) {
    const list = document.getElementById('recommendList');
    list.innerHTML = '';

    const score = analysis.credibilityScore;
    let recs = [];

    if (score < 40) {
        recs = [
            'Do NOT share this content without verification',
            'Search for this story on trusted news sites',
            'Use fact-checking sites like Snopes or FactCheck.org',
            'Check if any credible sources are cited',
            'Report this content if it is harmful misinformation'
        ];
    } else if (score < 70) {
        recs = [
            'Verify this story with at least 2-3 sources',
            'Check the original source of this information',
            'Look for similar stories on credible news sites',
            'Be cautious before sharing with others',
            'Check the date - old news can be misleading'
        ];
    } else {
        recs = [
            'Article appears credible but verify key facts',
            'Cross-check statistics with official sources',
            'Check if other credible sources report the same',
            'Consider the publication date of this article',
            'Share responsibly with proper context'
        ];
    }

    recs.forEach(rec => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class="fas fa-lightbulb"></i>
            ${rec}
        `;
        list.appendChild(li);
    });
}

// ========================
// UPDATE SOURCES
// ========================
function updateSources() {
    const container = document.getElementById('sourcesList');
    container.innerHTML = '';

    trustedSources.forEach(source => {
        const div = document.createElement('div');
        div.className = 'source-item';
        div.style.cursor = 'pointer';
        div.onclick = () => window.open(source.url, '_blank');
        div.innerHTML = `
            <div class="source-icon" 
                 style="background:${source.color}">
                ${source.icon}
            </div>
            <div class="source-info">
                <span class="source-name">
                    ${source.name}
                </span>
                <span class="source-type">
                    ${source.type}
                </span>
            </div>
            <i class="fas fa-external-link-alt" 
               style="color:var(--text-muted);
                      font-size:0.7rem">
            </i>
        `;
        container.appendChild(div);
    });
}

// ========================
// RESET ANALYSIS
// ========================
function resetAnalysis() {
    // Hide results
    document.getElementById('results')
        .style.display = 'none';

    // Clear inputs
    document.getElementById('newsText').value = '';
    document.getElementById('charCount')
        .textContent = '0 characters';

    // Reset score circle
    document.getElementById('scoreCircle')
        .style.strokeDashoffset = '339';

    // Scroll to detector
    document.getElementById('detector')
        .scrollIntoView({ behavior: 'smooth' });
}

// ========================
// SHARE RESULTS
// ========================
function shareResult(platform) {
    const score = document.getElementById('scoreNum')
        .textContent;
    const verdict = document.getElementById('verdictTitle')
        .textContent;
    const text = `I just analyzed news with TruthLens AI!\nCredibility Score: ${score}\nVerdict: ${verdict}\nCheck fake news at TruthLens!`;

    if (platform === 'whatsapp') {
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            '_blank'
        );
    } else if (platform === 'twitter') {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
            '_blank'
        );
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Result copied to clipboard!');
        });
    }
}

// ========================
// DOWNLOAD REPORT
// ========================
function downloadReport() {
    const score = document.getElementById('scoreNum')
        .textContent;
    const verdict = document.getElementById('verdictTitle')
        .textContent;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const reportContent = `
╔══════════════════════════════════════╗
║        TRUTHLENS ANALYSIS REPORT     ║
╚══════════════════════════════════════╝

Date: ${date}
Time: ${time}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREDIBILITY SCORE: ${score}
VERDICT: ${verdict}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RED FLAGS:
${getListItems('redFlagsList')}

CREDIBILITY SIGNALS:
${getListItems('greenFlagsList')}

RECOMMENDATIONS:
${getListItems('recommendList')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERIFIED BY: TruthLens AI System
Built by: Soham Gautam | GL Bajaj
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    const blob = new Blob(
        [reportContent],
        { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TruthLens_Report_${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Report downloaded!');
}

function getListItems(id) {
    const items = document.querySelectorAll(
        `#${id} li`
    );
    let text = '';
    items.forEach((item, i) => {
        text += `${i + 1}. ${item.textContent.trim()}\n`;
    });
    return text || 'None found';
}

// ========================
// TOAST NOTIFICATION
// ========================
function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const icon = toast.querySelector('i');

    toastMsg.textContent = msg;

    if (type === 'error') {
        toast.style.background = '#ff4444';
        icon.className = 'fas fa-times-circle';
    } else {
        toast.style.background = '#00cc88';
        icon.className = 'fas fa-check-circle';
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================
// COUNTER ANIMATION
// ========================
function animateCounters() {
    document.querySelectorAll('.stat-number')
        .forEach(counter => {
            const target = parseInt(
                counter.dataset.target
            );
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent =
                    Math.floor(current)
                        .toLocaleString();
            }, 20);
        });
}

// ========================
// SCROLL ANIMATIONS
// ========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList
                .contains('stats-section')) {
                animateCounters();
            }
            entry.target.style.opacity = '1';
            entry.target.style.transform =
                'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.step-card, .stat-card, .analysis-card'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

document.querySelector('.stats-section') &&
    observer.observe(
        document.querySelector('.stats-section')
    );

// ========================
// NAVBAR SCROLL EFFECT
// ========================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background =
            'rgba(10,10,26,0.98)';
        navbar.style.boxShadow =
            '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background =
            'rgba(10,10,26,0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================
// HAMBURGER MENU
// ========================
document.getElementById('hamburger')
    .addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display =
            navLinks.style.display === 'flex'
                ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background =
            'rgba(10,10,26,0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.gap = '15px';
    });

// ========================
// HELPER FUNCTIONS
// ========================
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() +
        str.slice(1);
}

// ========================
// INITIALIZE
// ========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 TruthLens Initialized!');
    console.log('Built by Soham Gautam');
    console.log('GL Bajaj Institute of Technology');
});